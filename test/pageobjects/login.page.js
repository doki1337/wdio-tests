import Page from './page.js';

class LoginPage extends Page {
    get username()   { return $('#user-name'); }
    get password()   { return $('#password'); }
    get loginBtn()   { return $('#login-button'); }
    get errorMsg() { return $('.error-message-container.error'); }

    async login(user, pass) {
        await this.username.clearValue();
        await this.username.setValue(user);
        await this.password.clearValue();
        await this.password.setValue(pass);
        await this.loginBtn.click();
    }

    async resetState() {
        await browser.reloadSession();
        await this.open('');
    }
}

export default new LoginPage();