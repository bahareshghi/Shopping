import Storage from './Storage.js';
const cartContainer = document.querySelector('.cart-container');
const cartIcon = document.querySelector('.cart-icon');
const backdrop = document.querySelector('.backdrop');
const clearBtn = document.querySelector('.clear-btn');
const cartItems = document.querySelector('.cart__items');
let cart = Storage.getCartItems();

class Cart {
  constructor() {
    cartIcon.addEventListener('click', () => this.showCart());
    backdrop.addEventListener('click', () => this.closeCart());
    clearBtn.addEventListener('click', () => this.closeCart());
  }

  showCart() {
    cartContainer.style.transform = 'translateY(0vh)';
  }

  closeCart() {
    cartContainer.style.transform = 'translateY(-200vh)';
  }

  addProduct ( product, btn )
  {
    product = { ...product, quantity: 1 };
    cart = [...cart, product];
    // Update Storage
    Storage.saveCart(cart);

    // Update DOM
    this.createProduct([product]);
    btn.innerText = 'In Cart';
    btn.disabled = true;
  }

  createProduct(data) {
    if (data.length === 0) {
      return;
    } else if (data.length === 1) {
      const product = data[0];
      const newProduct = document.createElement('div');
      newProduct.classList.add('item');
      const productTitle =
        product.title.length >= 10 ? product.title.slice(0, 10) + '...' : product.title;

      newProduct.innerHTML = `
              <img src="${product.image}" alt="product-img" class="item__img">
              <div class="item__details">
                  <p class="item__title">${productTitle}</p>
                  <p class="item__price">${product.price}$</p>
              </div>
              <div class="item__right">
                  <div class="item__quantity" data-id=${product.id}>
                      <i class="fa-solid fa-chevron-up"></i>
                      <p class="item-number">4</p>
                      <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <i class="fa-solid fa-trash" data-id=${product.id}></i>
              </div>
      `;
      cartItems.appendChild(newProduct);
    } else {
      let productsDOM = '';
      data.forEach((product) => {
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
             <div class="item__quantity" data-id=${product.id}>
                <i class="fa-solid fa-chevron-up"></i>
                <p class="item-number">4</p>
                <i class="fa-solid fa-chevron-down"></i>
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
}

export default new Cart();
