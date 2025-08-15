class OverviewPage {
    get finishBtn() { return $('#finish'); }
    async clickFinish() {
        await this.finishBtn.waitForClickable({ timeout: 5000 });
        await this.finishBtn.click();
    }
}
export default new OverviewPage();