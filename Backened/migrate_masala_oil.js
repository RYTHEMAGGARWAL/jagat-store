// migrate_masala_oil_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_masala_oil_IMPROVED.js

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

// ========== MASALA & OIL PRODUCTS ==========
const masalaOilProducts = [
  // COOKING OILS
  {
    name: 'Nature Fresh Refined Soyabean Oil Pouch',
    weight: '1L',
    price: 140,
    oldPrice: 155,
    discount: '10% OFF',
    category: 'Masala Oil',
    brand: 'Nature Fresh',
    image: 'https://m.media-amazon.com/images/I/61v2hL8LJqL._SL1500_.jpg',
    inStock: true,
    description: 'Refined soyabean cooking oil',
    stock: 100
  },
  {
    name: 'Nature Fresh Refined Soyabean Oil Can',
    weight: '5L',
    price: 730,
    oldPrice: 800,
    discount: '9% OFF',
    category: 'Masala Oil',
    brand: 'Nature Fresh',
    image: 'https://m.media-amazon.com/images/I/71gZnN0yTIL._SL1500_.jpg',
    inStock: true,
    description: 'Large can soyabean oil',
    stock: 80
  },
  {
    name: 'Nature Fresh Mustard Oil Can',
    weight: '5L',
    price: 925,
    oldPrice: 985,
    discount: '6% OFF',
    category: 'Masala Oil',
    brand: 'Nature Fresh',
    image: 'https://m.media-amazon.com/images/I/61wK5pBnSBL._SL1500_.jpg',
    inStock: true,
    description: 'Pure mustard oil large can',
    stock: 70
  },
  {
    name: 'Nature Fresh Mustard Oil Pouch',
    weight: '1L',
    price: 180,
    oldPrice: 195,
    discount: '8% OFF',
    category: 'Masala Oil',
    brand: 'Nature Fresh',
    image: 'https://m.media-amazon.com/images/I/61wK5pBnSBL._SL1500_.jpg',
    inStock: true,
    description: 'Pure mustard oil pouch',
    stock: 95
  },
  {
    name: 'Nature Fresh SunFlower Refined Oil',
    weight: '1L',
    price: 170,
    oldPrice: 185,
    discount: '8% OFF',
    category: 'Masala Oil',
    brand: 'Nature Fresh',
    image: 'https://m.media-amazon.com/images/I/61pqnVMg7BL._SL1500_.jpg',
    inStock: true,
    description: 'Light sunflower oil',
    stock: 90
  },
  {
    name: 'Fortune Refined Soyabean Oil Pouch',
    weight: '1L',
    price: 140,
    oldPrice: 155,
    discount: '10% OFF',
    category: 'Masala Oil',
    brand: 'Fortune',
    image: 'https://m.media-amazon.com/images/I/71vLnO6EQDL._SL1500_.jpg',
    inStock: true,
    description: 'Refined soyabean oil',
    stock: 100
  },
  {
    name: 'Fortune Mustard Oil Can',
    weight: '5L',
    price: 840,
    oldPrice: 985,
    discount: '15% OFF',
    category: 'Masala Oil',
    brand: 'Fortune',
    image: 'https://m.media-amazon.com/images/I/61K7rLr8pZL._SL1500_.jpg',
    inStock: true,
    description: 'Premium mustard oil',
    stock: 65
  },
  {
    name: 'Fortune Sunflower Oil',
    weight: '1L',
    price: 175,
    oldPrice: 190,
    discount: '8% OFF',
    category: 'Masala Oil',
    brand: 'Fortune',
    image: 'https://m.media-amazon.com/images/I/71bh8WLy9sL._SL1500_.jpg',
    inStock: true,
    description: 'Pure sunflower oil',
    stock: 85
  },
  {
    name: 'Dhara Mustard Oil',
    weight: '1L',
    price: 185,
    oldPrice: 200,
    discount: '8% OFF',
    category: 'Masala Oil',
    brand: 'Dhara',
    image: 'https://m.media-amazon.com/images/I/71Ev0MvKFIL._SL1500_.jpg',
    inStock: true,
    description: 'Kachi ghani mustard oil',
    stock: 80
  },
  {
    name: 'Saffola Gold Oil',
    weight: '1L',
    price: 220,
    oldPrice: 240,
    discount: '8% OFF',
    category: 'Masala Oil',
    brand: 'Saffola',
    image: 'https://m.media-amazon.com/images/I/61gN0BUgGUL._SL1500_.jpg',
    inStock: true,
    description: 'Healthy blended oil',
    stock: 75
  },

  // MASALA & SPICES - MDH
  {
    name: 'MDH Chana Masala',
    weight: '100g',
    price: 65,
    oldPrice: 72,
    discount: '10% OFF',
    category: 'Masala Oil',
    brand: 'MDH',
    image: 'https://m.media-amazon.com/images/I/81Z7+ej0hJL._SL1500_.jpg',
    inStock: true,
    description: 'Authentic chana masala spice',
    stock: 110
  },
  {
    name: 'MDH Garam Masala',
    weight: '100g',
    price: 70,
    oldPrice: 78,
    discount: '10% OFF',
    category: 'Masala Oil',
    brand: 'MDH',
    image: 'https://m.media-amazon.com/images/I/71wAK+LdkTL._SL1500_.jpg',
    inStock: true,
    description: 'Traditional garam masala blend',
    stock: 120
  },
  {
    name: 'MDH Chicken Masala',
    weight: '100g',
    price: 72,
    oldPrice: 80,
    discount: '10% OFF',
    category: 'Masala Oil',
    brand: 'MDH',
    image: 'https://m.media-amazon.com/images/I/71XA0OUvqKL._SL1500_.jpg',
    inStock: true,
    description: 'Special chicken masala',
    stock: 100
  },
  {
    name: 'MDH Kashmiri Mirch',
    weight: '100g',
    price: 68,
    oldPrice: 75,
    discount: '9% OFF',
    category: 'Masala Oil',
    brand: 'MDH',
    image: 'https://m.media-amazon.com/images/I/71jZKqC-GgL._SL1500_.jpg',
    inStock: true,
    description: 'Bright red chilli powder',
    stock: 105
  },

  // MASALA & SPICES - EVEREST
  {
    name: 'Everest Turmeric Powder',
    weight: '200g',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Masala Oil',
    brand: 'Everest',
    image: 'https://m.media-amazon.com/images/I/71VqL8RJUSL._SL1500_.jpg',
    inStock: true,
    description: 'Pure turmeric powder',
    stock: 120
  },
  {
    name: 'Everest Red Chilli Powder',
    weight: '200g',
    price: 90,
    oldPrice: 100,
    discount: '10% OFF',
    category: 'Masala Oil',
    brand: 'Everest',
    image: 'https://m.media-amazon.com/images/I/71gX7RqLJfL._SL1500_.jpg',
    inStock: true,
    description: 'Spicy red chilli powder',
    stock: 115
  },
  {
    name: 'Everest Garam Masala',
    weight: '100g',
    price: 75,
    oldPrice: 85,
    discount: '12% OFF',
    category: 'Masala Oil',
    brand: 'Everest',
    image: 'https://m.media-amazon.com/images/I/71r0KaQR5LL._SL1500_.jpg',
    inStock: true,
    description: 'Aromatic garam masala',
    stock: 110
  },
  {
    name: 'Everest Coriander Powder',
    weight: '200g',
    price: 80,
    oldPrice: 90,
    discount: '11% OFF',
    category: 'Masala Oil',
    brand: 'Everest',
    image: 'https://m.media-amazon.com/images/I/71cGNn+qS1L._SL1500_.jpg',
    inStock: true,
    description: 'Fresh coriander powder',
    stock: 105
  },
  {
    name: 'Black Pepper Powder',
    weight: '100g',
    price: 120,
    oldPrice: 135,
    discount: '11% OFF',
    category: 'Masala Oil',
    brand: 'Everest',
    image: 'https://m.media-amazon.com/images/I/71nQ7yVALcL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh ground black pepper',
    stock: 90
  },
  {
    name: 'Cumin Seeds (Jeera)',
    weight: '200g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Masala Oil',
    brand: 'Everest',
    image: 'https://m.media-amazon.com/images/I/71cNjU+hYmL._SL1500_.jpg',
    inStock: true,
    description: 'Whole cumin seeds',
    stock: 95
  },

  // MASALA & SPICES - CATCH
  {
    name: 'Catch Chat Masala',
    weight: '100g',
    price: 55,
    oldPrice: 62,
    discount: '11% OFF',
    category: 'Masala Oil',
    brand: 'Catch',
    image: 'https://m.media-amazon.com/images/I/71M1H7fSr6L._SL1500_.jpg',
    inStock: true,
    description: 'Tangy chat masala',
    stock: 100
  },
  {
    name: 'Catch Pav Bhaji Masala',
    weight: '100g',
    price: 60,
    oldPrice: 68,
    discount: '12% OFF',
    category: 'Masala Oil',
    brand: 'Catch',
    image: 'https://m.media-amazon.com/images/I/71JwN7KjXaL._SL1500_.jpg',
    inStock: true,
    description: 'Special pav bhaji spice',
    stock: 95
  },

  // SALT & OTHER
  {
    name: 'Tata Salt',
    weight: '1kg',
    price: 25,
    oldPrice: 28,
    discount: '11% OFF',
    category: 'Masala Oil',
    brand: 'Tata',
    image: 'https://m.media-amazon.com/images/I/71aFME6WVRL._SL1500_.jpg',
    inStock: true,
    description: 'Iodized table salt',
    stock: 150
  },
  {
    name: 'Tata Salt Lite',
    weight: '1kg',
    price: 45,
    oldPrice: 52,
    discount: '13% OFF',
    category: 'Masala Oil',
    brand: 'Tata',
    image: 'https://m.media-amazon.com/images/I/61YZy8GfOKL._SL1500_.jpg',
    inStock: true,
    description: 'Low sodium salt',
    stock: 100
  },
  {
    name: 'Bay Leaf (Tej Patta)',
    weight: '50g',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Masala Oil',
    brand: 'MDH',
    image: 'https://m.media-amazon.com/images/I/71UNnVL4OcL._SL1500_.jpg',
    inStock: true,
    description: 'Aromatic bay leaves',
    stock: 85
  }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🌶️ Starting Smart Migration for Masala & Oil...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Masala Oil" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of masalaOilProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Masala Oil" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();