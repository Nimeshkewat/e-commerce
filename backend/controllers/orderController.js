import Order from '../models/orderModel.js'

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "No order items" });
    }

    const order = await Order.create({
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    res.json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find(userId).sort({ createdAt: -1 });

        res.json({success:true, orders});

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
