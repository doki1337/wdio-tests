// test/pageobjects/login.page.js
class LoginPage {
  // селекторы
  get username()   { return $('#user-name'); }
  get password()   { return $('#password'); }
  get submit()     { return $('#login-button'); }
  get error()      { return $('[data-test="error"]'); }
  get menu()       { return $('#react-burger-menu-btn'); }
  get logoutLink() { return $('#logout_sidebar_link'); }

  async open() {
    await browser.url('https://www.saucedemo.com/');
  }

  // очистка состояния, чтобы каждый тест начинался «чисто»
  async resetState() {
    await this.open();
    await browser.deleteCookies();
    await browser.execute(() => {
      try { window.localStorage.clear(); } catch(e) {}
      try { window.sessionStorage.clear(); } catch(e) {}
    });
    await this.open(); // перезагрузка после чистки
    await this.submit.waitForDisplayed({ timeout: 7000 });
  }

  // если залогинены – выходим
  async ensureOnLogin() {
    await this.open();
    if (await this.submit.isExisting()) return;

    if (await this.menu.isExisting()) {
      await this.menu.click();
      await this.logoutLink.waitForClickable({ timeout: 7000 });
      await this.logoutLink.click();
    }
    await this.submit.waitForDisplayed({ timeout: 7000 });
  }

// test/pageobjects/login.page.js (внутри класса LoginPage)
async login(user, pass) {
  await this.submit.waitForDisplayed({ timeout: 7000 });

  // универсальный и надёжный ввод с верификацией и фолбэком на JS
  const fill = async (el, value) => {
    await el.waitForDisplayed({ timeout: 7000 });
    await el.click();
    await el.clearValue();
    await el.setValue(String(value));

    // верификация: иногда password остаётся пустым
    let current = await el.getValue();
    if (current !== String(value)) {
      // фолбэк: прямой установкой через JS + события input/change
      await browser.execute((selector, v) => {
        const node = document.querySelector(selector);
        if (!node) return;
        node.value = '';
        node.focus();
        node.value = String(v);

        const fire = (type) =>
          node.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
        fire('input');
        fire('change');
        fire('blur');
      }, await el.selector, value);

      // ещё раз проверим
      current = await el.getValue();
      if (current !== String(value)) {
        throw new Error(`Failed to set value for ${await el.selector}. Expected "${value}", got "${current}"`);
      }
    }
  };

  await fill(this.username, user);
  await fill(this.password, pass);

  // маленькая «склейка»: убеждаемся, что оба поля не пустые
  const [u, p] = await Promise.all([this.username.getValue(), this.password.getValue()]);
  if (!u || !p) throw new Error(`Credentials not ready before submit. user="${u}", passLen=${p?.length ?? 0}`);

  await this.submit.waitForClickable({ timeout: 7000 });
  await this.submit.click();

  // ждём либо переход на inventory, либо показ ошибки
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('inventory') || await this.error.isExisting(),
    { timeout: 8000, timeoutMsg: 'Neither navigated to inventory nor showed error' }
  );
}

  }


module.exports = new LoginPage();
