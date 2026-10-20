# API Tests

The API examples in `tests/apiCrud.spec.ts` use Playwright's `APIRequestContext`
to send requests to JSONPlaceholder. The `PostsApi` service object in
`src/api/PostsApi.ts` keeps request methods separate from test assertions, in a
POM-style structure.

## Included tests

| Test | What it checks |
| --- | --- |
| GET posts | Sends `userId` as a query parameter, checks HTTP `200` and the JSON content type, validates that the response is an array of posts, and confirms every returned post matches the requested user. |
| GET a post by id | Fetches the configured post, checks HTTP `200` and JSON content type, validates the post schema, and verifies its ID. |
| POST a post | Sends the configured post payload, checks HTTP `201` and JSON content type, validates the response schema, and verifies the response includes the submitted fields. |
| PUT a post | Sends a replacement post payload, checks HTTP `200` and JSON content type, validates the response schema, and checks the updated fields and ID. |
| PATCH a post | Sends only the configured title field, checks HTTP `200` and JSON content type, validates the response schema, and checks the changed title and ID. |
| DELETE a post | Deletes the configured post, checks HTTP `200` and JSON content type, and validates the empty-object response schema. |

## Supporting files

- `src/api/PostsApi.ts` wraps the endpoint requests and accepts Playwright's
  `APIRequestContext`.
- `src/api/postSchemas.ts` defines Ajv schemas for individual posts, post lists,
  and the empty DELETE response.
- `testdata/api-test-data.json` stores the query parameter, post ID, and
  request payloads so test data is separate from request and assertion logic.

JSONPlaceholder is a demo API: create, update, and delete requests return
simulated responses and do not persist changes.

## Run

Run just these tests with:

```bash
npx playwright test tests/apiCrud.spec.ts
```

The default base URL is `https://jsonplaceholder.typicode.com`. To set it
explicitly, add this to the environment file used by your project (for example,
`env/.env.qa`):

```env
API_POSTS_BASE_URL=https://jsonplaceholder.typicode.com
```

The value should be the API base URL, not the `/posts` endpoint; the client
appends `/posts` and the post ID to it. To use a different service, set this
variable to a compatible posts API base URL.
