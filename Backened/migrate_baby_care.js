// migrate_baby_care_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_baby_care_IMPROVED.js

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

// ========== BABY CARE PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const babyCareProducts = [
  // DIAPERS
  { 
    name: "Pampers Baby Dry Pants", 
    weight: "Medium (56 pieces)", 
    price: 899, 
    oldPrice: 999, 
    discount: "10% OFF", 
    category: "Baby Care", 
    brand: "Pampers", 
    image: "https://m.media-amazon.com/images/I/71t3HbL5+qL._SL1500_.jpg", 
    inStock: true, 
    description: "12 hours dryness",
    stock: 50
  },
  { 
    name: "Pampers Baby Dry Pants", 
    weight: "Large (48 pieces)", 
    price: 899, 
    oldPrice: 999, 
    discount: "10% OFF", 
    category: "Baby Care", 
    brand: "Pampers", 
    image: "https://m.media-amazon.com/images/I/71YXMBMj-fL._SL1500_.jpg", 
    inStock: true, 
    description: "Extra absorption",
    stock: 50
  },
  { 
    name: "Pampers Baby Dry Pants", 
    weight: "Small (62 pieces)", 
    price: 899, 
    oldPrice: 999, 
    discount: "10% OFF", 
    category: "Baby Care", 
    brand: "Pampers", 
    image: "https://m.media-amazon.com/images/I/71oqzW7QISL._SL1500_.jpg", 
    inStock: true, 
    description: "For newborns",
    stock: 50
  },
  { 
    name: "Mamy Poko Pants", 
    weight: "Medium (54 pieces)", 
    price: 850, 
    oldPrice: 950, 
    discount: "11% OFF", 
    category: "Baby Care", 
    brand: "Mamy Poko", 
    image: "https://m.media-amazon.com/images/I/81EQY8TuBuL._SL1500_.jpg", 
    inStock: true, 
    description: "Extra absorb pants",
    stock: 50
  },
  { 
    name: "Mamy Poko Pants", 
    weight: "Large (46 pieces)", 
    price: 850, 
    oldPrice: 950, 
    discount: "11% OFF", 
    category: "Baby Care", 
    brand: "Mamy Poko", 
    image: "https://m.media-amazon.com/images/I/71jYGx3ZBZL._SL1500_.jpg", 
    inStock: true, 
    description: "Comfortable fit",
    stock: 50
  },
  { 
    name: "Huggies Wonder Pants", 
    weight: "Medium (56 pieces)", 
    price: 950, 
    oldPrice: 1050, 
    discount: "10% OFF", 
    category: "Baby Care", 
    brand: "Huggies", 
    image: "https://m.media-amazon.com/images/I/71qh0zvEoqL._SL1500_.jpg", 
    inStock: true, 
    description: "Bubble bed comfort",
    stock: 50
  },
  
  // WIPES
  { 
    name: "Pampers Baby Wipes", 
    weight: "Pack of 72", 
    price: 199, 
    oldPrice: 229, 
    discount: "13% OFF", 
    category: "Baby Care", 
    brand: "Pampers", 
    image: "https://m.media-amazon.com/images/I/71HM9YD+FIL._SL1500_.jpg", 
    inStock: true, 
    description: "Gentle fresh wipes",
    stock: 50
  },
  { 
    name: "Himalaya Baby Wipes", 
    weight: "Pack of 72", 
    price: 149, 
    category: "Baby Care", 
    brand: "Himalaya", 
    image: "https://m.media-amazon.com/images/I/71QlcLaGnwL._SL1500_.jpg", 
    inStock: true, 
    description: "Herbal gentle wipes",
    stock: 50
  },
  { 
    name: "Johnson's Baby Wipes", 
    weight: "Pack of 80", 
    price: 180, 
    oldPrice: 210, 
    discount: "14% OFF", 
    category: "Baby Care", 
    brand: "Johnson's", 
    image: "https://m.media-amazon.com/images/I/71T8XYfBrjL._SL1500_.jpg", 
    inStock: true, 
    description: "Extra sensitive wipes",
    stock: 50
  },
  
  // JOHNSON'S BABY CARE
  { 
    name: "Johnson's Baby Powder", 
    weight: "400g", 
    price: 245, 
    oldPrice: 275, 
    discount: "11% OFF", 
    category: "Baby Care", 
    brand: "Johnson's", 
    image: "https://m.media-amazon.com/images/I/61OKl8eCXzL._SL1500_.jpg", 
    inStock: true, 
    description: "Classic baby powder",
    stock: 50
  },
  { 
    name: "Johnson's Baby Oil", 
    weight: "200ml", 
    price: 185, 
    oldPrice: 210, 
    discount: "12% OFF", 
    category: "Baby Care", 
    brand: "Johnson's", 
    image: "https://m.media-amazon.com/images/I/51wJ6S3rXqL._SL1024_.jpg", 
    inStock: true, 
    description: "Pure baby oil",
    stock: 50
  },
  { 
    name: "Johnson's Baby Shampoo", 
    weight: "200ml", 
    price: 175, 
    category: "Baby Care", 
    brand: "Johnson's", 
    image: "https://m.media-amazon.com/images/I/61ftkYAMcmL._SL1500_.jpg", 
    inStock: true, 
    description: "No more tears formula",
    stock: 50
  },
  { 
    name: "Johnson's Baby Soap", 
    weight: "Pack of 3", 
    price: 135, 
    category: "Baby Care", 
    brand: "Johnson's", 
    image: "https://m.media-amazon.com/images/I/61-9l3LbCvL._SL1500_.jpg", 
    inStock: true, 
    description: "Mild baby soap",
    stock: 50
  },
  { 
    name: "Johnson's Baby Lotion", 
    weight: "200ml", 
    price: 195, 
    oldPrice: 220, 
    discount: "11% OFF", 
    category: "Baby Care", 
    brand: "Johnson's", 
    image: "https://m.media-amazon.com/images/I/51xBTG5rZbL._SL1024_.jpg", 
    inStock: true, 
    description: "24hr moisture",
    stock: 50
  },
  
  // BABY FOOD
  { 
    name: "Cerelac Wheat", 
    weight: "300g", 
    price: 185, 
    category: "Baby Care", 
    brand: "Nestle", 
    image: "https://m.media-amazon.com/images/I/71PB0J+1OyL._SL1500_.jpg", 
    inStock: true, 
    description: "6+ months baby cereal",
    stock: 50
  },
  { 
    name: "Cerelac Rice", 
    weight: "300g", 
    price: 185, 
    category: "Baby Care", 
    brand: "Nestle", 
    image: "https://m.media-amazon.com/images/I/71N-1zp8ZsL._SL1500_.jpg", 
    inStock: true, 
    description: "First solid food",
    stock: 50
  },
  { 
    name: "Lactogen 2", 
    weight: "400g", 
    price: 399, 
    oldPrice: 445, 
    discount: "10% OFF", 
    category: "Baby Care", 
    brand: "Nestle", 
    image: "https://m.media-amazon.com/images/I/71c0Zya7AML._SL1500_.jpg", 
    inStock: true, 
    description: "Infant formula 0-6 months",
    stock: 50
  },
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n👶 Starting Smart Migration for Baby Care Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Baby Care" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of babyCareProducts) {
      const key = `${productData.name}_${productData.weight}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        // ADD NEW PRODUCT
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
        // CHECK IF UPDATE NEEDED
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
          // UPDATE PRODUCT
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
    // DELETE products that are no longer in source
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
    
    // Summary
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Baby Care" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();