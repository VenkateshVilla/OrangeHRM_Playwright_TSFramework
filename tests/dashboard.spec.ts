import { test } from '../src/fixtures/baseFixture';
import '../src/hooks/testHooks';

test.describe('Dashboard Module', () => {

    test(
        'Verify Dashboard Loaded',
        async ({ dashboardPage }) => {
            await test.step('Verify dashboard loads successfully', async () => {
                await dashboardPage.verifyDashboardLoaded();
            });
        }
    );

    test(
        'Verify Dashboard Widgets',
        async ({ dashboardPage }) => {
            await test.step('Verify dashboard widgets are visible', async () => {
                await dashboardPage.verifyDashboardWidgets();
            });
        }
    );

    test(
        'Navigate To Admin',
        async ({
            dashboardPage,
            adminPage
        }) => {
            await test.step('Navigate from dashboard to admin page', async () => {
                await dashboardPage.navigateToAdmin();
            });

            await test.step('Verify admin page is loaded', async () => {
                await adminPage.verifyAdminPageLoaded();
            });
        }
    );
});