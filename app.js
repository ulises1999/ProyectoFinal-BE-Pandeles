import express from "express";
import { createServer } from "http";
import handlebars from 'express-handlebars';
import { dirname, } from 'path';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import productsRouterDB from './routes/productsRouterDB.js';
import viewsRouterDB from './routes/viewsRouterDB.js';
import dotenv from "dotenv";
import methodOverride from 'method-override';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Configurar Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));
app.set('views', __dirname + '/views');
app.set('public', __dirname + '/public');
app.use(methodOverride('_method'));

// Rutas
app.use('/', viewsRouterDB);
app.use('/products', productsRouterDB)

// ruta para volver al inicio
app.get('/inicio', (req, res) => {
  res.render('index');  
});

// mongoose
const URIMongoDB = process.env.URIMONGO;
mongoose.connect(URIMongoDB)
    .then( () => console.log("Conexión realizada con éxito"))
    .catch( (error) => console.error("Error en conexión: ". error));


// Ruta para vista de productos en tiempo real
app.get("/products/realtimeproducts", (req, res) => {
  const products = ProductManager.getProducts();
  console.log("cargando datos en tiempo real")
  res.render("realTimeProducts", { products });
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
