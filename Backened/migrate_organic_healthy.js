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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
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
   category: 'Organic & Healthy Living',
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
   category: 'Organic & Healthy Living',
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
  category: 'Organic & Healthy Living',
  brand: 'Organic India',
  image: 'https://tse1.mm.bing.net/th/id/OIP.v_Ii5oAWB-geKeAkR_sjQAHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Organic India Tulsi Green Tea | Loose Leaf Container | 250g Tin',
  stock: 40
},
// ============ PATANJALI HONEY ============
{
  name: 'Patanjali Pure Honey',
  weight: '100g',
  price: 45,
  oldPrice: 55,
  discount: '18% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Patanjali',
  image: '	https://tse3.mm.bing.net/th/id/OIP.MrY87H2zJW3Sx9m3UjvbbgHaHZ?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Patanjali Pure Natural Honey | 100% Pure | Rich in Minerals & Vitamins | 100g',
  stock: 120
},
{
  name: 'Patanjali Pure Honey',
  weight: '250g',
  price: 95,
  oldPrice: 110,
  discount: '14% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Patanjali',
  image: '	https://tse3.mm.bing.net/th/id/OIP.w-W_qZd7m334aChN9xUhDAAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Patanjali Pure Natural Honey | 100% Pure | Rich in Minerals & Vitamins | 250g',
  stock: 85
},
{
  name: 'Patanjali Pure Honey',
  weight: '500g',
  price: 178,
  oldPrice: 210,
  discount: '15% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Patanjali',
  image: 'https://tse2.mm.bing.net/th/id/OIP.FZmp0wTz8HJ8L8H_nsJKyQAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Patanjali Pure Natural Honey | 100% Pure | Rich in Minerals & Vitamins | 500g',
  stock: 75
},
{
  name: 'Patanjali Pure Honey',
  weight: '1kg',
  price: 325,
  oldPrice: 380,
  discount: '14% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Patanjali',
  image: '	https://tse1.mm.bing.net/th/id/OIP.Y3CjqAcDiY44hgc3v5m82QAAAA?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Patanjali Pure Natural Honey | 100% Pure | Rich in Minerals & Vitamins | 1kg',
  stock: 60
},

// ============ DABUR HONEY ============
{
  name: 'Dabur Pure Honey',
  weight: '100g',
  price: 66,
  oldPrice: 70,
  discount: '6% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Dabur',
  image: 'https://tse1.mm.bing.net/th/id/OIP.-xUr2jAnX2vxLSWGArcxEwAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dabur 100% Pure Honey | World\'s No.1 Honey Brand | No Sugar Adulteration | 100g',
  stock: 100
},
{
  name: 'Dabur Pure Honey',
  weight: '250g',
  price: 109,
  oldPrice: 125,
  discount: '13% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Dabur',
  image: '	https://tse2.mm.bing.net/th/id/OIP.IpmMS34ina7D-eNBV6RMagHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dabur 100% Pure Honey | World\'s No.1 Honey Brand | No Sugar Adulteration | 250g',
  stock: 90
},
{
  name: 'Dabur Pure Honey',
  weight: '500g',
  price: 210,
  oldPrice: 250,
  discount: '16% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Dabur',
  image: '	https://tse1.mm.bing.net/th/id/OIP.KZOGeJEbvTqlxIi93iq58AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dabur 100% Pure Honey | World\'s No.1 Honey Brand | No Sugar Adulteration | 500g',
  stock: 70
},
{
  name: 'Dabur Pure Honey',
  weight: '1kg',
  price: 377,
  oldPrice: 495,
  discount: '24% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Dabur',
  image: 'https://tse1.mm.bing.net/th/id/OIP.ntf8vC1jAN4TkjXcD4DVhgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dabur 100% Pure Honey | World\'s No.1 Honey Brand | No Sugar Adulteration | 1kg',
  stock: 55
},

// ============ DABUR CHYAWANPRASH ============
{
  name: 'Dabur Chyawanprash',
  weight: '500g',
  price: 240,
  oldPrice: 260,
  discount: '8% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Dabur',
  image: 'https://tse1.mm.bing.net/th/id/OIP.q5k9pkIb4fLFq4vni9x8BQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dabur Chyawanprash | 3X Immunity Action | 40+ Ayurvedic Herbs | 500g',
  stock: 80
},
{
  name: 'Dabur Chyawanprash',
  weight: '1kg',
  price: 365,
  oldPrice: 410,
  discount: '11% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Dabur',
  image: '	https://tse1.mm.bing.net/th/id/OIP.lHmuVx6cQTrRl6pZdekeNwHaLW?pid=Api&H=245&W=160',
  inStock: true,
  description: 'Dabur Chyawanprash | 3X Immunity Action | 40+ Ayurvedic Herbs | 950g',
  stock: 65
},

