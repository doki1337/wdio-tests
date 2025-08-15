class InventoryPage {
    get title() {
        return $('.title');
    }

    get cartLink() {
        return $('.shopping_cart_link');
    }

    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    get sortDropdown() {
        return $('.product_sort_container');
    }

    async sortBy(optionText) {
        await this.sortDropdown.selectByVisibleText(optionText);
    }

    async addToCartByName(name) {
        await this.waitReady();
        await browser.waitUntil(
            async () => (await $$('//div[contains(@class,"inventory_item_name")]')).length > 0,
            { timeout: 10000, timeoutMsg: 'Товары не появились на странице!' }
        );
        const allNames = await $$('//div[contains(@class,"inventory_item_name")]');
        for (const el of allNames) {
            console.log('Товар на странице:', await el.getText());
        }
        const itemName = await $(`//div[contains(@class,"inventory_item_name") and normalize-space(text())="${name}"]`);
        if (!(await itemName.isExisting())) {
            throw new Error(`Товар "${name}" не найден на странице`);
        }
        const item = await $(`//div[contains(@class,"inventory_item_name") and normalize-space(text())="${name}"]/ancestor::div[contains(@class,"inventory_item")]`);
        const btn = await item.$('button');
        const btnText = await btn.getText();
        if (btnText === 'Add to cart') {
            await btn.waitForClickable({ timeout: 10000 });
            await btn.click();
            await browser.saveScreenshot('./after_add_to_cart.png');
            await browser.pause(1000);
        }
    }
    
    async getCartBadgeCount() {
        const badge = await $('.shopping_cart_badge');
        await badge.waitForDisplayed({ timeout: 5000 });
        return parseInt(await badge.getText(), 10);
    }

    async openCart() {
        await this.cartLink.waitForDisplayed({ timeout: 5000});
        await browser.execute(el => el.click(), await this.cartLink);
        await this.cartLink.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/cart.html'),
            { timeout: 5000, timeoutMsg: 'Cart page did not open' }
        );
    }

    async waitReady() {
        await browser.waitUntil(
            async () => (await this.title.isDisplayed()),
            { timeout: 5000, timeoutMsg: 'Inventory page not loaded' }
        );
    }
    async open(path = '') {
        await browser.url(`/inventory.html${path}`);
    }
}

export default new InventoryPage();