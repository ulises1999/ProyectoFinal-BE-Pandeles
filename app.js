import express from "express";
import { createServer } from "http";
import { engine } from "express-handlebars";
import productRouter from "./routes/products.router.js";
import ProductManager from "./models/productsManager.js";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride('_method'));

// Rutas
app.use("/apiproducts", productRouter);
app.use("/products",productRouterDB);

// Ruta para vista de productos en tiempo real
app.get("/products/realtimeproducts", (req, res) => {
  const products = ProductManager.getProducts();
  console.log("cargando datos en tiempo real")
  res.render("realTimeProducts", { products });
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
