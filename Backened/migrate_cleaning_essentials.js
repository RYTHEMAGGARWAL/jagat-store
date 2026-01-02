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


{
  name: 'Surf Excel Quick Wash Detergent Powder',
  weight: '500g',
  price: 110,
  oldPrice: 115,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: '	https://tse2.mm.bing.net/th/id/OIP.uUQNrdZmXAiKmVg1nh2mQAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel Quick Wash | Removes Tough Stains | 2X Faster',
  stock: 100
},
{
  name: 'Surf Excel Quick Wash Detergent Powder',
  weight: '1kg',
  price: 207,
  oldPrice: 230,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: '	https://tse1.mm.bing.net/th/id/OIP.LgEakqTv-7quvpDm7dDp0AAAAA?pid=Api&P=0&w=344&h=500',
  inStock: true,
  description: 'Surf Excel Quick Wash | Removes Tough Stains | 2X Faster',
  stock: 100
},

// ========================================
// 🔵 SURF EXCEL EASY WASH
// ========================================
{
  name: 'Surf Excel Easy Wash Detergent Powder',
  weight: '500g',
  price: 66,
  oldPrice: 70,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse1.mm.bing.net/th/id/OIP.oWPOOjC3nZ84r_BjJj9jmQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Surf Excel Easy Wash | Dissolves Easily | For Hand Wash',
  stock: 100
},
{
  name: 'Surf Excel Easy Wash Detergent Powder',
  weight: '1kg',
  price: 123,
  oldPrice: 136,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse2.mm.bing.net/th/id/OIP.BkIhKPXbTAIGWfj9WmCixAAAAA?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Surf Excel Easy Wash | Dissolves Easily | For Hand Wash',
  stock: 100
},

// ========================================
// 🟠 TIDE ROSE
// ========================================
{
  name: 'Tide Plus Rose Detergent Powder',
  weight: '500g',
  price: 61,
  oldPrice: 65,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Tide',
  image: 'https://tse1.mm.bing.net/th/id/OIP.8R8dZNpVZdhuL3fhijkpowHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Tide Plus | Rose Fragrance | Extra Freshness',
  stock: 100
},
{
  name: 'Tide Plus Rose Detergent Powder',
  weight: '1kg',
  price: 119,
  oldPrice: 132,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Tide',
  image: '	https://tse1.mm.bing.net/th/id/OIP.Gryx6oCsla9VG6b6CmDHSAHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Tide Plus | Rose Fragrance | Extra Freshness',
  stock: 100
},

// ========================================
// 🟢 TIDE GREEN LEMON
// ========================================

{
  name: 'Tide Plus Lemon & Mint Detergent Powder',
  weight: '1kg',
  price: 83,
  oldPrice: 88,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Tide',
  image: 'https://tse1.mm.bing.net/th/id/OIP.1WY9vJ5CUGJjWuJe6Vd-sQAAAA?pid=Api&P=0&w=350&h=416',
  inStock: true,
  description: 'Tide Plus | Lemon & Mint Fragrance | Fresh Clean',
  stock: 100
},

// ========================================
// 🟡 TIDE YELLOW (ORIGINAL)
// ========================================

{
  name: 'Tide Detergent Powder',
  weight: '1kg',
  price: 77,
  oldPrice: 81,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Tide',
  image: '	https://tse1.mm.bing.net/th/id/OIP.jBiSCBJAo7evfpQR9th6FwAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Tide Original | Stain Removal | Bright Whites',
  stock: 100
},

// ========================================
// 🔵 RIN DETERGENT
// ========================================

{
  name: 'Rin Advanced Detergent Powder',
  weight: '1kg',
  price: 90,
  oldPrice: 100,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Rin',
  image: '	https://tse2.mm.bing.net/th/id/OIP.AP2LSLD1XXJUEqz6smPMggHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Rin Advanced | Bright Like New | Tough Stain Removal',
  stock: 100
},

// ========================================
// 🟢 WHEEL DETERGENT
// ========================================

{
  name: 'Wheel Active 2-in-1 Detergent Powder',
  weight: '1kg',
  price: 69,
  oldPrice: 76,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Wheel',
  image: '	https://tse2.mm.bing.net/th/id/OIP.MsmChqZovcsb2kHdkae8XQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Wheel Active | Clean & Fresh | Value Pack',
  stock: 100
},

// ========================================
// 🟡 GHADI DETERGENT
// ========================================
{
  name: 'Ghadi Detergent Powder',
  weight: '500g',
  price: 36,
  oldPrice: 38,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Ghadi',
  image: '	https://tse2.mm.bing.net/th/id/OIP.s5y-mdBR3LYVqLlsvJ29tgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Ghadi Detergent | Pehle Istemaal Kare Phir Vishwas Kare',
  stock: 100
},
{
  name: 'Ghadi Detergent Powder',
  weight: '1kg',
  price: 70,
  oldPrice: 78,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Ghadi',
  image: '	https://tse1.mm.bing.net/th/id/OIP.Is0GVKZt_HSx2ZtlQj6PpgAAAA?pid=Api&H=183&W=160',
  inStock: true,
  description: 'Ghadi Detergent | Pehle Istemaal Kare Phir Vishwas Kare',
  stock: 100
},

// ========================================
// 🔵 GHADI MACHINE WASH
// ========================================

{
  name: 'Ghadi Machine Wash Detergent Powder',
  weight: '1kg',
  price: 108,
  oldPrice: 120,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Ghadi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.wsCl400Q1GxUAwV7atgBoAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Ghadi Machine Wash | Low Foam | For Washing Machine',
  stock: 100
},

// ========================================
// 🟠 FENA DETERGENT
// ========================================
{
  name: 'Fena Superwash Detergent Powder',
  weight: '500g',
  price: 34,
  oldPrice: 36,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Fena',
  image: 'https://tse2.mm.bing.net/th/id/OIP.TymqN3PNztVBieAqmGGyWgHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: 'Fena Superwash | Rose Fragrance | Extra Foam',
  stock: 100
},
{
  name: 'Fena Superwash Detergent Powder',
  weight: '1kg',
  price: 65,
  oldPrice: 73,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Fena',
  image: 'https://tse1.mm.bing.net/th/id/OIP.MDdVWPVP0hQ5qBrJ1kxXRgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Fena Superwash | Rose Fragrance | Extra Foam',
  stock: 100
},

