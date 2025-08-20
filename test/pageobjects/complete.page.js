class CompletePage {
    get backToProductsBtn() { return $('#back-to-products'); }

    get completeHeader() { return $('#complete-header'); }

    async isOrderComplete() {
        await this.completeHeader.waitForDisplayed({ timeout: 10000 });
        return await this.completeHeader.isDisplayed();
    }

    async clickBackHome() {
        await this.backToProductsBtn.waitForClickable({ timeout: 10000 });
        await this.backToProductsBtn.click();
        await browser.pause(1000);
    }

    async waitForComplete() {
        await $('#complete-header').waitForDisplayed({ timeout: 15000 });
    }
}
export default new CompletePage();