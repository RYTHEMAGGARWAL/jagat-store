// DELETE_CATEGORIES.js
// Run: node DELETE_CATEGORIES.js

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB\n'))
  .catch(err => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

// ============================================
// ⚠️ EDIT THIS ARRAY - ADD CATEGORIES TO DELETE
// ============================================
const CATEGORIES_TO_DELETE = [
  // 'Personal Care',
  // 'Jagat Store',
  // 'Home and Offices',
  // 'Organic & Healthy Living',
  
  'Tea Coffee',
  'Grocery',
  'Home & Office',
  

  



];
// ============================================

async function deleteCategories() {
  try {
    console.log('='.repeat(50));
    console.log('🗑️  DELETE CATEGORIES TOOL');
    console.log('='.repeat(50) + '\n');

    if (CATEGORIES_TO_DELETE.length === 0) {
      console.log('⚠️  No categories specified to delete!');
      console.log('\n📝 How to use:');
      console.log('   1. Open this file');
      console.log('   2. Find CATEGORIES_TO_DELETE array');
      console.log('   3. Uncomment or add category names');
      console.log('   4. Run again\n');
      await mongoose.disconnect();
      return;
    }

    // Show current stats
    const totalBefore = await Product.countDocuments();
    console.log(`📦 Total products before: ${totalBefore}\n`);

    console.log('━'.repeat(50));
    console.log('🎯 Categories to DELETE:');
    console.log('━'.repeat(50) + '\n');

    let totalToDelete = 0;

    for (const category of CATEGORIES_TO_DELETE) {
      const count = await Product.countDocuments({ category: category });
      console.log(`   ❌ "${category}" - ${count} products`);
      totalToDelete += count;
    }

    console.log('\n━'.repeat(50));
    console.log(`\n⚠️  Total products to be DELETED: ${totalToDelete}`);
    console.log(`📦 Products remaining after: ${totalBefore - totalToDelete}\n`);

    // Delete products
    console.log('🗑️  Deleting...\n');

    for (const category of CATEGORIES_TO_DELETE) {
      const result = await Product.deleteMany({ category: category });
      console.log(`   ✅ Deleted "${category}" - ${result.deletedCount} products removed`);
    }

    const totalAfter = await Product.countDocuments();

    console.log('\n' + '━'.repeat(50));
    console.log('\n📊 SUMMARY:');
    console.log(`   📦 Products before: ${totalBefore}`);
    console.log(`   📦 Products after: ${totalAfter}`);
    console.log(`   🗑️  Total deleted: ${totalBefore - totalAfter}`);
    console.log('\n✅ Done!\n');

    await mongoose.disconnect();

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

deleteCategories();