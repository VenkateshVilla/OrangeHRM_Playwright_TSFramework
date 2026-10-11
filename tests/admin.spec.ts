import { expect, test } from '../src/fixtures/baseFixture';
import testData from '../testdata/testdata.json';
import '../src/hooks/testHooks';

const {
    searchUser,
    newUser
} = testData.admin;

test.describe('Admin Module', () => {

    test.beforeEach(async ({ adminPage }) => {
        await adminPage.openAdminPage();
        await adminPage.verifyAdminPageLoaded();
    });

    test('Search User', async ({ adminPage }) => {
        await adminPage.searchUser(searchUser.username);
        await adminPage.verifySearchResultsContainUser(searchUser.username);
    });

    test('Search User with no matching result', async ({ adminPage }) => {
        const missingUsername = 'definitely_not_a_user_12345';

        await adminPage.searchUser(missingUsername);
        await adminPage.verifyNoSearchResultsDisplayed();
    });

    test('Create Admin User', async ({ adminPage }) => {
        await adminPage.createAdminUser(
            newUser.userRole,
            newUser.employeeName
        );

        await adminPage.verifyUserCreated(newUser.employeeName);
        await expect(adminPage.addButton).toBeVisible();
    });
});