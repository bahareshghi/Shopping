import Storage from './Storage.js';
const cartContainer = document.querySelector('.cart-container');
const cartIcon = document.querySelector('.cart-icon');
const backdrop = document.querySelector('.backdrop');
const clearBtn = document.querySelector('.clear-btn');
const cartItems = document.querySelector('.cart__items');
const cartPrice = document.querySelector('.total-price');
const cartNumber = document.querySelector('.cart-number');
let cart = Storage.getCartItems();

class Cart {
  constructor() {
    cartIcon.addEventListener('click', () => this.showCart());
    backdrop.addEventListener('click', () => this.closeCart());
    clearBtn.addEventListener('click', (e) => {
      this.cartActions(e.target.classList[0], e.target);
      this.closeCart();
    });
    cartContainer.addEventListener('click', (e) =>
      this.cartActions(e.target.classList[1], e.target)
    );
    cartNumber.innerText = cart.length;
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
    this.cartValue();
    cartNumber.innerText = cart.length;
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
    const addToCartBtns = [...document.querySelectorAll('.add-to-cart-btn')];
    if (actionType === 'fa-trash') {
      // Update DOM
      addToCartBtns.find((item) => e.dataset.id == item.dataset.id);
      const selectedProduct = cart.find(
        (item) => item.id === parseInt(e.dataset.id)
      );
      const button = addToCartBtns.find(
        (btn) => parseInt(btn.dataset.id) === selectedProduct.id
      );
      button.innerText = 'Add to cart';
      button.disabled = false;

      const filteredProducts = cart.filter(
        (item) => item.id !== parseInt(e.dataset.id)
      );
      cart = filteredProducts;
      this.createProduct(cart);
      cartNumber.innerText = cart.length;

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

        const button = addToCartBtns.find(
          (btn) => parseInt(btn.dataset.id) === selectedProduct.id
        );
        button.innerText = 'Add to cart';
        button.disabled = false;
        cartNumber.innerText = cart.length;

        // Update storage
        Storage.saveCart(filteredProducts);
      } else {
        selectedProduct.quantity--;
        // Update storage
        Storage.saveCart(cart);
        // Update DOM
        e.previousElementSibling.innerText = selectedProduct.quantity--;
      }
    } else if (actionType === 'clear-btn') {
      // Update storage
      cart = [];
      Storage.saveCart(cart);
      // Update DOM
      cartItems.innerHTML = '';
      addToCartBtns.forEach((btn) => {
        btn.innerText = 'Add to cart';
        btn.disabled = false;
      });
      cartNumber.innerText = cart.length;
    }
    this.cartValue();
  }

  cartValue() {
    const cart = Storage.getCartItems();
    let total = 0;
    cart.forEach(
      (item) => (total = Math.trunc(total + item.price * item.quantity))
    );
    cartPrice.innerHTML = `Total price: ${total}$`;
  }
}

export default new Cart();
