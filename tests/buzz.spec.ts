import { expect, test } from '../src/fixtures/baseFixture';
import '../src/hooks/testHooks';

test.describe('Buzz Module', () => {
    test.beforeEach(async ({ buzzPage }) => {
        await buzzPage.openBuzzPage();
    });

    test('TC_BUZZ_011 - Reject whitespace-only post', async ({ buzzPage }) => {
        const initialPostCount = await buzzPage.posts.count();
        const whitespaceOnlyContent = '   \t   ';

        await buzzPage.submitPostContent(whitespaceOnlyContent);

        await expect(buzzPage.posts).toHaveCount(initialPostCount);
        await expect(buzzPage.postComposer).toHaveValue(/^\s+$/);
    });
});
