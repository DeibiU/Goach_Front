import { WebDriver } from 'selenium-webdriver';
import { createDriver, goTo, clearSession } from '../utils/browser';
import { loadTestData } from '../utils/data-loader';
import { LoginPage } from '../pages/LoginPage';

interface LoginTestData {
  scenario: string;
  email: string;
  password: string;
  expectedRole: string | null;
  shouldSucceed: boolean;
}

const loginCases = loadTestData<LoginTestData>('login-data.json');

describe('Login E2E - POM + Data Driven', () => {
  let driver: WebDriver;
  let loginPage: LoginPage;

  beforeAll(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver); // Inicializamos la página
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  loginCases.forEach((testCase) => {
    test(`[Login] ${testCase.scenario}`, async () => {
      // 1. Preparación
      await clearSession(driver);
      await goTo(driver, '/login');
      await driver.sleep(2000);
     
      const isReady = await loginPage.isFormLoaded();
      expect(isReady).toBe(true);
  
      await loginPage.login(testCase.email, testCase.password);

      await driver.sleep(3000);
      const currentUrl = await driver.getCurrentUrl();
      
      if (testCase.shouldSucceed) {
        expect(currentUrl).toContain('profile');
      } else {
        expect(currentUrl).toContain('login') ;
      }
    });
  });
});