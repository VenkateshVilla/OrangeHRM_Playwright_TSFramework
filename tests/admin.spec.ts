import { test } from '../src/fixtures/baseFixture';
import testData from '../testdata/testdata.json';
import '../src/hooks/testHooks';

const {
    searchUser,
    newUser
} = testData.admin;

test.describe('Admin Module', () => {

    test(
        'Search User',
        async ({ adminPage }) => {

            await adminPage.openAdminPage();

            await adminPage.searchUser(
                searchUser.username
            );

            await adminPage.verifySearchResultsDisplayed();
        }
    );

    test(
        'Create Admin User',
        async ({ adminPage }) => {

            await adminPage.openAdminPage();

            await adminPage.createAdminUser(
                newUser.userRole,
                newUser.employeeName
            );

            await adminPage.verifyAddButtonVisible();
        }
    );
});