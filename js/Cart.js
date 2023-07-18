import Storage from './Storage.js';
const cartContainer = document.querySelector('.cart-container');
const cartIcon = document.querySelector('.cart-icon');
const backdrop = document.querySelector('.backdrop');
const clearBtn = document.querySelector('.clear-btn');
const cartItems = document.querySelector('.cart__items');

class Cart {
  constructor() {
    cartIcon.addEventListener('click', () => this.showCart());
    backdrop.addEventListener('click', () => this.closeCart());
    clearBtn.addEventListener('click', () => this.closeCart());
    cartContainer.addEventListener('click', (e) =>
      this.cartActions(e.target.classList[1], e.target)
    );
  }

  showCart() {
    cartContainer.style.transform = 'translateY(0vh)';
  }

  closeCart() {
    cartContainer.style.transform = 'translateY(-200vh)';
  }

  addProduct(product, btn) {
    let cart = Storage.getCartItems();
    product = { ...product, quantity: 1 };
    cart = [...cart, product];
    // Update storage
    Storage.saveCart(cart);

    // Update DOM
    this.createProduct(cart);
    btn.innerText = 'In Cart';
    btn.disabled = true;
  }

  createProduct(products) {
    if (products.length === 0) {
      cartItems.innerHTML = '';
      return;
    } else {
      let productsDOM = '';
      products.forEach((product) => {
        const productTitle =
          product.title.length >= 12
            ? product.title.slice(0, 12) + '...'
            : product.title;

        productsDOM += `
        <div class="item">
        <img src="${product.image}" alt="product-img" class="item__img">
        <div class="item__details">
             <p class="item__title">${productTitle}</p>
             <p class="item__price">${product.price}$</p>
        </div>
        <div class="item__right">
             <div class="item__quantity">
                <i class="fa-solid fa-chevron-up" data-id=${product.id}></i>
                <p class="item-number">${product.quantity}</p>
                <i class="fa-solid fa-chevron-down" data-id=${product.id}></i>
             </div>
          <i class="fa-solid fa-trash" data-id=${product.id}></i>
        </div>
        </div>  
        `;
      });
      // Update DOM
      cartItems.innerHTML = productsDOM;
    }
  }

  cartActions(actionType, e) {
    let cart = Storage.getCartItems();
    if (actionType === 'fa-trash') {
      // Update DOM
      const filteredProducts = cart.filter(
        (item) => item.id !== parseInt(e.dataset.id)
      );
      cart = filteredProducts;
      this.createProduct(cart);
      // Update storage
      Storage.saveCart(filteredProducts);
    } else if (actionType === 'fa-chevron-up') {
      const selectedProduct = cart.find(
        (item) => item.id === parseInt(e.dataset.id)
      );
      selectedProduct.quantity++;
      // Update storage
      Storage.saveCart(cart);
      // Update DOM
      e.nextElementSibling.innerText = selectedProduct.quantity++;
    } else if (actionType === 'fa-chevron-down') {
      const selectedProduct = cart.find(
        (item) => item.id === parseInt(e.dataset.id)
      );
      if (selectedProduct.quantity === 1) {
        // Update DOM
        const filteredProducts = cart.filter(
          (item) => item.id !== parseInt(e.dataset.id)
        );
        cart = filteredProducts;
        this.createProduct(cart);
        const addToCartBtns = [
          ...document.querySelectorAll('.add-to-cart-btn'),
        ];
        const button = addToCartBtns.find(
          (btn) => parseInt(btn.dataset.id) === selectedProduct.id
        );
        button.innerText = 'Add to cart';
        button.disabled = false;
        // Update storage
        Storage.saveCart(filteredProducts);
      } else {
        selectedProduct.quantity--;
        // Update storage
        Storage.saveCart(cart);
        // Update DOM
        e.previousElementSibling.innerText = selectedProduct.quantity--;
      }
    }
  }
}

export default new Cart();
