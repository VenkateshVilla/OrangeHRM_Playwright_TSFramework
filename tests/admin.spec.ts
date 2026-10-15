import { expect, test } from '../src/fixtures/baseFixture';
import testData from '../testdata/testdata.json';
import '../src/hooks/testHooks';

const {
    searchUser,
    newUser
} = testData.admin;

test.describe('Admin Module', () => {

    test.beforeEach(async ({ adminPage }) => {
        await test.step('Open Admin page and verify it loaded', async () => {
            await adminPage.openAdminPage();
            await adminPage.verifyAdminPageLoaded();
        });
    });

    test('Search User', async ({ adminPage }) => {
        await test.step('Search for the user', async () => {
            await adminPage.searchUser(searchUser.username);
        });

        await test.step('Verify search results contain the user', async () => {
            await adminPage.verifySearchResultsContainUser(searchUser.username);
        });
    });

    test('Search User with no matching result', async ({ adminPage }) => {
        const missingUsername = 'definitely_not_a_user_12345';

        await test.step('Search for a username that should not exist', async () => {
            await adminPage.searchUser(missingUsername);
        });

        await test.step('Verify no matching user is displayed', async () => {
            await adminPage.verifyNoSearchResultsDisplayed();
        });
    });

    test('Create Admin User', async ({ adminPage }) => {
        await test.step('Create the admin user', async () => {
            await adminPage.createAdminUser(
                newUser.userRole,
                newUser.employeeName
            );
        });

        await test.step('Verify the created user is visible', async () => {
            await adminPage.verifyUserCreated(newUser.employeeName);
            await expect(adminPage.addButton).toBeVisible();
        });
    });
});