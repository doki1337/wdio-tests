class CartPage {
  get checkoutBtn() { return $('#checkout'); }
  async removeByName(name) {
    const row = await $(`//div[@class="inventory_item_name" and text()="${name}"]/ancestor::div[@class="cart_item"]`);
    await row.$('button').click();
  }
}
module.exports = new CartPage();
