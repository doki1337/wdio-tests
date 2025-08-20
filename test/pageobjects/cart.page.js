class CartPage {
    get checkoutBtn() {
        return $('#checkout');
    }
    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    get productNames() {
        return $$('.inventory_item_name');
    }

    async getFirstProductName() {
        return await $('.cart_item .inventory_item_name').getText();
    }

    async isItemInCart(productName) {
        const name = await this.getFirstProductName();
        return name === productName;
    }

    async clearCart() {
        let removeButtons = await $$('.cart_item button');
        while (removeButtons.length > 0) {
            await removeButtons[0].click();
            await browser.pause(500);
            removeButtons = await $$('.cart_item button'); 
        }   
    }

    async clickContinueShopping() {
        const btn = await $('[data-test="continue-shopping"]');
        await btn.waitForDisplayed();
        await btn.click();
    }

    async clickCheckout() {
        await this.checkoutBtn.waitForDisplayed();
        await this.checkoutBtn.waitForClickable();
        await this.checkoutBtn.click();
    }

    async open(path = '') {
        await browser.url(path || '/cart.html');
        await $('.cart_list').waitForDisplayed();
    }
    
    async waitForCartToLoaded() {
        await $('.cart_list').waitForDisplayed();
    }
}

const cartPage = new CartPage();
export default cartPage;