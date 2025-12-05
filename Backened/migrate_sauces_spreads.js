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



// ========================================
// 🍅 KISSAN TOMATO KETCHUP
// ========================================
{
    name: 'Kissan Fresh Tomato Ketchup - Refill',
    weight: '500ml',
    price: 115,
    oldPrice: 140,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: 'https://tse1.mm.bing.net/th/id/OIP.wt313nJTaLPoZ50cdqVIkgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Fresh Tomato Ketchup | Refill Pack | No Added Preservatives | 500ml',
    stock: 100
},
{
    name: 'Kissan Fresh Tomato Ketchup - Refill',
    weight: '1L',
    price: 199,
    oldPrice: 240,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: '	https://tse1.mm.bing.net/th/id/OIP.QWSUEVTEPGMFaduakwi6lQHaL6?pid=Api&H=257&W=160',
    inStock: true,
    description: 'Kissan Fresh Tomato Ketchup | Refill Pack | No Added Preservatives | 1 Litre',
    stock: 80
},

// ========================================
// 🍅 TOPS TOMATO KETCHUP
// ========================================
{
    name: 'Tops Tomato Ketchup',
    weight: '500ml',
    price: 85,
    oldPrice: 105,
    discount: '19% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Cl2323Z_yUSu8AyydHXIywHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Tomato Ketchup | Rich & Tangy | Family Pack | 500ml Bottle',
    stock: 100
},

// ========================================
// 🍅 MAGGI TOMATO SAUCE
// ========================================
{
    name: 'Maggi Rich Tomato Sauce',
    weight: '500ml',
    price: 125,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: 'https://tse2.mm.bing.net/th/id/OIP.GCx9kB64PZ991w0Ye8WLagHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Maggi Rich Tomato Sauce | Thick & Tasty | Glass Bottle | 500ml',
    stock: 100
},
{
    name: 'Maggi Rich Tomato Sauce',
    weight: '1L',
    price: 215,
    oldPrice: 260,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: '	https://tse1.mm.bing.net/th/id/OIP.rpewA2kOwWwIBgO-MVCIhgHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Maggi Rich Tomato Sauce | Thick & Tasty | Glass Bottle | 1 Litre',
    stock: 80
},

// ========================================
// 🌶️ MAGGI HOT & SWEET SAUCE
// ========================================
{
    name: 'Maggi Hot & Sweet Tomato Chilli Sauce',
    weight: '500ml',
    price: 135,
    oldPrice: 165,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9CfN7iDJPWO4a9SoZdoqugHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Maggi Hot & Sweet Sauce | Tomato Chilli | Spicy & Tangy | 500ml',
    stock: 100
},
{
    name: 'Maggi Hot & Sweet Tomato Chilli Sauce',
    weight: '1L',
    price: 235,
    oldPrice: 285,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: '	https://tse1.mm.bing.net/th/id/OIP.6abusUy5qbH7QrZPAFwgygHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Maggi Hot & Sweet Sauce | Tomato Chilli | Spicy & Tangy | 1 Litre',
    stock: 80
},

// ========================================
// 🍓 KISSAN MIXED FRUIT JAM
// ========================================
{
    name: 'Kissan Mixed Fruit Jam',
    weight: '200g',
    price: 75,
    oldPrice: 92,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: '	https://tse2.mm.bing.net/th/id/OIP.PzOqAWraqntjT6F_YrWmjgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Mixed Fruit Jam | Real Fruit | No Artificial Flavours | 200g Jar',
    stock: 120
},
{
    name: 'Kissan Mixed Fruit Jam',
    weight: '500g',
    price: 165,
    oldPrice: 199,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: 'https://tse1.mm.bing.net/th/id/OIP.YYVu8LLrTZSb4yhIbw501wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Mixed Fruit Jam | Real Fruit | No Artificial Flavours | 500g Jar',
    stock: 100
},
{
    name: 'Kissan Mixed Fruit Jam',
    weight: '750g',
    price: 235,
    oldPrice: 285,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: '	https://tse2.mm.bing.net/th/id/OIP.snUmTnFnPuGik8RRM7NdoAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Mixed Fruit Jam | Real Fruit | No Artificial Flavours | 750g Jar',
    stock: 80
},

