import { expect, test } from '../src/fixtures/baseFixture';
import '../src/hooks/testHooks';

test.describe('Buzz Module', () => {
    test.beforeEach(async ({ buzzPage }) => {
        await test.step('Open Buzz page', async () => {
            await buzzPage.openBuzzPage();
        });
    });

    test('TC_BUZZ_011 - Reject whitespace-only post', async ({ buzzPage }) => {
        let initialPostCount = 0;
        const whitespaceOnlyContent = '   \t   ';

        await test.step('Capture current post count', async () => {
            initialPostCount = await buzzPage.posts.count();
        });

        await test.step('Submit whitespace-only content', async () => {
            await buzzPage.submitPostContent(whitespaceOnlyContent);
        });

        await test.step('Verify post is not created', async () => {
            await expect(buzzPage.posts).toHaveCount(initialPostCount);
            await expect(buzzPage.postComposer).toHaveValue(/^\s+$/);
        });
    });
});
