import Storage from './Storage.js';
import SearchProducts from './SearchProducts.js';

const productsContainer = document.querySelector('.products-container');
const sortContainer = document.querySelector('.select');
const searchContainer = document.querySelector('.search__input');
let allProducts;

document.addEventListener('DOMContentLoaded', () => {
  sortContainer.value = 'all';
  searchContainer.value = '';
});

class Products {
  getProducts() {
    axios.get('https://fakestoreapi.com/products').then((products) => {
      allProducts = products.data;
      // Update DOM:
      this.createProducts(products.data);
      // Update Storage:
      Storage.saveProducts(products.data);
    });
  }

  createProducts(products) {
    let productsDOM = '';
    products.forEach((product) => {
      const productTitle =
        product.title.length >= 15
          ? product.title.slice(0, 15) + '...'
          : product.title;

      productsDOM += `
            <div class="product">
                <div class="product__content">
                    <img src="${product.image}" alt="product img" class="product__img">
                    <div class="product__details">
                       <p class="product__title">${productTitle}</p>
                       <p class="product__price">${product.price}$</p>
                    </div>
                </div>
               <button class="add-to-cart-btn">Add to cart</button>
            </div>
             `;
    });

    // Update DOM:
    productsContainer.innerHTML = productsDOM;
    // Search-Sort  Products
    searchContainer.addEventListener('input', (e) => {
      SearchProducts.searchProducts(allProducts, e.target.value);
    });
    sortContainer.addEventListener('change', (e) => {
      SearchProducts.sortProducts(allProducts, e.target.value);
    });
  }
}

export default new Products();