// ========================================
// 🔵 FENA IMPACT WASH
// ========================================
{
  name: 'Fena Impact Wash Detergent Powder',
  weight: '500g',
  price: 62,
  oldPrice: 65,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Fena',
  image: '	https://tse1.mm.bing.net/th/id/OIP.Ea1iR8JEbjbzjISasCrDigAAAA?pid=Api&H=213&W=160',
  inStock: true,
  description: 'Fena Impact Wash | Tough Stain Remover | High Foam',
  stock: 100
},
{
  name: 'Fena Impact Wash Detergent Powder',
  weight: '1kg',
  price: 117,
  oldPrice: 130,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Fena',
  image: 'https://tse1.mm.bing.net/th/id/OIP.fadN7VUIICbCVTTuTxTvKgHaKX?pid=Api&H=223&W=160',
  inStock: true,
  description: 'Fena Impact Wash | Tough Stain Remover | High Foam',
  stock: 100
},

// ========================================
// 🟢 ARIEL PERFECT WASH
// ========================================

{
  name: 'Ariel Perfect Wash Detergent Powder',
  weight: '1kg',
  price: 131,
  oldPrice: 138,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Ariel',
  image: '	https://tse1.mm.bing.net/th/id/OIP.JVupJlAOVwNkBd7ctTcwjQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Ariel Perfect Wash | 1 Wash Stain Removal | Premium',
  stock: 80
},

// ========================================
// 🟡 NIP POWDER
// ========================================

{
  name: 'Nip Detergent Powder',
  weight: '1kg',
  price: 43,
  oldPrice: 45,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Nip',
  image: '	https://tse2.mm.bing.net/th/id/OIP.3aq39VFLX0IYbPYEqpAjCAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Nip Detergent | Budget Friendly | Effective Cleaning',
  stock: 100
},

// ========================================
// 📦 BULK PACKS (3KG & 7+1KG)
// ========================================
{
  name: 'Surf Excel Easy Wash Detergent Powder',
  weight: '3kg',
  price: 312,
  oldPrice: 390,
  discount: '2% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: '	https://tse2.mm.bing.net/th/id/OIP.8kqcDe3ljrIBcp7IWcU8lwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel Easy Wash | Family Pack | Value Deal',
  stock: 60
},
{
  name: 'Tide Detergent Powder',
  weight: '4+1kg Free',
  price: 540,
  oldPrice: 675,
  discount: '20% OFF',
  category: 'Cleaning Essentials',
  brand: 'Tide',
  image: 'https://tse2.mm.bing.net/th/id/OIP.YjDADK4WFsbpLEApeg7TvgAAAA?pid=Api&H=177&W=160',
  inStock: true,
  description: 'Tide Original | Family Pack | Best Value',
  stock: 60
},
{
  name: 'Surf Excel EASY Wash Detergent Powder',
  weight: '7+1kg Free',
  price:824,
  oldPrice: 1030,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse1.mm.bing.net/th/id/OIP.Lk-k3-fC1AgdrobS4rCzeAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel Quick Wash | Mega Pack | 7kg + 1kg FREE',
  stock: 40
},
{
  name: 'Tide Detergent Powder',
  weight: '3kg + 1 Container Free',
  price: 382,
  oldPrice: 390,
  discount: '2% OFF',
  category: 'Cleaning Essentials',
  brand: 'Tide',
  image: 'https://tse1.mm.bing.net/th/id/OIP.pp8Ulxy2aTPEpLUZDIiAYQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Tide Original | Family Pack | Best Value',
  stock: 60
},
{
  name: 'Surf Excel Matic Top Load Detergent Powder',
  weight: '6kg',
  price: 1237,
  oldPrice: 1375,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse2.mm.bing.net/th/id/OIP.vmm6IUUvP1b-NOtN__PmsgHaIB?pid=Api&H=173&W=160',
  inStock: true,
  description: 'Surf Excel Matic | Top Load | Low Foam | For Washing Machine',
  stock: 1
},
{
  name: 'Surf Excel Matic Front Load Detergent Powder',
  weight: '6kg',
  price: 1327,
  oldPrice: 1475,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse2.mm.bing.net/th/id/OIP.Zot4xhqbHgJ6jf8i4GISAwAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel Matic | Front Load | Ultra Low Foam | For Washing Machine',
  stock: 1
},
{
  name: 'Surf Excel Matic Liquid Top Load',
  weight: '1L',
  price: 138,
  oldPrice: 149,
  discount: '7% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: '	https://tse1.mm.bing.net/th/id/OIP.omZ2PJZTJGPVK3K8CtPiEwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel Matic Liquid | Top Load | Easy Dissolve | No Residue',
  stock: 80
},
{
  name: 'Surf Excel Matic Liquid Top Load',
  weight: '1L+1L',
  price: 269,
  oldPrice: 298,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse1.mm.bing.net/th/id/OIP.9mNsolXs8_ZGoSLrIWjiUwAAAA?pid=Api&H=224&W=160',
  inStock: true,
  description: 'Surf Excel Matic Liquid | Top Load | Easy Dissolve | No Residue',
  stock: 60
},
{
  name: 'Surf Excel Matic Liquid Front Load',
  weight: '1L',
  price: 157,
  oldPrice: 169,
  discount: '7% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: '	https://tse2.mm.bing.net/th/id/OIP.g3p-kcDQmtb5aSy-sGHnLAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel Matic Liquid | Front Load | Ultra Low Foam | Premium',
  stock: 80
},
{
  name: 'Surf Excel Matic Liquid Front Load',
  weight: '1L+1L',
  price: 305,
  oldPrice: 338,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse2.mm.bing.net/th/id/OIP.gJ7Hwo9WjYCk355ol5eHmgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel Matic Liquid | Front Load | Ultra Low Foam | Premium',
  stock: 60
},
{
  name: 'Godrej Fab Liquid Detergent',
  weight: '1L',
  price: 95,
  oldPrice: 99,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Godrej',
  image: 'https://tse1.mm.bing.net/th/id/OIP.N519f-fAU5sspycohDjTGgAAAA?pid=Api&P=0&w=281&h=500',
  inStock: true,
  description: 'Godrej Fab | Liquid Detergent | Fresh Fragrance | Gentle on Clothes',
  stock: 80
},

