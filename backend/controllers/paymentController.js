// import razorpay from "../config/razorpay.js";
// import crypto from "crypto";
// import Payment from "../models/paymentModel.js";

// export const createPaymentOrder = async (req, res) => {
//   try {
//     const { amount } = req.body; // amount in rupees from frontend

//     const options = {
//       amount: amount * 100, // Razorpay accepts amount in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
    
//     await Payment.create({
//       userId: req.user.id,
//       orderId: order.id,
//       amount,
//       currency: order.currency,
//     });


//     res.json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (razorpay_signature === expectedSign) {
//         await Payment.findOneAndUpdate(
//         { orderId: razorpay_order_id },
//         { paymentId: razorpay_payment_id, signature: razorpay_signature, status: "Success" }
//         );

//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       res.status(400).json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
