import Product from "../models/productModel.js";
import {v2 as cloudinary} from 'cloudinary'

//* create product (Admin Only)
export const createProduct = async (req, res) => {
    try {
        const {name, desc, price, category, stock, image, ratings, numOfReviews} = req.body;

        if(!name || !desc || !price || !category){
            return res.json({success:false, message:'All fields are required'});
        }

        let imageUrl = "https://via.placeholder.com/400x400?text=No+Image";

        if(image){
            const upload = await cloudinary.uploader.upload(image, {
                folder: 'Product Images',
            });
            imageUrl = upload.secure_url;
        }

        const product = await Product.create({
            name, desc, price, category, stock, image: imageUrl, ratings, numOfReviews,
        })

        await product.save();

        res.json({success: true, message:'Product Created Successfully', product});

    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }   
}

//* get all products
export const getAllProducts = async (req, res) => {
    try {
        const {page=1, limit=10, search="", category} = req.query;

        //* create filter
        const query = {}
        if(search) query.name = { $regex: search, $options: "i" } //* case insensitive search
        if(category) query.category = category;

        //* pagination setup
        const skip = (page - 1) * limit;

        const products = await Product.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

        //* total count for frontend pagination
        const total = await Product.countDocuments(query);

        res.json({
            success: true, 
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            products
        });
        
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

//* get single product
export const getSingleProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({success:false, message:'Product not found'})
        }
        res.json({success: true, product});
        
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}


//* update product (admins only) 
export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, desc, price, stock} = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {name, desc, price, stock},
            {new: true, runValidators: true},
        )

        if(!updatedProduct){
            return res.status(404).json({success:false, message:'Product not found'})
        }

        res.json({success: true, message:'Product Upadted Successfully', product:updatedProduct});


    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}


//* delete product (admins only)
export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({success:false, message:'Product not found'})
        }

        res.json({success: true, message:'Product Deleted Successfully'});

    } catch (error) {
        res.status(500).json({success:false, message:error.message})   
    }
}


export const addReview = async (req, res) => {
    try {
        const {productId, rating, comment} = req.body;
        const userId = req.user.id;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        const existingReview = product.reviews.find(r => r.user.toString() === userId);

        if(existingReview){
            existingReview.rating = rating;
            existingReview.comment = comment;
        }else{
            product.reviews.push({
                user: userId,
                name: req.user.name,
                rating: Number(rating),
                comment,
            })
            product.numOfReviews = product.reviews.length;
        }

        
        // Update average rating
        product.ratings =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

        res.json({ success: true, message: "Review added/updated successfully" });

    } catch (error) {
        res.status(500).json({success:false, message:error.message})   
    }
}

export const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, reviews: product.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId);

    product.numOfReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) / (product.reviews.length || 1);

    await product.save();

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
