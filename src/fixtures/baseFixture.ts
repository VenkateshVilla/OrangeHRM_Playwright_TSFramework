// src/fixtures/baseFixture.ts

import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { PIMPage } from '../pages/PIMPage';
import { BuzzPage } from '../pages/BuzzPage';

import { EnvManager } from '../utils/EnvManager';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
  pimPage: PIMPage;
  buzzPage: BuzzPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },

  pimPage: async ({ page }, use) => {
    const pimPage = new PIMPage(page);
    await use(pimPage);
  },

  buzzPage: async ({ page }, use) => {
    const buzzPage = new BuzzPage(page);
    await use(buzzPage);
  }
});

export { expect };