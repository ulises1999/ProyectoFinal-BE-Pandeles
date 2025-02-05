class ProductManager {
  static products = [
    { id: "1", name: "Sartén antiadherente", price: 25.99, stock: 50 },
    { id: "2", name: "Juego de cubiertos", price: 19.99, stock: 100 }
  ];

  static getProducts() {
    return ProductManager.products;
  }

  static addProduct({ name, price, stock }) {
    const newId = (ProductManager.products.length + 1).toString();
    const newProduct = { id: newId, name, price, stock };
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
