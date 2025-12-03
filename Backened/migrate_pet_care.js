// migrate_pet_care_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_pet_care_IMPROVED.js

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

// ========== PET CARE PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const petCareProducts = [

  // DOG FOOD - DRY


// ============ PEDIGREE DOG FOOD ============
{
    name: 'Pedigree Puppy Dry Food - Chicken & Milk',
    weight: '370g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: '	https://tse1.mm.bing.net/th/id/OIP.cNFSgGwEOt9PMsA2aWEtXwHaD4?pid=Api&P=0&w=762&h=400',
    inStock: true,
    description: 'Pedigree Puppy Dry Food | Chicken & Milk | Complete Nutrition for Puppies | 370g Pack',
    stock: 100
},
{
    name: 'Pedigree Adult Dry Food - Chicken & Vegetables',
    weight: '370g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hPIXaHD7gjpG5M0BPL2VigHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Pedigree Adult Dry Food | Chicken & Vegetables | Complete Nutrition for Adults | 370g Pack',
    stock: 100
},
{
    name: 'Pedigree Puppy Dry Food - Chicken & Milk',
    weight: '1kg',
    price: 249,
    oldPrice: 299,
    discount: '17% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: 'https://tse2.mm.bing.net/th/id/OIP.VWURp4UIv1dDkelDiaBlswHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Pedigree Puppy Dry Food | Chicken & Milk | Healthy Growth & Development | 1kg Pack',
    stock: 100
},
{
    name: 'Pedigree Adult Dry Food - Chicken & Vegetables',
    weight: '1kg',
    price: 249,
    oldPrice: 299,
    discount: '17% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: '	https://tse2.mm.bing.net/th/id/OIP.5B6AZkI9O3X5cpbwkMtdRgHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Pedigree Adult Dry Food | Chicken & Vegetables | Strong Bones & Teeth | 1kg Pack',
    stock: 100
},
{
    name: 'Pedigree Puppy Dry Food - Chicken & Milk',
    weight: '2.8kg',
    price: 685,
    oldPrice: 799,
    discount: '14% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: 'https://tse1.mm.bing.net/th/id/OIP.thKjSkbURPNDP0fRh3Oc8wAAAA?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Pedigree Puppy Dry Food | Chicken & Milk | DHA for Brain Development | 2.8kg Pack',
    stock: 100
},
{
    name: 'Pedigree Adult Dry Food - Chicken & Vegetables',
    weight: '2.8kg',
    price: 685,
    oldPrice: 799,
    discount: '14% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: '	https://tse1.mm.bing.net/th/id/OIP.YbeBRVORgAoBiESbqRQimgHaI4?pid=Api&P=0&w=400&h=480',
    inStock: true,
    description: 'Pedigree Adult Dry Food | Chicken & Vegetables | Shiny Coat & Healthy Skin | 2.8kg Pack',
    stock: 100
},
// ============ WHISKAS CAT FOOD ============
{
    name: 'Whiskas Adult Dry Food - Chicken Flavour',
    weight: '3kg',
    price: 1124,
    oldPrice: 1299,
    discount: '13% OFF',
    category: 'Pet Care',
    brand: 'Whiskas',
    image: 'https://tse2.mm.bing.net/th/id/OIP.BzDziuwzxRq4Lens65kfrAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Whiskas Adult Dry Food | Chicken Flavour | Complete Nutrition for Cats | 3kg Pack',
    stock: 100
},
{
    name: 'Whiskas Adult Dry Food - Chicken Flavour',
    weight: '1.2kg',
    price: 450,
    oldPrice: 530,
    discount: '15% OFF',
    category: 'Pet Care',
    brand: 'Whiskas',
    image: 'https://tse1.mm.bing.net/th/id/OIP.t-ZQ44zKefAM_3bWNqwlpgHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Whiskas Adult Dry Food | Chicken Flavour | Shiny Coat & Healthy Skin | 1.2kg Pack',
    stock: 100
},
{
    name: 'Whiskas Adult Dry Food - Ocean Fish Flavour',
    weight: '480g',
    price: 235,
    oldPrice: 275,
    discount: '15% OFF',
    category: 'Pet Care',
    brand: 'Whiskas',
    image: 'https://tse2.mm.bing.net/th/id/OIP.qKY3schGXCS-Ai6feG37OgHaK1?pid=Api&P=0&w=400&h=586',
    inStock: true,
    description: 'Whiskas Adult Dry Food | Ocean Fish Flavour | Rich in Omega Fatty Acids | 480g Pack',
    stock: 100
},





