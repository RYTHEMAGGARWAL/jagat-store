// migrate_pharmacy_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_pharmacy_IMPROVED.js

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

// ========== PHARMACY PRODUCTS ==========
const pharmacyProducts = [



  // ========================================
// 💇 L'OREAL HAIR COLOR - 100gm
// ========================================
{
    name: 'L\'Oreal Paris Hair Color - No. 1 (Black)',
    weight: '100g',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.aKYOppa4Yn4KWD35VRlajwHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'L\'Oreal Paris Hair Color | Shade 1 Natural Black | No Ammonia | 100g',
    stock: 80
},
{
    name: 'L\'Oreal Paris Hair Color - No. 3 (Dark Brown)',
    weight: '100g',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Fm3GsG-IzXN11kiErBrmigHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Paris Hair Color | Shade 3 Dark Brown | No Ammonia | 100g',
    stock: 80
},
{
    name: 'L\'Oreal Paris Hair Color - No. 4 (Brown)',
    weight: '100g',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.EH0oiHpbAbjpaXEoB3XxhgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Paris Hair Color | Shade 4 Brown | No Ammonia | 100g',
    stock: 80
},

// ========================================
// 💇 L'OREAL HAIR COLOR - 25gm (Small Pack)
// ========================================
{
    name: 'L\'Oreal Paris Hair Color - No. 1 (Black)',
    weight: '25g',
    price: 55,
    oldPrice: 70,
    discount: '21% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.aKYOppa4Yn4KWD35VRlajwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Paris Hair Color | Shade 1 Natural Black | Small Pack | 25g',
    stock: 100
},
{
    name: 'L\'Oreal Paris Hair Color - No. 3 (Dark Brown)',
    weight: '25g',
    price: 55,
    oldPrice: 70,
    discount: '21% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.TdTmqG3qdMlb2AgeEs78QgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Paris Hair Color | Shade 3 Dark Brown | Small Pack | 25g',
    stock: 100
},
{
    name: 'L\'Oreal Paris Hair Color - No. 3.16 (Burgundy)',
    weight: '25g',
    price: 55,
    oldPrice: 70,
    discount: '21% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9FyM6SVl7nXvVTCjhN7uGgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Paris Hair Color | Shade 3.16 Burgundy | Small Pack | 25g',
    stock: 100
},


// ========================================
// 💇 L'OREAL CASTING CREME GLOSS - 90gm
// ========================================
{
    name: 'L\'Oreal Casting Creme Gloss - 200 (Ebony Black)',
    weight: '90g',
    price: 450,
    oldPrice: 525,
    discount: '14% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.NNAxkaVctkNSR5E7o0HReAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Casting Creme Gloss | Shade 200 Ebony Black | No Ammonia | 90g',
    stock: 60
},
{
    name: 'L\'Oreal Casting Creme Gloss - 300 (Darkest Brown)',
    weight: '90g',
    price: 450,
    oldPrice: 525,
    discount: '14% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.sKrn73l7mOz-o0YQnU04xQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'L\'Oreal Casting Creme Gloss | Shade 300 Darkest Brown | No Ammonia | 90g',
    stock: 60
},
{
    name: 'L\'Oreal Casting Creme Gloss - 400 (Dark Brown)',
    weight: '90g',
    price: 450,
    oldPrice: 525,
    discount: '14% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.EyI79U7Jbwqpi-9iPZlO2gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Casting Creme Gloss | Shade 400 Dark Brown | No Ammonia | 90g',
    stock: 60
},
{
    name: 'L\'Oreal Casting Creme Gloss - 500 (Medium Brown)',
    weight: '90g',
    price: 450,
    oldPrice: 525,
    discount: '14% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.f0bQqnNBYej_A6Gv8yaftgHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'L\'Oreal Casting Creme Gloss | Shade 500 Medium Brown | No Ammonia | 90g',
    stock: 60
},
{
    name: 'L\'Oreal Casting Creme Gloss - 316 (Burgundy)',
    weight: '90g',
    price: 450,
    oldPrice: 525,
    discount: '14% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.tJZ0-mT8kkzRK9uC03mlawHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'L\'Oreal Casting Creme Gloss | Shade 316 Burgundy | No Ammonia | 90g',
    stock: 60
},

// ========================================
// 💇 L'OREAL CASTING CREME GLOSS - 20gm (Sachet)
// ========================================
{
    name: 'L\'Oreal Casting Creme Gloss - 200 (Ebony Black)',
    weight: '20g',
    price: 125,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.-uZSxCREmgbN9msFh-OM6gAAAA?pid=Api&P=0&w=400&h=600',
    inStock: true,
    description: 'L\'Oreal Casting Creme Gloss | Shade 200 Ebony Black | Sachet Pack | 20g',
    stock: 80
},
{
    name: 'L\'Oreal Casting Creme Gloss - 300 (Darkest Brown)',
    weight: '20g',
    price: 125,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Pharmacy',
    brand: 'L\'Oreal',
    image: '	https://tse2.mm.bing.net/th/id/OIP.zTH4t5S-1hki_9dtDlB9IwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'L\'Oreal Casting Creme Gloss | Shade 300 Darkest Brown | Sachet Pack | 20g',
    stock: 80
},


// ========================================
// 💇 GARNIER COLOR NATURALS - 60gm
// ========================================
{
    name: 'Garnier Color Naturals - No. 1 (Black)',
    weight: '60g',
    price: 145,
    oldPrice: 175,
    discount: '17% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: '	https://tse1.mm.bing.net/th/id/OIP.z7TWEzTybOvxLXItsAVN5QHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Garnier Color Naturals | Shade 1 Natural Black | Nourishing Color | 60g',
    stock: 80
},
{
    name: 'Garnier Color Naturals - No. 3 (Darkest Brown)',
    weight: '60g',
    price: 145,
    oldPrice: 175,
    discount: '17% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hZxm8CyZv3udZauCOCavwwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Garnier Color Naturals | Shade 3 Darkest Brown | Nourishing Color | 60g',
    stock: 80
},
{
    name: 'Garnier Color Naturals - No. 3.16 (Burgundy)',
    weight: '60g',
    price: 145,
    oldPrice: 175,
    discount: '17% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: 'https://tse2.mm.bing.net/th/id/OIP.fob7-VtaX26ojH_VDxhPzwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Garnier Color Naturals | Shade 3.16 Burgundy | Nourishing Color | 60g',
    stock: 80
},
{
    name: 'Garnier Color Naturals - No. 5 (Light Brown)',
    weight: '60g',
    price: 145,
    oldPrice: 175,
    discount: '17% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Nx_VAfU1A0eJLpLCJFVcIAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Garnier Color Naturals | Shade 5 Light Brown | Nourishing Color | 60g',
    stock: 80
},

// ========================================
// 💇 GARNIER COLOR NATURALS - 30gm (Sachet)
// ========================================


// ========================================
// 💇 GARNIER COLOR NATURALS - POUCH
// ========================================
{
    name: 'Garnier Color Naturals Pouch - No. 1 (Black)',
    weight: '20ml',
    price: 35,
    oldPrice: 45,
    discount: '22% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: 'https://tse1.mm.bing.net/th/id/OIP.W0ruMbPxfkv2cskE0ARp7QHaIy?pid=Api&H=189&W=160',
    inStock: true,
    description: 'Garnier Color Naturals Pouch | Shade 1 Natural Black | Single Use | 20ml',
    stock: 120
},
{
    name: 'Garnier Color Naturals Pouch - No. 2 (Darkest Black)',
    weight: '20ml',
    price: 35,
    oldPrice: 45,
    discount: '22% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: 'https://tse1.mm.bing.net/th/id/OIP.YdkkBX6XLwSt4m2Nr5U76QHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Garnier Color Naturals Pouch | Shade 2 Darkest Black | Single Use | 20ml',
    stock: 120
},
{
    name: 'Garnier Color Naturals Pouch - No. 3 (Darkest Brown)',
    weight: '20ml',
    price: 35,
    oldPrice: 45,
    discount: '22% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: '	https://tse1.mm.bing.net/th/id/OIP._IJ4j0lY6jNhn_i9JIL3-AAAAA?pid=Api&P=0&w=128&h=192',
    inStock: true,
    description: 'Garnier Color Naturals Pouch | Shade 3 Darkest Brown | Single Use | 20ml',
    stock: 120
},
{
    name: 'Garnier Color Naturals Pouch - No. 4 (Brown)',
    weight: '20ml',
    price: 35,
    oldPrice: 45,
    discount: '22% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: 'https://tse2.mm.bing.net/th/id/OIP.OTWac8lE_fYKTiVN9WNI_QHaJ4?pid=Api&P=0&w=400&h=533',
    inStock: true,
    description: 'Garnier Color Naturals Pouch | Shade 4 Brown | Single Use | 20ml',
    stock: 120
},
{
    name: 'Garnier Color Naturals Pouch - No. 3.16 (Burgundy)',
    weight: '20ml',
    price: 35,
    oldPrice: 45,
    discount: '22% OFF',
    category: 'Pharmacy',
    brand: 'Garnier',
    image: '	https://tse2.mm.bing.net/th/id/OIP.cuo-yejpHTKRzZG387ZVfwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Garnier Color Naturals Pouch | Shade 3.16 Burgundy | Single Use | 20ml',
    stock: 120
},

// ========================================
// 💇 GODREJ EXPERT RICH CREME - POUCH
// ========================================
{
    name: 'Godrej Expert Rich Creme Pouch - No. 1 (Natural Black)',
    weight: '20g',
    price: 30,
    oldPrice: 40,
    discount: '25% OFF',
    category: 'Pharmacy',
    brand: 'Godrej',
    image: 'https://tse1.mm.bing.net/th/id/OIP.DyAZXLHNyOzR_s3swWNERgHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Godrej Expert Rich Creme Pouch | Shade 1 Natural Black | Single Use | 20g',
    stock: 120
},
{
    name: 'Godrej Expert Rich Creme Pouch - No. 3 (Black Brown)',
    weight: '20g',
    price: 30,
    oldPrice: 40,
    discount: '25% OFF',
    category: 'Pharmacy',
    brand: 'Godrej',
    image: 'https://tse2.mm.bing.net/th/id/OIP.NWoYZUQHrtpyXxEPs_XJQAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Godrej Expert Rich Creme Pouch | Shade 3 Dark Brown | Single Use | 20g',
    stock: 120
},
{
    name: 'Godrej Expert Rich Creme Pouch - No. 4 (Natural Brown)',
    weight: '20g',
    price: 30,
    oldPrice: 40,
    discount: '25% OFF',
    category: 'Pharmacy',
    brand: 'Godrej',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Lti9jKY3jPe7JzAqcQ-J8wHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Godrej Expert Rich Creme Pouch | Shade 4 Natural Brown | Single Use | 20g',
    stock: 120
},
{
    name: 'Godrej Expert Rich Creme Pouch - No. 4.06 (Dark Brown)',
    weight: '20g',
    price: 30,
    oldPrice: 40,
    discount: '25% OFF',
    category: 'Pharmacy',
    brand: 'Godrej',
    image: 'https://tse2.mm.bing.net/th/id/OIP.JZkDi1hiNDVe_SEQ6uMYJwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Godrej Expert Rich Creme Pouch | Shade 4.06 Dark Brown | Single Use | 20g',
    stock: 120
},

// ========================================
// 💇 STREAX HAIR COLOR - POUCH
// ========================================
{
    name: 'Streax Hair Color Pouch - No. 1 (Natural Black)',
    weight: '15g',
    price: 25,
    oldPrice: 35,
    discount: '29% OFF',
    category: 'Pharmacy',
    brand: 'Streax',
    image: 'https://tse1.mm.bing.net/th/id/OIP.xy5kq6MqtLPRjgf-o8SFyAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Streax Hair Color Pouch | Shade 1 Natural Black | Single Use | 15g',
    stock: 120
},
{
    name: 'Streax Hair Color Pouch - No. 3 (Dark Brown)',
    weight: '15g',
    price: 25,
    oldPrice: 35,
    discount: '29% OFF',
    category: 'Pharmacy',
    brand: 'Streax',
    image: '	https://tse1.mm.bing.net/th/id/OIP.u6HPEqd3HftpHwRCX3UMdAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Streax Hair Color Pouch | Shade 3 Dark Brown | Single Use | 15g',
    stock: 120
},
{
    name: 'Streax Hair Color Pouch - No. 4 (Brown)',
    weight: '15g',
    price: 25,
    oldPrice: 35,
    discount: '29% OFF',
    category: 'Pharmacy',
    brand: 'Streax',
    image: 'https://tse2.mm.bing.net/th/id/OIP.edr-YikRZ19kRebzqajH8gHaIm?pid=Api&P=0&w=400&h=465',
    inStock: true,
    description: 'Streax Hair Color Pouch | Shade 4 Brown | Single Use | 15g',
    stock: 120
},
{
    name: 'Streax Hair Color Pouch - No. 3.16 (Burgundy)',
    weight: '15g',
    price: 25,
    oldPrice: 35,
    discount: '29% OFF',
    category: 'Pharmacy',
    brand: 'Streax',
    image: '	https://tse2.mm.bing.net/th/id/OIP.2RSbEbJ2RAeUqBsjcWBmfQAAAA?pid=Api&P=0&w=380&h=500',
    inStock: true,
    description: 'Streax Hair Color Pouch | Shade 3.16 Burgundy | Single Use | 15g',
    stock: 120
},
{
    name: 'Eno Lemon Sachet',
    weight: '5g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Pharmacy',
    brand: 'Eno',
    image: 'https://tse1.mm.bing.net/th/id/OIP.4hZjr-NhyUtN5Ndzu2x0FQAAAA?pid=Api&P=0&w=400&h=480',
    inStock: true,
    description: 'Eno Lemon Sachet | Fast Relief from Acidity | Single Use | 5g',
    stock: 200
},
{
    name: 'Eno Lemon Box',
    weight: '30 Sachets',
    price: 260,
    oldPrice: 310,
    discount: '16% OFF',
    category: 'Pharmacy',
    brand: 'Eno',
    image: '	https://tse1.mm.bing.net/th/id/OIP.2jW6E8xq7CVhn-OFa8j0QgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Eno Lemon Box | 30 Sachets | Fast Acidity Relief | Family Pack',
    stock: 80
},
{
    name: 'Eno Lemon Jar',
    weight: '100g',
    price: 85,
    oldPrice: 105,
    discount: '19% OFF',
    category: 'Pharmacy',
    brand: 'Eno',
    image: 'https://tse2.mm.bing.net/th/id/OIP.ipSo8zymgajCq3gwPKFNAQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Eno Lemon Jar | Fruit Salt | Fast Acidity Relief | 100g Bottle',
    stock: 100
},
{
    name: 'Vicks Vaporub',
    weight: '50g',
    price: 155,
    oldPrice: 185,
    discount: '16% OFF',
    category: 'Pharmacy',
    brand: 'Vicks',
    image: 'https://tse2.mm.bing.net/th/id/OIP.FwssfZ-57TPGoEduGLiBxwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Vicks Vaporub | Cold & Cough Relief | Eucalyptus & Menthol | 50g',
    stock: 100
},
{
    name: 'Vicks BabyRub',
    weight: '25g',
    price: 115,
    oldPrice: 140,
    discount: '18% OFF',
    category: 'Pharmacy',
    brand: 'Vicks',
    image: '	https://tse1.mm.bing.net/th/id/OIP.rnsT6ZA-Nc1doB5OcTZRigHaFv?pid=Api&H=123&W=160',
    inStock: true,
    description: 'Vicks BabyRub | Soothing Comfort for Babies | Lavender & Rosemary | 25g',
    stock: 100
},
{
    name: 'Iodex Fast Relief',
    weight: '40g',
    price: 115,
    oldPrice: 140,
    discount: '18% OFF',
    category: 'Pharmacy',
    brand: 'Iodex',
    image: '	https://tse2.mm.bing.net/th/id/OIP.5TS_2lLikrSWq6o954zdCwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Iodex Fast Relief | Muscle & Joint Pain | Quick Action | 40g',
    stock: 100
},
{
    name: 'Zandu Balm',
    weight: '25g',
    price: 90,
    oldPrice: 110,
    discount: '18% OFF',
    category: 'Pharmacy',
    brand: 'Zandu',
    image: '	https://tse1.mm.bing.net/th/id/OIP.438ww2gAvBgLgw-jC-kG4AHaJO?pid=Api&H=199&W=160',
    inStock: true,
    description: 'Zandu Balm | Headache & Body Pain Relief | Ayurvedic | 25g',
    stock: 120
},



  // PAIN RELIEF & FEVER
 
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n💊 Starting Smart Migration for Pharmacy...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Pharmacy" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of pharmacyProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Pharmacy" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   💊 Pain Relief & Fever: 9 products');
    console.log('   🤧 Cold & Cough: 8 products');
    console.log('   🍃 Digestion & Stomach: 6 products');
    console.log('   💪 Vitamins & Supplements: 6 products');
    console.log('   🩺 Diabetes Care: 4 products');
    console.log('   🏥 First Aid & Healthcare: 8 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();