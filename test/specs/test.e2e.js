describe('Smoke', () => {
  it('should open saucedemo', async () => {
    await browser.url('https://www.saucedemo.com/');
    await browser.pause(3000);
  });
});
