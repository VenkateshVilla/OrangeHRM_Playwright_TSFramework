//TypeScript
// src/utils/CommonActions.ts

import {
Locator,
Page,
expect
} from '@playwright/test';

export class CommonActions {

readonly page: Page;

constructor(page: Page) {
this.page = page;
}

// ==========================================
// Click Actions
// ==========================================

async click(
locator: Locator
): Promise<void> {

await locator.waitFor({
state: 'visible'
});

await locator.click();
}

async doubleClick(
locator: Locator
): Promise<void> {

await locator.dblclick();
}

async rightClick(
locator: Locator
): Promise<void> {

await locator.click({
button: 'right'
});
}
 
async forceClick(
locator: Locator
): Promise<void> {
 
await locator.click({
force: true
});
}
 
// ==========================================
// Textbox Actions
// ==========================================
 
async fillText(
locator: Locator,
value: string
): Promise<void> {
 
await locator.clear();
 
await locator.fill(value);
}
 
async appendText(
locator: Locator,
value: string
): Promise<void> {
 
await locator.pressSequentially(
value
);
}
 
async clearText(
locator: Locator
): Promise<void> {
 
await locator.clear();
}
 
async pressKey(
locator: Locator,
key: string
): Promise<void> {
 
await locator.press(key);
}
 
// ==========================================
// Dropdown Actions
// ==========================================
 
async selectDropdownOption(
dropdown: Locator,
optionText: string
): Promise<void> {
 
await dropdown.click();
 
await this.page.locator(
`//span[text()='${optionText}']`
).click();
}
 
async selectValueByLabel(
locator: Locator,
label: string
): Promise<void> {
 
await locator.selectOption({
label
});
}
 
async selectValueByValue(
locator: Locator,
value: string
): Promise<void> {
 
await locator.selectOption({
value
});
}
 
// ==========================================
// Mouse Actions
// ==========================================
 
async hover(
locator: Locator
): Promise<void> {
 
await locator.hover();
}
 
async dragAndDrop(
source: Locator,
destination: Locator
): Promise<void> {
 
await source.dragTo(destination);
}
 
// ==========================================
// Wait Actions
// ==========================================
 
async waitForElementVisible(
locator: Locator
): Promise<void> {
 
await locator.waitFor({
state: 'visible'
});
}
 
async waitForElementHidden(
locator: Locator
): Promise<void> {
 
await locator.waitFor({
state: 'hidden'
});
}
 
async waitForPageLoad(): Promise<void> {
 
await this.page.waitForLoadState(
'networkidle'
);
}
 
async hardWait(
seconds: number
): Promise<void> {
 
await this.page.waitForTimeout(
seconds * 1000
);
}
 
// ==========================================
// Assertions
// ==========================================
 
async verifyVisible(
locator: Locator
): Promise<void> {
 
await expect(locator)
.toBeVisible();
}
 
async verifyEnabled(
locator: Locator
): Promise<void> {
 
await expect(locator)
.toBeEnabled();
}
 
async verifyDisabled(
locator: Locator
): Promise<void> {
 
await expect(locator)
.toBeDisabled();
}
 
async verifyText(
locator: Locator,
expectedText: string
): Promise<void> {
 
await expect(locator)
.toContainText(expectedText);
}
 
async verifyExactText(
locator: Locator,
expectedText: string
): Promise<void> {
 
await expect(locator)
.toHaveText(expectedText);
}
 
// ==========================================
// Element Information
// ==========================================
 
async getText(
locator: Locator
): Promise<string> {
 
return (
await locator.textContent()
) || '';
}
 
async getInputValue(
locator: Locator
): Promise<string> {
 
return await locator.inputValue();
}
 
async getAttributeValue(
locator: Locator,
attribute: string
): Promise<string | null> {
 
return await locator.getAttribute(
attribute
);
}
 
// ==========================================
// Checkbox Actions
// ==========================================
 
async check(
locator: Locator
): Promise<void> {
 
await locator.check();
}
 
async uncheck(
locator: Locator
): Promise<void> {
 
await locator.uncheck();
}
 
async isChecked(
locator: Locator
): Promise<boolean> {
 
return await locator.isChecked();
}
 
// ==========================================
// Screenshot Utility
// ==========================================
 
async takeScreenshot(
name: string
): Promise<void> {
 
await this.page.screenshot({
path: `screenshots/${name}.png`,
fullPage: true
});
}
 
// ==========================================
// File Upload
// ==========================================
 
async uploadFile(
locator: Locator,
filePath: string
): Promise<void> {
 
await locator.setInputFiles(
filePath
);
}
 
// ==========================================
// Window Handling
// ==========================================
 
async openNewTab(
url: string
): Promise<Page> {
 
const newPage =
await this.page.context().newPage();
 
await newPage.goto(url);
 
return newPage;
}
 
// ==========================================
// Generic Search Utility
// ==========================================

async search(
locator: Locator,
value: string
): Promise<void> {
 
await this.fillText(
locator,
value
);
 
await locator.press('Enter');
}
 
// ==========================================
// Toast Message Validation
// ==========================================
 
async verifyToastMessage(
message: string
): Promise<void> {
 
const toast = this.page.locator(
'.oxd-toast-content'
);
 
await expect(toast)
.toContainText(message);
}
}