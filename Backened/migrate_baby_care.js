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
    price: 20,
    oldPrice: 30,
    discount: '30% OFF',
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
    price: 90,
    oldPrice: 150,
    discount: '40% OFF',
    category: 'Baby Care',
    brand: 'Bonny',
    image: 'https://tse1.mm.bing.net/th/id/OIP.g521OGIbjlfnzsL8zvlXrgAAAA?pid=Api&P=0&w=400&h=449',
    inStock: true,
    description: 'Bonny Feeding Bottle | 120ml | Peristaltic Nipple | BPA Free',
    stock: 60
},


// ========================================
// 🍼 JOHNSON'S BABY SHAMPOO
// ========================================
{
    name: 'Johnsons Baby Shampoo',
    weight: '50ml',
    price: 66,
    oldPrice: 70,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.zrfln9gPrgSSpcshf_P8LwHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Johnsons Baby Shampoo | No More Tears | Gentle & Mild | 50ml Bottle',
    stock: 100
},
{
    name: 'Johnsons Baby Shampoo',
    weight: '100ml',
    price: 110,
    oldPrice: 115,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse3.mm.bing.net/th/id/OIP.es5BPKwK22upAsvTh64BTgHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Johnsons Baby Shampoo | No More Tears | Gentle & Mild | 100ml Bottle',
    stock: 90
},
{
    name: 'Johnsons Baby Shampoo',
    weight: '200ml',
    price: 228,
    oldPrice: 240,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.vV1FdWeVHyMZ20Um2vGEIwHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Johnsons Baby Shampoo | No More Tears | Gentle & Mild | 200ml Bottle',
    stock: 75
},

// ========================================
// 🍼 JOHNSON'S BABY CREAM
// ========================================
{
    name: 'Johnsons Baby Cream',
    weight: '30g',
    price: 61,
    oldPrice: 65,
    discount: '18% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: '	https://tse1.mm.bing.net/th/id/OIP.gAAGMEPNPp7TEgy7l9NFdQHaLH?pid=Api&H=240&W=160',
    inStock: true,
    description: 'Johnsons Baby Cream | 24 Hour Moisturizing | Gentle on Skin | 20g Tube',
    stock: 120
},
{
    name: 'Johnsons Baby Cream',
    weight: '50g',
    price: 90,
    oldPrice: 95,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: '	https://tse1.mm.bing.net/th/id/OIP.3Eo88yJm4DVIy0GiWlw77gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Cream | 24 Hour Moisturizing | Gentle on Skin | 100g Tube',
    stock: 85
},

// ========================================
// 🍼 JOHNSON'S BABY LOTION
// ========================================
{
    name: 'Johnsons Baby Lotion',
    weight: '50ml',
    price: 57,
    oldPrice: 60,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse1.mm.bing.net/th/id/OIP.onUbTzJ9ZxsfZkQRmIuYOgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Lotion | Soft & Smooth Skin | Mild Formula | 20ml Bottle',
    stock: 130
},
{
    name: 'Johnsons Baby Lotion',
    weight: '100ml',
    price: 118,
    oldPrice: 124,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Ji2G2JAfiPPYTqvEAAJiyQHaID?pid=Api&H=173&W=160',
    inStock: true,
    description: 'Johnsons Baby Lotion | Soft & Smooth Skin | Mild Formula | 100ml Bottle',
    stock: 95
},
{
    name: 'Johnsons Baby Lotion',
    weight: '200ml',
    price: 235,
    oldPrice: 248,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: '	https://tse2.mm.bing.net/th/id/OIP.zRPLVM0oiZcLQYkv0XMYCQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Lotion | Soft & Smooth Skin | Mild Formula | 200ml Bottle',
    stock: 70
},

// ========================================
// 🍼 JOHNSON'S BABY HAIR OIL
// ========================================
{
    name: 'Johnsons Baby Hair Oil',
    weight: '50ml',
    price: 90,
    oldPrice: 95,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.B6S-wS7F0co2f343xLfFDQHaLH?pid=Api&H=240&W=160',
    inStock: true,
    description: 'Johnsons Baby Hair Oil | Avocado & Pro-Vitamin B5 | Soft Hair | 50ml Bottle',
    stock: 110
},
{
    name: 'Johnsons Baby Hair Oil',
    weight: '100ml',
    price: 175,
    oldPrice: 185,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.l78Ki0MCyF9-7WSEm0MmmgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Hair Oil | Avocado & Pro-Vitamin B5 | Soft Hair | 100ml Bottle',
    stock: 90
},