{
  name: 'Henko Matic Liquid Detergent Top Load',
  weight: '1L',
  price: 135,
  oldPrice: 149,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Henko',
  image: '	https://tse2.mm.bing.net/th/id/OIP.A3zu8XPmxujnBDF0vtFPoAAAAA?pid=Api&H=181&W=160',
  inStock: true,
  description: 'Henko Matic | Liquid Detergent | Top Load | Stain Care',
  stock: 80
},









// ========================================
// 🍋 DISH WASH BARS
// ========================================

// VIM
{
  name: 'Vim Dishwash Bar',
  weight: '300g',
  price: 29,
  oldPrice:30,
  discount: '4% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vim',
  image: '	https://tse1.mm.bing.net/th/id/OIP.IXq6y4Tjnacb8alwVPpYUAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Vim Bar | Lemon Power | Tough on Grease',
  stock: 150
},
{
  name: 'Vim Dishwash Bar Set',
  weight: '300g x 3',
  price: 86,
  oldPrice: 90,
  discount: '4% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vim',
  image: '	https://tse2.mm.bing.net/th/id/OIP.XAq94hxCoisNqj7ecCD-ewHaGr?pid=Api&H=144&W=160',
  inStock: true,
  description: 'Vim Bar | Lemon Power | Value Pack of 3',
  stock: 100
},
{
  name: 'Vim Dishwash Bar Yellow (Big)',
  weight: 'buy 4 get 1 free',
  price: 124,
  oldPrice: 130,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vim',
  image: '	https://tse1.mm.bing.net/th/id/OIP.YKgRU1Nvl2K3i6NnnNTnQAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Vim Bar | Yellow Big Size | Extra Power',
  stock: 100
},
{
  name: 'Vim Dishwash Bar Tub',
  weight: '500g',
  price: 57,
  oldPrice: 60,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vim',
  image: 'https://tse2.mm.bing.net/th/id/OIP.hc4Ohh8SUuq9DijSQumDPAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Vim | Dishwash Tub | Lemon | Long Lasting',
  stock: 100
},

// XL SUPREME
{
  name: 'XL Supreme Dishwash Bar Set',
  weight: '200g x 4',
  price: 115,
  oldPrice: 128,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'XL Supreme',
  image: 'https://tse2.mm.bing.net/th/id/OIP.iMquHg6EtpPH7HdEJR6qEQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'XL Supreme | Dishwash Bar | Lemon Fresh | Pack of 4',
  stock: 100
},

// ========================================
// 👕 DETERGENT BARS (WASHING SOAP)
// ========================================

// SURF EXCEL
{
  name: 'Surf Excel Detergent Bar',
  weight: '250g',
  price: 35,
  oldPrice: 38,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Surf Excel',
  image: 'https://tse1.mm.bing.net/th/id/OIP.8Au1-BbGQCmgphBS7C5OgwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Surf Excel | Detergent Bar | Tough Stain Removal',
  stock: 150
},


// RIN
{
  name: 'Rin Detergent Bar Set',
  weight: '250g x 4',
  price: 95,
  oldPrice: 100,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Rin',
  image: 'https://tse2.mm.bing.net/th/id/OIP.iNRrj25AvT2fJ3twq1lJiwHaFY?pid=Api&H=116&W=160',
  inStock: true,
  description: 'Rin | Advanced Bar | Bright Like New | Pack of 4',
  stock: 100
},
{
    name: 'Ujala Supreme Fabric Whitener',
    weight: '250ml',
    price: 80,
    oldPrice: 85,
    discount: '5% OFF',
    category: 'Cleaning Essentials',
    brand: 'Ujala',
    image: 'https://tse2.mm.bing.net/th/id/OIP.pX1dMe2bvb6oDfCxFs6uiQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ujala Supreme Fabric Whitener | Bright Clothes | Blue Liquid | 125ml',
    stock: 120
},

// FENA
{
  name: 'Fena Detergent Bar Set',
  weight: '250g x 4',
  price: 64,
  oldPrice: 68,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Fena',
  image: 'https://tse1.mm.bing.net/th/id/OIP.IlNEQw0QX1BQRXfDoYhmOgHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Fena | Superwash Bar | Extra Foam | Pack of 4',
  stock: 100
},

{
  name: 'Drainex Drain Cleaner Powder',
  weight: '50g x 3',
  price: 103,
  oldPrice: 105,
  discount: '2% OFF',
  category: 'Cleaning Essentials',
  brand: 'Drainex',
  image: '	https://tse1.mm.bing.net/th/id/OIP.m_XE6Atlaj_UW70A_rUb5QHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Drainex | Drain Cleaner | Removes Clogs & Bad Odour | Pack of 3',
  stock: 80
},
// HARPIC (Blue/Original)










{
  name: 'Harpic Powerplus Toilet Cleaner',
  weight: '1L',
  price: 210,
  oldPrice: 235,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: '	https://tse2.mm.bing.net/th/id/OIP.QNGbVvvEaPehcHyPFYZl8AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic Powerplus | Original | 10X Better Cleaning | 1 Litre',
  stock: 100
},
{
  name: 'Harpic Powerplus Toilet Cleaner',
  weight: '500ml',
  price: 104,
  oldPrice: 110,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: '	https://tse2.mm.bing.net/th/id/OIP.GHn79V43Sf-rTb7WdngOdQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic Powerplus | Original | 10X Better Cleaning | 500ml',
  stock: 150
},
{
  name: 'Harpic Powerplus Toilet Cleaner',
  weight: '200ml',
  price: 45,
  oldPrice: 46,
  discount: '1% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: '	https://tse2.mm.bing.net/th/id/OIP.6tL0jErzqBvx9MvGf3XCZgHaES?pid=Api&H=92&W=160',
  inStock: true,
  description: 'Harpic Powerplus | Original | 10X Better Cleaning | 200ml',
  stock: 200
},

// HARPIC WHITE/BLEACH
{
  name: 'Harpic White & Shine Bleach Toilet Cleaner',
  weight: '1L',
  price: 230,
  oldPrice: 243,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: 'https://tse2.mm.bing.net/th/id/OIP.NV0r3bxDhUKg-MtDXsrBQAAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic White & Shine | Bleach | Disinfectant | 1 Litre',
  stock: 80
},
{
  name: 'Harpic White & Shine Bleach Toilet Cleaner',
  weight: '500ml',
  price: 110,
  oldPrice: 115,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: '	https://tse1.mm.bing.net/th/id/OIP.ye2KMksdFCYsp024uQjMAwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic White & Shine | Bleach | Disinfectant | 500ml',
  stock: 120
},

