class CheckoutPage {
    get firstName() { return $('#first-name'); }
    get lastName()  { return $('#last-name'); }
    get postalCode(){ return $('#postal-code'); }
    get continueBtn(){ return $('#continue'); }
    get finishBtn() { return $('#finish'); }
}

export default new CheckoutPage();