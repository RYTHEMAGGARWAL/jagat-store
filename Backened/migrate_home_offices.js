// migrate_home_offices_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_home_offices_IMPROVED.js

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

// ========== HOME AND OFFICES PRODUCTS ==========
const homeOfficesProducts = [




// GOOD KNIGHT REFILL & MACHINE
{
  name: 'Good Knight Activ+ Refill',
  weight: '45ml',
  price: 72,
  oldPrice: 86,
  discount: '16% OFF',
  category: 'Cleaning Essentials',
  brand: 'Good Knight',
  image: 'https://tse1.mm.bing.net/th/id/OIP.DoVgIW4TZ71U3HxjNlM3ugHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Good Knight Activ+ | Liquid Mosquito Refill | 60 Nights | 45ml',
  stock: 150
},

{
  name: 'Good Knight Activ+ Machine + Refill Combo',
  weight: '1 Set',
  price: 95,
  oldPrice: 115,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Good Knight',
  image: 'https://tse4.mm.bing.net/th/id/OIP.eTMi6kBG3xtanqqMkw8pHgHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Good Knight Activ+ | Machine + Refill Combo | Mosquito Repellent',
  stock: 80
},


// ALL OUT REFILL & MACHINE
{
  name: 'All Out Ultra Refill',
  weight: '45ml',
  price: 72,
  oldPrice: 86,
  discount: '16% OFF',
  category: 'Cleaning Essentials',
  brand: 'All Out',
  image: 'https://tse4.mm.bing.net/th/id/OIP.4LUCOn981OQ9rGloWMMP_wHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'All Out Ultra | Liquid Mosquito Refill | 60 Nights | 45ml',
  stock: 140
},

{
  name: 'All Out Ultra Machine + Refill Combo',
  weight: '1 Set',
  price: 95,
  oldPrice: 115,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'All Out',
  image: 'https://tse4.mm.bing.net/th/id/OIP.gezZT1XeniDqoP7Ii_rpiwHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'All Out Ultra | Machine + Refill Combo | Mosquito Repellent',
  stock: 75
},


// MAXO REFILL & MACHINE
{
  name: 'Maxo A Grade Refill',
  weight: '45ml',
  price: 65,
  oldPrice: 78,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Maxo',
  image: 'https://tse3.mm.bing.net/th/id/OIP.0fTWeA9OzpN1BPI43yrDnQHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Maxo A Grade | Liquid Mosquito Refill | 60 Nights | 45ml',
  stock: 120
},

{
  name: 'Maxo Machine + Refill Combo',
  weight: '1 Set',
  price: 85,
  oldPrice: 102,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Maxo',
  image: 'https://tse3.mm.bing.net/th/id/OIP.Kab8R_KQK_hLmDYjFqdvSQAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Maxo A Grade | Machine + Refill Combo | Mosquito Repellent',
  stock: 70
},


// GOOD KNIGHT AGARBATTI (INCENSE STICKS)
{
  name: 'Good Knight Neem Agarbatti',
  weight: '12 Sticks',
  price: 110,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Good Knight',
  image: 'https://tse4.mm.bing.net/th/id/OIP.pGl5hgsJz961eaR-KJtqsgAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Good Knight Neem | Mosquito Repellent Agarbatti | 20 Sticks',
  stock: 180
},

{
  name: 'Comfort Mosquito Repellent Agarbatti',
  weight: '20 Sticks',
  price: 22,
  oldPrice: 26,
  discount: '15% OFF',
  category: 'Cleaning Essentials',
  brand: 'Comfort',
  image: '	https://5.imimg.com/data5/IOS/Default/2023/9/340900702/GU/XB/OB/45700625/product-jpeg-1000x1000.png',
  inStock: true,
  description: 'Comfort | Mosquito Repellent Agarbatti | Herbal | 20 Sticks',
  stock: 160
},

// GOOD KNIGHT NEEM COIL
{
  name: 'Good Knight Neem Power Coil',
  weight: '10 Coils',
  price: 55,
  oldPrice: 66,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Good Knight',
  image: '	https://tse3.mm.bing.net/th/id/OIP._gUHuuoiBHhtBpjssoa8HAHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Good Knight Neem Power | Mosquito Coil | 10 Coils Pack',
  stock: 130
},


// MOSQUITO COIL (GENERIC/MORTEIN)
{
  name: 'Mortein Mosquito Coil',
  weight: '10 Coils',
  price: 52,
  oldPrice: 62,
  discount: '16% OFF',
  category: 'Cleaning Essentials',
  brand: 'Mortein',
  image: '	https://tse1.mm.bing.net/th/id/OIP.HLxnsG2KcNgNXoxsXNzaoQHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Mortein Peaceful Nights | Mosquito Coil | 10 Coils Pack',
  stock: 140
},


// HIT BLACK (MOSQUITO & FLY KILLER)

{
  name: 'Hit Black Mosquito & Fly Killer',
  weight: '400ml',
  price: 265,
  oldPrice: 320,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Hit',
  image: '	https://tse1.mm.bing.net/th/id/OIP.cjs6qPxjlKLh7wpY54tTUQHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Hit Black | Mosquito & Fly Killer Spray | Medium | 400ml',
  stock: 90
},
{
  name: 'Hit Black Mosquito & Fly Killer',
  weight: '625ml',
  price: 385,
  oldPrice: 465,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Hit',
  image: '	https://tse3.mm.bing.net/th/id/OIP.CFMI8NJ4AkSrliovXXs24AHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Hit Black | Mosquito & Fly Killer Spray | Big | 625ml',
  stock: 60
},

// HIT RED (COCKROACH & CRAWLING INSECT)

{
  name: 'Hit Red Crawling Insect Killer',
  weight: '400ml',
  price: 265,
  oldPrice: 320,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Hit',
  image: '	https://tse4.mm.bing.net/th/id/OIP.ayCy0o97YkncqWp6GCn8fgAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Hit Red | Crawling Insect Killer Spray | Medium | 400ml',
  stock: 80
},
{
  name: 'Hit Red Crawling Insect Killer',
  weight: '625ml',
  price: 385,
  oldPrice: 465,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Hit',
  image: '	https://tse3.mm.bing.net/th/id/OIP.XH_JEH8iP8Mnrh_yAC55mAHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Hit Red | Crawling Insect Killer Spray | Big | 625ml',
  stock: 55
},

// HIT ANTI ROACH GEL (COCKROACH INJECTION)
{
  name: 'Hit Anti Roach Gel',
  weight: '20g',
  price: 125,
  oldPrice: 150,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Hit',
  image: '	https://tse4.mm.bing.net/th/id/OIP.WTOVkEPwp1foDdSEP3CYWQHaF6?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Hit Anti Roach Gel | Cockroach Killer | Syringe Injection | 20g',
  stock: 90
},
,

// PCI RAT MAT (GLUE TRAP)
{
  name: 'PCI Rat Glue Trap Small',
  weight: '1 Pc',
  price: 35,
  oldPrice: 42,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'PCI',
  image: 'https://tse1.mm.bing.net/th/id/OIP.QFdwFo0Z-l6CDVI5B8ZuOQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'PCI Rat Glue Trap | Mouse Catcher | Small Size | Non-Toxic',
  stock: 150
},
{
  name: 'PCI Rat Glue Trap Big',
  weight: '1 Pc',
  price: 65,
  oldPrice: 78,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'PCI',
  image: 'https://tse2.mm.bing.net/th/id/OIP.ZiBVYA-XpU-yHVAzEM20JQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'PCI Rat Glue Trap | Mouse Catcher | Big Size | Non-Toxic',
  stock: 100
},


// PCI RAT KILLER (DAWAI/POISON)

{
  name: 'PCI Rat Killer Cake',
  weight: '50g',
  price: 45,
  oldPrice: 55,
  discount: '18% OFF',
  category: 'Cleaning Essentials',
  brand: 'PCI',
  image: 'https://tse1.mm.bing.net/th/id/OIP.UbxdKTWmFkPRQv79j502XgHaEl?pid=Api&H=98&W=160',
  inStock: true,
  description: 'PCI Roban Rat Killer | Rodent Control | Cake | 50g',
  stock: 140
},





  // STATIONERY - PENS & PENCILS
 
  
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n📝 Starting Smart Migration for Home and Offices...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Home and Offices" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of homeOfficesProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Home and Offices" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();