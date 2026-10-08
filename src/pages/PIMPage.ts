// src/pages/PIMPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PIMPage extends BasePage {

    // =====================================
    // Menu
    // =====================================

    readonly pimMenu: Locator;

    // =====================================
    // Header
    // =====================================

    readonly pimHeader: Locator;

    // =====================================
    // Employee Search
    // =====================================

    readonly employeeNameTextbox: Locator;
    readonly employeeIdTextbox: Locator;
    readonly searchButton: Locator;
    readonly resetButton: Locator;

    // =====================================
    // Add Employee
    // =====================================

    readonly addEmployeeButton: Locator;
    readonly firstNameTextbox: Locator;
    readonly middleNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly employeeIdField: Locator;
    readonly saveButton: Locator;

    // =====================================
    // Employee Details
    // =====================================

    readonly personalDetailsHeader: Locator;

    // =====================================
    // Employee Records
    // =====================================

    readonly recordsFoundLabel: Locator;
    readonly employeeTable: Locator;

    constructor(page: Page) {
        super(page);

        this.pimMenu = page.locator(
            '//span[text()="PIM"]'
        );

        this.pimHeader =
            page.getByRole('heading', {
                name: 'PIM'
            });

        this.employeeNameTextbox =
            page.locator(
                'input[placeholder="Type for hints..."]'
            );

        this.employeeIdTextbox = page.locator(
            '(//input[contains(@class,"oxd-input")])[3]'
        );

        this.searchButton = page.getByRole('button', {
            name: 'Search'
        });

        this.resetButton = page.getByRole('button', {
            name: 'Reset'
        });

        this.addEmployeeButton = page.getByRole('button', {
            name: 'Add'
        });

        this.firstNameTextbox =
            page.getByPlaceholder('First Name');

        this.middleNameTextbox =
            page.getByPlaceholder('Middle Name');

        this.lastNameTextbox =
            page.getByPlaceholder('Last Name');

        this.employeeIdField = page.locator(
            '(//input[contains(@class,"oxd-input")])[5]'
        );

        this.saveButton =
            page.getByRole('button', {
                name: 'Save'
            });

        this.personalDetailsHeader =
            page.getByRole('heading', {
                name: 'Personal Details'
            });

        this.recordsFoundLabel = page.locator(
            '.orangehrm-horizontal-padding'
        );

        this.employeeTable = page.locator(
            '.oxd-table-body'
        );
    }

    // =====================================
    // Navigation
    // =====================================

    async openPIMPage(): Promise<void> {
        await this.click(this.pimMenu);
    }

    async verifyPIMPageLoaded(): Promise<void> {
        await expect(this.pimHeader).toContainText('PIM');
    }

    // =====================================
    // Search Employee
    // =====================================

    async enterEmployeeName(
        employeeName: string
    ): Promise<void> {

        await this.fill(
            this.employeeNameTextbox,
            employeeName
        );
    }

    async enterEmployeeId(
        employeeId: string
    ): Promise<void> {

        await this.fill(
            this.employeeIdTextbox,
            employeeId
        );
    }

    async clickSearchButton(): Promise<void> {
        await this.click(this.searchButton);
    }

    async clickResetButton(): Promise<void> {
        await this.click(this.resetButton);
    }

    async searchEmployee(
        employeeName: string
    ): Promise<void> {

        await this.enterEmployeeName(
            employeeName
        );

        await this.clickSearchButton();
    }

    async searchEmployeeById(
        employeeId: string
    ): Promise<void> {

        await this.enterEmployeeId(
            employeeId
        );

        await this.clickSearchButton();
    }

    async verifySearchResultsVisible(): Promise<void> {

        await expect(
            this.employeeTable
        ).toBeVisible();
    }

    // =====================================
    // Add Employee
    // =====================================

    async clickAddEmployee(): Promise<void> {
        await this.click(this.addEmployeeButton);
    }

    async enterFirstName(
        firstName: string
    ): Promise<void> {

        await this.fill(
            this.firstNameTextbox,
            firstName
        );
    }

    async enterMiddleName(
        middleName: string
    ): Promise<void> {

        await this.fill(
            this.middleNameTextbox,
            middleName
        );
    }

    async enterLastName(
        lastName: string
    ): Promise<void> {

        await this.fill(
            this.lastNameTextbox,
            lastName
        );
    }

    async enterEmployeeIdValue(
        employeeId: string
    ): Promise<void> {

        await this.fill(
            this.employeeIdField,
            employeeId
        );
    }

    async clickSaveButton(): Promise<void> {
        await this.click(this.saveButton);
    }

    async addEmployee(
        firstName: string,
        middleName: string,
        lastName: string
    ): Promise<void> {

        await this.clickAddEmployee();

        await this.enterFirstName(firstName);

        await this.enterMiddleName(middleName);

        await this.enterLastName(lastName);

        await this.clickSaveButton();
    }

    async addEmployeeWithId(
        firstName: string,
        middleName: string,
        lastName: string,
        employeeId: string
    ): Promise<void> {

        await this.clickAddEmployee();

        await this.enterFirstName(firstName);

        await this.enterMiddleName(middleName);

        await this.enterLastName(lastName);

        await this.enterEmployeeIdValue(
            employeeId
        );

        await this.clickSaveButton();
    }

    // =====================================
    // Validations
    // =====================================

    async verifyEmployeeCreated(): Promise<void> {

        await expect(
            this.personalDetailsHeader
        ).toBeVisible();
    }

    async verifyRecordsFound(): Promise<void> {

        await expect(
            this.recordsFoundLabel
        ).toBeVisible();
    }

    async verifyAddEmployeeButtonVisible(): Promise<void> {

        await expect(
            this.addEmployeeButton
        ).toBeVisible();
    }

    async verifySearchButtonEnabled(): Promise<void> {

        await expect(
            this.searchButton
        ).toBeEnabled();
    }

    // =====================================
    // Business Flows
    // =====================================

    async createEmployee(
        firstName: string,
        lastName: string
    ): Promise<void> {

        await this.addEmployee(
            firstName,
            '',
            lastName
        );

        await this.verifyEmployeeCreated();
    }

    async searchAndValidateEmployee(
        employeeName: string
    ): Promise<void> {

        await this.searchEmployee(
            employeeName
        );

        await this.verifySearchResultsVisible();
    }
}