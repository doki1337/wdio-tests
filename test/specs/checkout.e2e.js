import { faker } from '@faker-js/faker';
import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';

function getRandomProduct() {
    const products = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
    ];
    const idx = Math.floor(Math.random() * products.length);
    return products[idx];
}

let selectedProduct;

async function resetCartAndAddProduct() {
    selectedProduct = getRandomProduct();

    await inventoryPage.openCart();
    await cartPage.waitForCartToLoaded();
    await cartPage.clearCart();

    await inventoryPage.open();
    await inventoryPage.addToCartByName(selectedProduct);
}
describe('Checkout flow', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();

    beforeEach(async () => {
        await browser.reloadSession();
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.waitReady();
        await resetCartAndAddProduct();
        await inventoryPage.openCart();
        await cartPage.clickCheckout(); 
    });
    
    it('should display checkout page', async() => {
            expect(await checkoutPage.isDisplayed()).toBe(true);
    });

    it('should fill first name', async () => {
        await checkoutPage.waitForFirstNameInput();
        expect(await checkoutPage.firstNameInput).toBeDisplayed();
        await checkoutPage.setFirstName(firstName);
        expect(await checkoutPage.getFirstNameValue()).toBe(firstName);
    });

    it('should fill last name', async () => {
        await checkoutPage.waitForLastNameInput();
        expect(await checkoutPage.lastNameInput).toBeDisplayed();
        await checkoutPage.setLastName(lastName);
        expect(await checkoutPage.getLastNameValue()).toBe(lastName);
    });

    it('should fill postal code', async () => {
        await checkoutPage.waitForPostalCodeInput();
        expect(await checkoutPage.postalCodeInput).toBeDisplayed();
        await checkoutPage.setPostalCode(postalCode);
        expect(await checkoutPage.getPostalCodeValue()).toBe(postalCode);
    });

    it('should continue to overview', async () => {
        await checkoutPage.waitForFirstNameInput();
        expect(await checkoutPage.firstNameInput).toBeDisplayed();
        await checkoutPage.setFirstName(firstName);
        await checkoutPage.setLastName(lastName);
        await checkoutPage.setPostalCode(postalCode);
        await checkoutPage.clickContinue();
        expect(await checkoutPage.isSummaryDisplayed()).toBe(true);
    });

    it('should finish order', async () => {
        await checkoutPage.setFirstName(firstName);
        await checkoutPage.setLastName(lastName);
        await checkoutPage.setPostalCode(postalCode);
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        expect(await checkoutPage.isCompleteHeaderDisplayed()).toBe(true);
    });

    it('should go back home', async () => {
        await checkoutPage.setFirstName(firstName);
        await checkoutPage.setLastName(lastName);
        await checkoutPage.setPostalCode(postalCode);
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        await browser.saveScreenshot('./debug_checkout.png');
        await checkoutPage.clickBackHome();
        expect(await checkoutPage.isInventoryListDisplayed()).toEqual(true);

        const randomProduct = await inventoryPage.addRandomProductToCart();
        console.log('Added product to cart:', randomProduct);

        await inventoryPage.openCart();
    });
});