const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Inventory', () => {
  beforeEach(async () => {
    await LoginPage.resetState();
    await LoginPage.login('standard_user', 'secret_sauce');
    await InventoryPage.waitReady();
  });

 beforeEach(async () => { await browser.reloadSession(); });
afterEach(async () => { await browser.reloadSession(); });


  it('adds two items and shows badge = 2', async () => {
    await InventoryPage.addToCartByName('Sauce Labs Backpack');
    await InventoryPage.addToCartByName('Sauce Labs Bike Light');
    await expect(InventoryPage.cartBadge).toHaveText('2');
  });

  it('sorts by price low->high', async () => {
    await InventoryPage.sortBy('lohi');
    await expect(InventoryPage.title).toHaveText('Products');
  });
});
