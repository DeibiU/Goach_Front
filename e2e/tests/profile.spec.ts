import { WebDriver } from 'selenium-webdriver';
import {
  createDriver, goTo, fillById, clickByText,
  isVisibleByText, getTextByXPath, clearSession,
} from '../utils/browser';
import { loadTestData } from '../utils/data-loader';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

interface ProfileTestData {
  scenario: string;
  email: string;
  password: string;
  expectedRole: string;
  canCreateRoutine: boolean;
}

const profileCases = loadTestData<ProfileTestData>('profile-data.json');

describe('Profile E2E - Data Driven', () => {
  let driver: WebDriver;
  let loginPage: LoginPage;
  let profilePage: ProfilePage;

  beforeAll(async () => {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
    profilePage = new ProfilePage(driver);
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  profileCases.forEach((testCase) => {
    test(`[Profile] ${testCase.scenario}`, async () => {
        await clearSession(driver);
        await goTo(driver, '/login');
        await driver.sleep(2000);
        await loginPage.login(testCase.email, testCase.password);
        await driver.sleep(3000);

      const url = await driver.getCurrentUrl();
      expect(url).toContain('profile');


      const roleInPage = await profilePage.getRoleName();
      expect(roleInPage).toContain(testCase.expectedRole);


      const newRoutineVisible = await isVisibleByText(driver, 'New Routine');
      expect(newRoutineVisible).toBe(testCase.canCreateRoutine)
      /*if (testCase.canCreateRoutine) {
        expect(newRoutineVisible).toBe(true);
      } else {
        expect(newRoutineVisible).toBe(false);
      }*/
    });
  });
});
