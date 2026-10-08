// src/pages/LoginPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { EnvManager } from '../utils/EnvManager';

export class LoginPage extends BasePage {

    // =====================================
    // Locators
    // =====================================

    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;

    readonly forgotPasswordLink: Locator;

    readonly orangeHRMLogo: Locator;

    readonly dashboardHeader: Locator;

    readonly invalidCredentialError: Locator;

    readonly requiredFieldError: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameTextbox =
            page.getByRole('textbox').first();

        this.passwordTextbox =
            page.getByRole('textbox').nth(1);

        this.loginButton =
            page.getByRole('button', {
                name: 'Login'
            });

        this.forgotPasswordLink =
            page.getByText('Forgot your password?');

        this.orangeHRMLogo = page.locator(
            '.orangehrm-login-branding'
        );

        this.dashboardHeader =
            page.getByRole('heading', {
                name: 'Dashboard'
            });

        this.invalidCredentialError = page.locator(
            '.oxd-alert-content-text'
        );

        this.requiredFieldError = page.locator(
            '//span[text()="Required"]'
        );
    }

    // =====================================
    // Navigation
    // =====================================

    async navigateToLoginPage(): Promise<void> {

        await this.navigateTo(
            EnvManager.getBaseUrl()
        );

        await this.waitForPageLoad();
    }

    // =====================================
    // Actions
    // =====================================

    async enterUsername(
        username: string
    ): Promise<void> {

        await this.fill(
            this.usernameTextbox,
            username
        );
    }

    async enterPassword(
        password: string
    ): Promise<void> {

        await this.fill(
            this.passwordTextbox,
            password
        );
    }

    async clickLoginButton(): Promise<void> {

        await this.click(
            this.loginButton
        );
    }

    async clickForgotPassword(): Promise<void> {

        await this.click(
            this.forgotPasswordLink
        );
    }

    // =====================================
    // Business Methods
    // =====================================

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.enterUsername(
            username
        );

        await this.enterPassword(
            password
        );

        await this.clickLoginButton();
    }

    async loginWithValidCredentials(): Promise<void> {

        await this.login(
            EnvManager.getUsername(),
            EnvManager.getPassword()
        );
    }

    async loginWithInvalidCredentials(): Promise<void> {

        await this.login(
            'InvalidUser',
            'InvalidPassword'
        );
    }

    // =====================================
    // Validations
    // =====================================

    async verifyLoginPageLoaded(): Promise<void> {

        await this.verifyVisible(
            this.usernameTextbox
        );

        await this.verifyVisible(
            this.passwordTextbox
        );

        await this.verifyVisible(
            this.loginButton
        );
    }

    async verifyOrangeHRMLogoVisible(): Promise<void> {

        await this.verifyVisible(
            this.orangeHRMLogo
        );
    }

    async verifySuccessfulLogin(): Promise<void> {

        await expect(
            this.dashboardHeader
        ).toBeVisible();
    }

    async verifyInvalidCredentialError(): Promise<void> {

        await expect(
            this.invalidCredentialError
        ).toContainText(
            'Invalid credentials'
        );
    }

    async verifyRequiredFieldValidation(): Promise<void> {

        await expect(
            this.requiredFieldError
        ).toBeVisible();
    }

    async verifyCurrentUrlContainsDashboard(): Promise<void> {

        await expect(this.page)
            .toHaveURL(/dashboard/);
    }

    // =====================================
    // Composite Flows
    // =====================================

    async performValidLogin(): Promise<void> {

        await this.navigateToLoginPage();

        await this.loginWithValidCredentials();

        await this.verifySuccessfulLogin();
    }

    async performInvalidLogin(): Promise<void> {

        await this.navigateToLoginPage();

        await this.loginWithInvalidCredentials();

        await this.verifyInvalidCredentialError();
    }

    async loginAndVerifyDashboard(): Promise<void> {

        await this.performValidLogin();

        await this.verifyCurrentUrlContainsDashboard();
    }
}