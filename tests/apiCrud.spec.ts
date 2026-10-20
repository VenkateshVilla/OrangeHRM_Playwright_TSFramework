import { expect, test } from '@playwright/test';
import type { ValidateFunction } from 'ajv';
import { PostsApi } from '../src/api/PostsApi';
import {
    validateDeleteResponse,
    validatePost,
    validatePostList
} from '../src/api/postSchemas';
import apiTestData from '../testdata/api-test-data.json';

function expectJsonContentType(headers: Record<string, string>): void {
    expect(headers['content-type']).toMatch(/^application\/json(?:;|$)/i);
}

function expectSchema<T>(validator: ValidateFunction<T>, value: unknown): asserts value is T {
    expect(validator(value), JSON.stringify(validator.errors)).toBe(true);
}

test.describe('Posts API', () => {
    test('GET posts applies query parameters and validates the response', async ({ request }) => {
        const api = new PostsApi(request);
        const response = await test.step('Send GET request for posts with userId query parameter', async () => {
            return api.getPosts(apiTestData.posts.query);
        });

        await test.step('Verify response status and content type', async () => {
            expect(response.status()).toBe(200);
            expectJsonContentType(response.headers());
        });

        await test.step('Validate post list schema and userId query results', async () => {
            const posts: unknown = await response.json();
            expectSchema(validatePostList, posts);
            expect(posts).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ userId: apiTestData.posts.query.userId })
                ])
            );
            expect(posts.every(
                post => post.userId === apiTestData.posts.query.userId
            )).toBe(true);
        });
    });

    test('GET a post by id validates its response schema', async ({ request }) => {
        const api = new PostsApi(request);
        const response = await test.step('Send GET request for a post by ID', async () => {
            return api.getPost(apiTestData.posts.existingPostId);
        });

        await test.step('Verify response status and content type', async () => {
            expect(response.status()).toBe(200);
            expectJsonContentType(response.headers());
        });

        await test.step('Validate post schema and returned ID', async () => {
            const post: unknown = await response.json();
            expectSchema(validatePost, post);
            expect(post).toMatchObject({ id: apiTestData.posts.existingPostId });
        });
    });

    test('POST creates a post and validates the response schema', async ({ request }) => {
        const api = new PostsApi(request);
        const response = await test.step('Send POST request with new post data', async () => {
            return api.createPost(apiTestData.posts.newPost);
        });

        await test.step('Verify created response status and content type', async () => {
            expect(response.status()).toBe(201);
            expectJsonContentType(response.headers());
        });

        await test.step('Validate created post schema and submitted data', async () => {
            const post: unknown = await response.json();
            expectSchema(validatePost, post);
            expect(post).toMatchObject(apiTestData.posts.newPost);
        });
    });

    test('PUT updates a post and validates the response schema', async ({ request }) => {
        const api = new PostsApi(request);
        const response = await test.step('Send PUT request with replacement post data', async () => {
            return api.updatePost(
                apiTestData.posts.existingPostId,
                apiTestData.posts.updatedPost
            );
        });

        await test.step('Verify update response status and content type', async () => {
            expect(response.status()).toBe(200);
            expectJsonContentType(response.headers());
        });

        await test.step('Validate updated post schema and data', async () => {
            const post: unknown = await response.json();
            expectSchema(validatePost, post);
            expect(post).toMatchObject({
                ...apiTestData.posts.updatedPost,
                id: apiTestData.posts.existingPostId
            });
        });
    });

    test('PATCH updates selected post fields and validates the response schema', async ({ request }) => {
        const api = new PostsApi(request);
        const response = await test.step('Send PATCH request with selected post fields', async () => {
            return api.patchPost(
                apiTestData.posts.existingPostId,
                apiTestData.posts.patchedPost
            );
        });

        await test.step('Verify partial update response status and content type', async () => {
            expect(response.status()).toBe(200);
            expectJsonContentType(response.headers());
        });

        await test.step('Validate patched post schema and changed fields', async () => {
            const post: unknown = await response.json();
            expectSchema(validatePost, post);
            expect(post).toMatchObject({
                ...apiTestData.posts.patchedPost,
                id: apiTestData.posts.existingPostId
            });
        });
    });

    test('DELETE removes a post and validates the response schema', async ({ request }) => {
        const api = new PostsApi(request);
        const response = await test.step('Send DELETE request for the configured post', async () => {
            return api.deletePost(apiTestData.posts.existingPostId);
        });

        await test.step('Verify delete response status and content type', async () => {
            expect(response.status()).toBe(200);
            expectJsonContentType(response.headers());
        });

        await test.step('Validate empty delete response schema', async () => {
            const body: unknown = await response.json();
            expectSchema(validateDeleteResponse, body);
        });
    });
});