// ============ DROOLS DOG FOOD ============
{
    name: 'Drools Adult Dry Food - Chicken & Egg',
    weight: '1.2kg',
    price: 260,
    oldPrice: 310,
    discount: '16% OFF',
    category: 'Pet Care',
    brand: 'Drools',
    image: 'https://tse1.mm.bing.net/th/id/OIP.eE01oJg8MUV-B7D-kUsvFQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Drools Adult Dry Food | Chicken & Egg | 100% Real Chicken | Healthy Skin & Coat | 1.2kg Pack',
    stock: 100
},
{
    name: 'Drools Puppy Dry Food - Chicken & Egg',
    weight: '400g',
    price: 109,
    oldPrice: 130,
    discount: '16% OFF',
    category: 'Pet Care',
    brand: 'Drools',
    image: '	https://tse1.mm.bing.net/th/id/OIP.lntrJhrQet7UIE8wM_HB4gHaGF?pid=Api&P=0&w=487&h=400',
    inStock: true,
    description: 'Drools Puppy Dry Food | Chicken & Egg | DHA for Brain Development | 400g Pack',
    stock: 100
},
{
    name: 'Drools Puppy Dry Food - Chicken & Egg',
    weight: '3kg',
    price: 680,
    oldPrice: 799,
    discount: '15% OFF',
    category: 'Pet Care',
    brand: 'Drools',
    image: '	https://tse1.mm.bing.net/th/id/OIP.lntrJhrQet7UIE8wM_HB4gHaGF?pid=Api&P=0&w=487&h=400',
    inStock: true,
    description: 'Drools Puppy Dry Food | Chicken & Egg | Strong Bones & Teeth | 3kg Pack',
    stock: 100
},
{
    name: 'Drools Adult Dry Food - Chicken & Egg',
    weight: '3kg',
    price: 650,
    oldPrice: 765,
    discount: '15% OFF',
    category: 'Pet Care',
    brand: 'Drools',
    image: 'https://tse1.mm.bing.net/th/id/OIP.eE01oJg8MUV-B7D-kUsvFQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Drools Adult Dry Food | Chicken & Egg | Complete Nutrition | 3kg Pack',
    stock: 100
},

{
    name: 'Drools Adult Dry Food - Chicken & Egg',
    weight: '5kg',
    price: 1049,
    oldPrice: 1200,
    discount: '15% OFF',
    category: 'Pet Care',
    brand: 'Drools',
    image: '	https://tse2.mm.bing.net/th/id/OIP.aOahmuapDxQ_DgbT2UyPOQHaH7?pid=Api&H=171&W=160',
    inStock: true,
    description: 'Drools Adult Dry Food | Chicken & Egg | Complete Nutrition | 3kg Pack',
    stock: 100
},

// ============ PEDIGREE WET FOOD (JELLY/GRAVY) ============
{
    name: 'Pedigree Puppy Wet Food - Chicken Chunks in Gravy',
    weight: '70g',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: 'https://tse2.mm.bing.net/th/id/OIP.OVeBADKpgxngTVemjEhZ5wHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Pedigree Puppy Wet Food | Chicken Chunks in Gravy | Soft & Tasty | 70g Pouch',
    stock: 100
},

{
    name: 'Pedigree Adult Wet Food - Chicken & Liver Chunks in Gravy',
    weight: '70g',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Pet Care',
    brand: 'Pedigree',
    image: 'https://tse1.mm.bing.net/th/id/OIP.gsqpIqyrEKoyIL4fUjODzAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Pedigree Adult Wet Food | Chicken & Liver Chunks in Gravy | Tasty Meal | 70g Pouch',
    stock: 100
},


// ============ DROOLS WET FOOD (GRAVY) ============

{
    name: 'Drools Puppy Wet Food - Chicken & Liver Chunks in Gravy',
    weight: '80g',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Pet Care',
    brand: 'Drools',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ZTeQBF8dP5ea1cDNU0VjygHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Drools Puppy Wet Food | Chicken & Liver Chunks in Gravy | Healthy Growth | 80g Pouch',
    stock: 100
},

{
    name: 'Drools Adult Wet Food - Chicken & Liver Chunks in Gravy',
    weight: '80g',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Pet Care',
    brand: 'Drools',
    image: '	https://tse2.mm.bing.net/th/id/OIP.sND10_AKxJGBWIYeam3KogHaFZ?pid=Api&P=0&w=548&h=400',
    inStock: true,
    description: 'Drools Adult Wet Food | Chicken & Liver Chunks in Gravy | Complete Nutrition | 80g Pouch',
    stock: 100
}


];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🐾 Starting Smart Migration for Pet Care Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Pet Care" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of petCareProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Pet Care" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();