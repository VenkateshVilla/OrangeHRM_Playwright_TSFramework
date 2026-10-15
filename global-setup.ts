import { rmSync } from 'fs';
import { resolve } from 'path';

async function globalSetup() {
    rmSync(resolve('allure-results'), { recursive: true, force: true });
}

export default globalSetup;
