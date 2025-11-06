import express from 'express'
import { editProfile, forgotPassword, getProfile, login, logout, register, resetPassword } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js'

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);
userRouter.get('/profile', authMiddleware, getProfile);
userRouter.put('/edit-profile', authMiddleware, editProfile);

export default userRouter;
