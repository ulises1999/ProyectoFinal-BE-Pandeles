import mongoose from "mongoose";
const { Schema } = mongoose;

const productCollection = "product"; //Seteamos el nombre de la colección
const productSchema = new Schema({ //Definimos el esquema para producto
    nombre: {type: String, required: true, minlength: 3},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    thumbnail: {type: String}
})

const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;