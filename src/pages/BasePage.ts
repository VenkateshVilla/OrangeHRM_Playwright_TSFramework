// src/pages/BasePage.ts

import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ==========================
    // Navigation Methods
    // ==========================

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    async navigateBack(): Promise<void> {
        await this.page.goBack();
    }

    async navigateForward(): Promise<void> {
        await this.page.goForward();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    // ==========================
    // Locator Actions
    // ==========================

    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }

    async type(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.type(value);
    }

    async clear(locator: Locator): Promise<void> {
        await locator.clear();
    }

    async pressKey(
        locator: Locator,
        key: string
    ): Promise<void> {
        await locator.press(key);
    }

    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }

    async doubleClick(locator: Locator): Promise<void> {
        await locator.dblclick();
    }

    async rightClick(locator: Locator): Promise<void> {
        await locator.click({
            button: 'right'
        });
    }

    // ==========================
    // Dropdown Methods
    // ==========================

    async selectOptionByLabel(
        locator: Locator,
        label: string
    ): Promise<void> {
        await locator.selectOption({
            label
        });
    }

    async selectOptionByValue(
        locator: Locator,
        value: string
    ): Promise<void> {
        await locator.selectOption({
            value
        });
    }

    async selectOptionByIndex(
        locator: Locator,
        index: number
    ): Promise<void> {
        await locator.selectOption({
            index
        });
    }

    // ==========================
    // Wait Methods
    // ==========================

    async waitForVisibility(
        locator: Locator
    ): Promise<void> {
        await locator.waitFor({
            state: 'visible'
        });
    }

    async waitForHidden(
        locator: Locator
    ): Promise<void> {
        await locator.waitFor({
            state: 'hidden'
        });
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async wait(seconds: number): Promise<void> {
        await this.page.waitForTimeout(
            seconds * 1000
        );
    }

    // ==========================
    // Validation Methods
    // ==========================

    async verifyVisible(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async verifyHidden(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeHidden();
    }

    async verifyEnabled(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    async verifyDisabled(
        locator: Locator
    ): Promise<void> {
        await expect(locator).toBeDisabled();
    }

    async verifyText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {
        await expect(locator)
            .toContainText(expectedText);
    }

    async verifyExactText(
        locator: Locator,
        expectedText: string
    ): Promise<void> {
        await expect(locator)
            .toHaveText(expectedText);
    }

    async verifyUrl(
        expectedUrl: string
    ): Promise<void> {
        await expect(this.page)
            .toHaveURL(expectedUrl);
    }

    async verifyTitle(
        expectedTitle: string
    ): Promise<void> {
        await expect(this.page)
            .toHaveTitle(expectedTitle);
    }

    // ==========================
    // Element Information
    // ==========================

    async getText(
        locator: Locator
    ): Promise<string> {

        return (
            await locator.textContent()
        ) ?? '';
    }

    async getAttribute(
        locator: Locator,
        attributeName: string
    ): Promise<string | null> {

        return await locator.getAttribute(
            attributeName
        );
    }

    async isVisible(
        locator: Locator
    ): Promise<boolean> {

        return await locator.isVisible();
    }

    async isEnabled(
        locator: Locator
    ): Promise<boolean> {

        return await locator.isEnabled();
    }

    // ==========================
    // Screenshot Methods
    // ==========================

    async takeScreenshot(
        fileName: string
    ): Promise<void> {

        await this.page.screenshot({
            path: `screenshots/${fileName}.png`,
            fullPage: true
        });
    }

    // ==========================
    // Frame Handling
    // ==========================

    getFrame(frameName: string) {
        return this.page.frame(frameName);
    }

    // ==========================
    // Browser Utilities
    // ==========================

    async openNewTab(
        url: string
    ): Promise<Page> {

        const newPage =
            await this.page.context().newPage();

        await newPage.goto(url);

        return newPage;
    }

    // ==========================
    // OrangeHRM Common Menu
    // ==========================

    async clickAdminMenu(): Promise<void> {
        await this.page
            .locator('span')
            .filter({ hasText: 'Admin' })
            .click();
    }

    async clickPIMMenu(): Promise<void> {
        await this.page
            .locator('span')
            .filter({ hasText: 'PIM' })
            .click();
    }

    async clickDashboardMenu(): Promise<void> {
        await this.page
            .locator('span')
            .filter({ hasText: 'Dashboard' })
            .click();
    }
}