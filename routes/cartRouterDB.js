// routes/cartDB.router.js
import { Router } from 'express';
import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';

const router = Router();

// Crear un carrito nuevo
router.post('/', async (req, res) => {
    try {
        const newCart = new CartModel({ products: [] });
        await newCart.save();
        res.render('cart', { cart: newCart.toObject() });
    } catch (error) {
        res.render('error', { error: 'Error al crear el carrito' });
    }
});

// Obtener un carrito por ID
router.get('/:id', async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.id).populate('products.product');
        if (!cart) {
            return res.render('error', { error: 'Carrito no encontrado' });
        }
        res.render('cart', { cart: cart.toObject() });
    } catch (error) {
        res.render('error', { error: 'Error al obtener el carrito' });
    }
});

// Agregar un producto al carrito
router.post('/:id/product/:productId', async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.id);
        if (!cart) {
            return res.render('error', { error: 'Carrito no encontrado' });
        }

        const product = await ProductModel.findById(req.params.productId);
        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' });
        }

        cart.products.push({ product: product._id });
        await cart.save();

        res.redirect(`/cart/${cart._id}`);
    } catch (error) {
        res.render('error', { error: 'Error al agregar el producto al carrito' });
    }
});

export default router;