// ========================================
// 🍼 JOHNSON'S BABY OIL
// ========================================
{
    name: 'Johnsons Baby Oil',
    weight: '50ml',
    price: 70,
    oldPrice: 75,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.4i66nMXGAodqzfKM9L0vOwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Oil | Pure Mineral Oil | Gentle Massage | 50ml Bottle',
    stock: 105
},
{
    name: 'Johnsons Baby Oil',
    weight: '100ml',
    price: 142,
    oldPrice: 150,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.F6y_PwRPgkfSSkeaOiFLFwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Oil | Pure Mineral Oil | Gentle Massage | 100ml Bottle',
    stock: 85
},


// ========================================
// 🍼 JOHNSON'S BABY POWDER
// ========================================
{
    name: 'Johnsons Baby Powder',
    weight: '50g',
    price: 60,
    oldPrice: 65,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.sO7RpbV2vS29uEjbvLrNmAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Powder | Mild Formula | Keeps Skin Dry | 50g Pack',
    stock: 130
},
{
    name: 'Johnsons Baby Powder',
    weight: '100g',
    price: 118,
    oldPrice: 125,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse1.mm.bing.net/th/id/OIP.R01sCRA_RbOyBPjidEtp4QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Powder | Mild Formula | Keeps Skin Dry | 100g Pack',
    stock: 110
},
{
    name: 'Johnsons Baby Powder',
    weight: '200g',
    price: 218,
    oldPrice: 230,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: 'https://tse2.mm.bing.net/th/id/OIP.4lPAlss8Ins4Ysus4Y3wjgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Powder | Mild Formula | Keeps Skin Dry | 200g Pack',
    stock: 80
},

// ========================================
// 🍼 JOHNSON'S BABY SOAP
// ========================================
{
    name: 'Johnsons Baby Soap',
    weight: '150g',
    price: 128,
    oldPrice: 135,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: '	https://tse1.mm.bing.net/th/id/OIP.2m7DWH0D339CZVorhhpU7wHaEw?pid=Api&H=102&W=160',
    inStock: true,
    description: 'Johnsons Baby Soap | Gentle Cleansing | Mild Formula | 150g Bar',
    stock: 100
},
{
    name: 'Johnsons Baby Soap',
    weight: '25g',
    price: 19,
    oldPrice: 20,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: '	https://tse2.mm.bing.net/th/id/OIP.eTDy_HmwWwJ0DRfOJexzagHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Johnsons Baby Soap | Gentle Cleansing | Travel Size | 25g Bar',
    stock: 150
},

// ========================================
// 🍼 JOHNSON'S BABY WIPES
// ========================================
{
    name: 'Johnsons Baby Wipes',
    weight: '60 Units',
    price: 140,
    oldPrice: 150,
    discount: '7% OFF',
    category: 'Baby Care',
    brand: 'Johnsons',
    image: '	https://tse2.mm.bing.net/th/id/OIP.bgUBn6ijMivQeNdUA_er8QHaDz?pid=Api&H=82&W=160',
    inStock: true,
    description: 'Johnsons Baby Wipes | Gentle Cleansing | Alcohol Free | 60 Wipes Pack',
    stock: 90
},
// ========================================
// 🍼 HIMALAYA SHISHU MASSAGE OIL
// ========================================
{
    name: 'Himalaya Shishu Massage Oil',
    weight: '50ml',
    price: 65,
    oldPrice: 70,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.WNYORBWdrhG0gCRYQwRg-QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Shishu Massage Oil | Olive Oil & Winter Cherry | Gentle Massage | 50ml Bottle',
    stock: 100
},
{
    name: 'Himalaya Shishu Massage Oil',
    weight: '100ml',
    price: 130,
    oldPrice: 140,
    discount: '7% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.WNYORBWdrhG0gCRYQwRg-QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Shishu Massage Oil | Olive Oil & Winter Cherry | Gentle Massage | 100ml Bottle',
    stock: 90
},
{
    name: 'Himalaya Shishu Massage Oil',
    weight: '200ml',
    price: 234,
    oldPrice: 260,
    discount: '10% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.WNYORBWdrhG0gCRYQwRg-QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Shishu Massage Oil | Olive Oil & Winter Cherry | Gentle Massage | 200ml Bottle',
    stock: 70
},

