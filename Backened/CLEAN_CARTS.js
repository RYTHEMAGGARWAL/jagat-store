// CLEAN_CARTS.js
// Run: node CLEAN_CARTS.js
// This removes cart items where product is null/deleted

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB\n'))
  .catch(err => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  hasGift: Boolean,
  giftItem: Object
}, { strict: false });

const Cart = mongoose.model('Cart', cartSchema);

async function cleanCarts() {
  try {
    console.log('='.repeat(50));
    console.log('🧹 CART CLEANUP - Remove Null Products');
    console.log('='.repeat(50) + '\n');

    // Find all carts
    const carts = await Cart.find({}).populate('items.product');
    
    console.log(`📦 Total carts found: ${carts.length}\n`);

    let cleanedCount = 0;
    let itemsRemoved = 0;

    for (const cart of carts) {
      const originalLength = cart.items.length;
      
      // Filter out items with null products
      const validItems = cart.items.filter(item => item.product != null);
      
      if (validItems.length < originalLength) {
        const removed = originalLength - validItems.length;
        itemsRemoved += removed;
        
        // Update cart directly in database (bypass validation)
        await Cart.updateOne(
          { _id: cart._id },
          { 
            $set: { 
              items: validItems.map(item => ({
                product: item.product._id,
                quantity: item.quantity
              }))
            } 
          }
        );
        
        console.log(`✅ Cart ${cart._id}: Removed ${removed} invalid items`);
        cleanedCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('\n📊 CLEANUP SUMMARY:');
    console.log(`   🛒 Carts cleaned: ${cleanedCount}`);
    console.log(`   🗑️  Items removed: ${itemsRemoved}`);
    console.log('\n✅ Done!\n');

    await mongoose.disconnect();

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

cleanCarts();