// ============ PATANJALI CHYAWANPRASH ============
{
  name: 'Patanjali Special Chyawanprash',
  weight: '500g',
  price: 173,
  oldPrice: 185,
  discount: '6% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Patanjali',
  image: 'https://tse1.mm.bing.net/th/id/OIP.qYoLbvtJ-0OMbvkXoB41vwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Patanjali Special Chyawanprash with Saffron | Immunity Booster | Ayurvedic | 500g',
  stock: 85
},
{
  name: 'Patanjali Special Chyawanprash',
  weight: '1kg',
  price: 262,
  oldPrice: 310,
  discount: '15% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Patanjali',
  image: 'https://tse2.mm.bing.net/th/id/OIP.UO0I0Db_MrX1CFiMn8WYEAAAAA?pid=Api&H=200&W=160',
  inStock: true,
  description: 'Patanjali Special Chyawanprash with Saffron | Immunity Booster | Ayurvedic | 1kg',
  stock: 50
},






























// ========================================
// 🪔 POOJA ESSENTIALS - KALAWA & ROLI
// ========================================
{
  name: 'Pooja Kalawa (Mauli)',
  weight: '1pc',
  price: 15,
  oldPrice: 20,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.T2aPonS76fnHAAovalGN5gAAAA?pid=Api&H=132&W=160',
  inStock: true,
  description: '🪔 Pooja Kalawa | Sacred Red Thread | Mauli | For All Pooja',
  stock: 200
},
{
  name: 'Pooja Roli (Kumkum)',
  weight: '50g',
  price: 20,
  oldPrice: 30,
  discount: '33% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse1.mm.bing.net/th/id/OIP.4dUMSDIc6-QQcXUl3z7nKAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pure Roli Kumkum | For Tilak & Pooja | Premium Quality',
  stock: 150
},

// ========================================
// 🪔 KAPOOR (CAMPHOR)
// ========================================
{
  name: 'Saraswati Kapoor (Camphor)',
  weight: '20g',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.ndvTbvZ-TeSibybWz-IIcAHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: '🪔 Pure Kapoor | Camphor Tablets | For Aarti & Pooja | 20g',
  stock: 150
},
{
  name: 'Kapoor (Camphor)',
  weight: '50g',
  price: 55,
  oldPrice: 75,
  discount: '27% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.ZspuCWbSpHV8GCVX03BWWQHaHR?pid=Api&H=156&W=160',
  inStock: true,
  description: '🪔 Pure Kapoor | Camphor Tablets | For Aarti & Pooja | 50g',
  stock: 100
},
{
  name: 'Kapoor (Camphor)',
  weight: '100g',
  price: 99,
  oldPrice: 130,
  discount: '24% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.JrqtxMLCdCTXmm1A9dStDgAAAA?pid=Api&H=194&W=160',
  inStock: true,
  description: '🪔 Pure Kapoor | Camphor Tablets | For Aarti & Pooja | 100g',
  stock: 80
},
{
  name: 'Desi Kapoor (Bhimseni)',
  weight: '50g',
  price: 85,
  oldPrice: 110,
  discount: '23% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse1.mm.bing.net/th/id/OIP.HE_YpTVdYCqeEMzFhRTVQAHaFX?pid=Api&H=115&W=160',
  inStock: true,
  description: '🪔 Desi Bhimseni Kapoor | Pure & Natural | Premium Quality | 50g',
  stock: 80
},

