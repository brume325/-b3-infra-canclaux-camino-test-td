const Order = require('../classes/order');
const Product = require('../classes/product'); // Import the Product class
const Cart = require('../classes/cart');       // Import the Cart class

describe('Order', () => {
  let cart, product1, product2;

  beforeEach(() => {
    product1 = new Product('Laptop', 1000, 10);
    product2 = new Product('Mouse', 50, 20);
    cart = new Cart();
    cart.addProduct(product1, 2);
    cart.addProduct(product2, 3);
  });

  it('should throw an error if the cart is empty', () => {
    const emptyCart = new Cart();
    expect(() => new Order(emptyCart)).toThrow('Cart is empty. Cannot place an order.');
  });

  it('should place an order and reduce product stock', () => {
    const order = new Order(cart);
    expect(order.placeOrder()).toBe('Order placed successfully! Total: $2150.00');
    expect(product1.stock).toBe(8);
    expect(product2.stock).toBe(17);
  });

  it('should display the order details', () => {
    const order = new Order(cart);
    expect(order.viewOrder()).toBe(
      'Laptop x 2\nMouse x 3\nTotal: $2150.00'
    );
  });

  it('should allow order cancellation and restore stock', () => {
    const order = new Order(cart);
    order.cancelOrder();
    expect(order.cancelled).toBe(true);
    expect(product1.stock).toBe(10);
    expect(product2.stock).toBe(20);
  });

  it('should add a delivery address to the order', () => {
    const order = new Order(cart);
    order.addDeliveryAddress('123 Main St');
    expect(order.deliveryAddress).toBe('123 Main St');
  });

  it('should apply a discount code to the order', () => {
    const order = new Order(cart);
    order.applyDiscount('DISCOUNT10');
    expect(order.total).toBe(1935);
  });
});