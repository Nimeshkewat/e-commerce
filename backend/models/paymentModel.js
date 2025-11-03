// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   orderId: { type: String, required: true },          // Razorpay order ID
//   paymentId: { type: String },                        // Razorpay payment ID
//   signature: { type: String },
//   amount: { type: Number, required: true },
//   currency: { type: String, default: "INR" },
//   status: { type: String, default: "Pending" },       // Pending, Success, Failed
//   createdAt: { type: Date, default: Date.now },
// });

// const Payment = mongoose.model("Payment", paymentSchema);
// export default Payment;
