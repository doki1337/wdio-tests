import { $ } from "@wdio/globals";

class CheckoutPage {
    get firstName() { return $('#first-name'); }
    get lastName() { return $('#last-name'); }
    get postalCode() { return $('#postal-code'); }
    get continueBtn() { return $('#continue'); }
    get finishBtn() { return $('#finish'); }
    get complete() { return $('.complete-text'); }
    get backToProductsBtn() { return $('#back-to-products'); }

    async fillInfo(first, last, postal) {
        await this.firstName.waitForDisplayed({ timeout: 10000 });
        await this.firstName.setValue(first);

        await this.lastName.waitForDisplayed({ timeout: 10000 });
        await this.lastName.setValue(last);

        await this.postalCode.waitForDisplayed({ timeout: 10000 });
        await this.postalCode.setValue(postal);

        await this.continueBtn.click();
    }
    async clickFinish() {
        await this.finishBtn.waitForClickable({ timeout: 5000 });
        await this.finishBtn.click();
    }

    async clickBackHome() {
        await this.backToProductsBtn.waitForClickable({ timeout: 5000 });
        await this.backToProductsBtn.click();
    }

    async isOrderComplete() {
        return await this.complete.isDisplayed();
    }
}

export default new CheckoutPage();