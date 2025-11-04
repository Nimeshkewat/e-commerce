import Cart from '../models/cartModel.js'

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );


      if (existingItem) existingItem.quantity += quantity;
      else cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.json({ success: true, cart: { items: [] } });

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) item.quantity = quantity;
    await cart.save();

    res.json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId });
    
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    
    res.json({ success: true, message: "Item removed", });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
