const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

console.log('📦 ORDER ROUTES LOADED - Using orderController');

// Create order
router.post('/', auth, orderController.createOrder);

// Get my orders
router.get('/myorders', auth, orderController.getMyOrders);

// Get all orders (admin) OR my orders (user)
router.get('/', auth, async (req, res, next) => {
  if (req.user.role === 'admin') {
    return orderController.getAllOrders(req, res, next);
  } else {
    return orderController.getMyOrders(req, res, next);
  }
});

// Get order by ID
router.get('/:id', auth, orderController.getOrderById);

// Update order status (admin only)
router.put('/:id/status', auth, async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  return orderController.updateOrderStatus(req, res, next);
});

// Cancel order
router.put('/:id/cancel', auth, orderController.cancelOrder);

// Delete order (admin only)
router.delete('/:id', auth, async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  return orderController.deleteOrder(req, res, next);
});

module.exports = router;