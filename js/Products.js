import Storage from './Storage.js';
import SearchProducts from './SearchProducts.js';
import Cart from './Cart.js';

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
      // Update DOM
      this.createProducts(products.data);
      // Update Storage
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

      const cart = Storage.getCartItems();
      const isInCart = cart.find((item) => item.id === product.id);

      productsDOM += `
            <div class="product" data-id=${product.id}>
                <div class="product__content">
                    <img src="${
                      product.image
                    }" alt="product img" class="product__img">
                    <div class="product__details">
                       <p class="product__title">${productTitle}</p>
                       <p class="product__price">${product.price}$</p>
                    </div>
                </div>
               <button class="add-to-cart-btn" data-id=${product.id}>${
        isInCart ? 'In cart' : 'Add to cart'
      }</button>
            </div>
             `;
    });

    // Update DOM
    productsContainer.innerHTML = productsDOM;

    // Search-Sort Products
    searchContainer.addEventListener('input', (e) => {
      SearchProducts.searchProducts(allProducts, e.target.value);
    });
    sortContainer.addEventListener('change', (e) => {
      SearchProducts.sortProducts(allProducts, e.target.value);
    });

    // Add to cart
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const addedProduct = products.find(
          (product) => product.id === parseInt(e.target.dataset.id)
        );
        Cart.addProduct(addedProduct, e.target);
      });
    });
  }
}

export default new Products();
