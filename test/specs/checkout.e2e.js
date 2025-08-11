// test/specs/checkout.e2e.js
const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');

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
