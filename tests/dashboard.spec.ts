import { test } from '../src/fixtures/baseFixture';

test.describe('Dashboard Module', () => {

    test(
        'Verify Dashboard Loaded',
        async ({ dashboardPage }) => {

            await dashboardPage.verifyDashboardLoaded();
        }
    );

    test(
        'Verify Dashboard Widgets',
        async ({ dashboardPage }) => {

            await dashboardPage.verifyDashboardWidgets();
        }
    );

    test(
        'Navigate To Admin',
        async ({
            dashboardPage,
            adminPage
        }) => {

            await dashboardPage.navigateToAdmin();

            await adminPage.verifyAdminPageLoaded();
        }
    );
});