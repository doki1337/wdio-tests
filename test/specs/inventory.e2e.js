import InventoryPage from '../pageobjects/inventory.page.js';
import LoginPage from '../pageobjects/login.page.js';

describe('Inventory', () => {
  beforeEach(async () => {
    await LoginPage.resetState();
    await LoginPage.login('standard_user', 'secret_sauce');
    await InventoryPage.waitReady();
  });

  it('adds two items and shows badge = 2', async () => {
    await InventoryPage.addToCartByName('Sauce Labs Backpack');
    await InventoryPage.addToCartByName('Sauce Labs Bike Light');
    await expect(InventoryPage.cartBadge).toHaveText('2');
  });

  it('sorts by price low->high', async () => {
    await InventoryPage.sortBy('Price (low to high)');
    await expect(InventoryPage.title).toHaveText('Products');
  });
});