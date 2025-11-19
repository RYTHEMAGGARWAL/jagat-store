// migrate_bakery_biscuits_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_bakery_biscuits_IMPROVED.js

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

// ========== BAKERY & BISCUITS PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const bakeryBiscuitsProducts = [
  // MARIE BISCUITS
  {
    name: 'Parle Marie Biscuits',
    weight: '250g',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://m.media-amazon.com/images/I/61Y8qKFHE1L._SL1080_.jpg',
    inStock: true,
    description: 'Classic Marie biscuits, perfect with tea',
    stock: 150
  },
  {
    name: 'Britannia Marie Gold',
    weight: '500g',
    price: 65,
    oldPrice: 72,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://m.media-amazon.com/images/I/71NU0VXOqtL._SL1500_.jpg',
    inStock: true,
    description: 'Premium Marie biscuits with rich taste',
    stock: 120
  },

  // GLUCOSE BISCUITS
  {
    name: 'Parle-G Gold Biscuits',
    weight: '1kg',
    price: 120,
    oldPrice: 135,
    discount: '11% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://m.media-amazon.com/images/I/71ScHJ6LPQL._SL1500_.jpg',
    inStock: true,
    description: 'India\'s favorite glucose biscuits',
    stock: 200
  },
  {
    name: 'Britannia 50-50 Biscuits',
    weight: '400g',
    price: 55,
    oldPrice: 62,
    discount: '11% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://m.media-amazon.com/images/I/71r5eF3Z5bL._SL1500_.jpg',
    inStock: true,
    description: 'Sweet and salty biscuits combo',
    stock: 130
  },

  // CREAM BISCUITS
  {
    name: 'Britannia Bourbon Biscuits',
    weight: '400g',
    price: 80,
    oldPrice: 90,
    discount: '11% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://m.media-amazon.com/images/I/71L4zBm8qTL._SL1500_.jpg',
    inStock: true,
    description: 'Chocolate cream biscuits',
    stock: 140
  },
  {
    name: 'Parle Hide & Seek Biscuits',
    weight: '600g',
    price: 110,
    oldPrice: 125,
    discount: '12% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://m.media-amazon.com/images/I/71rOdW8NVZL._SL1500_.jpg',
    inStock: true,
    description: 'Chocolate chip cookies',
    stock: 100
  },
  {
    name: 'Sunfeast Dark Fantasy Biscuits',
    weight: '300g',
    price: 95,
    oldPrice: 105,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Sunfeast',
    image: 'https://m.media-amazon.com/images/I/71qEqaHRQBL._SL1500_.jpg',
    inStock: true,
    description: 'Premium chocolate biscuits',
    stock: 90
  },

  // COOKIES
  {
    name: 'Britannia Good Day Butter Cookies',
    weight: '600g',
    price: 120,
    oldPrice: 135,
    discount: '11% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://m.media-amazon.com/images/I/71vKdS5WOzL._SL1500_.jpg',
    inStock: true,
    description: 'Rich butter cookies',
    stock: 110
  },
  {
    name: 'Sunfeast Mom\'s Magic Cookies',
    weight: '600g',
    price: 115,
    oldPrice: 130,
    discount: '12% OFF',
    category: 'Bakery Biscuits',
    brand: 'Sunfeast',
    image: 'https://m.media-amazon.com/images/I/71eRJz0IOQL._SL1500_.jpg',
    inStock: true,
    description: 'Homemade taste cookies',
    stock: 95
  },
  {
    name: 'Oreo Cream Biscuits',
    weight: '600g',
    price: 140,
    oldPrice: 160,
    discount: '13% OFF',
    category: 'Bakery Biscuits',
    brand: 'Oreo',
    image: 'https://m.media-amazon.com/images/I/71KBJj2GUOL._SL1500_.jpg',
    inStock: true,
    description: 'World\'s favorite sandwich cookie',
    stock: 120
  },

  // BREAD & PAV
  {
    name: 'Britannia Bread - White',
    weight: '400g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://m.media-amazon.com/images/I/71SRpZ3KGJL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh white bread',
    stock: 80
  },
  {
    name: 'Modern Brown Bread',
    weight: '400g',
    price: 55,
    oldPrice: 62,
    discount: '11% OFF',
    category: 'Bakery Biscuits',
    brand: 'Modern',
    image: 'https://m.media-amazon.com/images/I/71B2kYGn9dL._SL1500_.jpg',
    inStock: true,
    description: 'Healthy brown bread',
    stock: 70
  },
  {
    name: 'Wibs Premium Pav',
    weight: '6 pcs',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Wibs',
    image: 'https://m.media-amazon.com/images/I/51VxJKm6wKL._SL1080_.jpg',
    inStock: true,
    description: 'Fresh pav bread',
    stock: 100
  },

  // RUSK & TOAST
  {
    name: 'Britannia Rusk',
    weight: '600g',
    price: 75,
    oldPrice: 85,
    discount: '12% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://m.media-amazon.com/images/I/71aEhEhBZLL._SL1500_.jpg',
    inStock: true,
    description: 'Crispy tea rusk',
    stock: 90
  },
  {
    name: 'Britannia Cake Rusk',
    weight: '400g',
    price: 60,
    oldPrice: 68,
    discount: '12% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://m.media-amazon.com/images/I/71MH8iGQ5PL._SL1500_.jpg',
    inStock: true,
    description: 'Sweet cake rusk',
    stock: 85
  }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍪 Starting Smart Migration for Bakery & Biscuits Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Bakery Biscuits" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of bakeryBiscuitsProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Bakery Biscuits" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();