// ========================================
// 🍼 HIMALAYA BABY LOTION
// ========================================
{
    name: 'Himalaya Baby Lotion',
    weight: '200ml',
    price: 175,
    oldPrice: 185,
    discount: '16% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9PlCHPB9hEiz4kH9wYXv3QHaM1?pid=Api&H=277&W=160',
    inStock: true,
    description: 'Himalaya Baby Lotion | Almond & Olive Oil | Soft & Smooth Skin | 200ml Bottle',
    stock: 85
},
{
    name: 'Himalaya Baby Lotion',
    weight: '500ml',
    price: 333,
    oldPrice: 370,
    discount: '10% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: 'https://tse2.mm.bing.net/th/id/OIP.sM4prBwU5em1bCag3cQdHAHaMz?pid=Api&H=276&W=160',
    inStock: true,
    description: 'Himalaya Baby Lotion | Almond & Olive Oil | Soft & Smooth Skin | 500ml Bottle',
    stock: 55
},

// ========================================
// 🍼 HIMALAYA BABY CREAM
// ========================================
{
    name: 'Himalaya Baby Cream',
    weight: '100g',
    price: 138,
    oldPrice: 145,
    discount: '17% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: 'https://tse2.mm.bing.net/th/id/OIP.xs3_dCu1o1TPUbpKBWKkwgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Baby Cream | Extra Soft | Gentle Moisturizing | 100g Tube',
    stock: 95
},
{
    name: 'Himalaya Baby Cream',
    weight: '200g',
    price: 279,
    oldPrice: 310,
    discount: '10% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: 'https://tse2.mm.bing.net/th/id/OIP.VIEiWBfGq73BdG03lRsmxgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Baby Cream | Extra Soft | Gentle Moisturizing | 200g Tube',
    stock: 75
},

// ========================================
// 🍼 HIMALAYA DIAPER RASH CREAM
// ========================================
{
    name: 'Himalaya Diaper Rash Cream',
    weight: '50g',
    price: 133,
    oldPrice: 140,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: '	https://tse1.mm.bing.net/th/id/OIP.T9BlM80p-vpBpA_mCAwLxQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Diaper Rash Cream | Almond & Yashad Bhasma | Prevents Rashes | 50g Tube',
    stock: 80
},

// ========================================
// 🍼 HIMALAYA BABY SOAP
// ========================================
{
    name: 'Himalaya Baby Soap Moisturizing',
    weight: '125g',
    price: 99,
    oldPrice: 105,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: '	https://tse1.mm.bing.net/th/id/OIP.ZnoT2QC1w4tcICMN7vHGJQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Baby Soap Moisturizing | Aloe Vera & Milk | Soft Skin | 125g Bar',
    stock: 110
},
{
    name: 'Himalaya Baby Soap Gentle',
    weight: '125g',
    price: 99,
    oldPrice: 105,
    discount: '5% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: '	https://tse1.mm.bing.net/th/id/OIP.eK8fr37WJmE-RvVt_2jfgQHaFF?pid=Api&H=109&W=160',
    inStock: true,
    description: 'Himalaya Baby Soap Gentle | Mild Formula | No Tears | 125g Bar',
    stock: 105
},
{
    name: 'Himalaya Baby Soap Nourishing',
    weight: '125g',
    price: 99,
    oldPrice: 105,
    discount: '15% OFF',
    category: 'Baby Care',
    brand: 'Himalaya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.IlZ2gdf1UBU9VQjZAY4_vQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Baby Soap Nourishing | Honey & Milk | Deep Nourishment | 125g Bar',
    stock: 100
}












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