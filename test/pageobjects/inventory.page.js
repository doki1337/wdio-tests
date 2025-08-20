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

    async addToCartByName(productName) {
        const btn = await $(`button[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, "-")}"]`);
        await btn.waitForExist({ timeout: 10000 });
        await btn.waitForClickable({ timeout: 10000 });
        await btn.click();
    }

    async addRandomProductToCart() {
        const selectors = [
            'button[data-test="add-to-cart-sauce-labs-backpack"]',
            'button[data-test="add-to-cart-sauce-labs-bike-light"]',
            'button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
        ];
        const randomSelector = selectors[Math.floor(Math.random() * selectors.length)];
        const btn = await $(randomSelector);
        await btn.waitForExist({ timeout: 10000 });
        await btn.waitForClickable({ timeout: 10000 });
        await btn.click();
    }


    async isItemVisible(productName) {
        return await $(`div.inventory_item_name=${productName}`).isDisplayed();
    }

    async getCartBadgeCount() {
        if (await this.cartBadge.isExisting()) {
            return parseInt(await this.cartBadge.getText(), 10);
        }
        return 0;
    }

    async openCart() {
        await this.cartLink.waitForDisplayed({ timeout: 5000 });
        await expect(this.cartLink).toBeClickable();
        await this.cartLink.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/cart.html'),
            { timeout: 10000, timeoutMsg: 'Cart page did not open' }
        );
    }

    async waitReady() {
        await browser.waitUntil(
            async () => (await this.title.isDisplayed()),
            { timeout: 10000, timeoutMsg: 'Inventory page not ready' }
        );
    }

    async isDisplayed() {
        return await this.title.isDisplayed();
    }

    async open(path = '') {
        await browser.url(`/inventory.html${path}`);
    }
}

export default new InventoryPage();