// RED HARPIC
{
  name: 'Harpic Red Toilet Cleaner',
  weight: '1L',
  price: 199,
  oldPrice: 210,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: 'https://tse2.mm.bing.net/th/id/OIP.J1Hr0L9f1fAD36ZsolcbRgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic Bathroom Cleaner | Floral | 10X Better Stain Removal | 1 Litre',
  stock: 90
},
{
  name: 'Harpic Red Toilet Cleaner',
  weight: '500ml',
  price: 109,
  oldPrice: 115,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: 'https://tse2.mm.bing.net/th/id/OIP.6SP5VJsIx_uMipysUGEhaAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic Bathroom Cleaner | Floral | 10X Better Stain Removal | 1 Litre',
  stock: 90
},

// VIM LIQUID
{
  name: 'Vim Dishwash Liquid Gel',
  weight: '200ml',
  price: 55,
  oldPrice: 58,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vim',
  image: 'https://tse2.mm.bing.net/th/id/OIP.z6FmfCMckA_Uk7ZJJMQbmgHaIE?pid=Api&H=174&W=160',
  inStock: true,
  description: 'Vim Dishwash Gel | Lemon | 2X Faster Grease Removal | 200ml',
  stock: 180
},
{
  name: 'Vim Dishwash Liquid Gel',
  weight: '750ml',
  price: 188,
  oldPrice: 199,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vim',
  image: '	https://tse1.mm.bing.net/th/id/OIP.RJvN8Nip5t1-Sk-tkIX5ywAAAA?pid=Api&H=160&W=75',
  inStock: true,
  description: 'Vim Dishwash Gel | Lemon | 2X Faster Grease Removal | 750ml',
  stock: 100
},

// PRILL LIQUID
{
  name: 'Prill Dishwash Liquid',
  weight: '750ml',
  price: 195,
  oldPrice: 204,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Prill',
  image: 'https://tse1.mm.bing.net/th/id/OIP.VBDFRv-sPjGonauY5udzyQHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: 'Prill Dishwash Liquid | Lemon Fresh | 200ml',
  stock: 200
},
{
  name: 'Prill Dishwash Liquid Refill',
  weight: '1.5L',
  price: 290,
  oldPrice: 340,
  discount: '15% OFF',
  category: 'Cleaning Essentials',
  brand: 'Prill',
  image: '	https://tse1.mm.bing.net/th/id/OIP.cj0hH5hh_ZXfIqb9-DaJcgHaH9?pid=Api&H=171&W=160',
  inStock: true,
  description: 'Prill Dishwash Liquid | Lemon Fresh | Refill Pack | 1.5 Litre',
  stock: 70
},
{
  name: 'Prill Dishwash Liquid',
  weight: '2L',
  price: 449,
  oldPrice: 499,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Prill',
  image: '	https://tse2.mm.bing.net/th/id/OIP.EU8I_cIqlUevZpeqBrxxigHaMD?pid=Api&H=260&W=160',
  inStock: true,
  description: 'Prill Dishwash Liquid | Lemon Fresh | Jumbo Bottle | 2 Litre',
  stock: 50
},

// RIN ALA
{
  name: 'Rin Ala Fabric Whitener',
  weight: '500ml',
  price: 85,
  oldPrice: 89,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Rin',
  image: 'https://tse1.mm.bing.net/th/id/OIP.73FpcI5-J8Whyyl-1yTW6wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Rin Ala | Fabric Whitener | Bright White Clothes | 500ml',
  stock: 120
},


// VANISH
{
  name: 'Vanish Oxi Action Powder',
  weight: '400g',
  price: 238,
  oldPrice: 250,
  discount: '17% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vanish',
  image: 'https://tse1.mm.bing.net/th/id/OIP.EsBwhnfXksUA1AXj12K8RwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Vanish Oxi Action | Stain Remover Powder | Whites & Colors | 400g',
  stock: 60
},
{
  name: 'Vanish Oxi Action Liquid',
  weight: '400ml',
  price: 141,
  oldPrice: 149,
  discount: '18% OFF',
  category: 'Cleaning Essentials',
  brand: 'Vanish',
  image: 'https://tse1.mm.bing.net/th/id/OIP.uh3nqvQB3iAf2QMg_c_NRgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Vanish Oxi Action | Stain Remover Liquid | All Fabrics | 450ml',
  stock: 55
},

// DETTOL ANTISEPTIC


// EZEE
{
  name: 'Ezee Liquid Detergent',
  weight: '200ml',
  price: 60,
  oldPrice: 65,
  discount: '7% OFF',
  category: 'Cleaning Essentials',
  brand: 'Ezee',
  image: '	https://tse1.mm.bing.net/th/id/OIP.hZYJj3f0nY9uNj4q3o-CCAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Ezee Liquid Detergent | Winterwear & Woollens | 200ml',
  stock: 140
},
{
  name: 'Safewash Liquid Detergent',
  weight: '1L + 1L(Free)',
  price: 394,
  oldPrice: 415,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Safewash',
  image: '	https://tse2.mm.bing.net/th/id/OIP.E00TofC-qLhm-dDVREQ3fAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Ezee Liquid Detergent | Winterwear & Woollens | 200ml',
  stock: 140
},
{
  name: 'Ezee Liquid Detergent',
  weight: '500ml',
  price: 117,
  oldPrice: 130,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Ezee',
  image: '	https://tse1.mm.bing.net/th/id/OIP.E50A7EJHrFSCZdMRi8j6XgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Ezee Liquid Detergent | Winterwear & Woollens | 500ml',
  stock: 100
},
{
  name: 'Ezee Liquid Detergent',
  weight: '900mL',
  price: 203,
  oldPrice: 225,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Ezee',
  image: '	https://tse2.mm.bing.net/th/id/OIP.tE6u7gg2jYM3w8YVmUCqrgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Ezee Liquid Detergent | Winterwear & Woollens | 1 Litre',
  stock: 70
},