// ========================================
// 🪔 AGARBATTI & DHOOP
// ========================================
{
  name: 'Agarbatti (Incense Sticks)',
  weight: '100g',
  price: 45,
  oldPrice: 60,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.QJA6Z5g29Z8HM_4T1ko7ZQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Premium Agarbatti | Fragrant Incense Sticks | Long Lasting',
  stock: 150
},
{
  name: 'Dhoopbatti Geeli (Wet Dhoop)',
  weight: '1pc',
  price: 35,
  oldPrice: 45,
  discount: '22% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.Uvyve2aJ9YirSj57RoLyBgHaHC?pid=Api&H=151&W=160',
  inStock: true,
  description: '🪔 Geeli Dhoopbatti | Wet Dhoop Stick | Natural Fragrance',
  stock: 100
},
{
  name: 'Dhoopbatti Geeli (Wet Dhoop)',
  weight: '1pc',
  price: 35,
  oldPrice: 45,
  discount: '22% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.gcexhsJxzlLGkdHAPNfNrQHaHf?pid=Api&H=161&W=160',
  inStock: true,
  description: '🪔 Geeli Dhoopbatti | Wet Dhoop Stick | Natural Fragrance',
  stock: 100
},
{
  name: 'Dhoopbatti Sukhi (Dry Dhoop)',
  weight: '1pc',
  price: 30,
  oldPrice: 40,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.5DySlcWp7LMNJ2RUbSAVcwAAAA?pid=Api&H=144&W=160',
  inStock: true,
  description: '🪔 Sukhi Dhoopbatti | Dry Dhoop Stick | Pure & Aromatic',
  stock: 100
},
{
  name: 'Dhoop Cup (Sambrani)',
  weight: '12pcs',
  price: 40,
  oldPrice: 55,
  discount: '27% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.medkjKxSu2j4TbBVsujD-gHaGy?pid=Api&H=146&W=160',
  inStock: true,
  description: '🪔 Dhoop Cup Sambrani | Ready to Use | 12 Cups Pack',
  stock: 120
},


// ========================================
// 🪔 JYOT BATTI & WICKS
// ========================================
{
  name: 'Jyot Batti (Cotton Wicks)',
  weight: '1 Bundle',
  price: 15,
  oldPrice: 20,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.WHKiDtsz6qVgKejRRWV4hAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Jyot Batti | Pure Cotton Wicks | For Diya & Pooja',
  stock: 200
},
{
  name: 'Lambi Batti (Long Wicks)',
  weight: '1 Bundle',
  price: 20,
  oldPrice: 30,
  discount: '33% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.iEtUbXOS-mbJRsG5j0gloQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Lambi Batti | Long Cotton Wicks | For Akhand Jyot',
  stock: 150
},
{
  name: 'Akhand Jyot (Brass Diya)',
  weight: '1pc',
  price: 85,
  oldPrice: 110,
  discount: '23% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.ORQ5KWwjTOExEnpRV8bPiwHaHQ?pid=Api&H=156&W=160',
  inStock: true,
  description: '🪔 Akhand Jyot Diya | Continuous Flame | Brass Made',
  stock: 50
},

// ========================================
// 🪔 CHANDAN TIKA
// ========================================
{
  name: 'Chandan Tika Peela (Yellow)',
  weight: '50g',
  price: 45,
  oldPrice: 60,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP._Zcwp8pPWqQyqRMXU9ndCAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Chandan Tika Peela | Yellow Sandalwood Paste | For Tilak',
  stock: 100
},
{
  name: 'Chandan Tika Safed (White)',
  weight: '50g',
  price: 55,
  oldPrice: 75,
  discount: '27% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse1.mm.bing.net/th/id/OIP.RIuJEnFglyUBaSLXXYlwUAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Chandan Tika Safed | White Sandalwood Paste | Premium',
  stock: 100
},

// ========================================
// 🪔 SHRINGAR & SINDOOR
// ========================================
{
  name: 'Shringar Saman Pitari (Pooja Kit)',
  weight: '1 Set',
  price: 125,
  oldPrice: 165,
  discount: '24% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.4dGDIyjSzkTbPgsLyxaQIAHaFR?pid=Api&H=113&W=160',
  inStock: true,
  description: '🪔 Shringar Pitari | Complete Pooja Kit | For Mata Rani',
  stock: 60
},
{
  name: 'Sindoor (Vermillion)',
  weight: '50g',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse1.mm.bing.net/th/id/OIP.drkVxQIFRdWd12pXzCOPnQAAAA?pid=Api&H=203&W=160',
  inStock: true,
  description: '🪔 Pure Sindoor | Vermillion Powder | For Pooja & Shringar',
  stock: 150
},

// ========================================
// 🪔 GUGAL, LOBAN & DHOOP ITEMS
// ========================================
{
  name: 'Gugal (Guggul)',
  weight: '50g',
  price: 45,
  oldPrice: 60,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.pOSQhSDO7H4lDTUpKrCp5gHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pure Gugal | Guggul Resin | For Hawan & Dhoop',
  stock: 100
},
{
  name: 'Loban (Benzoin)',
  weight: '50g',
  price: 40,
  oldPrice: 55,
  discount: '27% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.M7iahSAkg_E62Tm2UX5pwgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pure Loban | Benzoin Resin | Aromatic Dhoop',
  stock: 100
},
{
  name: 'Gandhak (Sulphur)',
  weight: '50g',
  price: 30,
  oldPrice: 40,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.MsrdkHLyI3z7CNiPKDWupAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pure Gandhak | Sulphur | For Hawan & Pooja',
  stock: 80
},
{
  name: 'Panchranga (Five Fragrance Mix)',
  weight: '50g',
  price: 35,
  oldPrice: 50,
  discount: '30% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.ePCQv1SkzYmBmnyL0tGsZQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Panchranga Mix | Five Fragrance Dhoop | For Hawan',
  stock: 100
},

