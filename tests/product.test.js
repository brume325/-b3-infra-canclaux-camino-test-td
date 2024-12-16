const Product = require('../classes/Product');

describe('Product Class', () => {
  let product;

  beforeEach(() => {
    product = new Product('Laptop', 1200.0, 5);
  });

  test('should initialize product correctly', () => {
    expect(product.name).toBe('Laptop');
    expect(product.price).toBe(1200.0);
    expect(product.stock).toBe(5);
  });

  test('should correctly reduce stock on valid quantity', () => {
    product.reduceStock(2);
    expect(product.stock).toBe(3);
  });

  test('should throw error when reducing stock more than available', () => {
    expect(() => product.reduceStock(10)).toThrow(
      'Insufficient stock for Laptop. Available: 5'
    );
  });

  test('should return correct string representation', () => {
    expect(product.toString()).toBe('Laptop (120, Stock: 5)');
  });
});
