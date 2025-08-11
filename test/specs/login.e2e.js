const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Login', () => {
  beforeEach(async () => {
    await LoginPage.resetState();
  });

 beforeEach(async () => { await browser.reloadSession(); });
afterEach(async () => { await browser.reloadSession(); });


  it('locked_out_user cannot login', async () => {
    await LoginPage.login('locked_out_user', 'secret_sauce');

    await LoginPage.error.waitForDisplayed({ timeout: 7000 });
    const txt = await LoginPage.error.getText();
    assert.ok(
      txt.includes('Sorry, this user has been locked out'),
      `Unexpected error text: "${txt}"`
    );

    const url = await browser.getUrl();
    assert.ok(!url.includes('inventory'), `Should NOT navigate to inventory, got: ${url}`);
  });
});
