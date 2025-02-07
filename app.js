import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import productRouter from "./routes/products.router.js";
import ProductManager from "./models/productsManager.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Rutas
app.use("/products", productRouter);

// Ruta para vista de productos en tiempo real
app.get("/products/realtimeproducts", (req, res) => {
  const products = ProductManager.getProducts();
  console.log("cargando datos en tiempo real")
  res.render("realTimeProducts", { products });
});

// Configuración de WebSockets
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Enviar productos actuales al conectar
  socket.emit("updateProducts", ProductManager.getProducts());

  // Agregar nuevo producto
  socket.on("addProduct", (newProduct) => {
    ProductManager.addProduct(newProduct);
    io.emit("updateProducts", ProductManager.getProducts());
  });

  // Eliminar producto
  socket.on("deleteProduct", (id) => {
    ProductManager.deleteProduct(id);
    io.emit("updateProducts", ProductManager.getProducts());
  });
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
