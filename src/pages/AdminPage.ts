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
    readonly saveButton: Locator;
    readonly deleteButton: Locator;

    // Results
    readonly recordsFoundLabel: Locator;
    readonly resultTable: Locator;

    constructor(page: Page) {
        super(page);

        this.adminMenu = page.locator('a[href*="admin/viewAdminModule"]');

        this.adminHeader = page.getByRole('heading', {
            name: 'Admin'
        });

        this.usernameTextBox = page.locator('.oxd-input').nth(1);

        this.userRoleDropdown = page.locator('(//div[contains(@class, "oxd-select-text")])[1]');

        this.employeeNameTextBox = page.locator('input[placeholder="Type for hints..."]');

        this.statusDropdown = page.locator('(//div[contains(@class, "oxd-select-text")])[2]');

        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });

        this.addButton = page.getByRole('button', { name: 'Add' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.deleteButton = page.locator('button i.bi-trash');

        this.resultTable = page.locator('.oxd-table-body');
        this.recordsFoundLabel = page.locator('.orangehrm-horizontal-padding');
    }

    async openAdminPage(): Promise<void> {
        await this.click(this.adminMenu);
        await expect(this.adminHeader).toBeVisible();
    }

    async verifyAdminPageLoaded(): Promise<void> {
        await expect(this.adminHeader).toBeVisible();
        await expect(this.adminHeader).toContainText('Admin');
    }

    async enterUsername(username: string): Promise<void> {
        await this.fill(this.usernameTextBox, username);
    }

    async clickSearch(): Promise<void> {
        await this.click(this.searchButton);
    }

    async clickReset(): Promise<void> {
        await this.click(this.resetButton);
    }

    async searchUser(username: string): Promise<void> {
        await this.enterUsername(username);
        await this.clickSearch();
    }

    async verifySearchResultsDisplayed(): Promise<void> {
        await expect(this.resultTable).toBeVisible();
    }

    async verifySearchResultsContainUser(username: string): Promise<void> {
        await this.verifySearchResultsDisplayed();
        await expect(this.resultTable).toContainText(username);
    }

    async verifyNoSearchResultsDisplayed(): Promise<void> {
        await expect(this.recordsFoundLabel).toContainText(/No Records Found|No records found/i);
    }

    async clickAddUser(): Promise<void> {
        await this.click(this.addButton);
    }

    async clickSaveUser(): Promise<void> {
        await this.click(this.saveButton);
    }

    async selectUserRole(role: string): Promise<void> {
        await this.click(this.userRoleDropdown);

        const option = this.page.locator('.oxd-select-dropdown').getByText(role, { exact: true }).last();
        await expect(option).toBeVisible();
        await option.click();
    }

    async enterEmployeeName(employeeName: string): Promise<void> {
        await this.fill(this.employeeNameTextBox, employeeName);

        const suggestion = this.page.locator('.oxd-autocomplete-option').getByText(employeeName, { exact: false }).first();
        await expect(suggestion).toBeVisible();
        await suggestion.click();
    }

    async selectStatus(status: string): Promise<void> {
        await this.click(this.statusDropdown);

        const option = this.page.locator('.oxd-select-dropdown').getByText(status, { exact: true }).last();
        await expect(option).toBeVisible();
        await option.click();
    }

    async createAdminUser(role: string, employeeName: string): Promise<void> {
        await this.clickAddUser();
        await this.selectUserRole(role);
        await this.enterEmployeeName(employeeName);
        await this.clickSaveUser();
    }

    async verifyUserCreated(employeeName: string): Promise<void> {
        await expect(this.page.locator('.oxd-toast')).toContainText(/success|saved/i);
        await this.resultTable.waitFor({ state: 'visible' });
        await expect(this.resultTable).toContainText(employeeName);
    }

    async verifyRecordsFound(): Promise<void> {
        await expect(this.recordsFoundLabel).toBeVisible();
    }

    async verifyAdminMenuVisible(): Promise<void> {
        await expect(this.adminMenu).toBeVisible();
    }

    async verifySearchButtonEnabled(): Promise<void> {
        await expect(this.searchButton).toBeEnabled();
    }

    async verifyAddButtonVisible(): Promise<void> {
        await expect(this.addButton).toBeVisible();
    }
}