import { browser } from "@wdio/globals";

class OverviewPage {
    get finishBtn() { return $('#finish'); }

    get overviewTitle() { return $('.summary_info'); }

    get productNames() { return $$('.inventory_item_name'); }

    async isDisplayed () {
        return await this.overviewTitle.isDisplayed();
    }

    async getProductNames() {
        const elements = await $$('.inventory_item_name');
        if (!Array.isArray(elements)) throw new Error('$$ did not return an array');
        return Promise.all(elements.map(el => el.getText()));
    }

    async clickFinish() {
        await this.finishBtn.waitForClickable({ timeout: 5000 });
        await this.finishBtn.click();
    }

    async waitForOverview() {
        await this.overviewTitle.waitForDisplayed({ timeout: 15000 });
    }
}
export default new OverviewPage();