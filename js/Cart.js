const cartContainer = document.querySelector('.cart-container');
const cartIcon = document.querySelector('.cart-icon');
const backdrop = document.querySelector( '.backdrop' );
const clearBtn = document.querySelector('.clear-btn');

class Cart {
  constructor() {
    cartIcon.addEventListener('click', () => this.showCart());
      backdrop.addEventListener( 'click', () => this.closeCart() );
    clearBtn.addEventListener('click', () => this.closeCart());
  }

  showCart() {
    cartContainer.style.transform = 'translateY(0vh)';
  }

  closeCart() {
    cartContainer.style.transform = 'translateY(-200vh)';
  }
}

export default new Cart();
