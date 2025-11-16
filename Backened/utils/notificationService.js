// Browser Push Notification Service
// This will show desktop notifications to admin

class NotificationService {
  constructor() {
    this.permission = 'default';
    this.init();
  }

  async init() {
    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.log('❌ Browser does not support notifications');
      return;
    }

    // Request permission
    this.permission = await Notification.requestPermission();
    console.log('🔔 Notification permission:', this.permission);
  }

  // Show new order notification
  showNewOrderNotification(order) {
    if (this.permission !== 'granted') {
      console.log('❌ Notification permission not granted');
      return;
    }

    const orderId = order._id.slice(-8).toUpperCase();
    const title = `🛒 New Order #${orderId}`;
    const options = {
      body: `₹${order.totalPrice} | ${order.orderItems.length} items | ${order.paymentInfo.method}`,
      icon: '/logo.png',
      badge: '/logo.png',
      tag: `order-${order._id}`,
      requireInteraction: true,
      vibrate: [200, 100, 200],
      data: {
        orderId: order._id,
        url: `/admin/orders/${order._id}`
      },
      actions: [
        {
          action: 'view',
          title: 'View Order'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    const notification = new Notification(title, options);

    // Play sound
    this.playNotificationSound();

    // Handle click
    notification.onclick = (event) => {
      event.preventDefault();
      window.open(`http://localhost:5173/admin/orders/${order._id}`, '_blank');
      notification.close();
    };

    // Auto close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
  }

  // Play notification sound
  playNotificationSound() {
    try {
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Audio play failed:', err));
    } catch (error) {
      console.log('❌ Sound error:', error);
    }
  }

  // Show status update notification
  showStatusUpdateNotification(order) {
    if (this.permission !== 'granted') return;

    const orderId = order._id.slice(-8).toUpperCase();
    const title = `📦 Order #${orderId} Updated`;
    const options = {
      body: `Status: ${order.orderStatus}`,
      icon: '/logo.png',
      tag: `order-status-${order._id}`
    };

    new Notification(title, options);
  }
}

export default new NotificationService();