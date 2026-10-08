// src/hooks/afterEachHook.ts

import {
    Page,
    TestInfo
} from '@playwright/test';

export class AfterEachHook {

    static async captureFailureScreenshot(
        page: Page,
        testInfo: TestInfo
    ): Promise<void> {

        if (
            testInfo.status !==
            testInfo.expectedStatus
        ) {

            const screenshot =
                await page.screenshot({
                    fullPage: true
                });

            await testInfo.attach(
                'Failure Screenshot',
                {
                    body: screenshot,
                    contentType: 'image/png'
                }
            );
        }
    }
}