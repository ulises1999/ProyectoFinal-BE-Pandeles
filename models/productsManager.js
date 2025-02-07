class ProductManager {
  static products = [
      { "id": "1", "name": "Sartén antiadherente", "price": 25.99, "stock": 50 },
      { "id": "2", "name": "Juego de cubiertos", "price": 19.99, "stock": 100 },
      { "id": "3", "name": "Cuchillo de chef", "price": 29.99, "stock": 75 },
      { "id": "4", "name": "Tetera de acero inoxidable", "price": 35.50, "stock": 30 },
      { "id": "5", "name": "Batidora eléctrica", "price": 45.00, "stock": 20 },
      { "id": "6", "name": "Olla de presión", "price": 60.00, "stock": 15 },
      { "id": "7", "name": "Jarra medidora de vidrio", "price": 12.50, "stock": 120 },
      { "id": "8", "name": "Cafetera de goteo", "price": 40.00, "stock": 40 },
      { "id": "9", "name": "Molinillo de café", "price": 18.99, "stock": 65 },
      { "id": "10", "name": "Taza térmica", "price": 10.00, "stock": 150 }
    ];

  static getProducts() {
    return ProductManager.products;
  }

  static getProductId(id) {
    const product = ProductManager.products.find(p => p.id === id);
    return product; 
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
