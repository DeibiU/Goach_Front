import { Builder, WebDriver, By, until, WebElement } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { ServiceBuilder } from 'selenium-webdriver/chrome';
import * as path from 'path';

const BASE_URL = 'http://localhost:8081';

export async function createDriver(): Promise<WebDriver> {
  const driverPath = path.resolve(__dirname, '../../drivers/chromedriver.exe');
  const service = new ServiceBuilder(driverPath);

  const options = new chrome.Options();
  options.addArguments('--headless=new');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1280,800');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(service)
    .build();

  return driver;
}

export async function clearSession(driver: WebDriver): Promise<void> {
  try {
    await driver.manage().deleteAllCookies();
    await driver.executeScript('localStorage.clear(); sessionStorage.clear();');
  } catch {
  }
}

export async function goTo(driver: WebDriver, routePath: string): Promise<void> {
  await driver.get(`${BASE_URL}${routePath}`);
}

export async function waitForId(
  driver: WebDriver,
  id: string,
  timeoutMs = 15000
): Promise<WebElement> {
  const el = await driver.wait(
    until.elementLocated(By.id(id)),
    timeoutMs,
    `Timeout esperando id="${id}"`
  );
  await driver.wait(until.elementIsVisible(el), timeoutMs);
  return el;
}

export async function waitForText(
  driver: WebDriver,
  text: string,
  timeoutMs = 15000
): Promise<WebElement> {
  const el = await driver.wait(
    until.elementLocated(By.xpath(`//*[contains(text(), '${text}')]`)),
    timeoutMs,
    `Timeout esperando texto="${text}"`
  );
  await driver.wait(until.elementIsVisible(el), timeoutMs);
  return el;
}

export async function fillById(
  driver: WebDriver,
  id: string,
  value: string
): Promise<void> {
  const el = await waitForId(driver, id);
  await el.clear();
  await el.sendKeys(value);
}

export async function clickById(driver: WebDriver, id: string): Promise<void> {
  const el = await waitForId(driver, id);
  await el.click();
}

export async function clickByText(
  driver: WebDriver,
  text: string
): Promise<void> {
  const el = await driver.wait(
    until.elementLocated(By.xpath(`//button[contains(., '${text}')]`)),
    15000,
    `Timeout esperando boton con texto="${text}"`
  );
  await el.click();
}

export async function isVisibleById(
  driver: WebDriver,
  id: string,
  timeoutMs = 5000
): Promise<boolean> {
  try {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeoutMs);
    return await el.isDisplayed();
  } catch {
    return false;
  }
}

export async function isVisibleByText(
  driver: WebDriver,
  text: string,
  timeoutMs = 5000
): Promise<boolean> {
  try {
    const el = await driver.wait(
      until.elementLocated(By.xpath(`//button[contains(., '${text}')]`)),
      timeoutMs
    );
    return await el.isDisplayed();
  } catch {
    return false;
  }
}

export async function getTextById(
  driver: WebDriver,
  id: string
): Promise<string> {
  const el = await waitForId(driver, id);
  return await el.getText();
}

export async function getTextByXPath(
  driver: WebDriver,
  xpath: string,
  timeoutMs = 15000
): Promise<string> {
  const el = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    timeoutMs
  );
  return await el.getText();
}

export async function isButtonDisabled(
  driver: WebDriver,
  text: string
): Promise<boolean> {
  try {
    const el = await driver.wait(
      until.elementLocated(By.xpath(`//button[contains(., '${text}')]`)),
      5000
    );
    const disabled = await el.getAttribute('disabled');
    return disabled !== null;
  } catch {
    return false;
  }
}
