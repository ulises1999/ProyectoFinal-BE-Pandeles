import express from "express";
import { createServer } from "http";
import handlebars from 'express-handlebars';
import { dirname } from 'path';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import productsRouterDB from './routes/productsRouterDB.js';
import viewsRouterDB from './routes/viewsRouterDB.js';
import dotenv from "dotenv";
import methodOverride from 'method-override';
import cartRouterDB from './routes/cartRouterDB.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Configuración de Handlebars con el helper eq
app.engine("handlebars", handlebars.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,  
    allowProtoMethodsByDefault: true
  },
  helpers: {
    eq: (a, b) => a === b // Helper para comparar valores
  }
}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride('_method'));

// Rutas
app.use('/', viewsRouterDB);
app.use('/products', productsRouterDB);
app.use('/carts', cartRouterDB);

// Ruta para volver al inicio
app.get('/inicio', (req, res) => {
  res.render('index');  
});

// Conectar a MongoDB
const URIMongoDB = process.env.URIMONGO;
mongoose.connect(URIMongoDB)
    .then(() => console.log("Conexión realizada con éxito"))
    .catch(error => console.error("Error en conexión:", error));

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
