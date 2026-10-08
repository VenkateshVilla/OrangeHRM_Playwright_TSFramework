// src/pages/DashboardPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {

    // Header
    readonly dashboardHeader: Locator;

    // Menu Items
    readonly adminMenu: Locator;
    readonly pimMenu: Locator;
    readonly leaveMenu: Locator;
    readonly timeMenu: Locator;
    readonly recruitmentMenu: Locator;
    readonly myInfoMenu: Locator;
    readonly performanceMenu: Locator;
    readonly dashboardMenu: Locator;
    readonly buzzMenu: Locator;

    // User Profile
    readonly profileDropdown: Locator;
    readonly logoutLink: Locator;

    // Dashboard Widgets
    readonly timeAtWorkWidget: Locator;
    readonly myActionsWidget: Locator;
    readonly quickLaunchWidget: Locator;
    readonly employeesOnLeaveWidget: Locator;
    readonly buzzLatestPostsWidget: Locator;

    constructor(page: Page) {
        super(page);

        // Header
        this.dashboardHeader =
            page.getByRole('heading', {
                name: 'Dashboard'
            });

        // Left Menu
        this.adminMenu =
            page.getByRole('link', {
                name: 'Admin'
            });

        this.pimMenu =
            page.getByRole('link', {
                name: 'PIM'
            });

        this.leaveMenu =
            page.getByRole('link', {
                name: 'Leave'
            });

        this.timeMenu = page.locator(
            '//span[text()="Time"]'
        );

        this.recruitmentMenu = page.locator(
            '//span[text()="Recruitment"]'
        );

        this.myInfoMenu = page.locator(
            '//span[text()="My Info"]'
        );

        this.performanceMenu = page.locator(
            '//span[text()="Performance"]'
        );

        this.dashboardMenu = page.locator(
            '//span[text()="Dashboard"]'
        );

        this.buzzMenu =
            page.getByRole('link', {
                name: 'Buzz'
            });

        // User Actions
        this.profileDropdown = page.locator(
            '.oxd-userdropdown-tab'
        );

        this.logoutLink = page.locator(
            '//a[text()="Logout"]'
        );

        // Widgets
        this.timeAtWorkWidget = page.locator(
            '//p[text()="Time at Work"]'
        );

        this.myActionsWidget = page.locator(
            '//p[text()="My Actions"]'
        );

        this.quickLaunchWidget = page.locator(
            '//p[text()="Quick Launch"]'
        );

        this.employeesOnLeaveWidget = page.locator(
            '//p[text()="Employees on Leave Today"]'
        );

        this.buzzLatestPostsWidget = page.locator(
            '//p[text()="Buzz Latest Posts"]'
        );
    }

    // =================================
    // Verification Methods
    // =================================

    async verifyDashboardLoaded(): Promise<void> {
        await this.verifyVisible(
            this.dashboardHeader
        );
    }

    async verifyDashboardWidgets(): Promise<void> {

        await this.verifyVisible(
            this.timeAtWorkWidget
        );

        await this.verifyVisible(
            this.myActionsWidget
        );

        await this.verifyVisible(
            this.quickLaunchWidget
        );
    }

    async verifyMenuOptionsVisible(): Promise<void> {

        await this.verifyVisible(
            this.adminMenu
        );

        await this.verifyVisible(
            this.pimMenu
        );

        await this.verifyVisible(
            this.leaveMenu
        );

        await this.verifyVisible(
            this.timeMenu
        );
    }

    // =================================
    // Navigation Methods
    // =================================

    async navigateToAdmin(): Promise<void> {
        await this.click(this.adminMenu);
    }

    async navigateToPIM(): Promise<void> {
        await this.click(this.pimMenu);
    }

    async navigateToBuzz(): Promise<void> {
        await this.click(this.buzzMenu);
    }

    async navigateToLeave(): Promise<void> {
        await this.click(this.leaveMenu);
    }

    async navigateToMyInfo(): Promise<void> {
        await this.click(this.myInfoMenu);
    }

    // =================================
    // User Profile Methods
    // =================================

    async openProfileMenu(): Promise<void> {
        await this.click(
            this.profileDropdown
        );
    }

    async logout(): Promise<void> {

        await this.openProfileMenu();

        await this.click(
            this.logoutLink
        );
    }

    // =================================
    // Widget Validation Methods
    // =================================

    async verifyQuickLaunchVisible(): Promise<void> {

        await this.verifyVisible(
            this.quickLaunchWidget
        );
    }

    async verifyMyActionsVisible(): Promise<void> {

        await this.verifyVisible(
            this.myActionsWidget
        );
    }

    async verifyEmployeesOnLeaveVisible(): Promise<void> {

        await this.verifyVisible(
            this.employeesOnLeaveWidget
        );
    }

    async verifyBuzzLatestPostsVisible(): Promise<void> {

        await this.verifyVisible(
            this.buzzLatestPostsWidget
        );
    }

    // =================================
    // Business Flow
    // =================================

    async verifyCompleteDashboard(): Promise<void> {

        await this.verifyDashboardLoaded();

        await this.verifyDashboardWidgets();

        await this.verifyMenuOptionsVisible();
    }
}