import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Inventory', () => {
    beforeEach(async () => {
        await loginPage.resetState();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.waitReady();
    });

    it('adds two items and shows badge = 2', async () => {
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await inventoryPage.addToCartByName('Sauce Labs Bike Light');
        await expect(inventoryPage.cartBadge).toHaveText('2');
    });

    it('sorts by price low->high', async () => {
        await inventoryPage.sortBy('Price (low to high)');
        await expect(inventoryPage.title).toHaveText('Products');
    });
});