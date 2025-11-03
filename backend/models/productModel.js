import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     name: {type:String, required: true},
//     rating: {type:Number, required: true},
//     comment: {type:String},
//     createdAt: {type:Date, default: Date.now},
// });

const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    desc: {type:String, required: true},
    price: {type:String, required: true},
    category: {type:String, required: true},
    brand: {type:String, default:'N/A'},
    stock: {type: Number, default: 0},
    image: {type:String,},
    ratings: {type:Number, default: 0},
    numOfReviews: {type:Number, default: 0},
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;