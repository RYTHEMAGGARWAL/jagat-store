// migrate_snacks_munchies_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_snacks_munchies_IMPROVED.js

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

// ========== SNACKS & MUNCHIES PRODUCTS ==========
const snacksMunchiesProducts = [
  // CHIPS - LAYS
 {
  name: 'Maggi 2-Minute Noodles',
  weight: '70g',
  price: 14,
  oldPrice: 17,
  discount: '18% OFF',
 category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.YlCrzPhIVtJ5uHUF0sH-eAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Single Pack | 70g',
  stock: 300
},
{
  name: 'Maggi 2-Minute Noodles',
  weight: '70g x 4',
  price: 56,
  oldPrice: 68,
  discount: '18% OFF',
category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: '	https://tse2.mm.bing.net/th/id/OIP.MrH6KdkCcD1rSRiVX_EY_gHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Pack of 4',
  stock: 200
},
{
  name: 'Maggi 2-Minute Noodles',
  weight: '70g x 6',
  price: 84,
  oldPrice: 102,
  discount: '18% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse2.mm.bing.net/th/id/OIP.VcjR5Jvl05HKKlAiiSJd5wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Pack of 6',
  stock: 150
},
{
  name: 'Maggi 2-Minute Noodles',
  weight: '70g x 8',
  price: 112,
  oldPrice: 136,
  discount: '18% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.W-S4ZHXW4Q-zqOhTfyg2QgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Family Pack of 8',
  stock: 120
},

// ATTA MAGGI (WHOLE WHEAT)
{
  name: 'Maggi Atta Noodles',
  weight: '70g',
  price: 15,
  oldPrice: 18,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: '	https://tse2.mm.bing.net/th/id/OIP.vTtbCYEuomwUMPlCMpciogHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi Nutri-licious Atta Noodles | Whole Wheat | Single Pack',
  stock: 180
},
{
  name: 'Maggi Atta Noodles',
  weight: '70g x 4',
  price: 60,
  oldPrice: 72,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.8JUuAk13XJHADManzw_lDwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi Nutri-licious Atta Noodles | Whole Wheat | Pack of 4',
  stock: 120
},

// MAGGI PASTA (WHITE & RED MASALA)
{
  name: 'Maggi Pazzta Cheese Macaroni',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.p8un027z54cQrGHX7ONUXwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi Pazzta | Cheese Macaroni | White Sauce | Instant | 70g',
  stock: 130
},
{
  name: 'Maggi Pazzta Masala Penne',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.0PG3wUETLaUyE0r0fMJXjAHaEK?pid=Api&H=89&W=160',
  inStock: true,
  description: 'Maggi Pazzta | Masala Penne | Red Sauce | Instant | 70g',
  stock: 130
},
{
  name: 'Maggi Pazzta Tomato',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: '	https://tse1.mm.bing.net/th/id/OIP.5TuB8QpoeC2q2EbOLpXtSQHaES?pid=Api&P=0&w=692&h=400',
  inStock: true,
  description: 'Maggi Pazzta | Tomato | Red Sauce | Instant | 70g',
  stock: 130
}
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍿 Starting Smart Migration for Snacks & Munchies...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Snacks & Munchies" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of snacksMunchiesProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Snacks & Munchies" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🥔 Chips (Lays, Kurkure, Bingo): 7 products');
    console.log('   🌾 Namkeen (Haldiram\'s, Bikaji): 6 products');
    console.log('   🥜 Premium & Healthy: 3 products');
    console.log('   🧀 International (Pringles, Doritos): 4 products');
    console.log('   🥜 Nuts & Seeds: 2 products');
    console.log('   🍪 Biscuit Snacks: 3 products');
    console.log('   🍿 Popcorn: 1 product');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();