// COMFORT FABRIC CONDITIONER
{
  name: 'Comfort After Wash Fabric Conditioner Pink',
  weight: '860ml',
  price: 223,
  oldPrice: 235,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Comfort',
  image: 'https://tse2.mm.bing.net/th/id/OIP.R8OkIqaZ1HGQyBqbmxEtVAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Comfort After Wash | Lily Fresh | Long Lasting Fragrance | 860ml',
  stock: 75
},
{
  name: 'Comfort After Wash Fabric Conditioner Blue',
  weight: '860ml',
  price: 223,
  oldPrice: 235,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Comfort',
  image: '	https://tse1.mm.bing.net/th/id/OIP.vfUBWisMFgC4M3MMUwVJpQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Comfort After Wash | Morning Fresh | Long Lasting Fragrance | 860ml',
  stock: 80
},
{
  name: 'Comfort After Wash Fabric Conditioner Green',
  weight: '860ml',
  price: 223,
  oldPrice: 235,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Comfort',
  image: '		https://tse2.mm.bing.net/th/id/OIP.IMG8KigISvGERdgy39GGtgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Comfort After Wash | Morning Fresh | Long Lasting Fragrance | 860ml',
  stock: 80
},
{
  name: 'Comfort After Wash Fabric Conditioner Blue',
  weight: '210ml',
  price: 55,
  oldPrice: 58,
  discount: '4% OFF',
  category: 'Cleaning Essentials',
  brand: 'Comfort',
  image: '	https://tse2.mm.bing.net/th/id/OIP.0r6FdnQPt1o_EJ8T1fdykAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Comfort After Wash | Morning Fresh | Long Lasting Fragrance | 860ml',
  stock: 80
},
// LIZOL
{
  name: 'Lizol Disinfectant Floor Cleaner Rose',
  weight: '500ml',
  price: 114,
  oldPrice: 120,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Lizol',
  image: 'https://tse2.mm.bing.net/th/id/OIP.e5q5wMVPwkKsN01oFtKRggHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lizol Disinfectant Surface Cleaner | Rose | Kills 99.9% Germs | 500ml',
  stock: 120
},
{
  name: 'Lizol Disinfectant Floor Cleaner Rose',
  weight: '1L',
  price: 209,
  oldPrice: 232,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Lizol',
  image: 'https://tse1.mm.bing.net/th/id/OIP.m8xiepjx5q7hyUkdJBei0gHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lizol Disinfectant Surface Cleaner | Rose | Kills 99.9% Germs | 1 Litre',
  stock: 80
},
{
  name: 'Lizol Disinfectant Floor Cleaner Citrus',
  weight: '500ml',
  price: 114,
  oldPrice: 120,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Lizol',
  image: 'https://tse1.mm.bing.net/th/id/OIP._9jLRvXg5oSI9BZ2LEfDxgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lizol Disinfectant Surface Cleaner | Citrus/Lemon | Kills 99.9% Germs | 500ml',
  stock: 110
},
{
  name: 'Lizol Disinfectant Floor Cleaner Citrus',
  weight: '1L',
  price: 221,
  oldPrice: 246,
  discount: '10% OFF',
  category: 'Cleaning Essentials',
  brand: 'Lizol',
  image: '	https://tse2.mm.bing.net/th/id/OIP.V3TISW--WV0Ku3-nNlxDUgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lizol Disinfectant Surface Cleaner | Citrus/Lemon | Kills 99.9% Germs | 1 Litre',
  stock: 75
},

// GAINDA BLACK PHENYL
{
  name: 'Gainda Black Phenyl',
  weight: '450ml',
  price: 46,
  oldPrice: 66,
  discount: '30% OFF',
  category: 'Cleaning Essentials',
  brand: 'Gainda',
  image: 'https://tse1.mm.bing.net/th/id/OIP.TaJ_VLbc9vDsP7KtjmQQmgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Gainda Black Phenyl | Floor Cleaner | Disinfectant | 500ml',
  stock: 180
},
{
  name: 'Gainda Black Phenyl',
  weight: '1L',
  price: 85,
  oldPrice: 132,
  discount: '35% OFF',
  category: 'Cleaning Essentials',
  brand: 'Gainda',
  image: 'https://tse2.mm.bing.net/th/id/OIP.JrKsuH95Bku1p9pu1SuUxQAAAA?pid=Api&H=212&W=160',
  inStock: true,
  description: 'Gainda Black Phenyl | Floor Cleaner | Disinfectant | 1 Litre',
  stock: 150
},
{
  name: 'Gainda Black Phenyl',
  weight: '5L',
  price: 328,
  oldPrice: 490,
  discount: '33% OFF',
  category: 'Cleaning Essentials',
  brand: 'Gainda',
  image: 'https://tse2.mm.bing.net/th/id/OIP.Z3a8Rwy4pIZVoDrHoXhuzwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Gainda Black Phenyl | Floor Cleaner | Disinfectant | 5 Litre Can',
  stock: 40
},

// GAINDA WHITE PHENYL
{
  name: 'Gainda White Phenyl',
  weight: '1L',
  price: 45,
  oldPrice: 60,
  discount: '25% OFF',
  category: 'Cleaning Essentials',
  brand: 'Gainda',
  image: '	https://tse2.mm.bing.net/th/id/OIP.YAJLJAEbjCZWh7kNmbyvOgHaHZ?pid=Api&H=159&W=160',
  inStock: true,
  description: 'Gainda White Phenyl | Floor Cleaner | Fragrant | 1 Litre',
  stock: 140
},
{
  name: 'Gainda White Phenyl',
  weight: '5L',
  price: 185,
  oldPrice: 240,
  discount: '23% OFF',
  category: 'Cleaning Essentials',
  brand: 'Gainda',
  image: 'https://tse1.mm.bing.net/th/id/OIP._lMAZJY4WUgA0dpFTSBEigAAAA?pid=Api&H=369&W=160',
  inStock: true,
  description: 'Gainda White Phenyl | Floor Cleaner | Fragrant | 5 Litre Can',
  stock: 35
},

// TEJAB
{
  name: 'Tejab Toilet & Drain Cleaner',
  weight: '500ml',
  price: 36,
  oldPrice: 40,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Tejab',
  image: '	https://tse2.mm.bing.net/th/id/OIP.4yuVkP57DnRghuUAwy4f1AHaE8?pid=Api&H=106&W=160',
  inStock: true,
  description: 'Tejab | Acid Cleaner | Toilet & Drain | Heavy Duty | 500ml',
  stock: 100
},

