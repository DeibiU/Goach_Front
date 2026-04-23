import { WebDriver } from 'selenium-webdriver';
import { fillById, clickByText, isVisibleById, isVisibleByText } from '../utils/browser';

export class LoginPage {
    private driver: WebDriver;

    private readonly emailInput = 'email';
    private readonly passwordInput = 'password';
    private readonly loginButtonText = 'Continue';

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async isFormLoaded(): Promise<boolean> {
        const emailVisible = await isVisibleById(this.driver, this.emailInput);
        const passVisible = await isVisibleById(this.driver, this.passwordInput);
        const buttonVisible = await isVisibleByText(this.driver, this.loginButtonText);
        return emailVisible && passVisible && buttonVisible;
    }

    async login(email: string, pass: string): Promise<void> {
        if (email) await fillById(this.driver, this.emailInput, email);
        if (pass) await fillById(this.driver, this.passwordInput, pass);
        await clickByText(this.driver, this.loginButtonText);
    }
}