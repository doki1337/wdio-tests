class CartPage {
    get checkoutBtn() { return $('#checkout'); }

    async removeByName(name) {
        const item = await $(`.cart_item:has(.inventory_item_name=${name})`);
        const btn = await item.$('button.cart_button');
        await btn.click();
    }
}

export default new CartPage();