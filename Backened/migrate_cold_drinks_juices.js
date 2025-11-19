// migrate_cold_drinks_juices_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_cold_drinks_juices_IMPROVED.js

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

// ========== COLD DRINKS & JUICES PRODUCTS ==========
const coldDrinksJuicesProducts = [
  // COCA-COLA
  {
    name: 'Coca-Cola',
    weight: '1.25L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Coca-Cola',
    image: 'https://m.media-amazon.com/images/I/51v8nyxSOYL._SL1080_.jpg',
    inStock: true,
    description: 'The iconic refreshing cola drink',
    stock: 120
  },
  {
    name: 'Coca-Cola',
    weight: '750ml',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Coca-Cola',
    image: 'https://m.media-amazon.com/images/I/51v8nyxSOYL._SL1080_.jpg',
    inStock: true,
    description: 'Perfect size cola bottle',
    stock: 150
  },

  // PEPSI
  {
    name: 'Pepsi',
    weight: '1.25L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Pepsi',
    image: 'https://m.media-amazon.com/images/I/61aSP3ZAVPL._SL1500_.jpg',
    inStock: true,
    description: 'Bold and refreshing cola',
    stock: 115
  },
  {
    name: 'Pepsi',
    weight: '750ml',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Pepsi',
    image: 'https://m.media-amazon.com/images/I/61aSP3ZAVPL._SL1500_.jpg',
    inStock: true,
    description: 'Refreshing Pepsi cola',
    stock: 140
  },

  // SPRITE & LEMON DRINKS
  {
    name: 'Sprite',
    weight: '1.25L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Sprite',
    image: 'https://m.media-amazon.com/images/I/61W8kRMLBvL._SL1500_.jpg',
    inStock: true,
    description: 'Clear lemon-lime flavored drink',
    stock: 110
  },
  {
    name: '7UP',
    weight: '1.25L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: '7UP',
    image: 'https://m.media-amazon.com/images/I/61rPJB4Y9ZL._SL1500_.jpg',
    inStock: true,
    description: 'Crisp lemon-lime soda',
    stock: 100
  },

  // THUMS UP & MOUNTAIN DEW
  {
    name: 'Thums Up',
    weight: '1.25L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Thums Up',
    image: 'https://m.media-amazon.com/images/I/61xqhXefPtL._SL1500_.jpg',
    inStock: true,
    description: 'Strong fizzy cola',
    stock: 105
  },
  {
    name: 'Mountain Dew',
    weight: '1.25L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Mountain Dew',
    image: 'https://m.media-amazon.com/images/I/61RuYViniLL._SL1500_.jpg',
    inStock: true,
    description: 'Energizing citrus drink',
    stock: 95
  },

  // FANTA
  {
    name: 'Fanta Orange',
    weight: '1.25L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Fanta',
    image: 'https://m.media-amazon.com/images/I/61bGWOhGDVL._SL1500_.jpg',
    inStock: true,
    description: 'Orange flavored fizzy drink',
    stock: 100
  },

  // FRUIT JUICES - PREMIUM
  {
    name: 'Real Fruit Juice Mango',
    weight: '1L',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: 'https://m.media-amazon.com/images/I/71zoYuRfBVL._SL1500_.jpg',
    inStock: true,
    description: 'Made with real fruit pulp',
    stock: 80
  },
  {
    name: 'Real Fruit Juice Mixed Fruit',
    weight: '1L',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: 'https://m.media-amazon.com/images/I/71UBnY8rDzL._SL1500_.jpg',
    inStock: true,
    description: 'Blend of delicious fruits',
    stock: 75
  },
  {
    name: 'Tropicana Orange Juice',
    weight: '1L',
    price: 110,
    oldPrice: 125,
    discount: '12% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Tropicana',
    image: 'https://m.media-amazon.com/images/I/61SPH8dL+cL._SL1500_.jpg',
    inStock: true,
    description: '100% orange juice, no added sugar',
    stock: 75
  },
  {
    name: 'Tropicana Mixed Fruit',
    weight: '1L',
    price: 110,
    oldPrice: 125,
    discount: '12% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Tropicana',
    image: 'https://m.media-amazon.com/images/I/71gI8tWm1zL._SL1500_.jpg',
    inStock: true,
    description: 'Premium mixed fruit juice',
    stock: 70
  },

  // PULPY DRINKS
  {
    name: 'Minute Maid Pulpy Orange',
    weight: '400ml',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Minute Maid',
    image: 'https://m.media-amazon.com/images/I/61a9VZDvpZL._SL1500_.jpg',
    inStock: true,
    description: 'Orange juice with pulpy bits',
    stock: 140
  },

  // MANGO DRINKS
  {
    name: 'Frooti Mango Drink',
    weight: '1.2L',
    price: 70,
    oldPrice: 80,
    discount: '13% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Frooti',
    image: 'https://m.media-amazon.com/images/I/61b0ZST3E0L._SL1500_.jpg',
    inStock: true,
    description: 'Fresh and juicy mango drink',
    stock: 90
  },
  {
    name: 'Maaza Mango Drink',
    weight: '1.2L',
    price: 70,
    oldPrice: 80,
    discount: '13% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Maaza',
    image: 'https://m.media-amazon.com/images/I/51Y4lW3EAHL._SL1080_.jpg',
    inStock: true,
    description: 'Real mango taste',
    stock: 85
  },
  {
    name: 'Slice Mango Drink',
    weight: '1.2L',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Slice',
    image: 'https://m.media-amazon.com/images/I/71+WNNGU7SL._SL1500_.jpg',
    inStock: true,
    description: 'Thick mango drink',
    stock: 95
  },

  // ENERGY DRINKS
  {
    name: 'Red Bull Energy Drink',
    weight: '250ml',
    price: 110,
    oldPrice: 125,
    discount: '12% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Red Bull',
    image: 'https://m.media-amazon.com/images/I/51fAO+gmikL._SL1500_.jpg',
    inStock: true,
    description: 'Gives you wings',
    stock: 60
  },
  {
    name: 'Monster Energy Drink',
    weight: '500ml',
    price: 140,
    oldPrice: 160,
    discount: '13% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Monster',
    image: 'https://m.media-amazon.com/images/I/51RZbxqVoYL._SL1200_.jpg',
    inStock: true,
    description: 'Unleash the beast',
    stock: 50
  },
  {
    name: 'Sting Energy Drink',
    weight: '500ml',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Sting',
    image: 'https://m.media-amazon.com/images/I/71KH1BaQcLL._SL1500_.jpg',
    inStock: true,
    description: 'Get your energy boost',
    stock: 80
  },

  // WATER
  {
    name: 'Bisleri Mineral Water',
    weight: '1L',
    price: 20,
    oldPrice: 22,
    discount: '9% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Bisleri',
    image: 'https://m.media-amazon.com/images/I/51F6E5l3VfL._SL1080_.jpg',
    inStock: true,
    description: 'Pure and safe drinking water',
    stock: 200
  },
  {
    name: 'Kinley Mineral Water',
    weight: '1L',
    price: 20,
    oldPrice: 22,
    discount: '9% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Kinley',
    image: 'https://m.media-amazon.com/images/I/61jmCxF8BbL._SL1500_.jpg',
    inStock: true,
    description: 'Trusted mineral water',
    stock: 180
  }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🥤 Starting Smart Migration for Cold Drinks & Juices...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Cold Drinks & Juices" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of coldDrinksJuicesProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Cold Drinks & Juices" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();