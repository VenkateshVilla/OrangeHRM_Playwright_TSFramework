//import { test } from '../src/fixtures/loginFixture';
import { test } from '../src/fixtures/baseFixture';
test.describe('Login Module', () => {

    test(
        'Verify Successful Login',
        async ({ loginPage }) => {

            await loginPage.performValidLogin();
        }
    );

    test(
        'Verify Invalid Login',
        async ({ loginPage }) => {

            await loginPage.performInvalidLogin();
        }
    );

    test(
        'Verify Login Page UI',
        async ({ loginPage }) => {

            await loginPage.navigateToLoginPage();

            await loginPage.verifyLoginPageLoaded();

            await loginPage.verifyOrangeHRMLogoVisible();
        }
    );
});