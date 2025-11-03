import express from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/orders", authMiddleware, createOrder);
orderRouter.get("/orders", authMiddleware, getUserOrders);
orderRouter.get("/orders/all", authMiddleware, adminMiddleware, getAllOrders);
orderRouter.put("/orders/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRouter;
