import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import ProductManager from "./models/productManager.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Rutas
app.use("/", productRouter);
app.use("/api/carts", cartRouter);

// Ruta para vista de productos con HTTP
app.get("/products", (req, res) => {
  const products = ProductManager.getProducts();
  res.render("index", { products });
});

// Ruta para vista de productos con WebSockets
app.get("/realtimeproducts", (req, res) => {
  const products = ProductManager.getProducts();
  res.render("realTimeProducts", { products });
});

// Configuración de WebSockets
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Enviar productos al conectar un cliente
  socket.emit("updateProducts", ProductManager.getProducts());

  // Manejar producto agregado
  socket.on("addProduct", (newProduct) => {
    ProductManager.addProduct(newProduct);
    io.emit("updateProducts", ProductManager.getProducts());
  });

  // Manejar producto eliminado
  socket.on("deleteProduct", (id) => {
    ProductManager.deleteProduct(id);
    io.emit("updateProducts", ProductManager.getProducts());
  });
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
