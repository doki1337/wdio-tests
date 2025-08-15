class CartPage {
    get checkoutBtn() {
        return $('#checkout');
    }
    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    async clickCheckout() {
        const btn = await $('#checkout');
        await btn.waitForClickable({timeout: 5000});
        await btn.click();
    }

    async open(path = '') {
        await browser.url(path || '/cart.html');
    }
    
    async isItemInCart(name) {
    await browser.waitUntil(async () => {
        const items = await $$(`//div[contains(@class,"cart_item")]//div[contains(@class,"inventory_item_name") and normalize-space(text())="${name}"]`);
        return items.length > 0;
    }, { timeout: 5000, timeoutMsg: `Item "${name}" not found in cart` });
    const items = await $$(`//div[contains(@class,"cart_item")]//div[contains(@class,"inventory_item_name") and normalize-space(text())="${name}"]`);
    return items.length > 0;
    }
}

const cartPage = new CartPage();
export default cartPage;