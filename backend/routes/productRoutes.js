import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import adminMiddleware from '../middlewares/admin.js';
import { addReview, createProduct, deleteProduct, deleteReview, getAllProducts, getProductReviews, getSingleProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/product/create', authMiddleware, adminMiddleware, createProduct);
productRouter.get('/products', getAllProducts);
productRouter.get('/product/:id', getSingleProduct);

//* admins only
productRouter.put('/product/:id', authMiddleware, adminMiddleware, updateProduct);
productRouter.delete('/product/:id', authMiddleware, adminMiddleware, deleteProduct);

//* reviews
productRouter.post("/reviews", authMiddleware, addReview);
productRouter.get("/:id", getProductReviews);
productRouter.delete("/reviews/:productId/:reviewId", authMiddleware, adminMiddleware, deleteReview);

export default productRouter;