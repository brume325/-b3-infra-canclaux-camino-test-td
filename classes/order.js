class Order {
  constructor(cart) {
      if (cart.items.size === 0) {
          throw new Error("Cart is empty. Cannot place an order.");
      }
      this.items = cart.items;
      this.total = cart.calculateTotal();
      this.cancelled = false;
      this.deliveryAddress = null;
  }

  placeOrder() {
      if (this.cancelled) {
          throw new Error("Cannot place a cancelled order.");
      }

      this.items.forEach((quantity, product) => {
          product.stock -= quantity;
      });
      return `Order placed successfully! Total: $${this.total.toFixed(2)}`;
  }

  viewOrder() {
      return Array.from(this.items).map(([product, quantity]) => {
          return `${product.name} x ${quantity}`;
      }).join("\n") + `\nTotal: $${this.total.toFixed(2)}`;
  }

  cancelOrder() {
      if (this.cancelled) {
          throw new Error("Order is already cancelled.");
      }

      this.items.forEach((quantity, product) => {
          product.stock += quantity;
      });
      this.cancelled = true;
  }

  addDeliveryAddress(address) {
      if (!address || typeof address !== "string" || address.trim() === "") {
          throw new Error("Invalid delivery address.");
      }
      this.deliveryAddress = address;
  }

  applyDiscount(code) {
      const discounts = {
          'DISCOUNT10': 0.10,
          'DISCOUNT20': 0.20,
          'DISCOUNT50': 0.50
      };

      if (!discounts[code]) {
          throw new Error("Invalid discount code.");
      }

      const discountRate = discounts[code];
      this.total = this.total - (this.total * discountRate);
  }
}

module.exports = Order;
