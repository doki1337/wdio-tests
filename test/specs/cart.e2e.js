import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

const products = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
];

function getRandomProduct() {
    return products[Math.floor(Math.random() * products.length)];
}

describe('Cart Page', () => {
    let selectedProduct;

    beforeEach(async () => {
        selectedProduct = getRandomProduct();

        await browser.reloadSession();
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.waitReady();
        
        await inventoryPage.openCart();
        await cartPage.waitForCartToLoaded();
        await cartPage.clearCart();

        await inventoryPage.open();

        await inventoryPage.addToCartByName(selectedProduct);
        await inventoryPage.openCart();
    });

    it('should display only the randomly added product in cart', async () => {
        expect(await cartPage.isItemInCart(selectedProduct)).toBe(true);
        const cartProductName = await cartPage.getFirstProductName();
        expect(cartProductName).toBe(selectedProduct);
    });
});