const Cart = require('../classes/cart');

describe('Cart', () => {
  let cart;
  let productA;
  let productB;

  beforeEach(() => {
    cart = new Cart();
    productA = { name: 'Laptop', price: 1200.0, stock: 5 };
    productB = { name: 'Mouse', price: 50.0, stock: 10 };
  });

  describe('addProduct', () => {
    it('should add a product to the cart', () => {
      cart.addProduct(productA, 2);
      expect(cart.items.get(productA)).toBe(2);
    });

    it('should throw an error if quantity exceeds stock', () => {
      expect(() => cart.addProduct(productA, 6)).toThrow(
        'Cannot add 6 of Laptop. Only 5 left.'
      );
    });
  });

  describe('removeProduct', () => {
    it('should remove a product from the cart', () => {
      cart.addProduct(productA, 2);
      cart.removeProduct(productA);
      expect(cart.items.has(productA)).toBe(false);
    });

    it('should throw an error if the product is not in the cart', () => {
      expect(() => cart.removeProduct(productA)).toThrow('Laptop is not in the cart.');
    });
  });

  describe('calculateTotal', () => {
    it('should calculate the total price of items in the cart', () => {
      cart.addProduct(productA, 2);
      cart.addProduct(productB, 1);
      expect(cart.calculateTotal()).toBe(2450.0); // (2 * 1200.0) + (1 * 50.0)
    });

    it('should return 0 if the cart is empty', () => {
      expect(cart.calculateTotal()).toBe(0);
    });
  });

  describe('cartPriceWithDiscount', () => {
    it('should calculate the total price with a discount', () => {
      cart.addProduct(productA, 2);
      cart.addProduct(productB, 1);
      expect(cart.cartPriceWithDiscount(0.1)).toBe(2205.0); // 2450 - 10%
    });

    it('should throw an error if discount is out of bounds', () => {
      expect(() => cart.cartPriceWithDiscount(-0.1)).toThrow('Discount must be between 0 and 1.');
      expect(() => cart.cartPriceWithDiscount(1.5)).toThrow('Discount must be between 0 and 1.');
    });

    it('should return total price if no discount is applied', () => {
      cart.addProduct(productA, 2);
      expect(cart.cartPriceWithDiscount()).toBe(2400.0);
    });
  });

  describe('displayCart', () => {
    it('should return a formatted string of cart items', () => {
      cart.addProduct(productA, 2);
      cart.addProduct(productB, 1);
      expect(cart.displayCart()).toBe('Laptop x 2 - $2400\nMouse x 1 - $50');
    });

    it('should return a message if the cart is empty', () => {
      expect(cart.displayCart()).toBe('Your cart is empty.');
    });
  });

  describe('productQuantity', () => {
    it('should update the quantity of an existing product in the cart', () => {
      cart.addProduct(productA, 2);
      cart.productQuantity(productA, 4);
      expect(cart.items.get(productA)).toBe(4);
    });

    it('should throw an error if the product is not in the cart', () => {
      expect(() => cart.productQuantity(productA, 3)).toThrow('Laptop is not in the cart.');
    });

    it('should throw an error if the quantity exceeds stock', () => {
      cart.addProduct(productA, 2);
      expect(() => cart.productQuantity(productA, 6)).toThrow(
        'Cannot set quantity to 6 for Laptop. Only 5 left.'
      );
    });
  });
});
