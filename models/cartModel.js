import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
});

// Usa `populate` para traer los detalles de los productos automáticamente
cartSchema.pre(/^find/, function (next) {
    this.populate('products.product');
    next();
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
