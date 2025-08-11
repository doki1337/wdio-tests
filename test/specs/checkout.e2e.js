// test/specs/checkout.e2e.js
import assert from 'assert';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';

describe('Checkout flow', () => {
  beforeEach(async () => {
    await LoginPage.resetState();          
  });

  it('completes order', async () => {
    await LoginPage.login('standard_user', 'secret_sauce');

    await InventoryPage.addToCartByName('Sauce Labs Backpack');
    await InventoryPage.openCart();

    await CartPage.checkoutBtn.waitForClickable({ timeout: 7000 });
    await CartPage.checkoutBtn.click();

    await CheckoutPage.fillInfo('John', 'Doe', '12345');

    await CheckoutPage.finishBtn.waitForClickable({ timeout: 7000 });
    await CheckoutPage.finishBtn.click();

    await CheckoutPage.complete.waitForDisplayed({ timeout: 1000 });
    const txt = await CheckoutPage.complete.getText();
    assert.ok(txt.includes('Thank you'), `Expected "Thank you", got: "${txt}"`);

   
await $('#back-to-products').click();                 
const url = await browser.getUrl();
assert.ok(url.includes('inventory'), `Wrong URL: ${url}`);


const badgeExists = await (await $('.shopping_cart_badge')).isExisting();
assert.strictEqual(badgeExists, false, 'Cart badge should be absent after checkout');

  });
});
