import express from "express";
import authMiddleware from '../middlewares/auth.js';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/cart/add-to-cart", authMiddleware, addToCart);
cartRouter.get("/cart/get-cart", authMiddleware, getCart);
cartRouter.put("/cart/update-cart", authMiddleware, updateCartItem);
cartRouter.delete("/cart/:productId", authMiddleware, removeCartItem);

export default cartRouter;
