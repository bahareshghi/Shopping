import Products from './Products.js';
const sortContainer = document.querySelector('.select');
const searchContainer = document.querySelector('.search__input');

class searchProducts {
  searchProducts(products, searchValue) {
    sortContainer.value = 'all';
    console.log(sortContainer);
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    // Update DOM:
    Products.createProducts(filteredProducts);
  }

  sortProducts(products, sortValue) {
    searchContainer.value = '';
    if (sortValue === 'all') {
      // Update DOM:
      Products.createProducts(products);
    } else {
      const sortedProducts = products.filter((product) =>
        product.category.toLowerCase().includes(sortValue.toLowerCase())
      );
      // Update DOM:
      Products.createProducts(sortedProducts);
    }
  }
}

export default new searchProducts();
