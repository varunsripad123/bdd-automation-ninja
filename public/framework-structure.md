
# BDD Automation Ninja Framework

## Framework Structure

```
bdd-automation-ninja/
├── features/                       # Gherkin feature files
│   ├── authentication/
│   │   ├── login.feature
│   │   └── registration.feature
│   ├── user_management/
│   │   ├── profile.feature
│   │   └── settings.feature
│   └── admin/
│       ├── dashboard.feature
│       └── user_management.feature
│
├── step_definitions/               # Step implementation files
│   ├── authentication_steps.js
│   ├── user_management_steps.js
│   ├── admin_steps.js
│   └── common_steps.js
│
├── support/                        # Support files and utilities
│   ├── hooks.js                    # Before/After hooks
│   ├── world.js                    # Custom World object
│   ├── helpers.js                  # Helper functions
│   ├── page_objects/               # Page Object Models
│   │   ├── login_page.js
│   │   ├── registration_page.js
│   │   └── dashboard_page.js
│   ├── config/                     # Configuration files
│   │   ├── browser.js              # Browser configuration
│   │   └── environment.js          # Environment variables
│   └── generate-html-report.js     # HTML report generator
│
├── reports/                        # Test reports directory
│   ├── cucumber_report.json        # JSON report
│   └── html_report/                # HTML report
│
├── node_modules/                   # Dependencies
├── cucumber.js                     # Cucumber configuration
├── setup.js                        # Setup script
├── .env.example                    # Environment variables example
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── package.json                    # NPM package file
└── README.md                       # Documentation
```

## Main Components

### 1. Feature Files (Gherkin)

Feature files use Gherkin syntax to describe scenarios in plain language. They are stored in the `features/` directory.

Example:

```gherkin
Feature: User Login
  As a registered user
  I want to log in to the application
  So that I can access my account

  Background:
    Given the application is running
    And I am on the login page

  Scenario: Successful login with valid credentials
    When I enter "user@example.com" as email
    And I enter "validPassword123" as password
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message with my name

  Scenario: Failed login with invalid credentials
    When I enter "user@example.com" as email
    And I enter "wrongPassword" as password
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page
```

### 2. Step Definitions

Step definitions implement the steps described in feature files. They are stored in the `step_definitions/` directory.

Example:

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../support/page_objects/login_page');

Given('I am on the login page', async function() {
  await this.driver.get(this.baseUrl + '/login');
  this.loginPage = new LoginPage(this.driver);
  await this.loginPage.waitForPageLoad();
});

When('I enter {string} as email', async function(email) {
  await this.loginPage.enterEmail(email);
});

When('I enter {string} as password', async function(password) {
  await this.loginPage.enterPassword(password);
});

When('I click the login button', async function() {
  await this.loginPage.clickLoginButton();
});

Then('I should be redirected to the dashboard', async function() {
  await this.driver.wait(until.urlContains('/dashboard'), 5000);
  const currentUrl = await this.driver.getCurrentUrl();
  expect(currentUrl).to.include('/dashboard');
});

Then('I should see a welcome message with my name', async function() {
  const dashboardPage = new DashboardPage(this.driver);
  const welcomeMessage = await dashboardPage.getWelcomeMessage();
  expect(welcomeMessage).to.include(this.userData.firstName);
});
```

### 3. Page Objects

Page Objects encapsulate the UI elements and actions for a specific page. They are stored in the `support/page_objects/` directory.

Example:

```javascript
class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.emailInput = By.id('email');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.className('error-message');
  }

  async waitForPageLoad() {
    await this.driver.wait(until.elementLocated(this.emailInput), 10000);
  }

  async enterEmail(email) {
    await this.driver.findElement(this.emailInput).clear();
    await this.driver.findElement(this.emailInput).sendKeys(email);
  }

  async enterPassword(password) {
    await this.driver.findElement(this.passwordInput).clear();
    await this.driver.findElement(this.passwordInput).sendKeys(password);
  }

  async clickLoginButton() {
    await this.driver.findElement(this.loginButton).click();
  }

  async getErrorMessage() {
    await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
    return this.driver.findElement(this.errorMessage).getText();
  }
}

module.exports = LoginPage;
```

### 4. World Object

The World object is a context object that is created for each scenario. It is defined in `support/world.js`.

Example:

```javascript
const { setWorldConstructor } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./config/environment');

class CustomWorld {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com'
    };
  }

  async init() {
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless())
      .build();
    await this.driver.manage().window().maximize();
    await this.driver.manage().setTimeouts({ implicit: 5000 });
  }

  async cleanup() {
    if (this.driver) {
      await this.driver.quit();
    }
  }
}

setWorldConstructor(CustomWorld);
```

### 5. Hooks

Hooks are used to set up and tear down the test environment. They are defined in `support/hooks.js`.

Example:

```javascript
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { logger } = require('./helpers');

BeforeAll(async function() {
  logger.info('Test execution started');
});

Before(async function(scenario) {
  logger.info(`Starting scenario: ${scenario.pickle.name}`);
  await this.init();
});

After(async function(scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.driver.takeScreenshot();
    this.attach(screenshot, 'image/png');
  }
  
  await this.cleanup();
  logger.info(`Scenario ${scenario.pickle.name} finished with status: ${scenario.result.status}`);
});

AfterAll(async function() {
  logger.info('Test execution completed');
});
```

## Running Tests

Run all tests:
```
npm test
```

Run specific feature:
```
npm test -- features/authentication/login.feature
```

Generate reports:
```
npm run report
```

## CI/CD Integration

BDD Automation Ninja is designed to integrate seamlessly with CI/CD pipelines such as Jenkins, GitHub Actions, GitLab CI, and others.

Example GitHub Actions workflow:

```yaml
name: BDD Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Set up Chrome
      uses: browser-actions/setup-chrome@latest
      
    - name: Run tests
      run: npm run test:ci
      
    - name: Generate report
      run: npm run report
      
    - name: Upload report
      uses: actions/upload-artifact@v2
      with:
        name: cucumber-report
        path: reports/html_report
```

---

For more information and detailed documentation, please visit our [official documentation](https://example.com/docs).
