import { test } from '../src/fixtures/baseFixture';
import testData from '../testdata/testdata.json';
import '../src/hooks/testHooks';

test.describe('PIM Module', () => {

    test(
        'Verify PIM Page Navigation',
        async ({ pimPage }) => {
            await test.step('Open PIM page', async () => {
                await pimPage.openPIMPage();
            });

            await test.step('Verify PIM page loads', async () => {
                await pimPage.verifyPIMPageLoaded();
            });
        }
    );

    test(
        'Add Employee',
        async ({ pimPage }) => {
            await test.step('Open PIM page', async () => {
                await pimPage.openPIMPage();
            });

            await test.step('Create new employee record', async () => {
                await pimPage.createEmployee(
                    testData.employee.firstName,
                    testData.employee.lastName
                );
            });
        }
    );

    test(
        'Search Employee',
        async ({ pimPage }) => {
            await test.step('Open PIM page', async () => {
                await pimPage.openPIMPage();
            });

            await test.step('Search for employee and validate results', async () => {
                await pimPage.searchAndValidateEmployee(
                    testData.employee.firstName
                );
            });
        }
    );
});