// ========================================
// 🍲 KNORR SOUPS - ₹10 SACHETS
// ========================================
{
    name: 'Knorr Chatpata Tomato Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: '	https://tse1.mm.bing.net/th/id/OIP.GqVisPNWVYEBi3Uls8I4WwAAAA?pid=Api&H=201&W=160',
    inStock: true,
    description: 'Knorr Classic Tomato Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},
{
    name: 'Knorr Sweet Corn Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: '	https://tse1.mm.bing.net/th/id/OIP.uPmav11dZGkOrqNz_AvD4gAAAA?pid=Api&H=180&W=160',
    inStock: true,
    description: 'Knorr Sweet Corn Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},
{
    name: 'Knorr Mix Veg Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: 'https://tse1.mm.bing.net/th/id/OIP.krFY1Y1Xet9hXvrD7Cw78AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Knorr Mix Veg Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},
{
    name: 'Knorr Hot & Sour Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: 'https://tse1.mm.bing.net/th/id/OIP.RNB3B_3-6r3hFWVUZpsofwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Knorr Hot & Sour Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},

// ========================================
// 🌶️ CHING'S SCHEZWAN CHUTNEY
// ========================================
{
    name: 'Ching\'s Schezwan Chutney - Jar',
    weight: '250g',
    price: 95,
    oldPrice: 115,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Ching\'s',
    image: '	https://tse1.mm.bing.net/th/id/OIP.XvKWZ83KyIsXSw3cTYITjQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ching\'s Schezwan Chutney | Spicy & Tangy | For Noodles & Snacks | 250g Jar',
    stock: 100
},
{
    name: 'Nestle Milkmaid',
    weight: '400g',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.cr2qDdEOjM-JJMSaKwqqvgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Milkmaid | Sweetened Condensed Milk | For Desserts | 400g Tin',
    stock: 80
},





// ========================================
// 🍫 HERSHEY'S CHOCOLATE SYRUP
// ========================================
{
    name: 'Hershey\'s Chocolate Syrup',
    weight: '200g',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Hershey\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.TLzAqrLU6cjKz4JmyePY9AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Hershey\'s Chocolate Syrup | Genuine Chocolate Taste | For Desserts & Shakes | 200g',
    stock: 80
},
{
    name: 'Hershey\'s Chocolate Syrup',
    weight: '500g',
    price: 350,
    oldPrice: 420,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Hershey\'s',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Xl123VW2LCiGL0KMyIOGRQHaL4?pid=Api&H=256&W=160',
    inStock: true,
    description: 'Hershey\'s Chocolate Syrup | Genuine Chocolate Taste | For Desserts & Shakes | 500g',
    stock: 60
},

// ========================================
// 🍓 HERSHEY'S STRAWBERRY SYRUP
// ========================================
{
    name: 'Hershey\'s Strawberry Syrup',
    weight: '200g',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Hershey\'s',
    image: '	https://tse2.mm.bing.net/th/id/OIP.4WwX2lmFTajnyYWLQjeavgAAAA?pid=Api&H=186&W=160',
    inStock: true,
    description: 'Hershey\'s Strawberry Syrup | Fruity & Sweet | For Desserts & Milkshakes | 200g',
    stock: 80
},

// ========================================
// 🍫 NUTELLA HAZELNUT SPREAD
// ========================================
{
    name: 'Nutella Hazelnut Spread',
    weight: '180g',
    price: 299,
    oldPrice: 350,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nutella',
    image: 'https://tse2.mm.bing.net/th/id/OIP.0XHQ6LGEZLRp0R6d4dXwtwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nutella Hazelnut Spread | With Cocoa | For Bread & Pancakes | 180g Jar',
    stock: 80
},
{
    name: 'Nutella Hazelnut Spread',
    weight: '350g',
    price: 499,
    oldPrice: 585,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nutella',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Zk9EPEvbIZf3MVKAIdTtpwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nutella Hazelnut Spread | With Cocoa | For Bread & Pancakes | 350g Jar',
    stock: 60
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