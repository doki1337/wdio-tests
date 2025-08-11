
class CheckoutPage {
  get firstName()  { return $('#first-name'); }
  get lastName()   { return $('#last-name'); }
  get postal()     { return $('#postal-code'); }
  get continueBtn(){ return $('#continue'); }
  get finishBtn()  { return $('#finish'); }
  get complete()   { return $('.complete-header'); }

  async fillInfo(f, l, p) {
    await this.firstName.waitForDisplayed({ timeout: 7000 });
    await this.firstName.setValue(f);
    await this.lastName.setValue(l);
    await this.postal.setValue(p);
    await this.continueBtn.click();
  }
}
module.exports = new CheckoutPage();   