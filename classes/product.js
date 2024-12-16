class Product {
    constructor(name, price, stock) {
      this.name = name;
      this.price = price;
      this.stock = stock;
    }
  
    toString() {
      return `${this.name} ($${this.price}, Stock: ${this.stock})`;
    }
  
    reduceStock(quantity) {
      if (quantity > this.stock) {
        throw new Error(`Insufficient stock for ${this.name}. Available: ${this.stock}`);
      }
      this.stock -= quantity;
    }
  }
  
  module.exports = Product;
  