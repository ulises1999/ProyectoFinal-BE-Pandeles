import { Router } from 'express';
import CartModel from '../models/cartModel.js';
import ProductModel from '../models/productModel.js';

const router = Router();

// 🔹 Crear un nuevo carrito y redirigir a su vista
router.post('/', async (req, res) => {
    try {
        const newCart = new CartModel({ products: [] });
        await newCart.save();
        res.redirect(`/cart/${newCart._id}`);
    } catch (error) {
        console.error('Error creating cart:', error);
        res.render('error', { message: 'Error creating cart' });
    }
});

// 🔹 Agregar un producto al carrito y renderizarlo actualizado
router.post('/:cartId/products/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const cart = await CartModel.findById(cartId);
        const product = await ProductModel.findById(productId);

        if (!cart || !product) {
            return res.render('error', { message: 'Cart or product not found' });
        }

        const productIndex = cart.products.findIndex(p => p.product.equals(productId));

        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        res.redirect(`/cart/${cartId}`); // Redirige al carrito actualizado
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.render('error', { message: 'Error adding product to cart' });
    }
});

// 🔹 Eliminar un producto del carrito y renderizarlo actualizado
router.post('/:cartId/products/:productId/delete', async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const cart = await CartModel.findById(cartId);

        if (!cart) {
            return res.render('error', { message: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => !p.product.equals(productId));

        await cart.save();
        res.redirect(`/cart/${cartId}`);
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.render('error', { message: 'Error removing product from cart' });
    }
});

// 🔹 Obtener un carrito y mostrarlo en su vista
router.get('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await CartModel.findById(cartId);

        if (!cart) {
            return res.render('error', { message: 'Cart not found' });
        }

        res.render('cart', { cart: cart.toObject() });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.render('error', { message: 'Error fetching cart' });
    }
});

export default router;
