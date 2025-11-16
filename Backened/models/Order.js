// Backend/models/Order.js - Complete Order Model

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String
    }
  }],
  
  shippingAddress: {
    fullAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      default: 'Ghaziabad'
    },
    state: {
      type: String,
      default: 'Uttar Pradesh'
    },
    pincode: {
      type: String,
      default: '201001'
    },
    phone: {
      type: String,
      required: true
    }
  },
  
  paymentInfo: {
    method: {
      type: String,
      enum: ['COD', 'Card', 'UPI', 'Online'],
      default: 'COD'
    },
    status: {
      type: String,
      enum: ['Pending', 'Success', 'Failed'],
      default: 'Pending'
    }
  },
  
  itemsPrice: {
    type: Number,
    required: true,
    default: 0
  },
  
  taxPrice: {
    type: Number,
    default: 0
  },
  
  shippingPrice: {
    type: Number,
    default: 0
  },
  
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  
  orderStatus: {
    type: String,
    enum: ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  
  statusHistory: [{
    status: String,
    note: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  deliveredAt: Date
  
}, {
  timestamps: true
});

// Add initial status to history
orderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory.push({
      status: this.orderStatus,
      note: 'Order placed',
      timestamp: Date.now()
    });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);