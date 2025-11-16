const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ 
        user: req.user.id, 
        items: [],
        totalPrice: 0
      });
    }

    // Calculate total price
    let totalPrice = 0;
    cart.items.forEach(item => {
      if (item.product) {
        totalPrice += item.price * item.quantity;
      }
    });
    
    cart.totalPrice = totalPrice;
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    console.log('Adding to cart:', { productId, quantity, userId: req.user.id });
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }
    
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = await Cart.create({ 
        user: req.user.id, 
        items: [] 
      });
    }
    
    const itemIndex = cart.items.findIndex(item => 
      item.product && item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }
    
    // Calculate total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const itemProduct = await Product.findById(item.product);
      if (itemProduct) {
        item.price = itemProduct.price;
        totalPrice += item.price * item.quantity;
      }
    }
    
    cart.totalPrice = totalPrice;
    await cart.save();
    await cart.populate('items.product');
    
    console.log('Cart updated:', cart);
    
    res.json({
      success: true,
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    const product = await Product.findById(productId);
    
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }
    
    cart.items[itemIndex].quantity = quantity;
    
    // Recalculate total
    let totalPrice = 0;
    for (let item of cart.items) {
      totalPrice += item.price * item.quantity;
    }
    cart.totalPrice = totalPrice;
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({
      success: true,
      message: 'Cart updated successfully',
      cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    cart.items = cart.items.filter(item => 
      item.product.toString() !== productId
    );
    
    // Recalculate total
    let totalPrice = 0;
    for (let item of cart.items) {
      totalPrice += item.price * item.quantity;
    }
    cart.totalPrice = totalPrice;
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    
    res.json({
      success: true,
      message: 'Cart cleared successfully',
      cart
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};