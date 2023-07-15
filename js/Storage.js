class Storage {
  saveProducts(productsToSave) {
    localStorage.setItem('products', JSON.stringify(productsToSave));
  }

  getProducts() {
    return JSON.parse(localStorage.getItem('products'))
      ? JSON.parse(localStorage.getItem('products'))
      : [];
  }
}

export default new Storage();
