import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const { Schema } = mongoose;

const productCollection = "product"; //Seteamos el nombre de la colección
const productSchema = new Schema({ //Definimos el esquema para producto
    name: {type: String, required: true, minlength: 3},
    price: {type: Number, required: true},
    description: {type: String, required: true}
})
productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;