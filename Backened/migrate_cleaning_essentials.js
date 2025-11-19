// migrate_cleaning_essentials_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_cleaning_essentials_IMPROVED.js

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

// ========== CLEANING ESSENTIALS PRODUCTS ==========
const cleaningEssentialsProducts = [
  // TOILET CLEANERS
  {
    name: 'Harpic Toilet Cleaner',
    weight: '1L',
    price: 145,
    oldPrice: 165,
    discount: '12% OFF',
    category: 'Cleaning Essentials',
    brand: 'Harpic',
    image: 'https://m.media-amazon.com/images/I/61rkR8R0jmL._SL1500_.jpg',
    inStock: true,
    description: 'Powerful toilet cleaning liquid',
    stock: 80
  },
  {
    name: 'Harpic Power Plus',
    weight: '500ml',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Cleaning Essentials',
    brand: 'Harpic',
    image: 'https://m.media-amazon.com/images/I/51aByfUrvIL._SL1080_.jpg',
    inStock: true,
    description: 'Extra strong toilet cleaner',
    stock: 100
  },
  {
    name: 'Domex Toilet Cleaner',
    weight: '1L',
    price: 135,
    oldPrice: 155,
    discount: '13% OFF',
    category: 'Cleaning Essentials',
    brand: 'Domex',
    image: 'https://m.media-amazon.com/images/I/61eIjm4Rx0L._SL1500_.jpg',
    inStock: true,
    description: 'Kills 99.9% germs',
    stock: 75
  },

  // FLOOR CLEANERS
  {
    name: 'Lizol Floor Cleaner',
    weight: '975ml',
    price: 125,
    oldPrice: 140,
    discount: '11% OFF',
    category: 'Cleaning Essentials',
    brand: 'Lizol',
    image: 'https://m.media-amazon.com/images/I/61xQpB7NHGL._SL1500_.jpg',
    inStock: true,
    description: 'Disinfectant floor cleaner',
    stock: 90
  },
  {
    name: 'Lizol Citrus Floor Cleaner',
    weight: '500ml',
    price: 75,
    oldPrice: 85,
    discount: '12% OFF',
    category: 'Cleaning Essentials',
    brand: 'Lizol',
    image: 'https://m.media-amazon.com/images/I/61L3t9GYoHL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh citrus fragrance',
    stock: 95
  },

  // DISHWASH
  {
    name: 'Vim Dishwash Bar',
    weight: '600g',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Cleaning Essentials',
    brand: 'Vim',
    image: 'https://m.media-amazon.com/images/I/71EUWFTiXdL._SL1500_.jpg',
    inStock: true,
    description: 'Lemon dishwash bar',
    stock: 120
  },
  {
    name: 'Vim Dishwash Liquid',
    weight: '750ml',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Cleaning Essentials',
    brand: 'Vim',
    image: 'https://m.media-amazon.com/images/I/61vFdIZKT3L._SL1500_.jpg',
    inStock: true,
    description: 'Tough on grease, soft on hands',
    stock: 100
  },
  {
    name: 'Pril Dishwash Liquid',
    weight: '750ml',
    price: 105,
    oldPrice: 120,
    discount: '13% OFF',
    category: 'Cleaning Essentials',
    brand: 'Pril',
    image: 'https://m.media-amazon.com/images/I/61YmPXiZn3L._SL1500_.jpg',
    inStock: true,
    description: 'Concentrated dishwashing liquid',
    stock: 85
  },

  // GLASS & SURFACE CLEANERS
  {
    name: 'Colin Glass Cleaner',
    weight: '500ml',
    price: 110,
    oldPrice: 125,
    discount: '12% OFF',
    category: 'Cleaning Essentials',
    brand: 'Colin',
    image: 'https://m.media-amazon.com/images/I/61wVCcJCBQL._SL1500_.jpg',
    inStock: true,
    description: 'Streak-free shine',
    stock: 70
  },
  {
    name: 'Colin Glass Cleaner Refill',
    weight: '500ml',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Cleaning Essentials',
    brand: 'Colin',
    image: 'https://m.media-amazon.com/images/I/61I2p0S1XTL._SL1500_.jpg',
    inStock: true,
    description: 'Refill pack for Colin',
    stock: 80
  },

  // SCRUBBERS & PADS
  {
    name: 'Scotch Brite Scrub Pad',
    weight: '3 pcs',
    price: 55,
    oldPrice: 62,
    discount: '11% OFF',
    category: 'Cleaning Essentials',
    brand: 'Scotch Brite',
    image: 'https://m.media-amazon.com/images/I/61YcPn7bXZL._SL1500_.jpg',
    inStock: true,
    description: 'Heavy-duty scrubbing pads',
    stock: 150
  },
  {
    name: 'Scotch Brite Scrub Sponge',
    weight: '3 pcs',
    price: 65,
    oldPrice: 72,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Scotch Brite',
    image: 'https://m.media-amazon.com/images/I/71gdAYyPuCL._SL1500_.jpg',
    inStock: true,
    description: 'Dual-sided scrub sponge',
    stock: 140
  },

  // DETERGENTS - BAR
  {
    name: 'Rin Detergent Bar',
    weight: '1kg',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Cleaning Essentials',
    brand: 'Rin',
    image: 'https://m.media-amazon.com/images/I/71N7v2RFvkL._SL1500_.jpg',
    inStock: true,
    description: 'Superior stain removal',
    stock: 110
  },
  {
    name: 'Wheel Detergent Bar',
    weight: '1kg',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Cleaning Essentials',
    brand: 'Wheel',
    image: 'https://m.media-amazon.com/images/I/61iSiR6AFQL._SL1500_.jpg',
    inStock: true,
    description: 'Tough on stains',
    stock: 105
  },

  // DETERGENTS - LIQUID
  {
    name: 'Surf Excel Liquid',
    weight: '1L',
    price: 195,
    oldPrice: 220,
    discount: '11% OFF',
    category: 'Cleaning Essentials',
    brand: 'Surf Excel',
    image: 'https://m.media-amazon.com/images/I/61C0x9LBDOL._SL1500_.jpg',
    inStock: true,
    description: 'Liquid detergent for washing machine',
    stock: 85
  },

  // DETERGENTS - POWDER
  {
    name: 'Ariel Detergent Powder',
    weight: '2kg',
    price: 320,
    oldPrice: 365,
    discount: '12% OFF',
    category: 'Cleaning Essentials',
    brand: 'Ariel',
    image: 'https://m.media-amazon.com/images/I/71NvSDN2vUL._SL1500_.jpg',
    inStock: true,
    description: 'Removes tough stains in 1 wash',
    stock: 70
  },
  {
    name: 'Tide Plus Detergent',
    weight: '2kg',
    price: 280,
    oldPrice: 320,
    discount: '13% OFF',
    category: 'Cleaning Essentials',
    brand: 'Tide',
    image: 'https://m.media-amazon.com/images/I/71xRhCqVsrL._SL1500_.jpg',
    inStock: true,
    description: 'Extra power detergent powder',
    stock: 80
  },
  {
    name: 'Surf Excel Easy Wash',
    weight: '2kg',
    price: 265,
    oldPrice: 300,
    discount: '12% OFF',
    category: 'Cleaning Essentials',
    brand: 'Surf Excel',
    image: 'https://m.media-amazon.com/images/I/71WU+KqrLsL._SL1500_.jpg',
    inStock: true,
    description: 'Easy wash detergent powder',
    stock: 75
  },

  // FABRIC CONDITIONER
  {
    name: 'Comfort Fabric Conditioner',
    weight: '860ml',
    price: 185,
    oldPrice: 210,
    discount: '12% OFF',
    category: 'Cleaning Essentials',
    brand: 'Comfort',
    image: 'https://m.media-amazon.com/images/I/61v7qY1m8LL._SL1500_.jpg',
    inStock: true,
    description: 'Softens & freshens clothes',
    stock: 65
  },
  {
    name: 'Comfort After Wash',
    weight: '400ml',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Cleaning Essentials',
    brand: 'Comfort',
    image: 'https://m.media-amazon.com/images/I/61JK3S3ot9L._SL1500_.jpg',
    inStock: true,
    description: 'Luxury fragrance conditioner',
    stock: 70
  }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🧹 Starting Smart Migration for Cleaning Essentials...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Cleaning Essentials" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of cleaningEssentialsProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Cleaning Essentials" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();