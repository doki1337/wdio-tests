// test/pageobjects/inventory.page.js
class InventoryPage {
  get title()      { return $('.title'); }
  get cartLink()   { return $('.shopping_cart_link'); }
  get cartBadge()  { return $('.shopping_cart_badge'); }
  get sortSelect() { return $('.product_sort_container'); }

  // Дождаться «Products» — признак полной готовности страницы
  async waitReady() {
    await this.title.waitForDisplayed({ timeout: 7000 });
    await expect(this.title).toHaveText('Products');
  }

  // добавить товар в корзину по имени
  async addToCartByName(name) {
    const item = await $(`//div[@class="inventory_item_name " and text()="${name}"]/ancestor::div[@class="inventory_item"]`);
    await item.$('button').click();
  }

  // удалить товар из корзины по имени
  async removeFromCartByName(name) {
    const item = await $(`//div[@class="inventory_item_name " and text()="${name}"]/ancestor::div[@class="inventory_item"]`);
    await item.$('button').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  // сортировка (az|za|lohi|hilo)
  async sortBy(value) {
    await this.sortSelect.selectByAttribute('value', value);
  }
}

module.exports = new InventoryPage();
