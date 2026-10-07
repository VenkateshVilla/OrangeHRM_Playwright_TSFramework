// src/utils/CryptoUtil.ts

export class CryptoUtil {

    static encrypt(value: string): string {
        return Buffer.from(value).toString('base64');
    }

    static decrypt(value: string): string {
        return Buffer.from(value, 'base64').toString('utf-8');
    }

}