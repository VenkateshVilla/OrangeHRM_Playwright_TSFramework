import { test } from '../src/fixtures/baseFixture';
import testData from '../testdata/testdata.json';
import '../src/hooks/testHooks';

test.describe('PIM Module', () => {

    test(
        'Verify PIM Page Navigation',
        async ({ pimPage }) => {

            await pimPage.openPIMPage();

            await pimPage.verifyPIMPageLoaded();
        }
    );

    test(
        'Add Employee',
        async ({ pimPage }) => {

            await pimPage.openPIMPage();

            await pimPage.createEmployee(
                testData.employee.firstName,
                testData.employee.lastName
            );
        }
    );

    test(
        'Search Employee',
        async ({ pimPage }) => {

            await pimPage.openPIMPage();

            await pimPage.searchAndValidateEmployee(
                testData.employee.firstName
            );
        }
    );
});