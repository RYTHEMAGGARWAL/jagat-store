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

// ============ MAMY POKO PANTS - ALL NIGHT ABSORB ============
{
    name: 'Mamy Poko Pants All Night Absorb - M',
    weight: '30 Pants',
    price: 320,
    oldPrice: 399,
    discount: '20% OFF',
    category: 'Baby Care',
    brand: 'Mamy Poko',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Tlgc_ueL0MNo970_rjJmGQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Mamy Poko Pants All Night Absorb | Medium Size (7-12 kg) | 12 Hours Absorption | 30 Pants',
    stock: 100
},
{
    name: 'Mamy Poko Pants All Night Absorb - L',
    weight: '28 Pants',
    price: 320,
    oldPrice: 399,
    discount: '20% OFF',
    category: 'Baby Care',
    brand: 'Mamy Poko',
    image: 'https://tse1.mm.bing.net/th/id/OIP.DnHra3Aa0mcUkce7j7EaqQAAAA?pid=Api&P=0&w=300&h=120',
    inStock: true,
    description: 'Mamy Poko Pants All Night Absorb | Large Size (9-14 kg) | 12 Hours Absorption | 28 Pants',
    stock: 100
},
{
    name: 'Mamy Poko Pants All Night Absorb - XL',
    weight: '22 Pants',
  price: 320,
    oldPrice: 399,
    discount: '20% OFF',
    category: 'Baby Care',
    brand: 'Mamy Poko',
    image: 'https://tse2.mm.bing.net/th/id/OIP.bkt-JxFTFyYau26unTfotQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Mamy Poko Pants All Night Absorb | Extra Large Size (12-17 kg) | 12 Hours Absorption | 22 Pants',
    stock: 100
},
{
    name: 'Mamy Poko Pants All Night Absorb - XXL',
    weight: '17 Pants',
   price: 320,
    oldPrice: 399,
    discount: '20% OFF',
    category: 'Baby Care',
    brand: 'Mamy Poko',
    image: 'https://tse2.mm.bing.net/th/id/OIP.bkt-JxFTFyYau26unTfotQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Mamy Poko Pants All Night Absorb | XXL Size (15-25 kg) | 12 Hours Absorption | 17 Pants',
    stock: 100
},
{
    name: 'Mamy Poko Pants All Night Absorb - New Born',
    weight: '42 Pants',
   price: 320,
    oldPrice: 399,
    discount: '20% OFF',
    category: 'Baby Care',
    brand: 'Mamy Poko',
    image: '	https://tse1.mm.bing.net/th/id/OIP.EqtkowL0CHeefUiy7LNdywAAAA?pid=Api&P=0&w=300&h=300',
    inStock: true,
    description: 'Mamy Poko Pants All Night Absorb | New Born Size (Up to 5 kg) | 12 Hours Absorption | 42 Pants',
    stock: 100
},

// ============ MAMY POKO PANTS - SMALL PACKS ============
{
    name: 'Mamy Poko Pants - S',
    weight: '20 Pants',
    price: 190,
    oldPrice: 210,
    discount: '10% OFF',
    category: 'Baby Care',
    brand: 'Mamy Poko',
    image: 'https://tse1.mm.bing.net/th/id/OIP.g8x9ki5s_MMhjdU0bntqBwAAAA?pid=Api&P=0&w=407&h=383',
    inStock: true,
    description: 'Mamy Poko Pants | Small Size (4-8 kg) | Soft & Comfortable | 20 Pants',
    stock: 100
},
{
    name: 'Mamy Poko Pants - L',
    weight: '14 Pants',
    price: 190,
    oldPrice: 210,
    discount: '10% OFF',
    category: 'Baby Care',
    brand: 'Mamy Poko',
    image: '	https://tse2.mm.bing.net/th/id/OIP.w8bGvnaP9PRDf9UKRolVXgHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Mamy Poko Pants | Large Size (9-14 kg) | Soft & Comfortable | 14 Pants',
    stock: 100
},
{
    name: 'Bonny Silicone Nipple',
    weight: '1pc',
    price: 40,
    oldPrice: 50,
    discount: '20% OFF',
    category: 'Baby Care',
    brand: 'Bonny',
    image: '	https://tse2.mm.bing.net/th/id/OIP.QP7jpWfKh4F8mQ5uZI9_9wHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Bonny Silicone Nipple | Medium Size | Soft & Safe | BPA Free | 1 Piece',
    stock: 100
},
{
    name: 'Bonny Feeding Bottle',
    weight: '120ml',
    price: 199,
    oldPrice: 240,
    discount: '17% OFF',
    category: 'Baby Care',
    brand: 'Bonny',
    image: 'https://tse1.mm.bing.net/th/id/OIP.g521OGIbjlfnzsL8zvlXrgAAAA?pid=Api&P=0&w=400&h=449',
    inStock: true,
    description: 'Bonny Feeding Bottle | 120ml | Peristaltic Nipple | BPA Free',
    stock: 60
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