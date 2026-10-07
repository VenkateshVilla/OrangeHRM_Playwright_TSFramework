import { test } from '../src/fixtures/baseFixture';

test.describe('Admin Module', () => {

    test(
        'Verify Admin Page Navigation',
        async ({ adminPage }) => {

            await adminPage.openAdminPage();

            await adminPage.verifyAdminPageLoaded();
        }
    );

    test(
        'Search Existing User',
        async ({ adminPage }) => {

            await adminPage.openAdminPage();

            await adminPage.searchUser('Admin');

            await adminPage.verifySearchResultsDisplayed();
        }
    );

    test(
        'Validate Admin Controls',
        async ({ adminPage }) => {

            await adminPage.openAdminPage();

            await adminPage.verifyAddButtonVisible();

            await adminPage.verifySearchButtonEnabled();
        }
    );
});