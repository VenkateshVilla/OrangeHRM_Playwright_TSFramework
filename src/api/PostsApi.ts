import { APIRequestContext, APIResponse } from '@playwright/test';

export interface PostPayload {
    userId: number;
    title: string;
    body: string;
}

export interface Post extends PostPayload {
    id: number;
}

export type PostPatch = Partial<PostPayload>;

export class PostsApi {
    private readonly baseUrl: string;

    constructor(
        private readonly request: APIRequestContext,
        baseUrl = process.env.API_POSTS_BASE_URL || 'https://jsonplaceholder.typicode.com'
    ) {
        this.baseUrl = baseUrl.replace(/\/+$/, '');
    }

    async getPosts(params: { userId?: number } = {}): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/posts`, {
            headers: { Accept: 'application/json' },
            params
        });
    }

    async getPost(id: number): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}/posts/${id}`, {
            headers: { Accept: 'application/json' }
        });
    }

    async createPost(post: PostPayload): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}/posts`, {
            headers: { Accept: 'application/json' },
            data: post
        });
    }

    async updatePost(id: number, post: PostPayload): Promise<APIResponse> {
        return this.request.put(`${this.baseUrl}/posts/${id}`, {
            headers: { Accept: 'application/json' },
            data: post
        });
    }

    async patchPost(id: number, post: PostPatch): Promise<APIResponse> {
        return this.request.patch(`${this.baseUrl}/posts/${id}`, {
            headers: { Accept: 'application/json' },
            data: post
        });
    }

    async deletePost(id: number): Promise<APIResponse> {
        return this.request.delete(`${this.baseUrl}/posts/${id}`, {
            headers: { Accept: 'application/json' }
        });
    }
}
