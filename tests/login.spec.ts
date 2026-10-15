//import { test } from '../src/fixtures/loginFixture';
import { test } from '../src/fixtures/baseFixture';
test.describe('Login Module', () => {

    test(
        'Verify Successful Login',
        async ({ loginPage }) => {
            await test.step('Login with valid credentials', async () => {
                await loginPage.performValidLogin();
            });
        }
    );

    test(
        'Verify Invalid Login',
        async ({ loginPage }) => {
            await test.step('Attempt login with invalid credentials', async () => {
                await loginPage.performInvalidLogin();
            });
        }
    );

    test(
        'Verify Login Page UI',
        async ({ loginPage }) => {
            await test.step('Navigate to login page', async () => {
                await loginPage.navigateToLoginPage();
            });

            await test.step('Verify login page is loaded', async () => {
                await loginPage.verifyLoginPageLoaded();
            });

            await test.step('Verify OrangeHRM logo is visible', async () => {
                await loginPage.verifyOrangeHRMLogoVisible();
            });
        }
    );
});