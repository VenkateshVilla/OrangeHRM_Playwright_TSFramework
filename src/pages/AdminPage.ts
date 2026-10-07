// src/pages/AdminPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {

    // Menu
    readonly adminMenu: Locator;

    // Header
    readonly adminHeader: Locator;

    // Search Form
    readonly usernameTextBox: Locator;
    readonly userRoleDropdown: Locator;
    readonly employeeNameTextBox: Locator;
    readonly statusDropdown: Locator;
    readonly searchButton: Locator;
    readonly resetButton: Locator;

    // Actions
    readonly addButton: Locator;
    readonly deleteButton: Locator;

    // Results
    readonly recordsFoundLabel: Locator;
    readonly resultTable: Locator;

    constructor(page: Page) {
        super(page);

        // Menu
        this.adminMenu = page.locator('a[href*="admin/viewAdminModule"]');

        // Header
        this.adminHeader = page.locator(
            "//h6[contains(@class,'oxd-topbar-header-breadcrumb-module')]"
        );

        // Search
        this.usernameTextBox = page.locator(
            "(//input[contains(@class,'oxd-input')])[2]"
        );

        this.userRoleDropdown = page.locator(
            "(//div[contains(@class,'oxd-select-text')])[1]"
        );

        this.employeeNameTextBox = page.locator(
            'input[placeholder="Type for hints..."]'
        );

        this.statusDropdown = page.locator(
            "(//div[contains(@class,'oxd-select-text')])[2]"
        );

        this.searchButton = page.getByRole('button', {
            name: 'Search'
        });

        this.resetButton = page.getByRole('button', {
            name: 'Reset'
        });

        // Actions
        this.addButton = page.getByRole('button', {
            name: 'Add'
        });

        this.deleteButton = page.locator(
            "button i.bi-trash"
        );

        // Results
        this.resultTable = page.locator(
            '.oxd-table-body'
        );

        this.recordsFoundLabel = page.locator(
            '.orangehrm-horizontal-padding'
        );
    }

    // --------------------------
    // Navigation Methods
    // --------------------------

    async openAdminPage(): Promise<void> {
        await this.adminMenu.click();
    }

    async verifyAdminPageLoaded(): Promise<void> {
        await expect(this.adminHeader).toContainText('Admin');
    }

    // --------------------------
    // Search User Methods
    // --------------------------

    async enterUsername(username: string): Promise<void> {
        await this.usernameTextBox.fill(username);
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    async searchUser(username: string): Promise<void> {
        await this.enterUsername(username);
        await this.clickSearch();
    }

    async verifySearchResultsDisplayed(): Promise<void> {
        await expect(this.resultTable).toBeVisible();
    }

    // --------------------------
    // Add User Methods
    // --------------------------

    async clickAddUser(): Promise<void> {
        await this.addButton.click();
    }

    async selectUserRole(role: string): Promise<void> {

        await this.userRoleDropdown.click();

        await this.page.locator(
            `//span[text()='${role}']`
        ).click();
    }

    async enterEmployeeName(
        employeeName: string
    ): Promise<void> {

        await this.employeeNameTextBox.fill(employeeName);

        await this.page.waitForTimeout(2000);

        //await this.page.keyboard.arrowDown();
        //await this.page.keyboard.enter();
        await this.employeeNameTextBox.press('ArrowDown');
        await this.employeeNameTextBox.press('Enter');
    }

    async selectStatus(
        status: string
    ): Promise<void> {

        await this.statusDropdown.click();

        await this.page.locator(
            `//span[text()='${status}']`
        ).click();
    }

    async createAdminUser(
        role: string,
        employeeName: string
    ): Promise<void> {

        await this.clickAddUser();

        await this.selectUserRole(role);

        await this.enterEmployeeName(
            employeeName
        );
    }

    // --------------------------
    // Validation Methods
    // --------------------------

    async verifyRecordsFound(): Promise<void> {
        await expect(
            this.recordsFoundLabel
        ).toBeVisible();
    }

    async verifyAdminMenuVisible(): Promise<void> {
        await expect(
            this.adminMenu
        ).toBeVisible();
    }

    async verifySearchButtonEnabled(): Promise<void> {
        await expect(
            this.searchButton
        ).toBeEnabled();
    }

    async verifyAddButtonVisible(): Promise<void> {
        await expect(
            this.addButton
        ).toBeVisible();
    }
}