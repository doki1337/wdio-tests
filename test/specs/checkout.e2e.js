import { expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';
import completePage from '../pageobjects/complete.page.js';

describe('Checkout flow', () => {
    beforeEach(async () => {
        await loginPage.resetState();
    });

    it('completes order and clears cart', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await inventoryPage.openCart();

        await cartPage.checkoutBtn.waitForClickable({ timeout: 7000 });
        await cartPage.checkoutBtn.click();

        await checkoutPage.fillInfo('John', 'Doe', '12345');
        await checkoutPage.finishBtn.waitForClickable({ timeout: 7000 });
        await checkoutPage.finishBtn.click();

        await checkoutPage.complete.waitForDisplayed({ timeout: 7000 });
        const txt = await checkoutPage.complete.getText();
        expect(txt).toContain('Your order has been dispatched');

        await completePage.clickBackHome();
        const url = await browser.getUrl();
        expect(url).toContain('inventory');

        const badgeExists = await cartPage.cartBadge.isExisting();
        expect(badgeExists).toBe(false);
    });
});