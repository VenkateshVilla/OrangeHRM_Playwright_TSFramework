// src/utils/EnvManager.ts

import * as dotenv from 'dotenv';
import { CryptoUtil } from './CryptoUtil';

dotenv.config();

export class EnvManager {

    static getBaseUrl(): string {
        return process.env.BASE_URL || '';
    }

    static getUsername(): string {
        console.log('Encrypted Username:', "Admin");
        //console.log('Decrypted Username:', CryptoUtil.decrypt(process.env.USERNAME || ''));
        console.log('Decrypted Username:', CryptoUtil.decrypt('Admin'));
        return CryptoUtil.decrypt(
            process.env.USERNAME || ''
        );
    }

    static getPassword(): string {
        console.log('Encrypted Password:', process.env.PASSWORD);
        console.log('Decrypted Password:', CryptoUtil.decrypt(process.env.PASSWORD || ''));
        return CryptoUtil.decrypt(
            process.env.PASSWORD || ''
        );
    }

    static getEnv(
        key: string
    ): string {
        return process.env[key] || '';
    }
}