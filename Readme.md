# Straiv | QA Assesment Task

## 📜 About

Stariv assessment task is a small task given to check the manual and automation skill ability of a QA engineer. This repository contains the automated tests for UserLogin and UserRegistration functionality for the website [Automation Exercise](https://www.automationexercise.com/) using **Cypress**.

## Cypress vs Playwright

There are couple of good automation framework which serve our purpose. But here for our example we have choosen cypress to perform our automation tasks. There are couple of reasons as to why cypress was choosen. Inorder to find out why cypress was choosen instead of other frameworks, one can please refer to [Cypress VS Playwright](./automationframework.md) documentation for more information.

## 📟 Recommended Setup

### Prerequisite:

- [VSCode](https://code.visualstudio.com/)
- [Node](https://nodejs.org/en/download/package-manager)

## ⚙ Project Setup

### Setup

- **Clone the Git repository**

  ```bash
  git clone https://github.com/MeghaVernekar23/straiv_assesment_task.git
  ```

- **Navigate to the project directory:**

  ```bash
  cd straiv_assesment_task
  ```

- **Install all necessary packages:**

  ```bash
  npm install
  ```

- **Run the development server:**

  ```bash
  npx cypress open
  ```

### Opening Cypress for the First Time?

Once the dependencies/packages are installed, you can open the Cypress test runner

- **Open cypress runner:**

  ```bash
  npx cypress open
  ```

  This will open the Cypress Test Runner, which allows you to select the browser, configure your testing environment, and run your test files.

- **Choosing Options in Cypress for the First Time:**
  When you run Cypress for the first time, you'll see a welcome screen. Follow these steps:

  - Choose a Testing Type: <br/>

    - Select E2E Testing (End-to-End Testing).<br/>

  - Select a Browser:<br/>
    Cypress supports multiple browsers. For the first run, it’s recommended to use Chrome or Edge, as these browsers have the best compatibility with Cypress. You can choose:<br/>
    - Chrome: Ideal for most use cases. <br/>
    - Electron: <br/>
    - Edge: <br/>

  If you want to run the tests in headless mode (without the browser UI), you can choose this option from the command line:

  ```bash
  npx cypress run --browser chrome
  ```

### Running Your First Test

Once the browser is selected, Cypress will show the list of available test files. Click on a test file (e.g., tests/e2e/userLogin.cy.js) to run it in the selected browser.

Cypress will automatically execute the test and show real-time results in the test runner. You can watch each test step with time travel, which allows you to see exactly what happened at each step.

## Contact

If there are any questions please feel free to contact <br/>
Name: Megha Vernekar <br/>
Email: meghavernekar98@gmail.com
