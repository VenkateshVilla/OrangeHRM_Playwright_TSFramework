# OrangeHRM Playwright Framework

A TypeScript end-to-end test framework for OrangeHRM, built with Playwright Test and the Page Object Model (POM).

## Framework Highlights

- Page objects keep page locators and user workflows separate from test cases.
- Shared Playwright fixtures provide typed page objects to tests.
- `BasePage` contains reusable browser actions and assertions.
- Tests run in parallel against the configured Chromium browser project.
- HTML and Allure reporters collect test results.
- Screenshots and videos are retained for failed tests; traces are recorded on retry.

## Project Structure

```text
.
├── src/
│   ├── fixtures/
│   │   └── baseFixture.ts       # Shared page-object fixtures and expect
│   ├── pages/
│   │   ├── AdminPage.ts         # Admin module actions and assertions
│   │   ├── BasePage.ts          # Common page actions and assertions
│   │   ├── DashboardPage.ts     # Dashboard page object
│   │   ├── LoginPage.ts         # Login workflows and validations
│   │   └── PIMPage.ts           # PIM module page object
│   └── utils/
│       ├── CommonActions.ts     # Shared utility actions
│       ├── CryptoUtil.ts        # Base64 encode/decode helpers
│       └── EnvManager.ts        # Environment variable access
├── testdata/
│   └── testdata.json            # Example login and employee data
├── tests/
│   ├── admin.spec.ts            # Admin module tests
│   ├── dashboard.spec.ts        # Dashboard tests
│   ├── login.spec.ts            # Login tests
│   └── pim.spec.ts              # PIM module tests
├── .gitignore
├── package.json
├── playwright.config.ts         # Test, browser, reporter, and artifact settings
├── OrangeHRM_Test_Cases.md      # Module-wise OrangeHRM test case list
└── README.md
```

See [OrangeHRM_Test_Cases.md](OrangeHRM_Test_Cases.md) for the module-by-module test scenarios explored from the OrangeHRM demo site.

## Crpyto util installation
npm install crypto-js
npm install --save-dev @types/crypto-js

## Setup

Install dependencies and the Chromium browser:

```bash
npm install
npx playwright install chromium
```

Create a `.env` file in the project root with the OrangeHRM URL and credentials:

```env
BASE_URL=https://your-orangehrm-instance
USERNAME=<base64-encoded-username>
PASSWORD=<base64-encoded-password>
```

`EnvManager` loads these values with `dotenv`. `CryptoUtil` Base64-decodes the username and password; Base64 is not encryption and should not be relied on to protect credentials. Keep real credentials out of source control and use a secret manager or CI secrets for sensitive values.

## Running Tests

Run the full suite:

```bash
npm test
```

Run one spec file:

```bash
npx playwright test tests/login.spec.ts
```

Each Playwright run clears the previous `allure-results` before tests start, so
the Allure report contains results from that run only.

## GitHub Actions

The `Admin Playwright Tests` workflow runs `tests/admin.spec.ts` on a
GitHub-hosted Windows runner for pushes and pull requests. Configure these
repository secrets before running the workflow:

- `BASE_URL`: URL of the OrangeHRM instance
- `USERNAME_ENC`: Base64-encoded OrangeHRM username
- `PASSWORD`: OrangeHRM password

The workflow runs Chromium headlessly; local runs remain headed by default.
To run the tests only when requested, select `Admin Playwright Tests (Manual)`
from the Actions tab and choose **Run workflow**.

### Open reports from GitHub Actions

After a workflow finishes, open the run in the Actions tab and download the
artifact you need from the run's **Artifacts** section. The artifacts are
retained for 14 days.

- Download and extract `playwright-html-report`, then open
  `playwright-report/index.html` in a browser.
- To regenerate the Allure report locally from a downloaded artifact, extract
  the contents of the `allure-results` artifact into the repository root so it
  replaces any existing `allure-results` folder. Confirm it contains
  `*-result.json` files, then run:

```bash
npm run allure:generate
npm run allure:open
```

- Alternatively, extract the contents of `allure-html-report` into an
  `allure-report` folder in the repository root and run `npm run allure:open`.
  Do not run `allure:generate` after downloading this HTML report; that
  command reads the raw `allure-results` folder, not the generated report.

For a local Playwright run, open the HTML report with:

```bash
npx playwright show-report
```
• Ensure you have cross-env installed as a devDependency (npm i -D cross-env) so the environment variables work across Windows, Mac, and Linux.
• To run your QA tests in the terminal, you will use: npm run test:qa