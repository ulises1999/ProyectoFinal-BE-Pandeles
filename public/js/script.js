const socket = io();

// Escuchar actualización de productos
socket.on("updateProducts", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} (Stock: ${product.stock}) 
                    <button onclick="deleteProduct('${product.id}')">Eliminar</button>`;
    productList.appendChild(li);
  });
});

// Enviar producto nuevo al servidor
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  socket.emit("addProduct", { name, price, stock });
  e.target.reset();
});

// Eliminar producto
function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
