import { WebDriver } from 'selenium-webdriver';
import { createDriver, goTo, clearSession } from '../utils/browser';
import { loadTestData } from '../utils/data-loader';
import { RegisterPage } from '../pages/RegisterPage';

interface RegisterTestData {
  scenario: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  shouldSucceed: boolean;
}

const registerCases = loadTestData<RegisterTestData>('register-data.json');

describe('Register E2E - POM + Data Driven', () => {
  let driver: WebDriver;
  let registerPage: RegisterPage;

  beforeAll(async () => {
    driver = await createDriver();
    registerPage = new RegisterPage(driver);
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  registerCases.forEach((testCase) => {
    test(`[Register] ${testCase.scenario}`, async () => {
      await clearSession(driver);
      await goTo(driver, '/register');
      await driver.sleep(2000);

      expect(await registerPage.isFormVisible()).toBe(true);

      if (!testCase.name && !testCase.email && !testCase.password) {
        const disabled = await registerPage.isSubmitDisabled();
        expect(disabled).toBe(true);
        return;
      }

      await registerPage.fillForm(testCase.name, testCase.email, testCase.password);

      await registerPage.submit();

      await driver.sleep(2000);

      const url = await driver.getCurrentUrl();
      if (testCase.shouldSucceed) {
        expect(url).not.toContain('register');
      } else {
        const isOnRegisterOrLogin = url.includes('register') || url.includes('login');
        expect(isOnRegisterOrLogin).toBe(true);
      }
    });
  });
});
