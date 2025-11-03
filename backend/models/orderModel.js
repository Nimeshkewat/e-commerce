import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: [
        {
            productId: {type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
            quantity: {type:Number, required: true},
            price: {type:Number, required: true},
        }
    ],
    shippingAddress: {
        address: String,
        city: String,
        country: String,
        postalCode: String,
    },
    paymentMethod: {type:String, default:'COD'},
    paymentStatus: {type:String, default:'Pending'},
    totalAmount: {type:Number, required:true},
    orderStatus: {type:String, default: 'Processing'},
    createdAt: {type:Date, default: Date.now},
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;