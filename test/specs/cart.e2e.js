import InventoryPage from '../pageobjects/inventory.page.js';
import LoginPage from '../pageobjects/login.page.js';
import CartPage from '../pageobjects/cart.page.js';
describe('Cart', () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
    await InventoryPage.addToCartByName('Sauce Labs Backpack');
    await InventoryPage.addToCartByName('Sauce Labs Bike Light');
    await InventoryPage.openCart();
  });


  it('removes item from cart', async () => {
    await CartPage.removeByName('Sauce Labs Backpack');
    await browser.url('/inventory.html');
    await expect(InventoryPage.cartBadge).toHaveText('1');
  });
});


