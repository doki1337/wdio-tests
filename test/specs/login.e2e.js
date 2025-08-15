import { expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js';

describe('Login', () => {
    beforeEach(async () => {
        await loginPage.resetState();
    });

    it('locked_out_user cannot login', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.errorMsg.waitForDisplayed({ timeout: 7000 });
        const txt = await loginPage.errorMsg.getText();
        expect(txt).toContain('Sorry, this user has been locked out');

        const url = await browser.getUrl();
        expect(url).not.toContain('inventory');
    });
});