// COLIN
{
  name: 'Colin Glass & Surface Cleaner',
  weight: '250ml',
  price: 110,
  oldPrice: 115,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Colin',
  image: '	https://tse2.mm.bing.net/th/id/OIP.x2zxClQOzmTAjgbZkHYhPwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Colin Glass Cleaner Spray | Shine Sparkle | 500ml',
  stock: 90
},
{
  name: 'Colin Glass & Surface Cleaner',
  weight: '500ml',
  price: 110,
  oldPrice: 115,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Colin',
  image: 'https://tse1.mm.bing.net/th/id/OIP.P4omr2xuRSpbUfcDhFIMOwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Colin Glass Cleaner Spray | Shine Sparkle | 250ml',
  stock: 120
},

// VIXOL (Buy 1 Get 1)


// OPAX (Colin type - Buy 1 Get 1)
{
  name: 'Opax Glass Cleaner',
  weight: '500ml',
  price: 78,
  oldPrice: 82,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Opax',
  image: 'https://tse2.mm.bing.net/th/id/OIP.41vfUu8_aOsU4Mgtcay1BwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Opax Glass & Surface Cleaner | Streak Free | Buy 1 Get 1 Free | 2 x 500ml',
  stock: 70
},

// ZOVITA (Harpic type - Buy 1 Get 1)


// ODONIL
{
  name: 'Odonil Air Freshener Blocks Set',
  weight: '72g x 4',
  price: 290,
  oldPrice: 310,
  discount: '6% OFF',
  category: 'Cleaning Essentials',
  brand: 'Odonil',
  image: 'https://tse1.mm.bing.net/th/id/OIP.1HKRMgBqMFFUUNGAYIGYUwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Odonil Bathroom Air Freshener Blocks | Assorted Fragrances | Pack of 3',
  stock: 100
},

// REVIVE
{
  name: 'Revive Instant Starch Liquid',
  weight: '400g',
  price: 148,
  oldPrice: 155,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Revive',
  image: 'https://tse1.mm.bing.net/th/id/OIP.2mRt49T0JGbd5-wwTE78zgAAAA?pid=Api&H=160&W=57',
  inStock: true,
  description: 'Revive Instant Starch | Easy Spray | Crisp Finish | 400g',
  stock: 90
},
{
  name: 'Revive Instant Starch Powder',
  weight: '50g',
  price: 20,
  oldPrice: 20,
  discount: '0% OFF',
  category: 'Cleaning Essentials',
  brand: 'Revive',
  image: '	https://tse2.mm.bing.net/th/id/OIP.bWOQFmX1XXvZcKNaWzhIbQHaJ3?pid=Api&H=212&W=160',
  inStock: true,
  description: 'Revive Instant Starch | Easy Spray | Crisp Finish | 400g',
  stock: 90
},{
  name: 'Exo Dishwash Bar Round Tub',
  weight: '500g',
  price: 57,
  oldPrice: 60,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Exo',
  image: '	https://tse2.mm.bing.net/th/id/OIP.Zne_RINkEdTxeZ5mPOfIWwHaHb?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Exo Round Dishwash Bar | Anti Bacterial | Touch & Shine | 500g Tub',
  stock: 150
},


// HARPIC FLUSHMATIC
{
  name: 'Harpic Flushmatic In-Cistern Toilet Cleaner Aquamarine',
  weight: '50g',
  price: 85,
  oldPrice: 105,
  discount: '19% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: 'https://tse1.mm.bing.net/th/id/OIP.t51cr2JF8XLIqFLoCP_kPAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic Flushmatic | In-Cistern Block | Aquamarine | Auto Clean | 50g',
  stock: 100
},

{
  name: 'Harpic Flushmatic In-Cistern Toilet Cleaner Set',
  weight: '50g x 3',
  price: 235,
  oldPrice: 285,
  discount: '18% OFF',
  category: 'Cleaning Essentials',
  brand: 'Harpic',
  image: 'https://tse1.mm.bing.net/th/id/OIP.K8v2ewWknWOKIyw2zRbR2AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Harpic Flushmatic | In-Cistern Block | Assorted | Pack of 3',
  stock: 70
},

// PHENYL GOLI / NAPHTHALENE BALLS
{
  name: 'Naphthalene Balls (Phenyl Goli)',
  weight: '100g',
  price: 44,
  oldPrice: 45,
  discount: '1% OFF',
  category: 'Cleaning Essentials',
  brand: 'Generic',
  image: 'https://tse1.mm.bing.net/th/id/OIP.icc8WAYkOEwiPmqNTEJRMAAAAA?pid=Api&H=213&W=160',
  inStock: true,
  description: 'Naphthalene Balls | Phenyl Goli | Moth Repellent | 100g Pack',
  stock: 200
},
// SCOTCH BRITE GREEN SCRUB PAD
{
  name: 'Scotch-Brite Scrub Pad Small',
  weight: '1 Pc',
  price: 19,
  oldPrice: 20,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Scotch-Brite',
  image: 'https://tse1.mm.bing.net/th/id/OIP.zlXmzTAM7ZMVbWDBnnk9SAHaFa?pid=Api&H=116&W=160',
  inStock: true,
  description: 'Scotch-Brite Scrub Pad | Green | Heavy Duty | Small Size',
  stock: 250
},
{
  name: 'Scotch-Brite Steel (jhuna)',
  weight: '1 Pc',
  price: 28,
  oldPrice: 30,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Scotch-Brite',
  image: '	https://tse1.mm.bing.net/th/id/OIP.SwX59HKuVTmD8r8V3ZTkLAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Scotch-Brite steel Pad | Loha | Heavy Duty | Small Size',
  stock: 250
},
{
  name: 'Hari ram gulab rai (jhuna)',
  weight: '1 Pc',
  price: 28,
  oldPrice: 30,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Hari Ram Gulab Rai',
  image: '	https://tse1.mm.bing.net/th/id/OIP.nBHfiWB9Pg0Ps9BBWs52hwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Hari Ram Gulab Rai steel Pad | Loha | Heavy Duty | Small Size',
  stock: 250
},
{
  name: 'Scotch-Brite Scrub Pad Large',
  weight: '1 Pc',
  price: 38,
  oldPrice: 40,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Scotch-Brite',
  image: 'https://tse1.mm.bing.net/th/id/OIP.zlXmzTAM7ZMVbWDBnnk9SAHaFa?pid=Api&H=116&W=160',
  inStock: true,
  description: 'Scotch-Brite Scrub Pad | Green | Heavy Duty | Large Size',
  stock: 200
},
{
  name: 'Scotch-Brite Scrub Pad Large',
  weight: '3 Pcs',
  price: 90,
  oldPrice: 95,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Scotch-Brite',
  image: 'https://tse1.mm.bing.net/th/id/OIP.7p0EsDdLg6AhG9cmDSQCqAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Scotch-Brite Scrub Pad | Green | Heavy Duty | Large | Pack of 3',
  stock: 150
},

