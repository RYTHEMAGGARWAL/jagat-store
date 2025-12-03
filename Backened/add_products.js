/**
 * ╔════════════════════════════════════════════════════════════════╗
 * ║        UNIVERSAL PRODUCT MIGRATION SCRIPT - JAGAT STORE       ║
 * ║                                                                 ║
 * ║   📌 HOW TO USE:                                               ║
 * ║   1. Neeche products array mein apne products add karo         ║
 * ║   2. Terminal mein run karo: node add_products.js              ║
 * ║   3. Done! Products database mein + images Cloudinary par      ║
 * ╚════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

// ═══════════════════════════════════════════════════════════════════
// 🔧 CLOUDINARY CONFIGURATION (Built-in)
// ═══════════════════════════════════════════════════════════════════
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ═══════════════════════════════════════════════════════════════════
// 🎯 YAHAN APNE PRODUCTS ADD KARO - BAS COPY PASTE KARO
// ═══════════════════════════════════════════════════════════════════

const products = [
 


  
// ============ JUGAL RUSK ============
{
    name: 'Jugal Premium Rusk',
    weight: '300g',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.jfWcz-ntBGltw10KujC5mwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Premium Rusk | Crispy & Crunchy | Perfect with Tea | 300g Pack',
    stock: 100
},
{
    name: 'Jugal Custom Rusk',
    weight: '350g',
    price: 70,
    oldPrice: 85,
    discount: '18% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.gbC_i037Zhxkz-eZdTG05AHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Jugal Custom Rusk | Extra Crispy | Tea Time Snack | 350g Pack',
    stock: 100
},

// ============ MADHURIMA RUSK ============
{
    name: 'Madhurima Premium Rusk',
    weight: '300g',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hTIpXh8hLTh2GOHHcHZc5gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Premium Rusk | Crispy & Tasty | Perfect with Chai | 300g Pack',
    stock: 100
},
{
    name: 'Madhurima Ilaichi Rusk',
    weight: '350g',
    price: 70,
    oldPrice: 85,
    discount: '18% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse1.mm.bing.net/th/id/OIP.S5XgpOe0Vvxwwgetiy5C4QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Ilaichi Rusk | Crunchy & Delicious | Tea Time Snack | 350g Pack',
    stock: 100
},

// ============ MADHURIMA CAKE RUSK - EGGLESS ============
{
    name: 'Madhurima Cake Rusk Eggless - Cherry',
    weight: '300g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse1.mm.bing.net/th/id/OIP.UeR5SiQMo0tt-03t3CdANAHaEN?pid=Api&H=90&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk Eggless | Cherry Flavour | Soft & Crunchy | 300g Pack',
    stock: 100
},
{
    name: 'Madhurima Cake Rusk Eggless - Plain',
    weight: '300g',
    price: 80,
    oldPrice: 95,
    discount: '16% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse1.mm.bing.net/th/id/OIP.PG6_t7AQnOn79e1S4zPgFAHaDp?pid=Api&H=78&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk Eggless | Plain Flavour | Soft & Tasty | 300g Pack',
    stock: 100
},

// ============ MADHURIMA CAKE RUSK - EGG ============
{
    name: 'Madhurima Cake Rusk - Cherry',
    weight: '300g',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse2.mm.bing.net/th/id/OIP.FpgE8mqndT0q4EJEB9RIegHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk | Cherry Flavour with Egg | Rich & Crunchy | 300g Pack',
    stock: 100
},
{
    name: 'Madhurima Cake Rusk - Plain',
    weight: '300g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: '	https://tse2.mm.bing.net/th/id/OIP.zz51z-q7MJfl9PnDIc0XkwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk | Plain Flavour with Egg | Soft & Tasty | 300g Pack',
    stock: 100
},

// ============ FAN BISCUITS ============
{
    name: 'Madhurima Fan Biscuit - Big',
    weight: '400g',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse2.mm.bing.net/th/id/OIP.IRykBknbg-Uxeg8CI7nUHwHaKW?pid=Api&H=223&W=160',
    inStock: true,
    description: 'Madhurima Fan Biscuit Big | Crispy & Sweet | Traditional Taste | 400g Pack',
    stock: 100
},
{
    name: 'Muskan Fan Biscuit - Small',
    weight: '200g',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Bakery Biscuits',
    brand: 'Muskan',
    image: '	https://tse1.mm.bing.net/th/id/OIP.EkvbD3DPbTJhF1g-rqw8YQAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Muskan Fan Biscuit Small | Crunchy & Tasty | Tea Time Snack | 200g Pack',
    stock: 100
},

// ============ JUGAL TRADITIONAL SNACKS ============
{
    name: 'Jugal Mattapare',
    weight: '250g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.8ARbbVRrlhZ24sN4T-V_YQHaKL?pid=Api&H=219&W=160',
    inStock: true,
    description: 'Jugal Mattapare | Sweet & Crispy | Traditional Indian Snack | 250g Pack',
    stock: 100
},
{
    name: 'Jugal Mathi',
    weight: '250g',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse2.mm.bing.net/th/id/OIP.dpqBmhVVO6_fMKSEjrcpvgHaFF?pid=Api&H=109&W=160',
    inStock: true,
    description: 'Jugal Mathi | Flaky & Crispy | Namkeen Snack | 250g Pack',
    stock: 100
},

// ============ JUGAL BUTTER BAKERY BISCUITS ============
{
    name: 'Jugal Butter Badam Elaichi Biscuit',
    weight: '350g',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '			https://tse2.mm.bing.net/th/id/OIP.NCttG7aNbDeiD51Le_kYBwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Butter Badam Elaichi | Rich Butter & Cardamom Flavour | Premium Biscuit | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Butter Pista Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.6bHG5_1a6K4k9Fp8eHfCZgHaDf?pid=Api&H=75&W=160',
    inStock: true,
    description: 'Jugal Butter Pista Biscuit | Rich Pistachio Flavour | Melt in Mouth | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Kaju Nutty Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.UzGRf94zCa_GPQv5K9jwvQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Kaju Nutty Biscuit | Crunchy Cashew Flavour | Premium Quality | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Badam Nutty Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.fIDvvBiKhlhKCPu0xAE0hAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Badam Nutty Biscuit | Rich Almond Flavour | Healthy & Tasty | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Besan Khatai Biscuit',
    weight: '350g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hWalFiW1Ac8juCnxuGMa3QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Besan Khatai | Traditional Gram Flour Biscuit | Melt in Mouth | 350g Pack',
    stock: 100
},
// ============ KIDYS BAKERY BISCUITS ============
{
    name: 'Kidys Dryfruit Biscuit',
    weight: '350g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse1.mm.bing.net/th/id/OIP.73UlWAdACu1OZ_Hk3JmAMAHaIW?pid=Api&H=180&W=160',
    inStock: true,
    description: 'Kidys Dryfruit Biscuit | Loaded with Nuts | Rich & Crunchy | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Badam Biscuit',
    weight: '350g',
    price: 75,
    oldPrice: 90,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse1.mm.bing.net/th/id/OIP.70y9j535981Wkcc-U3XK_AAAAA?pid=Api&H=274&W=160',
    inStock: true,
    description: 'Kidys Badam Biscuit | Big Size | Crispy & Tasty | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Kaju Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse2.mm.bing.net/th/id/OIP.HvQQMJUjPAYbvfZ6nRMrVwHaIW?pid=Api&H=180&W=160',
    inStock: true,
    description: 'Kidys Kaju Biscuit | Rich Cashew Flavour | Melt in Mouth | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Jeera Biscuit',
    weight: '350g',
    price: 70,
    oldPrice: 85,
    discount: '18% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Tk6KxwxwQaLAifSl4popEgAAAA?pid=Api&H=271&W=160',
    inStock: true,
    description: 'Kidys Jeera Biscuit | Cumin Flavour | Crispy & Namkeen | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Ajwain Biscuit',
    weight: '350g',
    price: 70,
    oldPrice: 85,
    discount: '18% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: '	https://tse1.mm.bing.net/th/id/OIP.5rZvCCYa6ihfoh8bPhCihAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kidys Ajwain Biscuit | Carom Seeds Flavour | Digestive & Crunchy | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Coconut Biscuit',
    weight: '350g',
    price: 80,
    oldPrice: 95,
    discount: '16% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse1.mm.bing.net/th/id/OIP.MwdBgKbsbEolhtH478NS0wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kidys Coconut Biscuit | Rich Coconut Flavour | Sweet & Crispy | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Chocolate Chips Biscuit',
    weight: '350g',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse2.mm.bing.net/th/id/OIP.qfxdcmIHJOIc5SESSw9pvQHaER?pid=Api&P=0&w=694&h=400',
    inStock: true,
    description: 'Kidys Chocolate Chips Biscuit | Loaded with Choco Chips | Kids Favourite | 350g Pack',
    stock: 100
},




  



  // -------- YAHAN AUR PRODUCTS ADD KARO --------
  
];

// ═══════════════════════════════════════════════════════════════════
// ⚠️ NEECHE KUCH CHANGE MAT KARNA - YE AUTOMATIC HAI
// ═══════════════════════════════════════════════════════════════════

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  weight: String,
  price: Number,
  oldPrice: Number,
  discount: String,
  category: String,
  brand: String,
  image: String,
  inStock: { type: Boolean, default: true },
  description: String,
  stock: { type: Number, default: 50 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Upload image to Cloudinary
const uploadToCloudinary = async (imageUrl, productName, weight, category) => {
  try {
    // Skip if already Cloudinary URL
    if (imageUrl && imageUrl.includes('cloudinary.com')) {
      return { success: true, url: imageUrl, skipped: true };
    }

    // Skip empty URLs
    if (!imageUrl || imageUrl.trim() === '') {
      return { success: false, url: imageUrl, error: 'Empty URL' };
    }

    // Create clean public_id
    const cleanCategory = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cleanName = `${productName}-${weight}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);

    const publicId = `${cleanCategory}/${cleanName}`;

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'jagatstore/products',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    return { success: true, url: result.secure_url };

  } catch (error) {
    return { success: false, url: imageUrl, error: error.message };
  }
};

// Main migration function
const migrateProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║        🚀 JAGAT STORE - PRODUCT MIGRATION STARTED             ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
    console.log('✅ MongoDB Connected');
    console.log(`✅ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ NOT SET'}\n`);

    // Check Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.log('⚠️  WARNING: Cloudinary credentials missing in .env file!');
      console.log('   Products will be added with original image URLs.\n');
    }

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;
    let cloudinarySuccess = 0;
    let cloudinaryFail = 0;

    console.log(`📦 Total Products to Add: ${products.length}\n`);
    console.log('━'.repeat(60) + '\n');

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const productLabel = `${product.name} (${product.weight})`;

      try {
        // Check if product already exists
        const existingProduct = await Product.findOne({
          name: product.name,
          weight: product.weight,
          brand: product.brand
        });

        if (existingProduct) {
          console.log(`⏭️  [${i + 1}/${products.length}] SKIPPED (Already Exists): ${productLabel}`);
          skipCount++;
          continue;
        }

        // Upload image to Cloudinary
        console.log(`📤 [${i + 1}/${products.length}] Uploading: ${productLabel}...`);
        
        const uploadResult = await uploadToCloudinary(
          product.image,
          product.name,
          product.weight,
          product.category
        );

        // Create new product
        const newProduct = new Product({
          ...product,
          image: uploadResult.url
        });

        await newProduct.save();

        if (uploadResult.success && !uploadResult.skipped) {
          console.log(`✅ [${i + 1}/${products.length}] ADDED + CLOUDINARY: ${productLabel}`);
          console.log(`   📍 ${uploadResult.url}`);
          cloudinarySuccess++;
        } else if (uploadResult.skipped) {
          console.log(`✅ [${i + 1}/${products.length}] ADDED (Already Cloudinary): ${productLabel}`);
          cloudinarySuccess++;
        } else {
          console.log(`⚠️  [${i + 1}/${products.length}] ADDED (Original URL): ${productLabel}`);
          console.log(`   ❌ Cloudinary: ${uploadResult.error}`);
          cloudinaryFail++;
        }
        
        successCount++;

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.log(`❌ [${i + 1}/${products.length}] FAILED: ${productLabel}`);
        console.log(`   Error: ${error.message}`);
        failCount++;
      }

      console.log('');
    }

    // Summary
    console.log('━'.repeat(60));
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    📊 MIGRATION SUMMARY                        ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   ✅ Products Added:       ${successCount.toString().padEnd(34)}║`);
    console.log(`║   ⏭️  Skipped (Existing):   ${skipCount.toString().padEnd(34)}║`);
    console.log(`║   ❌ Failed:               ${failCount.toString().padEnd(34)}║`);
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   🖼️  Cloudinary Success:   ${cloudinarySuccess.toString().padEnd(34)}║`);
    console.log(`║   ⚠️  Cloudinary Failed:    ${cloudinaryFail.toString().padEnd(34)}║`);
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   📦 Total Processed:      ${products.length.toString().padEnd(34)}║`);
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('❌ Migration Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB Connection Closed\n');
    process.exit(0);
  }
};

// Run migration
migrateProducts();