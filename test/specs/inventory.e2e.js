import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

const products = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
];

describe('Inventory Page', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.waitReady();
    });

    it('should add a random product to cart and see it in cart', async () => {
        await inventoryPage.openCart();
        await cartPage.waitForCartToLoaded();
        await cartPage.clearCart();
        await cartPage.waitForCartToLoaded();
        await cartPage.clickContinueShopping();
        await inventoryPage.waitReady();

        await inventoryPage.addRandomProductToCart();

        await browser.waitUntil(
            async () => (await inventoryPage.getCartBadgeCount()) === 1,
            { timeout: 5000, timeoutMsg: 'Cart badge did not appear' }
        );
        expect(await inventoryPage.getCartBadgeCount()).toBe(1);

        await inventoryPage.openCart();
        const productName = await cartPage.getFirstProductName();
        expect(products).toContain(productName);
    });
});