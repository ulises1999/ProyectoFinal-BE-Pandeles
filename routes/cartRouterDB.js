import express from "express";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const router = express.Router();

// Obtener el carrito (si no existe, se crea uno nuevo)
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne().populate("products.product");

    if (!cart) {
      cart = new Cart({ products: [] });
      await cart.save();
      // console.log("New cart created:", cart);
    }
    res.render("cart", { cart: cart.toObject() });
  } catch (error) {
    console.error("Error fetching the cart:", error.message);
    res.render("error", { error: `Error fetching the cart: ${error.message}` });
  }
});

// Agregar producto al carrito
router.post("/add/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.redirect("/cart");
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    res.render("error", { error: `Error adding product to cart: ${error.message}` });
  }
});

// Eliminar producto del carrito
router.post("/remove/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne();

    if (!cart) {
      return res.redirect("/cart");
    }

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();

    res.redirect("/cart");
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    res.render("error", { error: `Error removing product from cart: ${error.message}` });
  }
});

export default router;
