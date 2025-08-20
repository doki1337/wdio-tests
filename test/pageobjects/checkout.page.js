class CheckoutPage {
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueBtn() { return $('#continue'); }
    get finishBtn() { return $('#finish'); }
    get backHomeBtn() { return $('#back-to-products'); }
    get summaryInfo() { return $('div.summary_info'); }
    get completeHeader() { return $('h2.complete-header'); }
    get inventoryList() { return $('.inventory_list'); }

    async isDisplayed() {
        return await $('.checkout_info').isDisplayed();
    }

    async waitForFirstNameInput() {
        await this.firstNameInput.waitForDisplayed({ timeout: 5000 });
    }
    async waitForLastNameInput() {
        await this.lastNameInput.waitForDisplayed({ timeout: 5000 });
    }
    async waitForPostalCodeInput() {
        await this.postalCodeInput.waitForDisplayed({ timeout: 5000 });
    }

    async setFirstName(name) {
        await this.waitForFirstNameInput();
        await this.firstNameInput.setValue(name);
    }
    async setLastName(name) {
        await this.waitForLastNameInput();
        await this.lastNameInput.setValue(name);
    }
    async setPostalCode(code) {
        await this.waitForPostalCodeInput();
        await this.postalCodeInput.setValue(code);
    }

    async getFirstNameValue() {
        return await this.firstNameInput.getValue();
    }
    async getLastNameValue() {
        return await this.lastNameInput.getValue();
    }
    async getPostalCodeValue() {
        return await this.postalCodeInput.getValue();
    }

    async clickContinue() {
        await this.continueBtn.waitForClickable({ timeout: 5000 });
        await this.continueBtn.click();
    }
    async clickFinish() {
        await this.finishBtn.waitForClickable({ timeout: 5000 });
        await this.finishBtn.click();
    }
    async clickBackHome() {
        await this.backHomeBtn.waitForClickable({ timeout: 5000 });
        await this.backHomeBtn.click();
    }

    async isSummaryDisplayed() {
        return await this.summaryInfo.isDisplayed();
    }
    async isCompleteHeaderDisplayed() {
        return await this.completeHeader.isDisplayed();
    }
    async isInventoryListDisplayed() {
        await this.inventoryList.waitForDisplayed({ timeout: 5000 });
        const visible = await this.inventoryList.isDisplayed();
        console.log('Inventory list is displayed', visible);
        return visible;
    }
}

export default new CheckoutPage();