// Backend/models/Cart.js - WITH GIFT FEATURE

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

// 🎁 Gift Item Schema
const giftItemSchema = new mongoose.Schema({
  name: { type: String },
  brand: { type: String },
  category: { type: String },
  price: { type: Number, default: 0 },
  oldPrice: { type: Number },
  quantity: { type: Number, default: 1 },
  weight: { type: String },
  image: { type: String },
  isGift: { type: Boolean, default: true }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  },
  
  // 🎁 GIFT FIELDS
  hasGift: {
    type: Boolean,
    default: false
  },
  giftItem: giftItemSchema
  
}, {
  timestamps: true
});

// Calculate total price before saving
cartSchema.pre('save', async function(next) {
  if (this.items.length === 0) {
    this.totalPrice = 0;
    this.hasGift = false;
    this.giftItem = undefined;
    return next();
  }

  try {
    await this.populate('items.product');
    this.totalPrice = this.items.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
    
    // 🎁 Auto-remove gift if below threshold
    const GIFT_THRESHOLD = 999;
    if (this.totalPrice < GIFT_THRESHOLD && this.hasGift) {
      this.hasGift = false;
      this.giftItem = undefined;
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Cart', cartSchema);