import { WebDriver } from 'selenium-webdriver';
import { fillById, clickByText, isVisibleById, isButtonDisabled } from '../utils/browser';

export class RegisterPage {
    private driver: WebDriver;

    private readonly nameInput = 'name';
    private readonly emailInput = 'email';
    private readonly passwordInput = 'password';
    private readonly applyButtonText = 'Apply';

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async isFormVisible(): Promise<boolean> {
        return (
        (await isVisibleById(this.driver, this.nameInput)) &&
        (await isVisibleById(this.driver, this.emailInput)) &&
        (await isVisibleById(this.driver, this.passwordInput))
        );
    }

    async isSubmitDisabled(): Promise<boolean> {
        return await isButtonDisabled(this.driver, this.applyButtonText);
    }

    async fillForm(name: string, email: string, pass: string): Promise<void> {
        if (name) await fillById(this.driver, this.nameInput, name);
        if (email) await fillById(this.driver, this.emailInput, email);
        if (pass) await fillById(this.driver, this.passwordInput, pass);
    }

    async submit(): Promise<void> {
        await clickByText(this.driver, this.applyButtonText);
    }
}