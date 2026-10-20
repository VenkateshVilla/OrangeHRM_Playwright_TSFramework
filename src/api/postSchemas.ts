import Ajv, { type AnySchema } from 'ajv';
import type { Post } from './PostsApi';

const postSchema: AnySchema = {
    type: 'object',
    required: ['userId', 'id', 'title', 'body'],
    properties: {
        userId: { type: 'integer' },
        id: { type: 'integer' },
        title: { type: 'string' },
        body: { type: 'string' }
    },
    additionalProperties: true
};

const ajv = new Ajv({ allErrors: true });

export const validatePost = ajv.compile<Post>(postSchema);
export const validatePostList = ajv.compile<Post[]>({
    type: 'array',
    items: postSchema
});
export const validateDeleteResponse = ajv.compile<Record<string, unknown>>({
    type: 'object',
    maxProperties: 0,
    additionalProperties: false
});
