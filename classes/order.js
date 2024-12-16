class Order {
    constructor(cart) {
      if (cart.items.size === 0) {
        throw new Error("Cart is empty. Cannot place an order.");
      }
      this.items = cart.items;
      this.total = cart.calculateTotal();
    }
  
    placeOrder() {
      this.items.forEach((quantity, product) => {
        product.reduceStock(quantity);
      });
      return `Order placed successfully! Total: $${this.total.toFixed(2)}`;
    }
  
    viewOrder() {
      return Array.from(this.items).map(([product, quantity]) => {
        return `${product.name} x ${quantity}`;
      }).join("\n") + `\nTotal: $${this.total.toFixed(2)}`;
    }
  }
  
  module.exports = Order;
  