// ========================================
// 🪔 GANGAJAL & PITAMBARI
// ========================================
{
  name: 'Gangajal (Holy Water)',
  weight: '100ml',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.iJpg38VArN5Bpo4UnByt9AHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: '🪔 Pure Gangajal | Holy Ganga Water | For Pooja',
  stock: 150
},
{
  name: 'Pitambari Powder (Brass Cleaner)',
  weight: '100g',
  price: 30,
  oldPrice: 40,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.yCHESxHhn3G-ARHiI-1wjgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pitambari Powder | Brass & Copper Cleaner | Shining',
  stock: 100
},

// ========================================
// 🪔 JANEU & SACRED THREADS
// ========================================
{
  name: 'Janeu (Sacred Thread)',
  weight: '1pc',
  price: 20,
  oldPrice: 30,
  discount: '33% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse1.mm.bing.net/th/id/OIP.bAS8a7VBZTB4ojMYwyRnxgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pure Janeu | Yagnopavit | Sacred Thread | Cotton',
  stock: 150
},
{
  name: 'Sutra Dhaga (Sacred String)',
  weight: '1 Roll',
  price: 15,
  oldPrice: 20,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.3E75D1a1tPFCbwcFGYEL9QHaE7?pid=Api&H=106&W=160',
  inStock: true,
  description: '🪔 Sutra Dhaga | Cotton String | For Pooja & Hawan',
  stock: 200
},

// ========================================
// 🪔 NARIYAL & HAWAN ITEMS
// ========================================
{
  name: 'Pooja Nariyal (Coconut)',
  weight: '1pc',
  price: 45,
  oldPrice: 60,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse1.mm.bing.net/th/id/OIP.UvV1PlTyUNON0Suk__AZpQAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pooja Nariyal | Fresh Coconut | For All Rituals',
  stock: 100
},
{
  name: 'Hawan Samagri (Homemade Mix)',
  weight: '200g',
  price: 65,
  oldPrice: 85,
  discount: '24% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.AI235WBAI5bvH_w9srNk2QHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Hawan Samagri | Complete Mix | For Hawan & Pooja',
  stock: 80
},
{
  name: 'Aam Lakdi (Mango Wood)',
  weight: '500g',
  price: 45,
  oldPrice: 60,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.R85zRDe_gZu3bS8ZVov10QAAAA?pid=Api&H=111&W=160',
  inStock: true,
  description: '🪔 Aam Lakdi | Mango Wood Sticks | For Hawan',
  stock: 100
},
{
  name: 'Navgrah Samidha',
  weight: '1 Set',
  price: 85,
  oldPrice: 110,
  discount: '23% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.1pNXdWj9R4IIQVf8S6SLzAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Navgrah Samidha | 9 Sacred Woods | For Hawan',
  stock: 50
},
{
  name: 'Joo (Barley) for Hawan',
  weight: '250g',
  price: 35,
  oldPrice: 45,
  discount: '22% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.utuB3oIdqon17wo41AlthQHaGL?pid=Api&H=133&W=160',
  inStock: true,
  description: '🪔 Joo Barley | For Hawan & Pooja | Pure Quality',
  stock: 100
},
{
  name: 'Cotton (Rui) for Pooja',
  weight: '50g',
  price: 20,
  oldPrice: 30,
  discount: '33% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse1.mm.bing.net/th/id/OIP.2bd13_5D9Z2gn8mByuzp8QHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pure Cotton Rui | For Diya & Pooja | Soft Quality',
  stock: 150
},

// ========================================
// 🪔 KALE TIL (BLACK SESAME)
// ========================================
{
  name: 'Kale Til Pooja Wale (Black Sesame)',
  weight: '100g',
  price: 35,
  oldPrice: 45,
  discount: '22% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.lEtEXvCURf1igaeKBcpx-wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Kale Til | Black Sesame | For Shani Pooja & Hawan',
  stock: 100
},


