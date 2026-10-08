// src/utils/EnvManager.ts

import dotenv from 'dotenv';
import path from 'path';

const environment =
    process.env.TEST_ENV || 'qa';

dotenv.config({
    path: path.resolve(
        process.cwd(),
        `env/.env.${environment}`
    )
});

export class EnvManager {

    /**
     * Generic Environment Variable Reader
     */
    static get(key: string): string {
        return process.env[key] || '';
    }

    /**
     * Base URL
     */
    static getBaseUrl(): string {
        return this.get('BASE_URL');
    }

    /**
     * Username
     */
    static getUsername(): string {
        return this.get('USERNAME_ENC');
    }

    /**
     * Password
     */
    static getPassword(): string {
        return this.get('PASSWORD');
    }

    /**
     * Browser
     */
    static getBrowser(): string {
        return this.get('BROWSER');
    }

    /**
     * Headless Mode
     */
    static isHeadless(): boolean {
        return this.get('HEADLESS') === 'true';
    }

    /**
     * Current Environment
     */
    static getEnvironment(): string {
        return this.get('ENV');
    }
}