// src/hooks/beforeEachHook.ts

import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EnvManager } from '../utils/EnvManager';

export class BeforeEachHook {

    static async login(
        page: Page
    ): Promise<void> {

        const loginPage =
            new LoginPage(page);

        await page.goto(
            EnvManager.getBaseUrl()
        );

        await loginPage.login(
            EnvManager.getUsername(),
            EnvManager.getPassword()
        );

        await loginPage.verifySuccessfulLogin();
    }
}
