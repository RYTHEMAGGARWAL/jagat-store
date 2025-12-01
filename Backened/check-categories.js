// CHECK_CATEGORIES.js
// Run: node CHECK_CATEGORIES.js

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

async function checkCategories() {
  try {
    console.log('='.repeat(50));
    console.log('📊 DATABASE CATEGORY REPORT');
    console.log('='.repeat(50) + '\n');

    // Get total products
    const totalProducts = await Product.countDocuments();
    console.log(`📦 Total Products: ${totalProducts}\n`);

    // Get categories with count
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    console.log('━'.repeat(50));
    console.log('📂 CATEGORIES:');
    console.log('━'.repeat(50) + '\n');

    categories.forEach((cat, index) => {
      const categoryName = cat._id || '(No Category)';
      const percentage = ((cat.count / totalProducts) * 100).toFixed(1);
      console.log(`${index + 1}. ${categoryName}`);
      console.log(`   └─ ${cat.count} products (${percentage}%)\n`);
    });

    console.log('━'.repeat(50));
    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total Categories: ${categories.length}`);
    console.log(`   Total Products: ${totalProducts}\n`);

    await mongoose.disconnect();
    console.log('✅ Done!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

checkCategories();