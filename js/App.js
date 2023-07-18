import Products from './Products.js';
import Cart from './Cart.js';
import Storage from './Storage.js';
document.addEventListener('DOMContentLoaded', () => {
  // Cart
  Cart;
  // Create products
  Products.getProducts();
  // Create cart items
  const cartItems = Storage.getCartItems();
  Cart.createProduct(cartItems);
});
