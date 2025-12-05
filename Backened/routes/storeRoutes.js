// Backend/routes/storeRoutes.js - WITH AUTO-REOPEN (TIMEZONE FIXED)

const express = require('express');
const router = express.Router();
const StoreSettings = require('../models/StoreSettings');
const auth = require('../middleware/auth');

// ============================================
// 🌐 PUBLIC ROUTES (No Auth Required)
// ============================================

// GET /api/store/status - Get store status (PUBLIC)
router.get('/status', async (req, res) => {
  try {
    const settings = await StoreSettings.getSettings();
    
    // 🔄 AUTO-REOPEN CHECK
    if (!settings.isStoreOpen && settings.reopenDate) {
      const now = Date.now();
      const reopenTime = new Date(settings.reopenDate).getTime();
      
      console.log('⏰ Auto-reopen check:');
      console.log('   Current time:', new Date(now).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      console.log('   Reopen time:', new Date(reopenTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      console.log('   Difference (ms):', now - reopenTime);
      
      if (now >= reopenTime) {
        // Time has passed, auto-open the store!
        settings.isStoreOpen = true;
        settings.reopenDate = null;
        
        settings.closingHistory.push({
          action: 'opened',
          reason: 'Auto-opened (scheduled reopen time reached)',
          timestamp: new Date()
        });
        
        if (settings.closingHistory.length > 50) {
          settings.closingHistory = settings.closingHistory.slice(-50);
        }
        
        await settings.save();
        
        console.log('✅ Store AUTO-OPENED!');
      } else {
        console.log('⏳ Store still closed. Time remaining:', Math.round((reopenTime - now) / 1000 / 60), 'minutes');
      }
    }
    
    res.json({
      success: true,
      isStoreOpen: settings.isStoreOpen,
      closedMessage: settings.closedMessage,
      openingTime: settings.openingTime,
      reopenDate: settings.reopenDate,
      showAnnouncement: settings.showAnnouncement,
      announcementMessage: settings.announcementMessage,
      serverTime: new Date().toISOString() // For debugging
    });
  } catch (error) {
    console.error('❌ Get store status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get store status'
    });
  }
});

// ============================================
// 🔐 ADMIN ROUTES (Auth Required)
// ============================================

// GET /api/store/settings - Get full settings (ADMIN)
router.get('/settings', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    const settings = await StoreSettings.getSettings();
    
    res.json({
      success: true,
      settings: settings,
      serverTime: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get settings'
    });
  }
});

// PUT /api/store/toggle - Toggle store ON/OFF (ADMIN)
router.put('/toggle', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    const { isOpen, closedMessage, openingTime, reopenDate, reason } = req.body;
    
    const settings = await StoreSettings.getSettings();
    
    if (typeof isOpen === 'boolean') {
      settings.isStoreOpen = isOpen;
      
      settings.closingHistory.push({
        action: isOpen ? 'opened' : 'closed',
        reason: reason || (isOpen ? 'Store reopened by admin' : 'Store closed by admin'),
        timestamp: new Date(),
        updatedBy: req.user._id
      });
      
      if (settings.closingHistory.length > 50) {
        settings.closingHistory = settings.closingHistory.slice(-50);
      }
      
      if (isOpen) {
        settings.reopenDate = null;
      }
    }
    
    if (closedMessage) {
      settings.closedMessage = closedMessage;
    }
    
    if (openingTime) {
      settings.openingTime = openingTime;
    }
    
    // Handle reopen date - store as UTC
    if (reopenDate !== undefined) {
      if (reopenDate) {
        settings.reopenDate = new Date(reopenDate);
        console.log('📅 Reopen date set to:', settings.reopenDate.toISOString());
        console.log('   In IST:', settings.reopenDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      } else {
        settings.reopenDate = null;
      }
    }
    
    settings.lastUpdatedBy = req.user._id;
    
    await settings.save();
    
    console.log(`🏪 Store ${isOpen ? 'OPENED' : 'CLOSED'} by admin`);
    
    res.json({
      success: true,
      message: `Store ${settings.isStoreOpen ? 'opened' : 'closed'} successfully!`,
      settings: {
        isStoreOpen: settings.isStoreOpen,
        closedMessage: settings.closedMessage,
        openingTime: settings.openingTime,
        reopenDate: settings.reopenDate
      }
    });
  } catch (error) {
    console.error('❌ Toggle store error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update store status'
    });
  }
});

// PUT /api/store/announcement - Update announcement (ADMIN)
router.put('/announcement', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    const { showAnnouncement, announcementMessage } = req.body;
    
    const settings = await StoreSettings.getSettings();
    
    if (typeof showAnnouncement === 'boolean') {
      settings.showAnnouncement = showAnnouncement;
    }
    
    if (announcementMessage !== undefined) {
      settings.announcementMessage = announcementMessage;
    }
    
    settings.lastUpdatedBy = req.user._id;
    
    await settings.save();
    
    res.json({
      success: true,
      message: 'Announcement updated!',
      settings: {
        showAnnouncement: settings.showAnnouncement,
        announcementMessage: settings.announcementMessage
      }
    });
  } catch (error) {
    console.error('❌ Update announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement'
    });
  }
});

// GET /api/store/history - Get closing history (ADMIN)
router.get('/history', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    const settings = await StoreSettings.getSettings();
    
    const history = settings.closingHistory
      .slice(-20)
      .reverse();
    
    res.json({
      success: true,
      history: history
    });
  } catch (error) {
    console.error('❌ Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get history'
    });
  }
});

// POST /api/store/force-open - Force open store NOW (ADMIN)
router.post('/force-open', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    const settings = await StoreSettings.getSettings();
    
    settings.isStoreOpen = true;
    settings.reopenDate = null;
    
    settings.closingHistory.push({
      action: 'opened',
      reason: 'Force opened by admin',
      timestamp: new Date(),
      updatedBy: req.user._id
    });
    
    await settings.save();
    
    console.log('🔓 Store FORCE OPENED by admin');
    
    res.json({
      success: true,
      message: 'Store opened successfully!',
      isStoreOpen: true
    });
    
  } catch (error) {
    console.error('❌ Force open error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to open store'
    });
  }
});

module.exports = router;