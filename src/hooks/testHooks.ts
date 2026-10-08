// src/hooks/testHooks.ts

import {
    test
} from '../fixtures/baseFixture';

import { BeforeEachHook } from './beforeEachHook';
import { AfterEachHook } from './afterEachHook';

test.beforeEach(
    async ({ page }) => {

        console.log(
            'Starting Test...'
        );

        await BeforeEachHook.login(
            page
        );
    }
);

test.afterEach(
    async ({ page }, testInfo) => {

        await AfterEachHook
            .captureFailureScreenshot(
                page,
                testInfo
            );

        console.log(
            `Test Completed : ${testInfo.title}`
        );
    }
);