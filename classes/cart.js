class Cart {
  constructor() {
      this.items = new Map(); // { product: quantity }
  }

  addProduct(product, quantity) {
      if (product.stock < quantity) {
          throw new Error(`Cannot add ${quantity} of ${product.name}. Only ${product.stock} left.`);
      }
      const currentQuantity = this.items.get(product) || 0;
      this.items.set(product, currentQuantity + quantity);
  }

  removeProduct(product) {
      if (!this.items.has(product)) {
          throw new Error(`${product.name} is not in the cart.`);
      }
      this.items.delete(product);
  }

  calculateTotal() {
      let total = 0;
      for (const [product, quantity] of this.items) {
          total += product.price * quantity;
      }
      return total;
  }

  displayCart() {
      if (this.items.size === 0) {
          return "Your cart is empty.";
      }
      return Array.from(this.items).map(([product, quantity]) => {
          return `${product.name} x ${quantity} - $${product.price * quantity}`;
      }).join("\n");
  }

  productQuantity(product, quantity) {
      if (!this.items.has(product)) {
          throw new Error(`${product.name} is not in the cart.`);
      }
      if (product.stock < quantity) {
          throw new Error(`Cannot set quantity to ${quantity} for ${product.name}. Only ${product.stock} left.`);
      }
      this.items.set(product, quantity);
  }

  cartPriceWithDiscount(discount = 0) {
      let total = this.calculateTotal();
      if (discount < 0 || discount > 1) {
          throw new Error('Discount must be between 0 and 1.');
      }
      return total * (1 - discount);
  }
}

module.exports = Cart;
