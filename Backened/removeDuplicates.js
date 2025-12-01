// REMOVE_EXACT_DUPLICATES.js
// ✅ Removes ONLY exact duplicates (same name + weight + brand)
// ✅ Different weights like 1kg and 500g will NOT be affected
// 
// Run: node REMOVE_EXACT_DUPLICATES.js

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

async function removeExactDuplicates() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('🧹 EXACT DUPLICATE REMOVER');
    console.log('='.repeat(60));
    console.log('\n⚠️  This removes ONLY exact duplicates:');
    console.log('   - Same name (case-insensitive)');
    console.log('   - Same weight');
    console.log('   - Same brand');
    console.log('\n✅ Different weights will NOT be affected!');
    console.log('   Example: "Dettol 200ml" and "Dettol 500ml" both stay.\n');
    console.log('━'.repeat(60));

    const beforeCount = await Product.countDocuments();
    console.log(`\n📦 Products before cleanup: ${beforeCount}\n`);

    // Find duplicates based on name + weight + brand
    const duplicates = await Product.aggregate([
      {
        $group: {
          _id: {
            name: { $toLower: { $trim: { input: "$name" } } },
            weight: { $toLower: { $trim: { input: { $ifNull: ["$weight", ""] } } } },
            brand: { $toLower: { $trim: { input: { $ifNull: ["$brand", ""] } } } }
          },
          count: { $sum: 1 },
          docs: { $push: "$_id" },
          firstDoc: { $first: "$_id" },
          sampleName: { $first: "$name" },
          sampleWeight: { $first: "$weight" },
          sampleBrand: { $first: "$brand" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    if (duplicates.length === 0) {
      console.log('✅ No exact duplicates found! Database is clean.\n');
      await mongoose.disconnect();
      return;
    }

    console.log(`⚠️  Found ${duplicates.length} products with duplicates:\n`);

    let totalToDelete = 0;
    const idsToDelete = [];

    // Show what will be deleted
    duplicates.forEach((dup, index) => {
      const extraCopies = dup.count - 1;
      totalToDelete += extraCopies;
      
      console.log(`${index + 1}. "${dup.sampleName}" (${dup.sampleWeight || 'no weight'}) - ${dup.sampleBrand || 'no brand'}`);
      console.log(`   📋 ${dup.count} copies found, ${extraCopies} will be removed`);
      
      // Keep first one, mark rest for deletion
      dup.docs.slice(1).forEach(id => idsToDelete.push(id));
    });

    console.log('\n' + '━'.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   - Duplicate groups: ${duplicates.length}`);
    console.log(`   - Products to DELETE: ${totalToDelete}`);
    console.log(`   - Products to KEEP: ${beforeCount - totalToDelete}`);

    // Delete duplicates
    console.log('\n🗑️  Removing duplicates...\n');

    const result = await Product.deleteMany({
      _id: { $in: idsToDelete }
    });

    console.log(`✅ Deleted ${result.deletedCount} duplicate products!`);

    const afterCount = await Product.countDocuments();
    console.log(`\n📦 Products after cleanup: ${afterCount}`);
    console.log(`📉 Removed: ${beforeCount - afterCount} duplicates\n`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

removeExactDuplicates();