// migrate_sauces_spreads_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_sauces_spreads_IMPROVED.js

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

// ========== SAUCES & SPREADS PRODUCTS ==========
const saucesAndSpreadsProducts = [
  // TOMATO KETCHUP



// ========================================
// 🧄 MOTHERS GINGER GARLIC PASTE
// ========================================
{
    name: 'Mothers Recipe Ginger Garlic Paste',
    weight: '200g',
    price: 55,
    oldPrice: 70,
    discount: '21% OFF',
    category: 'Sauces & Spreads',
    brand: 'Mothers Recipe',
    image: '	https://tse1.mm.bing.net/th/id/OIP.8ugaHYJiZ_ipBAGhygB6xgAAAA?pid=Api&H=184&W=160',
    inStock: true,
    description: 'Mothers Recipe Ginger Garlic Paste | Ready to Use | No Preservatives | 200g',
    stock: 100
},


// ========================================
// 🧄 SMITH & JONES GINGER GARLIC PASTE
// ========================================
{
    name: 'Smith & Jones Ginger Garlic Paste',
    weight: '200g',
    price: 50,
    oldPrice: 65,
    discount: '23% OFF',
    category: 'Sauces & Spreads',
    brand: 'Smith & Jones',
    image: '	https://tse2.mm.bing.net/th/id/OIP.l37VKV0aX6CA0l3_a0z14AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Smith & Jones Ginger Garlic Paste | Ready to Cook | Fresh Taste | 200g',
    stock: 100
},


// ========================================
// 🍅 MOTHERS IMLI (TAMARIND) PASTE
// ========================================
{
    name: 'Mothers Recipe Imli Paste (Tamarind)',
    weight: '200g',
    price: 45,
    oldPrice: 60,
    discount: '25% OFF',
    category: 'Sauces & Spreads',
    brand: 'Mothers Recipe',
    image: 'https://tse2.mm.bing.net/th/id/OIP.VK7dX3jghf6MalcIRFTICgAAAA?pid=Api&H=184&W=160',
    inStock: true,
    description: 'Mothers Recipe Imli Paste | Tamarind Concentrate | For Chutney & Curries | 200g',
    stock: 100
},




 
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍯 Starting Smart Migration for Sauces & Spreads...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Sauces & Spreads" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of saucesAndSpreadsProducts) {
      const key = `${productData.name}_${productData.weight}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
        const needsUpdate = 
          existingProduct.price !== productData.price ||
          existingProduct.oldPrice !== productData.oldPrice ||
          existingProduct.discount !== productData.discount ||
          existingProduct.image !== productData.image ||
          existingProduct.description !== productData.description ||
          existingProduct.inStock !== productData.inStock ||
          existingProduct.stock !== productData.stock ||
          existingProduct.brand !== productData.brand;
        
        if (needsUpdate) {
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
    console.log('\n' + '━'.repeat(60));
    console.log('🗑️  Checking for products to delete...\n');
    
    let deleted = 0;
    for (const existingProduct of existingProducts) {
      const key = `${existingProduct.name}_${existingProduct.weight}`;
      if (!sourceProductKeys.has(key)) {
        await Product.findByIdAndDelete(existingProduct._id);
        console.log(`❌ DELETED: ${existingProduct.name} (${existingProduct.weight})`);
        deleted++;
      }
    }
    
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Sauces & Spreads" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🍅 Tomato Ketchup: 3 products');
    console.log('   🌶️  Chilli & Soy Sauce: 4 products');
    console.log('   🥪 Mayonnaise: 3 products');
    console.log('   🥜 Peanut Butter: 3 products');
    console.log('   🍓 Jams: 4 products');
    console.log('   🍫 Chocolate Spread: 3 products');
    console.log('   🍝 Pasta Sauce: 2 products');
    console.log('   🍯 Honey & Vinegar: 5 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();