const socket = io();

// Escuchar actualización de productos
socket.on("updateProducts", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.id = `product-${product.id}`;
    li.innerHTML = `${product.name} - $${product.price} (Stock: ${product.stock}) 
                    <button onclick="deleteProduct('${product.id}')">Eliminar</button>`;
    productList.appendChild(li);
  });
});

// Enviar nuevo producto
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  socket.emit("addProduct", { name, description, code, price, status, stock, category });
  e.target.reset();
});

// Eliminar producto
function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
