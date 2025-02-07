class ProductManager {
  static products = [
    { id: "1", name: "Sartén", price: 25.99, stock: 50 },
    { id: "2", name: "Juego de cubiertos", price: 19.99, stock: 100 }
  ];

  static preProducts = [];

  static getProducts() {
    return ProductManager.products;
  }

  static getProductId(id) {
    const product = ProductManager.products.find(p => p.id === id);
    return product;
  }

  static addProduct({ name, description, code, price, status, stock, category }) {
    const newId = (ProductManager.products.length + 1).toString();
    const newProduct = { id: newId, name, description, code, price, status, stock, category };
    ProductManager.products.push(newProduct);
    return newProduct;
  }

  static deleteProduct(id) {
    const index = ProductManager.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    return ProductManager.products.splice(index, 1)[0];
  }
}

export default ProductManager;
