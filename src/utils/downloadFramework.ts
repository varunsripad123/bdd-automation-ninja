
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Function to download the BDD framework as a proper zip file
export const downloadFramework = async (email: string): Promise<void> => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Fetch the package.json file
    const packageResponse = await fetch('/bdd-framework-package.json');
    const packageJson = await packageResponse.text();
    
    // Add package.json to the root
    zip.file('package.json', packageJson);
    
    // Create README.md
    const readme = `# BDD Automation Ninja Framework

## Quick Start
1. Install Node.js (version 14 or higher)
2. Run \`npm install\` to install all dependencies
3. Create your feature files in the \`features\` directory
4. Create step definitions in the \`step_definitions\` directory
5. Run tests with \`npm test\`

## Documentation
For detailed documentation, visit: https://example.com/docs

## Support
If you need help, please contact: support@bdd-automation-ninja.com
`;
    zip.file('README.md', readme);
    
    // Create directory structure
    const dirStructure = [
      'features',
      'features/authentication',
      'features/user_management',
      'features/admin',
      'step_definitions',
      'support',
      'support/page_objects',
      'support/config',
      'reports',
      'reports/html_report'
    ];
    
    dirStructure.forEach(dir => {
      zip.folder(dir);
    });
    
    // Add example feature files
    const loginFeature = `Feature: User Login
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
`;
    zip.file('features/authentication/login.feature', loginFeature);

    const registrationFeature = `Feature: User Registration
  As a visitor
  I want to register for an account
  So that I can access the features of the application

  Background:
    Given the application is running
    And I am on the registration page

  Scenario: Successful registration with valid information
    When I enter "John" as first name
    And I enter "Doe" as last name
    And I enter "john.doe@example.com" as email
    And I enter "SecureP@ss123" as password
    And I enter "SecureP@ss123" as password confirmation
    And I accept the terms and conditions
    And I click the register button
    Then I should see a confirmation message
    And I should receive a verification email

  Scenario: Failed registration with existing email
    When I enter "Jane" as first name
    And I enter "Smith" as last name
    And I enter "existing@example.com" as email
    And I enter "SecureP@ss123" as password
    And I enter "SecureP@ss123" as password confirmation
    And I accept the terms and conditions
    And I click the register button
    Then I should see an error message "Email already in use"
    And I should remain on the registration page
`;
    zip.file('features/authentication/registration.feature', registrationFeature);

    // Add example step definitions
    const authSteps = `const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const LoginPage = require('../support/page_objects/login_page');
const RegistrationPage = require('../support/page_objects/registration_page');
const DashboardPage = require('../support/page_objects/dashboard_page');

// Login steps
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

Then('I should see an error message {string}', async function(errorMessage) {
  const actualError = await this.loginPage.getErrorMessage();
  expect(actualError).to.equal(errorMessage);
});

Then('I should remain on the login page', async function() {
  const currentUrl = await this.driver.getCurrentUrl();
  expect(currentUrl).to.include('/login');
});

// Registration steps
Given('I am on the registration page', async function() {
  await this.driver.get(this.baseUrl + '/register');
  this.registrationPage = new RegistrationPage(this.driver);
  await this.registrationPage.waitForPageLoad();
});

When('I enter {string} as first name', async function(firstName) {
  await this.registrationPage.enterFirstName(firstName);
});

When('I enter {string} as last name', async function(lastName) {
  await this.registrationPage.enterLastName(lastName);
});

When('I enter {string} as password confirmation', async function(password) {
  await this.registrationPage.enterPasswordConfirmation(password);
});

When('I accept the terms and conditions', async function() {
  await this.registrationPage.acceptTerms();
});

When('I click the register button', async function() {
  await this.registrationPage.clickRegisterButton();
});

Then('I should see a confirmation message', async function() {
  const message = await this.registrationPage.getConfirmationMessage();
  expect(message).to.include('Registration successful');
});

Then('I should receive a verification email', async function() {
  // This step would typically be implemented with an email API
  // For demo purposes, we'll just wait a moment and assume it was sent
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Verification email sent to:', this.registrationPage.getEmail());
});
`;
    zip.file('step_definitions/authentication_steps.js', authSteps);

    // Add support files
    const world = `const { setWorldConstructor } = require('@cucumber/cucumber');
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
`;
    zip.file('support/world.js', world);

    const hooks = `const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { logger } = require('./helpers');

BeforeAll(async function() {
  logger.info('Test execution started');
});

Before(async function(scenario) {
  logger.info(\`Starting scenario: \${scenario.pickle.name}\`);
  await this.init();
});

After(async function(scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.driver.takeScreenshot();
    this.attach(screenshot, 'image/png');
  }
  
  await this.cleanup();
  logger.info(\`Scenario \${scenario.pickle.name} finished with status: \${scenario.result.status}\`);
});

AfterAll(async function() {
  logger.info('Test execution completed');
});
`;
    zip.file('support/hooks.js', hooks);

    const helpers = `const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => \`\${info.timestamp} \${info.level}: \${info.message}\`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'test-execution.log' })
  ]
});

// Helper functions
const waitForElement = async (driver, locator, timeout = 10000) => {
  const { until } = require('selenium-webdriver');
  return driver.wait(until.elementLocated(locator), timeout);
};

const takeScreenshot = async (driver, fileName) => {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const screenshot = await driver.takeScreenshot();
    const screenshotPath = path.join(__dirname, '..', 'screenshots');
    
    if (!fs.existsSync(screenshotPath)) {
      fs.mkdirSync(screenshotPath, { recursive: true });
    }
    
    const filePath = path.join(screenshotPath, \`\${fileName}-\${Date.now()}.png\`);
    fs.writeFileSync(filePath, screenshot, 'base64');
    
    logger.info(\`Screenshot saved to: \${filePath}\`);
    return filePath;
  } catch (error) {
    logger.error(\`Failed to take screenshot: \${error.message}\`);
    return null;
  }
};

module.exports = {
  logger,
  waitForElement,
  takeScreenshot
};
`;
    zip.file('support/helpers.js', helpers);

    // Page objects
    const loginPage = `const { By, until } = require('selenium-webdriver');

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
`;
    zip.file('support/page_objects/login_page.js', loginPage);

    const registrationPage = `const { By, until } = require('selenium-webdriver');

class RegistrationPage {
  constructor(driver) {
    this.driver = driver;
    this.firstNameInput = By.id('firstName');
    this.lastNameInput = By.id('lastName');
    this.emailInput = By.id('email');
    this.passwordInput = By.id('password');
    this.passwordConfirmationInput = By.id('passwordConfirmation');
    this.termsCheckbox = By.id('terms');
    this.registerButton = By.id('register-button');
    this.confirmationMessage = By.className('confirmation-message');
    this.errorMessage = By.className('error-message');
    this.currentEmail = '';
  }

  async waitForPageLoad() {
    await this.driver.wait(until.elementLocated(this.firstNameInput), 10000);
  }

  async enterFirstName(firstName) {
    await this.driver.findElement(this.firstNameInput).clear();
    await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
  }

  async enterLastName(lastName) {
    await this.driver.findElement(this.lastNameInput).clear();
    await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
  }

  async enterEmail(email) {
    this.currentEmail = email;
    await this.driver.findElement(this.emailInput).clear();
    await this.driver.findElement(this.emailInput).sendKeys(email);
  }

  async enterPassword(password) {
    await this.driver.findElement(this.passwordInput).clear();
    await this.driver.findElement(this.passwordInput).sendKeys(password);
  }

  async enterPasswordConfirmation(password) {
    await this.driver.findElement(this.passwordConfirmationInput).clear();
    await this.driver.findElement(this.passwordConfirmationInput).sendKeys(password);
  }

  async acceptTerms() {
    const checkbox = await this.driver.findElement(this.termsCheckbox);
    if (!(await checkbox.isSelected())) {
      await checkbox.click();
    }
  }

  async clickRegisterButton() {
    await this.driver.findElement(this.registerButton).click();
  }

  async getConfirmationMessage() {
    await this.driver.wait(until.elementLocated(this.confirmationMessage), 5000);
    return this.driver.findElement(this.confirmationMessage).getText();
  }

  async getErrorMessage() {
    await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
    return this.driver.findElement(this.errorMessage).getText();
  }

  getEmail() {
    return this.currentEmail;
  }
}

module.exports = RegistrationPage;
`;
    zip.file('support/page_objects/registration_page.js', registrationPage);

    const dashboardPage = `const { By, until } = require('selenium-webdriver');

class DashboardPage {
  constructor(driver) {
    this.driver = driver;
    this.welcomeMessage = By.className('welcome-message');
    this.userProfile = By.id('user-profile');
    this.logoutButton = By.id('logout-button');
  }

  async waitForPageLoad() {
    await this.driver.wait(until.elementLocated(this.welcomeMessage), 10000);
  }

  async getWelcomeMessage() {
    return this.driver.findElement(this.welcomeMessage).getText();
  }

  async clickUserProfile() {
    await this.driver.findElement(this.userProfile).click();
  }

  async logout() {
    await this.driver.findElement(this.logoutButton).click();
  }
}

module.exports = DashboardPage;
`;
    zip.file('support/page_objects/dashboard_page.js', dashboardPage);

    // Configuration files
    const envConfig = `require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  browser: process.env.BROWSER || 'chrome',
  headless: process.env.HEADLESS === 'true',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  reportPath: process.env.REPORT_PATH || './reports',
  screenshotPath: process.env.SCREENSHOT_PATH || './screenshots'
};
`;
    zip.file('support/config/environment.js', envConfig);

    const browserConfig = `const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const config = require('./environment');

const getDriver = async (browserName = config.browser) => {
  let driver;
  const options = {};
  
  switch (browserName.toLowerCase()) {
    case 'chrome':
      options.chrome = new chrome.Options();
      if (config.headless) {
        options.chrome.headless();
      }
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options.chrome)
        .build();
      break;
      
    case 'firefox':
      options.firefox = new firefox.Options();
      if (config.headless) {
        options.firefox.headless();
      }
      driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options.firefox)
        .build();
      break;
      
    default:
      throw new Error(\`Browser \${browserName} is not supported\`);
  }
  
  await driver.manage().window().maximize();
  await driver.manage().setTimeouts({ implicit: 10000 });
  
  return driver;
};

module.exports = {
  getDriver
};
`;
    zip.file('support/config/browser.js', browserConfig);

    // HTML Report generator
    const htmlReport = `const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

// Check if the directory exists, create it if it doesn't
const htmlReportDir = path.join(__dirname, '..', 'reports', 'html_report');
if (!fs.existsSync(htmlReportDir)) {
  fs.mkdirSync(htmlReportDir, { recursive: true });
}

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '..', 'reports', 'cucumber_report.json'),
  output: path.join(htmlReportDir, 'cucumber_report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'STAGING',
    Browser: 'Chrome',
    Platform: 'Windows 10',
    Parallel: 'Scenarios',
    Executed: 'Local'
  }
};

reporter.generate(options);
`;
    zip.file('support/generate-html-report.js', htmlReport);

    // Cucumber.js config
    const cucumberConfig = `module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['support/**/*.js', 'step_definitions/**/*.js'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    publishQuiet: true
  }
};
`;
    zip.file('cucumber.js', cucumberConfig);

    // Setup script
    const setupJs = `const fs = require('fs');
const path = require('path');

// Create basic directory structure if it doesn't exist
const directories = [
  'features',
  'features/authentication',
  'features/user_management',
  'features/admin',
  'step_definitions',
  'support',
  'support/page_objects',
  'support/config',
  'reports',
  'screenshots'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(\`Created directory: \${dirPath}\`);
  }
});

// Create .env file if it doesn't exist
const envFilePath = path.join(__dirname, '.env');
if (!fs.existsSync(envFilePath)) {
  const envContent = \`BASE_URL=http://localhost:3000
BROWSER=chrome
HEADLESS=true
DEFAULT_TIMEOUT=30000
REPORT_PATH=./reports
SCREENSHOT_PATH=./screenshots
\`;
  fs.writeFileSync(envFilePath, envContent);
  console.log('Created .env file with default values');
}

// Create .env.example file
const envExamplePath = path.join(__dirname, '.env.example');
const envExampleContent = \`BASE_URL=http://localhost:3000
BROWSER=chrome
HEADLESS=true
DEFAULT_TIMEOUT=30000
REPORT_PATH=./reports
SCREENSHOT_PATH=./screenshots
\`;
fs.writeFileSync(envExamplePath, envExampleContent);
console.log('Created .env.example file');

console.log('Setup complete! You can now start writing your BDD tests.');
`;
    zip.file('setup.js', setupJs);

    // Add .env.example
    const envExample = `BASE_URL=http://localhost:3000
BROWSER=chrome
HEADLESS=true
DEFAULT_TIMEOUT=30000
REPORT_PATH=./reports
SCREENSHOT_PATH=./screenshots
`;
    zip.file('.env.example', envExample);

    // Add .eslintrc.js
    const eslintConfig = `module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  extends: [
    'eslint:recommended',
    'plugin:cucumber/recommended'
  ],
  plugins: [
    'cucumber'
  ],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
`;
    zip.file('.eslintrc.js', eslintConfig);

    // Add .prettierrc
    const prettierConfig = `{
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
`;
    zip.file('.prettierrc', prettierConfig);

    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Save and download the zip file
    saveAs(content, 'bdd-automation-ninja-framework.zip');
    
    // Log download event
    console.log(`Framework downloaded by: ${email} at ${new Date().toISOString()}`);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error downloading framework:', error);
    return Promise.reject(error);
  }
};
