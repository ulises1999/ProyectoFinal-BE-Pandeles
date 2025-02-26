import { Router } from 'express';
import ProductModel from '../models/productModel.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { name, price, stock, description, category, availability } = req.body;
        if (!name || !price || !stock || !description || !category) {
            throw new Error("All fields are required");
        }

        const newProduct = new ProductModel({ name, price, stock, description, category, availability });
        await newProduct.save();

        res.render('product', { product: newProduct.toObject() });
    } catch (error) {
        console.error('Error agregando producto:', error);
        return res.render('error', { error: `Error agregando producto: ${error.message}` });
    }
});

router.get('/', async (req, res) => {
    try {
        const { category, availability, sort, page = 1, limit = 10 } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (availability === 'true') filter.availability = true;
        if (availability === 'false') filter.availability = false;
        
        let sortOption = {};
        if (sort === 'asc') sortOption.price = 1;
        if (sort === 'desc') sortOption.price = -1;
        
        let infoPaginate = await ProductModel.paginate(filter, { limit, page, sort: sortOption });
        
        res.render('products', { 
            products: infoPaginate.docs.map(doc => doc.toObject()), 
            info: infoPaginate
        });
    } catch (error) {
        return res.render('error', { error: "Error al obtener productos" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const unProducto = await ProductModel.findById(req.params.id);
        if (!unProducto) {
            return res.render('error', { error: "Producto no encontrado" });
        }
        res.render('product', { product: unProducto.toObject() });
    } catch (error) {
        return res.render('error', { error: "Error al obtener el producto solicitado" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productoAEliminar = await ProductModel.findByIdAndDelete(req.params.id);
        if (!productoAEliminar) {
            return res.render('error', { error: "No se encontró el producto a eliminar" });
        }
        res.redirect('/products');
    } catch (error) {
        return res.render('error', { error: "Error al eliminar el producto" });
    }
});

export default router;
