const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');

describe('Cart', () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
    await InventoryPage.addToCartByName('Sauce Labs Backpack');
    await InventoryPage.addToCartByName('Sauce Labs Bike Light');
    await InventoryPage.openCart();
  });

  beforeEach(async () => { await browser.reloadSession(); });
afterEach(async () => { await browser.reloadSession(); });


  it('removes item from cart', async () => {
    await CartPage.removeByName('Sauce Labs Backpack');
    await browser.url('/inventory.html');
    await expect(InventoryPage.cartBadge).toHaveText('1');
  });
});