// SCOTCH BRITE FOAM PAD
{
  name: 'Scotch-Brite Foam Scrub Pad',
  weight: '1 Pc',
  price: 19,
  oldPrice: 20,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Scotch-Brite',
  image: 'https://tse2.mm.bing.net/th/id/OIP.HnoF_aQGC3m4T3ag5TEY6gHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Scotch-Brite Foam Scrub Pad | Non-Scratch | Gentle on Hands',
  stock: 180
},
{
  name: 'Scotch-Brite Foam Scrub Pad',
  weight: '3 Pcs',
  price: 64,
  oldPrice: 65,
  discount: '1% OFF',
  category: 'Cleaning Essentials',
  brand: 'Scotch-Brite',
  image: 'https://tse2.mm.bing.net/th/id/OIP.J0AUlXyeB04A1ftdsiI8sQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Scotch-Brite Foam Scrub Pad | Non-Scratch | Pack of 3',
  stock: 120
},

// SCOTCH BRITE STEEL SCRUB + GREEN PAD COMBO

{
  name: 'Scotch-Brite Sponge Wipe',
  weight: '3 Pcs',
  price: 218,
  oldPrice: 230,
  discount: '5% OFF',
  category: 'Cleaning Essentials',
  brand: 'Scotch-Brite',
  image: '	https://tse2.mm.bing.net/th/id/OIP.sEh81Pcp7SLeX5A8ljzyeAHaJH?pid=Api&H=196&W=160',
  inStock: true,
  description: 'Scotch-Brite Sponge Wipe | Super Absorbent | Reusable | Pack of 3',
  stock: 100
},




