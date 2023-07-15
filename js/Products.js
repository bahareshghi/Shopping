const productsContainer = document.querySelector('.products-container');
class Products
{
    
  getProducts() {
    axios
      .get('https://fakestoreapi.com/products')
      .then((products) => this.createProducts(products.data));
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

      //   Update DOM:
      productsContainer.innerHTML = productsDOM;
    });
  }
}

export default new Products();
