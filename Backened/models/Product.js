// Backend/models/Product.js - PRODUCT MODEL

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Dairy, Bread & Eggs',
      'Atta, Rice & Dal',
      'Masala & Oil',
      'Bakery Biscuits',
      'Bakery',
      
      'Fruits & Vegetables',
      'Frozen Food',
      'Meat & Seafood',
      'Breakfast & Instant Foods',
      'Health & Nutrition',
      'Cold Drinks',
      'Kitchen Essentials',
      'Juices & Dairy Drinks',

      'Juices',
      'Cold Drinks & Juices',
      'Cleaning Essentials',
      'Home and Offices',
      'Organic & Healthy Living',
      'Snacks & Munchies',
      'Sweet Tooth',
      'Chocolates & Candies',
      'Ice Creams & Desserts',
      'Pet Care',
      'Baby Care',
      'Paan Corner',
      'Pharmacy',
      'Snacks',
      'Beverages',
      'Personal Care',
      'Home Care',
      'Sauces & Spreads',
      'Sauces Spreads',
      'Other'
    ]
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  oldPrice: {
    type: Number,
    default: 0
  },
  weight: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 100,
    min: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  discount: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);