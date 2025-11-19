// quick_fix_pet_care.js - Quick fix for mixed categories
// Run this: node quick_fix_pet_care.js

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

const quickFix = async () => {
  try {
    console.log('\n🔧 Quick Fix: Moving Baby Products from Pet Care to Baby Care...\n');
    
    // Baby Care keywords
    const babyKeywords = [
      'pampers', 'baby dry pants', 'mamy poko', 'huggies',
      'johnson', 'cerelac', 'lactogen', 'baby wipes',
      'baby oil', 'baby powder', 'baby shampoo', 'baby soap',
      'baby lotion', 'diaper'
    ];
    
    // Get all Pet Care products
    const petCareProducts = await Product.find({ category: "Pet Care" });
    console.log(`📦 Found ${petCareProducts.length} products in Pet Care category\n`);
    
    let moved = 0;
    
    for (const product of petCareProducts) {
      const productName = product.name.toLowerCase();
      const productBrand = product.brand.toLowerCase();
      
      // Check if it's a baby product
      const isBabyProduct = babyKeywords.some(keyword => 
        productName.includes(keyword) || productBrand.includes(keyword)
      );
      
      if (isBabyProduct) {
        await Product.findByIdAndUpdate(product._id, { category: "Baby Care" });
        console.log(`✅ MOVED: ${product.name} → Baby Care`);
        moved++;
      }
    }
    
    if (moved === 0) {
      console.log('✅ No baby products found in Pet Care. Categories are clean!');
    } else {
      console.log(`\n✅ Successfully moved ${moved} baby products to Baby Care`);
      
      // Show updated counts
      const petCount = await Product.countDocuments({ category: "Pet Care" });
      const babyCount = await Product.countDocuments({ category: "Baby Care" });
      
      console.log('\n📊 Updated Counts:');
      console.log(`   Pet Care: ${petCount} products`);
      console.log(`   Baby Care: ${babyCount} products`);
    }
    
    console.log('\n🎉 Fix Complete! Refresh your page.\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Error:', err);
    process.exit(1);
  }
};

quickFix();