// ========================================
// 🪔 POOJA KAPDA (CLOTH)
// ========================================
{
  name: 'Lal Kapda (Red Cloth)',
  weight: '1 Meter',
  price: 35,
  oldPrice: 45,
  discount: '22% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: '	https://tse2.mm.bing.net/th/id/OIP.hPS4LS0AIeSyC0eYdu88XwHaFD?pid=Api&H=109&W=160',
  inStock: true,
  description: '🪔 Lal Kapda | Red Pooja Cloth | For Chunari & Asan',
  stock: 100
},
{
  name: 'Peela Kapda (Yellow Cloth)',
  weight: '1 Meter',
  price: 35,
  oldPrice: 45,
  discount: '22% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.1lVl75xZ8xH8vL5KQ9zKAHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: '🪔 Peela Kapda | Yellow Pooja Cloth | For Haldi Pooja',
  stock: 100
},
{
  name: 'Safed Kapda (White Cloth)',
  weight: '1 Meter',
  price: 30,
  oldPrice: 40,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse2.mm.bing.net/th/id/OIP.T9NLjH8by7p0n92afjqjLwAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Safed Kapda | White Pooja Cloth | For Shanti Pooja',
  stock: 100
},
{
  name: 'Angocha (Small Towel)',
  weight: '1pc',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.p1mxqcuYrk0whgiFlaL9QAAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Angocha | Small Cotton Towel | For Pooja Use',
  stock: 150
},

// ========================================
// 🪔 MATCHES
// ========================================
{
  name: 'Sunflower Safety Matches',
  weight: '10 Box',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Sunflower',
  image: '	https://tse1.mm.bing.net/th/id/OIP.VFDGoAj9KpCGJE5XsuXh4AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Sunflower Matches | Safety Match Box | 10 Boxes Pack',
  stock: 200
},
{
  name: 'Homelight Safety Matches',
  weight: '10 Box',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Homelight',
  image: '	https://tse1.mm.bing.net/th/id/OIP.8b18rUW7wW7aruz5Qq0K0AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Homelight Matches | Safety Match Box | 10 Boxes Pack',
  stock: 200
},

// ========================================
// 🪔 ITTR (PERFUME)
// ========================================
{
  name: 'Ittr (Attar Perfume)',
  weight: '3ml',
  price: 45,
  oldPrice: 60,
  discount: '25% OFF',
  category: 'Organic & Healthy Living',
  brand: 'Pooja Items',
  image: 'https://tse1.mm.bing.net/th/id/OIP.XHEdfjfaV-wwC4ykgbmKvQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🪔 Pure Ittr | Attar Perfume | For Pooja & Special Occasions',
  stock: 80
},













// ========================================
// 🌿 NEHA MEHNDI
// ========================================
{
    name: 'Neha Herbal Mehndi',
    weight: '140g',
    price: 45,
    oldPrice: 60,
    discount: '25% OFF',
    category: 'Organic & Healthy Living',
    brand: 'Neha',
    image: 'https://tse2.mm.bing.net/th/id/OIP.1YLNn4HD8JRkq3ZwrQdK2QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: '🌿 Neha Herbal Mehndi | 100% Natural | For Hair & Hands | 140g Pack',
    stock: 100
},
{
    name: 'Neha Mehndi Bag',
    weight: '250g',
    price: 65,
    oldPrice: 85,
    discount: '24% OFF',
    category: 'Organic & Healthy Living',
    brand: 'Neha',
    image: 'https://tse1.mm.bing.net/th/id/OIP.2e6U5ar55MvKwBrdP3IxTQHaI4?pid=Api&H=191&W=160',
    inStock: true,
    description: '🌿 Neha Mehndi Tahale Wali | Pure Henna Leaves | Natural | 250g Pack',
    stock: 80
},
{
    name: 'Neha Mehndi Cone - Regular',
    weight: '1pc',
    price: 15,
    oldPrice: 20,
    discount: '25% OFF',
    category: 'Organic & Healthy Living',
    brand: 'Neha',
    image: 'https://tse2.mm.bing.net/th/id/OIP.0yUbObHLXNYMKTrgLYyxkgAAAA?pid=Api&H=159&W=160',
    inStock: true,
    description: '🌿 Neha Mehndi Cone | Ready to Use | Dark Color | 1 Piece',
    stock: 150
},
{
    name: 'Silver Mehndi Cone',
    weight: '1pc',
    price: 25,
    oldPrice: 35,
    discount: '29% OFF',
    category: 'Organic & Healthy Living',
    brand: 'Neha',
    image: 'https://tse1.mm.bing.net/th/id/OIP.r2ckgGeisSTundLx15D_QQHaHK?pid=Api&H=154&W=160',
    inStock: true,
    description: '🌿 Neha Mehndi Cone Silver | Glitter Finish | For Festive | 1 Piece',
    stock: 100
},









];










  // ORGANIC TEA & COFFEE
 

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