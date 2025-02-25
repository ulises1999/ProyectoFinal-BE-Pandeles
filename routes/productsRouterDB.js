import { Router } from 'express';
import ProductModel from '../models/productModel.js';


const router = Router();
router.post('/', async (req, res) => {
    try {
        // Validación extra para asegurarse de que todos los campos existen
        const { name, price, stock, description } = req.body;
        if (!name || !price || !stock || !description) {
            throw new Error("All fields are required");
        }

        const newProduct = new ProductModel({ name, price, stock, description });
        await newProduct.save();

        res.render('product', { product: newProduct.toObject() });
    } catch (error) {
        console.error('Error agregando producto:', error);
        return res.render('error', { error: `Error agregando producto: ${error.message}` });
    }
});


router.get('/', async (req, res) => {
    try{
        const products = await ProductModel.find();
        let pageActual = req.query.page;
        let limitActual = req.query.limit;
        let infoPaginate = await ProductModel.paginate(
            { limit: limitActual, page: pageActual});
        console.log(infoPaginate);
        let productObject = infoPaginate.docs.map( doc => doc.toObject());
        res.render('products', {products: products.map( product => product.toObject()), info: infoPaginate, productObject});

    }catch(error){
        return res.render('error', {error:"Error al obtener productos"});
    }
})

router.get('/:id', async (req, res) => {
    try{
        const unProducto = await ProductModel.findById(req.params.id);
        if(!unProducto){
            return res.render('error', {error: "Producto no encontrado"});
        }
        res.render('product', {product: unProducto.toObject()});
    }catch(error){
        return res.render('error', {error:"Error al obtener el producto solicitado"});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const productoAEliminar = await ProductModel.findByIdAndDelete(req.params.id);
        if(!productoAEliminar){
            return res.render('error', {error: "No se encontró el producto a eliminar"})
        }
        res.redirect('/products');
    }catch(error){
        return res.render('error', {error:"Error al eliminar el producto"});
    }
})


export default router;