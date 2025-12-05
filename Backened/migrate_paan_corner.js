// migrate_paan_corner.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_paan_corner.js

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

// ========== PAAN CORNER PRODUCTS ==========
const paanCornerProducts = [



  // ==================== MUKHWAS / MOUTH FRESHENERS ====================

 // ========================================
// 🚬 GOLD FLAKE CIGARETTES
// ========================================
{
    name: 'Gold Flake Kings (Choti)',
    weight: '10 Sticks',
    price: 130,
    oldPrice: 140,
    discount: '7% OFF',
    category: 'Paan Corner',
    brand: 'Gold Flake',
    image: '	https://tse1.mm.bing.net/th/id/OIP.YjH1j8NdsSLP5YVLxknk5wAAAA?pid=Api&P=0&w=320&h=320',
    inStock: true,
    description: 'Gold Flake Kings | Filter Cigarettes | 10 Sticks Pack',
    stock: 100
},
{
    name: 'Gold Flake Premium (Badi)',
    weight: '20 Sticks',
    price: 260,
    oldPrice: 280,
    discount: '7% OFF',
    category: 'Paan Corner',
    brand: 'Gold Flake',
    image: 'https://tse2.mm.bing.net/th/id/OIP.kbZlmEXTxvEGL6u7OEbZ1QHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Gold Flake Premium | Filter Cigarettes | 20 Sticks Pack',
    stock: 80
},
{
    name: 'Opel Playing Cards (Patte Tash)',
    weight: '1 Deck',
    price: 35,
    oldPrice: 45,
    discount: '22% OFF',
    category: 'Paan Corner',
    brand: 'Opel',
    image: 'https://tse2.mm.bing.net/th/id/OIP.svaRv6ZOdw3tzQoIRMztxAHaJ4?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Opel Playing Cards | Patte Tash | 52 Cards Deck | Fun & Entertainment',
    stock: 120
},
{
    name: 'Silver Pearls Rajnigandha',
    weight: '5.5g',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Paan Corner',
    brand: 'Rajnigandha',
    image: '	https://tse2.mm.bing.net/th/id/OIP.nQ0z_w_ezGw0LRSWjKgghAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Silver Pearls Rajnigandha | Premium Mouth Freshener | Silver Coated | 5.5g Pack',
    stock: 150
},

{
    name: 'Gold Flake Indie Mint',
    weight: '10 Sticks',
    price: 140,
    oldPrice: 150,
    discount: '7% OFF',
    category: 'Paan Corner',
    brand: 'Gold Flake',
    image: 'https://tse2.mm.bing.net/th/id/OIP.N1h2kKE2kxvtOVl_SGz7JQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Gold Flake Indie Mint | Menthol Flavour | 10 Sticks Pack',
    stock: 100
},

// ========================================
// 🚬 TOTAL CIGARETTES
// ========================================
{
    name: 'Total Cigarettes',
    weight: '10 Sticks',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Paan Corner',
    brand: 'Total',
    image: 'https://tse1.mm.bing.net/th/id/OIP.B_jo-GTmajvOlNgLMcfmDQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Total Filter Cigarettes | Budget Friendly | 10 Sticks Pack',
    stock: 100
},

// ========================================
// 🚬 ADVANCE (MARLBORO STYLE) CIGARETTES
// ========================================
{
    name: 'Marlboro Advance Filter (Choti)',
    weight: '10 Sticks',
    price: 145,
    oldPrice: 155,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Marlboro',
    image: '	https://tse1.mm.bing.net/th/id/OIP.zN_3dUyEMn80YTWJhEki6gAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Marlboro Advance Filter Cigarettes | Premium Quality | 10 Sticks Pack',
    stock: 100
},
{
    name: 'Marlboro Advance Filter (Badi)',
    weight: '20 Sticks',
    price: 290,
    oldPrice: 310,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Marlboro',
    image: '	https://tse1.mm.bing.net/th/id/OIP.fJ-DThHfd_ComcwTEONN9gHaEa?pid=Api&P=0&w=672&h=400',
    inStock: true,
    description: 'Marlboro Advance Filter Cigarettes | Premium Quality | 20 Sticks Pack',
    stock: 80
},
{
    name: 'Marlboro Advance Fuse',
    weight: '10 Sticks',
    price: 150,
    oldPrice: 160,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Marlboro',
    image: '	https://tse1.mm.bing.net/th/id/OIP.PDTBKZfKqC1eDvwppgyvgQHaEa?pid=Api&H=95&W=160',
    inStock: true,
    description: 'Marlboro Advance Fuse | Capsule Cigarettes | Click & Burst | 10 Sticks Pack',
    stock: 100
},

// ========================================
// 🚬 CAPSTAN & NAVY CUT CIGARETTES
// ========================================
{
    name: 'Capstan Cigarettes',
    weight: '10 Sticks',
    price: 120,
    oldPrice: 130,
    discount: '8% OFF',
    category: 'Paan Corner',
    brand: 'Capstan',
    image: '	https://tse1.mm.bing.net/th/id/OIP.zoiNKV86OCIuzWNnX2GhhgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Capstan Filter Cigarettes | Classic Taste | 10 Sticks Pack',
    stock: 100
},
{
    name: 'Wills Navy Cut Cigarettes',
    weight: '10 Sticks',
    price: 135,
    oldPrice: 145,
    discount: '7% OFF',
    category: 'Paan Corner',
    brand: 'Wills',
    image: 'https://tse2.mm.bing.net/th/id/OIP.XEgmor8tTY7UeI_LQXLZiAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Wills Navy Cut | Premium Cigarettes | 10 Sticks Pack',
    stock: 100
},

// ========================================
// 🚬 CLASSIC CIGARETTES
// ========================================
{
    name: 'Classic Regular',
    weight: '10 Sticks',
    price: 155,
    oldPrice: 165,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Classic',
    image: 'https://tse2.mm.bing.net/th/id/OIP.M5vmt8cc0lFZeZ3nioUVpwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Classic Regular | Premium Cigarettes | Full Flavour | 10 Sticks Pack',
    stock: 100
},
{
    name: 'Classic Mild',
    weight: '10 Sticks',
    price: 155,
    oldPrice: 165,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Classic',
    image: '	https://tse2.mm.bing.net/th/id/OIP._RBUdVdNecoaij3_yWCAOwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Classic Mild | Light Cigarettes | Smooth Taste | 10 Sticks Pack',
    stock: 100
},
{
    name: 'Classic Ultra Mild',
    weight: '10 Sticks',
    price: 155,
    oldPrice: 165,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Classic',
    image: 'https://tse1.mm.bing.net/th/id/OIP._rnH7STY7v0OL6_gI14FOQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Classic Ultra Mild | Extra Light | Smooth Finish | 10 Sticks Pack',
    stock: 100
},
{
    name: 'Classic Connect',
    weight: '10 Sticks',
    price: 160,
    oldPrice: 170,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Classic',
    image: 'https://tse2.mm.bing.net/th/id/OIP.fHb1uuJ-s1Qoxd_dMwOSYAAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Classic Connect | Capsule Cigarettes | Click Burst | 10 Sticks Pack',
    stock: 100
},

// ========================================
// 🚬 DEFINE CIGARETTES
// ========================================

{
    name: 'Define Paan',
    weight: '10 Sticks',
    price: 145,
    oldPrice: 155,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Define',
    image: '	https://tse1.mm.bing.net/th/id/OIP.BTW5d4XIsICgyOBOk6842gAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Define Paan | Paan Flavour Capsule | Click Burst | 10 Sticks Pack',
    stock: 100
},
{
    name: 'Define Shift',
    weight: '10 Sticks',
    price: 145,
    oldPrice: 155,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Define',
    image: '	https://tse2.mm.bing.net/th/id/OIP.IxS2yD9jIhLDgBsBfN9KpQHaEa?pid=Api&H=95&W=160',
    inStock: true,
    description: 'Define Swift | Menthol Capsule | Refreshing | 10 Sticks Pack',
    stock: 100
},

// ========================================
// 🚬 OTHER CIGARETTES
// ========================================

{
    name: 'Classic Ice Burst',
    weight: '10 Sticks',
    price: 150,
    oldPrice: 160,
    discount: '6% OFF',
    category: 'Paan Corner',
    brand: 'Classic',
    image: '	https://tse1.mm.bing.net/th/id/OIP.TeCsyzzTI5uYAUhCLzmLEQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Classic Ice Burst | Menthol Capsule | Extra Cool | 10 Sticks Pack',
    stock: 100
},

// ========================================
// 🍃 RAJNIGANDHA PAN MASALA
// ========================================
{
    name: 'Rajnigandha Pan Masala (Small)',
    weight: '1.8g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Paan Corner',
    brand: 'Rajnigandha',
    image: 'https://tse1.mm.bing.net/th/id/OIP.mjNgbfMf2np22SgMLZgfzwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Rajnigandha Pan Masala | Silver Coated | Premium Quality | Small Pouch',
    stock: 200
},
{
    name: 'Rajnigandha Pan Masala (Zipper)',
    weight: '20g',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Paan Corner',
    brand: 'Rajnigandha',
    image: 'https://tse2.mm.bing.net/th/id/OIP.F9h9LzTKe7QOqSXyMAFVrAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Rajnigandha Pan Masala | Zipper Pack | Resealable | 20g',
    stock: 100
},
{
    name: 'Rajnigandha Tulsi (Small)',
    weight: '1.8g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Paan Corner',
    brand: 'Rajnigandha',
    image: 'https://tse1.mm.bing.net/th/id/OIP.K6sGqICYsjky36caBKelkgHaFV?pid=Api&P=0&w=556&h=400',
    inStock: true,
    description: 'Rajnigandha Tulsi | With Tulsi Extract | Premium | Small Pouch',
    stock: 200
},
{
    name: ' Tulsi (Zipper)',
    weight: '20g',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Paan Corner',
    brand: 'Rajnigandha',
    image: '	https://tse2.mm.bing.net/th/id/OIP.MCyTdQm01jTekxWCBriUBgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Rajnigandha Tulsi | Zipper Pack | With Tulsi | 20g',
    stock: 100
},

// ========================================
// 🍃 OTHER PAN MASALA
// ========================================
{
    name: 'Dilbagh Pan Masala',
    weight: '1.8g',
    price: 8,
    oldPrice: 10,
    discount: '20% OFF',
    category: 'Paan Corner',
    brand: 'Dilbagh',
    image: 'https://tse2.mm.bing.net/th/id/OIP.i0Wf_eXgX_YwL_68AHaZsAHaDu?pid=Api&P=0&w=796&h=400',
    inStock: true,
    description: 'Dilbagh Pan Masala | Sweet & Fragrant | Small Pouch',
    stock: 200
},
{
    name: 'Shikhar Pan Masala',
    weight: '1.8g',
    price: 8,
    oldPrice: 10,
    discount: '20% OFF',
    category: 'Paan Corner',
    brand: 'Shikhar',
    image: '	https://tse2.mm.bing.net/th/id/OIP.AqBN7ye76Sb9-_hHOCdvnQAAAA?pid=Api&P=0&w=400&h=711',
    inStock: true,
    description: 'Shikhar Pan Masala | Premium Quality | Small Pouch',
    stock: 200
},
{
    name: 'Kamla Pasand Pan Masala',
    weight: '1.8g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Paan Corner',
    brand: 'Kamla Pasand',
    image: 'https://tse1.mm.bing.net/th/id/OIP.-cE7eGOLHd5G6G2rXcppfgAAAA?pid=Api&H=269&W=160',
    inStock: true,
    description: 'Kamla Pasand Pan Masala | Silver Coated | Premium | Small Pouch',
    stock: 200
},

  

];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍃 Starting Smart Migration for Paan Corner Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Paan Corner" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of paanCornerProducts) {
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
          console.log(`⭐️ UNCHANGED: ${productData.name} (${productData.weight})`);
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
    console.log(`   ⭐️ Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Paan Corner" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();