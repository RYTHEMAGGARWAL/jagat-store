// cleanup_categories.js - Fix category issues and clean database
// Run this FIRST before running individual migration scripts
// Usage: node cleanup_categories.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 50 },
  brand: { type: String, default: 'Generic' },
  rating: { type: Number, default: 4.0 },
  reviews: { type: Array, default: [] },
  weight: { type: String, default: '' },
  oldPrice: { type: Number },
  discount: { type: String },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

const cleanup = async () => {
  try {
    console.log('\n🧹 Starting Database Cleanup...\n');
    console.log('━'.repeat(60));
    
    // Get all products
    const allProducts = await Product.find({});
    console.log(`📦 Total products in database: ${allProducts.length}\n`);
    
    // Analyze by category
    const categoryCount = {};
    allProducts.forEach(product => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    
    console.log('📊 Current Category Distribution:');
    Object.keys(categoryCount).sort().forEach(category => {
      console.log(`   ${category}: ${categoryCount[category]} products`);
    });
    
    console.log('\n' + '━'.repeat(60));
    console.log('\n🔍 Checking for Category Issues...\n');
    
    // Check for wrong categorizations
    let fixed = 0;
    
    // Define category-specific keywords
    const categoryKeywords = {
      'Baby Care': ['baby', 'pampers', 'johnson', 'cerelac', 'lactogen', 'huggies', 'mamy poko', 'diaper', 'wipes'],
      'Pet Care': ['dog', 'cat', 'pet', 'pedigree', 'whiskas', 'drools', 'puppy', 'kitten', 'collar', 'litter'],
      'Atta Rice Dal': ['atta', 'rice', 'dal', 'wheat', 'basmati', 'toor', 'moong', 'chana']
    };
    
    // Check each product
    for (const product of allProducts) {
      const productName = product.name.toLowerCase();
      const productBrand = product.brand.toLowerCase();
      
      let correctCategory = null;
      
      // Check which category this product belongs to
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => 
          productName.includes(keyword) || productBrand.includes(keyword)
        )) {
          correctCategory = category;
          break;
        }
      }
      
      // If found wrong category, fix it
      if (correctCategory && product.category !== correctCategory) {
        console.log(`🔧 FIXING: "${product.name}"`);
        console.log(`   Old Category: ${product.category}`);
        console.log(`   New Category: ${correctCategory}`);
        
        await Product.findByIdAndUpdate(product._id, { category: correctCategory });
        fixed++;
      }
    }
    
    console.log('\n' + '━'.repeat(60));
    
    if (fixed > 0) {
      console.log(`\n✅ Fixed ${fixed} products with wrong categories`);
      
      // Show updated distribution
      const updatedProducts = await Product.find({});
      const updatedCategoryCount = {};
      updatedProducts.forEach(product => {
        updatedCategoryCount[product.category] = (updatedCategoryCount[product.category] || 0) + 1;
      });
      
      console.log('\n📊 Updated Category Distribution:');
      Object.keys(updatedCategoryCount).sort().forEach(category => {
        console.log(`   ${category}: ${updatedCategoryCount[category]} products`);
      });
    } else {
      console.log('\n✅ No category issues found! All products are properly categorized.');
    }
    
    console.log('\n━'.repeat(60));
    console.log('\n🎯 Cleanup Complete!\n');
    console.log('💡 Next Steps:');
    console.log('   1. Run: node migrate_atta_rice_dal_IMPROVED.js');
    console.log('   2. Run: node migrate_baby_care_IMPROVED.js');
    console.log('   3. Run: node migrate_pet_care_IMPROVED.js\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Cleanup Error:', err);
    process.exit(1);
  }
};

cleanup();