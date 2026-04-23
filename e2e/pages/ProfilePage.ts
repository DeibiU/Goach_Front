import { WebDriver } from 'selenium-webdriver';
import { fillById, clickByText, isVisibleById, getTextByXPath } from '../utils/browser';

export class ProfilePage {
    private driver: WebDriver;

    private readonly bodyText = '//body';
    private readonly newRoutineButtonText = 'New Routine';

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async getRoleName(): Promise<string> {
        return await getTextByXPath(this.driver, this.bodyText);
    }

    async isDataVisible(): Promise<boolean> {
        return (
        (await isVisibleById(this.driver, this.newRoutineButtonText))
        );
    }
}