// ════════════════════════════════════════════════════════════════
  // 🧹 FOOLJHADU (GRASS BROOM)
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Mahalaxmi Fooljhadu',
    weight: '1 Pc',
    price: 120,
    oldPrice:150,
    discount: '20% OFF',
    category: 'Cleaning Essentials',
    brand: 'Mahalaxmi',
    image: 'https://tse2.mm.bing.net/th/id/OIP.UTT9niwa61rqA6YdPvptEQHaHg?pid=Api&P=0&w=400&h=406',
    inStock: true,
    description: 'Mahalaxmi Fooljhadu | Grass Broom | Soft Bristles | Floor Cleaning | Premium Quality',
    stock: 50
  },
  {
    name: 'Thukral Fooljhadu',
    weight: '1 Pc',
    price: 90,
    oldPrice: 99,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Thukral',
    image: '	https://tse2.mm.bing.net/th/id/OIP.YWQTRzkGM5ZTb5gBPWMgDwHaHy?pid=Api&P=0&w=400&h=420',
    inStock: true,
    description: 'Thukral Fooljhadu | Premium Grass Broom | Durable & Long Lasting | Floor Sweeping',
    stock: 50
  },
  {
    name: 'Hari Ram Gulab Rai Fooljhadu Yellow',
    weight: '1 Pc',
    price: 140,
    oldPrice: 156,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Hari Ram Gulab Rai',
    image: '	https://tse1.mm.bing.net/th/id/OIP.b3pV0hC2MIgPBaO_bHINPgAAAA?pid=Api&P=0&w=180&h=500',
    inStock: true,
    description: 'Hari Ram Gulab Rai Yellow Fooljhadu | Traditional Grass Broom | Soft & Effective',
    stock: 50
  },
  {
    name: 'Hari Ram Gulab Rai Fooljhadu Bhuni',
    weight: '1 Pc',
    price: 165,
    oldPrice: 184,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Hari Ram Gulab Rai',
    image: 'https://tse2.mm.bing.net/th/id/OIP.nOHD7H00dDZg_4bjus1siQHaIq?pid=Api&P=0&w=400&h=468',
    inStock: true,
    description: 'Hari Ram Gulab Rai Bhuni Fooljhadu | Roasted Grass Broom | Extra Durable | Floor Cleaning',
    stock: 50
  },

  // ════════════════════════════════════════════════════════════════
  // 🧹 SEEKH JHADU (STICK BROOM)
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Seekh Jhadu Small',
    weight: '1 Pc',
    price: 35,
    oldPrice: 42,
    discount: '17% OFF',
    category: 'Cleaning Essentials',
    brand: 'Local',
    image: '	https://tse1.mm.bing.net/th/id/OIP.EADfLiUtiIddJCVRtM5s3gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Seekh Jhadu Choti | Coconut Stick Broom Small | Outdoor Cleaning | Durable',
    stock: 50
  },
  {
    name: 'Seekh Jhadu Big',
    weight: '1 Pc',
    price: 70,
    oldPrice: 78,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Local',
    image: '	https://tse1.mm.bing.net/th/id/OIP.AVJxn_h4jEfr-6X8BV6sxwAAAA?pid=Api&P=0&w=174&h=832',
    inStock: true,
    description: 'Seekh Jhadu Badi | Coconut Stick Broom Large | Heavy Duty | Outdoor & Garden Cleaning',
    stock: 50
  },

  // ════════════════════════════════════════════════════════════════
  // 🧽 WIPER (FLOOR WIPER)
  // ════════════════════════════════════════════════════════════════

  {
    name: 'National Floor Wiper',
    weight: '1 Pc',
    price: 180,
    oldPrice: 199,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'National',
    image: 'https://tse1.mm.bing.net/th/id/OIP.KFwc3ZIp5Ff3tbXnIAeVfAHaJ4?pid=Api&P=0&w=400&h=533',
    inStock: true,
    description: 'National Floor Wiper | Durable Rubber Blade | Bathroom & Floor Cleaning | Long Handle',
    stock: 50
  },
  {
    name: 'Scotch Brite Floor Wiper Small',
    weight: '1 Pc',
    price: 449,
    oldPrice: 499,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Scotch Brite',
    image: '	https://tse1.mm.bing.net/th/id/OIP.UnfuHhw3UZlNWi_8DEiWzAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Scotch Brite Floor Wiper Small | Premium Quality | Easy Cleaning | Durable Rubber',
    stock: 50
  },
  {
    name: 'Scotch Brite Floor Wiper Big',
    weight: '1 Pc',
    price: 475,
    oldPrice: 499,
    discount: '5% OFF',
    category: 'Cleaning Essentials',
    brand: 'Scotch Brite',
    image: '	https://tse1.mm.bing.net/th/id/OIP.3ikQHlDnV7brtX68tPHUQAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Scotch Brite Floor Wiper Big | Large Size | Quick Drying | Professional Cleaning',
    stock: 50
  },


   {
    name: 'Scotch Brite Kitchen Wiper',
    weight: '1 Pc',
    price: 125,
    oldPrice: 145,
    discount: '14% OFF',
    category: 'Cleaning Essentials',
    brand: 'Scotch Brite',
    image: '	https://tse2.mm.bing.net/th/id/OIP.yQpyxrGfaDEabq5u9VKo9QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Scotch Brite Kitchen Wiper | Platform Cleaning | Non-Scratch | Absorbent Sponge',
    stock: 50
  },
    {
    name: 'Toilet Brush',
    weight: '1 Pc',
    price: 70,
    oldPrice: 78,
    discount: '14% OFF',
    category: 'Cleaning Essentials',
    brand: 'Normal',
    image: '		https://tse2.mm.bing.net/th/id/OIP.cA9MqGjQc6-jZoH9cpwfFwHaG_?pid=Api&H=150&W=160',
    inStock: true,
    description: 'ToiletBrush | Platform Cleaning ',
    stock: 50
  },

  // ════════════════════════════════════════════════════════════════
  // 🧽 BATHROOM WIPER - NORMAL
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Bathroom Wiper Normal',
    weight: '1 Pc',
    price: 120,
    oldPrice: 134,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Local',
    image: '	https://tse1.mm.bing.net/th/id/OIP.ZPZSdt9XCkKznNrvOysJsAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Bathroom Wiper Normal | Plastic Handle | Rubber Blade | Toilet & Bathroom Cleaning',
    stock: 50
  },

  // ════════════════════════════════════════════════════════════════
  // 🧹 GALA JHADU
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Gala Jhadu',
    weight: '1 Pc',
    price: 165,
    oldPrice: 184,
    discount: '10% OFF',
    category: 'Cleaning Essentials',
    brand: 'Gala',
    image: '	https://tse1.mm.bing.net/th/id/OIP.XLZccHVRb4p-Bej0WTqrqAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Gala Jhadu | No Dust Broom | Plastic Bristles | Indoor Floor Cleaning | Long Handle',
    stock: 50
  },
  // ════════════════════════════════════════════════════════════════
  // 🧹 POOCHA (FLOOR MOP / POCHA) - HARI RAM GULAB RAI
  // ════════════════════════════════════════════════════════════════

 
  {
    name: 'Hari Ram Gulab Rai Poocha',
    weight: '30 Wala',
    price: 30,
    oldPrice: 38,
    discount: '21% OFF',
    category: 'Cleaning Essentials',
    brand: 'Hari Ram Gulab Rai',
    image: '	https://tse1.mm.bing.net/th/id/OIP.AoNR8Zvq8auSLCZdEkfcgQHaH1?pid=Api&H=169&W=160',
    inStock: true,
    description: 'Hari Ram Gulab Rai Poocha 30 Wala | Cotton Floor Mop | Good Absorbency | Daily Use',
    stock: 100
  },
  {
    name: 'Hari Ram Gulab Rai Poocha',
    weight: '45 Wala',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
    category: 'Cleaning Essentials',
    brand: 'Hari Ram Gulab Rai',
    image: '	https://tse2.mm.bing.net/th/id/OIP.GG1C5VktgoqpFPjSxD5S4gAAAA?pid=Api&H=241&W=160',
    inStock: true,
    description: 'Hari Ram Gulab Rai Poocha 45 Wala | Heavy Duty Cotton Mop | Extra Absorbent | Long Lasting',
    stock: 100
  },
    {
    name: 'Plastic Dustpan Big',
    weight: '1 Pc',
    price: 40,
    oldPrice: 48,
    discount: '17% OFF',
    category: 'Cleaning Essentials',
    brand: 'Local',
    image: 'https://tse2.mm.bing.net/th/id/OIP.shoDl3xzoakK9ZMMvqfpMwAAAA?pid=Api&H=217&W=160',
    inStock: true,
    description: 'Plastic Dustpan Big | Koodadaan Large | Heavy Duty | Wide Mouth | Easy Cleaning',
    stock: 100
  },


  // ════════════════════════════════════════════════════════════════
  // 🗑️ GARBAGE BAGS
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Garbage Bags Small',
    weight: '17x23 inch',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
    category: 'Cleaning Essentials',
    brand: 'Local',
    image: '	https://tse1.mm.bing.net/th/id/OIP.NqP-KUn4SCrxG1P8S0DuCAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Garbage Bags Small 17x23 inch | 30 Bags Pack | Dustbin Liner | Leak Proof | Black',
    stock: 100
  },
  {
    name: 'Garbage Bags Medium',
    weight: '20x26 inch',
    price: 60,
    oldPrice: 72,
    discount: '17% OFF',
    category: 'Cleaning Essentials',
    brand: 'Local',
    image: 'https://tse1.mm.bing.net/th/id/OIP.zAIAZrw1gPaqvl2Ap-b8PgHaJB?pid=Api&H=194&W=160',
    inStock: true,
    description: 'Garbage Bags Medium 20x26 inch | 30 Bags Pack | Dustbin Liner | Leak Proof | Black',
    stock: 100
  },
  {
    name: 'Garbage Bags Roll',
    weight: '30 Bags',
    price: 75,
    oldPrice: 90,
    discount: '17% OFF',
    category: 'Cleaning Essentials',
    brand: 'Local',
    image: '	https://tse2.mm.bing.net/th/id/OIP._VGfQmo7hCccyvetEIGKOwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Garbage Bags Roll | 30 Bags | Large Size | Easy Tear | Biodegradable | Black',
    stock: 100
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