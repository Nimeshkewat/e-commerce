import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import userRouter from './routes/userRoutes.js';
import {v2 as cloudinary} from 'cloudinary'
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

//* app instance
const app = express();

//* cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

//* connect database
connectDb();

//* middlewares
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));

//* home 
app.get('/', (req,res) => res.json({message:'Api Working'}))

//* endpoints
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);
// app.use('/api', paymentRouter);


//* port
const port = process.env.PORT || 8000;

//* start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

