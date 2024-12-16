const Product = require('./classes/Product');
const Cart = require('./classes/Cart');
const Order = require('./classes/Order');

function main() {
  // Create products
  const laptop = new Product("Laptop", 1200.0, 5);
  const headphones = new Product("Headphones", 150.0, 20);
  const mouse = new Product("Mouse", 25.0, 50);

  console.log("Available Products:");
  console.log(laptop.toString());
  console.log(headphones.toString());
  console.log(mouse.toString());

  // Initialize cart
  const cart = new Cart();

  // Add products to the cart
  try {
    cart.addProduct(laptop, 1);
    cart.addProduct(headphones, 2);
    console.log("\nCart:");
    console.log(cart.displayCart());
  } catch (error) {
    console.error(error.message);
  }

  // Place an order
  try {
    const order = new Order(cart);
    console.log("\nOrder:");
    console.log(order.viewOrder());
    console.log(order.placeOrder());
  } catch (error) {
    console.error(error.message);
  }

  // Check remaining stock
  console.log("\nStock after order:");
  console.log(laptop.toString());
  console.log(headphones.toString());
  console.log(mouse.toString());
}

main();
