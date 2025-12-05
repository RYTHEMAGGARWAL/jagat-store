// Backend/models/StoreSettings.js - Store ON/OFF Settings

const mongoose = require('mongoose');

const storeSettingsSchema = new mongoose.Schema({
  // There will be only ONE document in this collection
  settingId: {
    type: String,
    default: 'main',
    unique: true
  },
  
  // 🏪 Store Status
  isStoreOpen: {
    type: Boolean,
    default: true
  },
  
  // 📝 Custom closed message
  closedMessage: {
    type: String,
    default: 'We are currently closed. Please check back later!'
  },
  
  // ⏰ Opening time (for display)
  openingTime: {
    type: String,
    default: '9:00 AM'
  },
  
  // 📅 Expected reopen date (optional)
  reopenDate: {
    type: Date,
    default: null
  },
  
  // 🔔 Show banner even when open (for announcements)
  showAnnouncement: {
    type: Boolean,
    default: false
  },
  
  // 📢 Announcement message
  announcementMessage: {
    type: String,
    default: ''
  },
  
  // 👤 Last updated by
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // 📊 Store closing history
  closingHistory: [{
    action: {
      type: String,
      enum: ['opened', 'closed']
    },
    reason: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
  
}, {
  timestamps: true
});

// Ensure only one settings document exists
storeSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne({ settingId: 'main' });
  
  if (!settings) {
    settings = await this.create({
      settingId: 'main',
      isStoreOpen: true,
      closedMessage: 'We are currently closed. Please check back later!',
      openingTime: '9:00 AM'
    });
  }
  
  return settings;
};

module.exports = mongoose.model('StoreSettings', storeSettingsSchema);