// Backend/routes/cartRoutes.js - WITH GIFT FEATURE 🎁

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// 🎁 GIFT CONFIGURATION
const GIFT_THRESHOLD = 999;
const GIFT_PRODUCT = {
  name: '🎁 FREE Gift - Premium Ice Cream Pack',
  brand: 'Jagat Store',
  category: 'Gift',
  price: 0,
  oldPrice: 149,
  quantity: 1,
  weight: '500ml',
  image: 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg',
  isGift: true
};

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');
    
    if (!cart) {
      cart = {
        items: [],
        totalPrice: 0,
        hasGift: false,
        giftItem: null
      };
    }
    
    res.json({ 
      success: true, 
      cart 
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching cart' 
    });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID is required' 
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    if (!product.inStock || product.stock < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product out of stock' 
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity
      });
    }

    await cart.save();
    await cart.populate('items.product');

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    res.json({ 
      success: true, 
      message: 'Product added to cart',
      cart 
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding to cart' 
    });
  }
});

// Update item quantity
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || quantity === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID and quantity are required' 
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found in cart' 
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product');

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    res.json({ 
      success: true, 
      message: 'Cart updated',
      cart 
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating cart' 
    });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product');

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    res.json({ 
      success: true, 
      message: 'Item removed from cart',
      cart 
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error removing from cart' 
    });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      cart.hasGift = false;
      cart.giftItem = undefined;
      await cart.save();
    }

    res.json({ 
      success: true, 
      message: 'Cart cleared',
      cart: cart || { items: [], totalPrice: 0, hasGift: false, giftItem: null }
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error clearing cart' 
    });
  }
});

// ============================================
// 🎁 GIFT ROUTES
// ============================================

// 🎁 Add free gift to cart
router.post('/add-gift', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found. Add items first!'
      });
    }

    const cartTotal = cart.items.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);

    if (cartTotal < GIFT_THRESHOLD) {
      return res.status(400).json({
        success: false,
        message: `Add ₹${(GIFT_THRESHOLD - cartTotal).toFixed(0)} more to get FREE gift!`
      });
    }

    if (cart.hasGift) {
      return res.json({
        success: true,
        message: 'Gift already in cart! 🎁',
        alreadyAdded: true,
        giftItem: cart.giftItem
      });
    }

    cart.hasGift = true;
    cart.giftItem = GIFT_PRODUCT;
    await cart.save();

    console.log('🎁 Gift added for user:', userId);

    res.json({
      success: true,
      message: '🎉 FREE Ice Cream gift added!',
      giftItem: GIFT_PRODUCT
    });

  } catch (error) {
    console.error('❌ Add gift error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add gift'
    });
  }
});

// 🎁 Remove gift from cart
router.delete('/remove-gift', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.hasGift = false;
    cart.giftItem = undefined;
    await cart.save();

    res.json({
      success: true,
      message: 'Gift removed from cart'
    });

  } catch (error) {
    console.error('Remove gift error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove gift'
    });
  }
});

// 🎁 Check gift eligibility
router.get('/gift-status', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      return res.json({
        success: true,
        eligible: false,
        hasGift: false,
        cartTotal: 0,
        remaining: GIFT_THRESHOLD,
        threshold: GIFT_THRESHOLD
      });
    }

    const cartTotal = cart.items.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);

    res.json({
      success: true,
      eligible: cartTotal >= GIFT_THRESHOLD,
      hasGift: cart.hasGift || false,
      giftItem: cart.giftItem || null,
      cartTotal,
      remaining: Math.max(0, GIFT_THRESHOLD - cartTotal),
      threshold: GIFT_THRESHOLD,
      giftDetails: GIFT_PRODUCT
    });

  } catch (error) {
    console.error('Gift status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check gift status'
    });
  }
});

module.exports = router;