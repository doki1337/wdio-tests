class CompletePage {
    get backToProductsBtn() { return $('#back-to-products'); }
    async clickBackHome() {
        await this.backToProductsBtn.waitForClickable({ timeout: 5000 });
        await this.backToProductsBtn.click();
    }
}
export default new CompletePage();