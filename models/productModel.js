import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;

const productCollection = "product"; 
const productSchema = new Schema({
    name: { type: String, required: true, minlength: 3 },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, 
    availability: { type: Boolean, default: true },
    stock: { type: Number, required: true, min: 0 } 
});

productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;
