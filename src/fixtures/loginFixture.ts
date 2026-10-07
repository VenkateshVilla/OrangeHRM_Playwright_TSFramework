// src/fixtures/loginFixture.ts

import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

type LoginFixture = {
    loginPage: LoginPage;
};

export const test = base.extend<LoginFixture>({
    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);
    }
});

export { expect };