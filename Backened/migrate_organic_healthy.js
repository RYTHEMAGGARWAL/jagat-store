// migrate_organic_healthy_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_organic_healthy_IMPROVED.js

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

// ========== ORGANIC & HEALTHY LIVING PRODUCTS ==========
const organicHealthyProducts = [


{
  name: 'Tata Tea Premium',
  weight: '100g',
  price: 52,
  oldPrice: 62,
  discount: '16% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: '	https://tse1.mm.bing.net/th/id/OIP.WZaTNVDgGy9eRKeWp6rofgHaJy?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Premium | Rich & Aromatic | 100g',
  stock: 150
},
{
  name: 'Tata Tea Premium',
  weight: '250g',
  price: 125,
  oldPrice: 150,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: '	https://tse1.mm.bing.net/th/id/OIP.EL6hNkKazAt8iyUHZWmcawHaG_?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Premium | Rich & Aromatic | 250g',
  stock: 120
},
{
  name: 'Tata Tea Premium',
  weight: '500g',
  price: 245,
  oldPrice: 295,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: 'https://tse2.mm.bing.net/th/id/OIP.JypiAFsWQKIdu6CYv_pJDgHaJy?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Premium | Rich & Aromatic | 500g',
  stock: 100
},
{
  name: 'Tata Tea Premium',
  weight: '1kg',
  price: 480,
  oldPrice: 575,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: 'https://tse4.mm.bing.net/th/id/OIP.uX_VW-S8Y7dLspGUk8QvrAHaIL?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Premium | Rich & Aromatic | 1kg',
  stock: 70
},

// RED LABEL PLAIN

{
  name: 'Brooke Bond Red Label Tea',
  weight: '250g',
  price: 115,
  oldPrice: 140,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Red Label',
  image: 'https://tse3.mm.bing.net/th/id/OIP.ldfe_aUEayLKtikn5EH1zQHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Brooke Bond Red Label | Togetherness Chai | 250g',
  stock: 120
},
{
  name: 'Brooke Bond Red Label Tea',
  weight: '500g',
  price: 225,
  oldPrice: 275,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Red Label',
  image: 'https://tse1.mm.bing.net/th/id/OIP.P3qBtDU_rQgulMVMfkp9bQHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Brooke Bond Red Label | Togetherness Chai | 500g',
  stock: 90
},

// RED LABEL NATURAL CARE (MASALA)
{
  name: 'Red Label Natural Care Tea',
  weight: '250g',
  price: 145,
  oldPrice: 175,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Red Label',
  image: '	https://tse4.mm.bing.net/th/id/OIP.6W6gK1D_mWxwI_aQBy_93gHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Red Label Natural Care | 5 Ayurvedic Herbs | Masala Tea | 250g',
  stock: 100
},


// TAJ MAHAL TEA

{
  name: 'Brooke Bond Taj Mahal Tea',
  weight: '250g',
  price: 155,
  oldPrice: 188,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Taj Mahal',
  image: 'https://tse4.mm.bing.net/th/id/OIP.9e_qpUcXYbnwqmnqJqoE6AHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Taj Mahal Tea | Rich & Flavourful | Premium | 250g',
  stock: 100
},
{
  name: 'Brooke Bond Taj Mahal Tea',
  weight: '500g',
  price: 305,
  oldPrice: 370,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Taj Mahal',
  image: '	https://tse4.mm.bing.net/th/id/OIP.WCX7Xq2zDVG_4vk8lexQsAHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Taj Mahal Tea | Rich & Flavourful | Premium | 500g',
  stock: 70
},

// WAGH BAKRI PREMIUM
{
  name: 'Wagh Bakri Premium Tea',
  weight: '250g',
  price: 120,
  oldPrice: 145,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Wagh Bakri',
  image: '	https://tse2.mm.bing.net/th/id/OIP.mnFuirYvhoYAn-fQsLWxjwHaIO?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Wagh Bakri Premium Leaf Tea | Strong & Rich | 250g',
  stock: 110
},
{
  name: 'Wagh Bakri Premium Tea',
  weight: '500g',
  price: 235,
  oldPrice: 285,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Wagh Bakri',
  image: 'https://tse1.mm.bing.net/th/id/OIP.WBXahK1X__obdwZPrfl01AAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Wagh Bakri Premium Leaf Tea | Strong & Rich | 500g',
  stock: 80
},
{
  name: 'Wagh Bakri Premium Tea',
  weight: '1kg',
  price: 460,
  oldPrice: 555,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Wagh Bakri',
  image: 'https://tse4.mm.bing.net/th/id/OIP.6_NR4wPAXr3RksTkz5TTTwHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Wagh Bakri Premium Leaf Tea | Strong & Rich | 1kg',
  stock: 50
},

// WAGH BAKRI MILI (DUST TEA)
{
  name: 'Wagh Bakri Mili Tea',
  weight: '250g',
  price: 95,
  oldPrice: 115,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Wagh Bakri',
  image: 'https://tse1.mm.bing.net/th/id/OIP.i2bVpKIWUtX08HsggKbiWwHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Wagh Bakri Mili Dust Tea | Strong Brew | 250g',
  stock: 120
},
{
  name: 'Wagh Bakri Mili Tea ',
  weight: '500g',
  price: 185,
  oldPrice: 225,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Wagh Bakri',
  image: 'https://tse3.mm.bing.net/th/id/OIP.c5EF5y96QLg-buzadvmcrQHaIP?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Wagh Bakri Mili Dust Tea | Strong Brew | Jar Free | 500g',
  stock: 90
},
{
  name: 'Wagh Bakri Mili Tea + Container Free',
  weight: '1kg',
  price: 360,
  oldPrice: 435,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Wagh Bakri',
  image: '	https://tse3.mm.bing.net/th/id/OIP.44lOcs6rvb6LzNP4OFBYbgHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Wagh Bakri Mili Dust Tea | Strong Brew | 1kg',
  stock: 60
},

// WAGH BAKRI NAVCHETAN
{
  name: 'Wagh Bakri Navchetan Tea',
  weight: '250g',
  price: 105,
  oldPrice: 128,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Wagh Bakri',
  image: '	https://tse2.mm.bing.net/th/id/OIP.gOqmISCpnbL8UcIgWXp-IQAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Wagh Bakri Navchetan | 9 Ayurvedic Herbs | Immunity Tea | 250g',
  stock: 90
},

// TATA AGNI
{
  name: 'Tata Tea Agni',
  weight: '250g',
  price: 85,
  oldPrice: 102,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: 'https://tse1.mm.bing.net/th/id/OIP.3xXjVpqyoUVX5ibB0T08DgHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Agni | Strong Kadak Chai | 250g',
  stock: 130
},
{
  name: 'Tata Tea Agni Elaichi',
  weight: '250g',
  price: 95,
  oldPrice: 115,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: 'https://tse2.mm.bing.net/th/id/OIP.Ywiac36sCPkOv9BNs8_GpgHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Agni | Elaichi Cardamom Flavour | 250g',
  stock: 100
},

// TATA TEA TAAZA

{
  name: 'Tata Tea Taaza',
  weight: '250g',
  price: 98,
  oldPrice: 118,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: 'https://tse2.mm.bing.net/th/id/OIP.N2GCZGoXGOW3HUMZGt10nwHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Taaza | Fresh & Lively | 250g',
  stock: 120
},

// TATA GOLD
{
  name: 'Tata Tea Gold',
  weight: '250g',
  price: 140,
  oldPrice: 170,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: 'https://tse1.mm.bing.net/th/id/OIP.KQ1kxnX8KwNOfGRrk-ztqQAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Gold | 15% Long Leaves | Premium | 250g',
  stock: 100
},
{
  name: 'Tata Tea Gold',
  weight: '500g',
  price: 275,
  oldPrice: 335,
  discount: '18% OFF',
  category: 'Tea Coffee',
  brand: 'Tata Tea',
  image: 'https://tse4.mm.bing.net/th/id/OIP.Ccz1644-4TncyyjRxZBZAQHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Tata Tea Gold | 15% Long Leaves | Premium | 500g',
  stock: 70
},

// LIPTON GREEN TEA (TEA BAGS)
{
  name: 'Lipton Green Tea Honey Lemon',
  weight: '25 Tea Bags',
  price: 175,
  oldPrice: 210,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Lipton',
  image: '	https://tse3.mm.bing.net/th/id/OIP.CvfGXeuzetGHtcvMrAc4_QHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Lipton Green Tea | Honey Lemon | 25 Tea Bags',
  stock: 80
},


// LIPTON CLEAR & LIGHT
{
  name: 'Lipton Clear & Light Tea',
  weight: '100g',
  price: 85,
  oldPrice: 102,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Lipton',
  image: 'https://tse3.mm.bing.net/th/id/OIP.5UveK-AFwPvuek2EOGkg6QAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Lipton Clear & Light | Loose Leaf Tea | Low Caffeine | 100g',
  stock: 90
},

// ORGANIC INDIA GREEN TEA

{
  name: 'Organic India Tulsi Green Tea',
  weight: '250g',
  price: 525,
  oldPrice: 635,
  discount: '17% OFF',
  category: 'Tea Coffee',
  brand: 'Organic India',
  image: 'https://tse1.mm.bing.net/th/id/OIP.v_Ii5oAWB-geKeAkR_sjQAHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Organic India Tulsi Green Tea | Loose Leaf Container | 250g Tin',
  stock: 40
}





  // ORGANIC TEA & COFFEE
 
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🌿 Starting Smart Migration for Organic & Healthy Living...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Organic & Healthy Living" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of organicHealthyProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Organic & Healthy Living" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();