import { browser, expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';
import overviewPage from '../pageobjects/overview.page.js';
import completePage from '../pageobjects/complete.page.js';

describe('Cart', () => {
    beforeEach(async () => {
        await loginPage.open('');
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.open('');
        await inventoryPage.waitReady();
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await expect(await inventoryPage.getCartBadgeCount()).toBeGreaterThan(0);

        await inventoryPage.addToCartByName('Sauce Labs Bike Light');
        await expect(await inventoryPage.getCartBadgeCount()).toBeGreaterThan(1);

        await inventoryPage.openCart();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/cart.html'),
            { timeout: 5000, timeoutMsg: 'Cart page did not open' }
        );

        expect (await cartPage.isItemInCart('Sauce Labs Backpack')).toBe(true);
        expect (await cartPage.isItemInCart('Sauce Labs Bike Light')).toBe(true);
    });
    
    it('should complete checkout with added items', async() => {
      await cartPage.clickCheckout();
      await browser.waitUntil(
          async () => (await browser.getUrl()).includes('/checkout-step-one.html'),
          { timeout: 5000, timeoutMsg: 'Checkout page did not open' }
      );

      await checkoutPage.fillInfo('John', 'Doe', '12345');
      await browser.waitUntil(
          async () => (await browser.getUrl()).includes('/checkout-step-two.html'),
          { timeout: 5000, timeoutMsg: 'Checkout page did not open' }
      );
      await overviewPage.clickFinish();
      await browser.waitUntil(
          async () => (await browser.getUrl()).includes('/checkout-complete.html'),
          { timeout: 5000, timeoutMsg: 'Complete page did not open' }
      );

      await completePage.clickBackHome();
      await browser.waitUntil(
          async () => (await browser.getUrl()).includes('/inventory.html'),
          { timeout: 5000, timeoutMsg: 'Inventory page did not open' }
      );
    });
});