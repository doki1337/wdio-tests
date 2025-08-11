class InventoryPage {
    get title() {
        return $('.title');
    }

    get cartLink() {
        return $('.shopping_cart_link');
    }

    get cartBadge() {
        return $('.shopping_cart_badge');
    }
    
    get sortDropdown() {
    return $('.product_sort_container');
}

async sortBy(optionText) {
    await this.sortDropdown.selectByVisibleText(optionText);
}

async addToCartByName(name) {
    await this.waitReady();

    const allNames = await $$('//div[@class="inventory_item_name"]');
    for (const el of allNames) {
        console.log(await el.getText());
    }

    const itemName = await $(`//div[@class="inventory_item_name" and text()="${name}"]`);
    if (!(await itemName.isExisting())) {
        throw new Error(`Товар "${name}" не найден на странице`);
    }
    const item = await itemName.$('..');
    const btn = await item.$('button.btn_inventory');
    await btn.click();
}


    async waitReady() {
        await browser.waitUntil(
            async () => (await this.title.isDisplayed()),
            { timeout: 5000, timeoutMsg: 'Inventory page not loaded' }
        );
    }
}

export default new InventoryPage();