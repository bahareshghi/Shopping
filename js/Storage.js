class Storage {
  saveProducts(productsToSave) {
    localStorage.setItem('products', JSON.stringify(productsToSave));
  }

  getProducts() {
    return JSON.parse(localStorage.getItem('products'))
      ? JSON.parse(localStorage.getItem('products'))
      : [];
  }

  saveCart(itemsToSave) {
    localStorage.setItem('cart', JSON.stringify(itemsToSave));
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('cart'))
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

export default new Storage();
