import Products from './Products.js';
import Cart from './Cart.js';
import Storage from './Storage.js';
document.addEventListener('DOMContentLoaded', () => {
  // Cart
  Cart;
  // Create Products
  Products.getProducts();
  // Create Cart Items
  const cartItems = Storage.getCartItems();
  Cart.createProduct(cartItems);
});
