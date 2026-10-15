import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    fullyParallel: true,

    globalSetup: './global-setup.ts',

    reporter: [
        ['html'],
        ['allure-playwright']
    ],

    use: {
        headless: (globalThis as any).process?.env?.CI === 'true',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'retain-on-failure'
    },

    projects: [

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
            
    ]
});