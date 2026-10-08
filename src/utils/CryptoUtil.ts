// src/utils/CryptoUtil.ts

import CryptoJS from 'crypto-js';

export class CryptoUtil {

    static encrypt(
        value: string,
        secretKey: string
    ): string {

        return CryptoJS.AES.encrypt(
            value,
            secretKey
        ).toString();
    }

    static decrypt(
        encryptedValue: string,
        secretKey: string
    ): string {

        const bytes = CryptoJS.AES.decrypt(
            encryptedValue,
            secretKey
        );

        return bytes.toString(
            CryptoJS.enc.Utf8
        );
    }
}