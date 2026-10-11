import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BuzzPage extends BasePage {
    readonly buzzMenu: Locator;
    readonly buzzHeader: Locator;
    readonly postComposer: Locator;
    readonly postButton: Locator;
    readonly posts: Locator;

    constructor(page: Page) {
        super(page);

        this.buzzMenu = page.locator('a[href*="buzz/viewBuzz"]');
        this.buzzHeader = page.getByRole('heading', { name: 'Buzz' });
        this.postComposer = page.getByPlaceholder("What's on your mind?");
        this.postButton = page.getByRole('button', { name: 'Post', exact: true });
        this.posts = page.locator('.orangehrm-buzz-post');
    }

    async openBuzzPage(): Promise<void> {
        await this.click(this.buzzMenu);
        await expect(this.buzzHeader).toBeVisible();
    }

    async submitPostContent(content: string): Promise<void> {
        await this.fill(this.postComposer, content);
        await this.click(this.postButton);
    }
}
