// migrate_personal_care.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_personal_care.js

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

// ========== PERSONAL CARE PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const personalCareProducts = [

{
  name: 'Dettol Antiseptic Liquid',
  weight: '200ml',
  price: 105,
  oldPrice: 125,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: 'https://tse1.mm.bing.net/th/id/OIP.dWRQ1IdsgX_VfosjpRfRjQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol Antiseptic Liquid | First Aid | Disinfectant | 200ml',
  stock: 150
},
{
  name: 'Dettol Antiseptic Liquid',
  weight: '500ml',
  price: 235,
  oldPrice: 280,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: 'https://tse1.mm.bing.net/th/id/OIP.vDvtjajPjp2OJJHoODbiHwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol Antiseptic Liquid | First Aid | Disinfectant | 500ml',
  stock: 100
},
{
  name: 'Dettol Antiseptic Liquid',
  weight: '1L',
  price: 450,
  oldPrice: 540,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: '	https://tse1.mm.bing.net/th/id/OIP.0x8BMpPffIGsuLnp6XwebwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol Antiseptic Liquid | First Aid | Disinfectant | 1 Litre',
  stock: 60
},

// EZEE



// HANDWASH
{
  name: 'Dettol Liquid Handwash Refill',
  weight: '750ml',
  price: 99,
  oldPrice: 120,
  discount: '18% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: 'https://tse2.mm.bing.net/th/id/OIP.PoR_EeDsJGzupWwkODC26wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol Liquid Handwash | Original | Germ Protection | 750ml Refill',
  stock: 130
},
{
  name: 'Santoor Handwash Refill',
  weight: '750ml',
  price: 89,
  oldPrice: 110,
  discount: '19% OFF',
  category: 'Personal Care',
  brand: 'Santoor',
  image: 'https://tse2.mm.bing.net/th/id/OIP.kTAKIQRdJuvQCfPD6VozagHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Santoor Classic Handwash | Sandalwood & Tulsi | 750ml Refill',
  stock: 110
},
{
  name: 'Dettol Liquid Handwash Pump',
  weight: '300ml',
  price: 99,
  oldPrice: 120,
  discount: '18% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: 'https://tse2.mm.bing.net/th/id/OIP.qUvXpC7A9OnZCvLSkqJt_wHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Dettol Liquid Handwash | Original | Germ Protection | 750ml Refill',
  stock: 130
},
{
  name: 'Margo Original Neem Soap',
  weight: '100g x 4',
  price: 145,
  oldPrice: 172,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Margo',
  image: 'https://tse2.mm.bing.net/th/id/OIP.EM24HCj1VaZgC2Cy3W5ppwHaF5?pid=Api&H=127&W=160',
  inStock: true,
  description: 'Margo Original Neem Soap | Antibacterial | Pack of 4',
  stock: 75
},
{
  name: 'Lux International Creamy Perfection Soap',
  weight: '125g x 4',
  price: 199,
  oldPrice: 240,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Lux',
  image: 'https://tse1.mm.bing.net/th/id/OIP.x6ibuGuzfFg2SnCtUFsmYQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lux International | Creamy Perfection | Swiss Moisturizers | Pack of 4',
  stock: 120
},
{
  name: 'Savlon Moisturizing Glycerin Soap',
  weight: '125g x 5',
  price: 182,
  oldPrice: 225,
  discount: '19% OFF',
  category: 'Personal Care',
  brand: 'Savlon',
  image: 'https://tse1.mm.bing.net/th/id/OIP.3WnEGeBPXVcdeYPpHnB_pwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Savlon | Moisturizing Glycerin Soap | Germ Protection | Pack of 5',
  stock: 90
},
{
  name: 'Lifebuoy Total 10 Soap',
  weight: '100g x 4',
  price: 152,
  oldPrice: 180,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Lifebuoy',
  image: '	https://tse1.mm.bing.net/th/id/OIP.ckniEO0QuCF3ChxbRXyvXwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lifebuoy Total 10 | 100% Germ Protection | Pack of 4',
  stock: 150
},


{
  name: 'Fiama Gel Bar Celebration Pack',
  weight: '125g x 4',
  price: 199,
  oldPrice: 240,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Fiama',
  image: '	https://tse1.mm.bing.net/th/id/OIP.fNfk-dK5rISlDmnmn_SEcgHaE9?pid=Api&H=107&W=160',
  inStock: true,
  description: 'Fiama Gel Bar | Assorted Fragrances | Pack of 4',
  stock: 80
},

// PEARS
{
  name: 'Pears Pure & Gentle Soap Set',
  weight: '125g x 4',
  price: 245,
  oldPrice: 290,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Pears',
  image: 'https://tse2.mm.bing.net/th/id/OIP.MAt1GjOD7bACHWprJwHTwwHaGC?pid=Api&P=0&w=491&h=400',
  inStock: true,
  description: 'Pears | Pure & Gentle | Glycerin Soap | Pack of 4',
  stock: 80
},
{
  name: 'Pears Soft & Fresh Blue Soap',
  weight: '125g x 4',
  price: 235,
  oldPrice: 280,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Pears',
  image: 'https://tse2.mm.bing.net/th/id/OIP.d9R9zPLmOuNczz2RfCq4DgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Pears | Soft & Fresh | Mint Extract | Blue Pack of 4',
  stock: 80
},

// LIRIL
{
  name: 'Liril Lemon & Tea Tree Soap',
  weight: '125g x 4',
  price: 145,
  oldPrice: 175,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Liril',
  image: '	https://tse2.mm.bing.net/th/id/OIP.4XWuDuqzV5CGhk-jNdtpGwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Liril | Lemon Fresh | Tea Tree Oil | Pack of 4',
  stock: 80
},

// WILDSTONE
{
  name: 'Wildstone Soap Set For Men',
  weight: '125g x 4',
  price: 185,
  oldPrice: 220,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Wildstone',
  image: '	https://tse2.mm.bing.net/th/id/OIP.GivsF3nbgYnjlVkHCIsDbwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Wildstone | For Men | Long Lasting Fragrance | Pack of 4',
  stock: 80
},

// MEDIMIX
{
  name: 'Medimix Ayurvedic Classic Neem Soap',
  weight: '125g x 4',
  price: 165,
  oldPrice: 199,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Medimix',
  image: 'https://tse2.mm.bing.net/th/id/OIP.RhhsL55RUw8WlTAQj3qT9wHaFT?pid=Api&H=114&W=160',
  inStock: true,
  description: 'Medimix | 18 Herbs | Ayurvedic Neem Soap | Pack of 4',
  stock: 80
},

// VIVEL
{
  name: 'Vivel Aloe Vera Soap Set',
  weight: '100g x 4',
  price: 125,
  oldPrice: 150,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Vivel',
  image: '	https://tse1.mm.bing.net/th/id/OIP.YfhpdQZJq_DBnbu6VKcUUwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Vivel | Aloe Vera | Soft Moisturizing | Pink Pack of 4',
  stock: 80
},

// DOVE
{
  name: 'Dove Cream Beauty Bathing Bar Set',
  weight: '100g x 4',
  price: 235,
  oldPrice: 280,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Dove',
  image: '	https://tse4.mm.bing.net/th/id/OIP.4k9-VWLL_eu553GzONHkMQHaH5?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Dove | Cream Beauty Bar | 1/4 Moisturizing Cream | Pack of 4',
  stock: 80
},

// LUX
{
  name: 'Lux Soft Touch Pink Soap',
  weight: '150g x 4',
  price: 175,
  oldPrice: 210,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Lux',
  image: 'https://tse2.mm.bing.net/th/id/OIP.b456EDYJ6b6430pXppJv8AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lux | Soft Touch | French Rose | Pink Pack of 4',
  stock: 80
},
{
  name: 'Lux White Soap',
  weight: '125g x 4',
  price: 185,
  oldPrice: 220,
  discount: '16% OFF',
  category: 'Personal Care',
  brand: 'Lux',
  image: '	https://tse2.mm.bing.net/th/id/OIP.YTmuVx2k_tx8wSuypaPWGAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Lux | Creamy White | Pack of 4',
  stock: 80
},

// CINTHOL
{
  name: 'Cinthol Lemon Soap Set',
  weight: '100g x 4',
  price: 145,
  oldPrice: 175,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Cinthol',
  image: '	https://tse2.mm.bing.net/th/id/OIP.eh-pHi7kkeLF2MCdvKv5wAAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Cinthol | Original | Deodorant & Complexion | Yellow Pack of 4',
  stock: 80
},

// DETTOL
{
  name: 'Dettol Original Soap Set',
  weight: '125g x 4',
  price: 195,
  oldPrice: 235,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: '	https://tse2.mm.bing.net/th/id/OIP.eh-pHi7kkeLF2MCdvKv5wAAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol | Original | Trusted Protection | Pack of 4',
  stock: 80
},
{
  name: 'Dettol Original Soap Set (Small)',
  weight: '75g x 4',
  price: 125,
  oldPrice: 150,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: '	https://tse1.mm.bing.net/th/id/OIP.hLNvE8a9fQi68ZA35UoaBAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol | Original | Small Pack | Pack of 4',
  stock: 80
},
{
  name: 'Dettol Skincare Pink Soap Set',
  weight: '125g x 4',
  price: 195,
  oldPrice: 235,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: 'https://tse1.mm.bing.net/th/id/OIP.DNX9FVpSrHOGhID_ycYzBgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol | Skincare | Moisturizing | Pink Pack of 4',
  stock: 80
},
{
  name: 'Dettol Cool Soap Set',
  weight: '125g x 4',
  price: 195,
  oldPrice: 235,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'Dettol',
  image: 'https://tse1.mm.bing.net/th/id/OIP.4zSua1-uu7aHurBhjlDCbQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Dettol | Cool | Menthol Freshness | Blue Pack of 4',
  stock: 80
},

// NO.1 SOAP
{
  name: 'No.1 Sandal & Turmeric Soap Set',
  weight: '100g x 4',
  price: 95,
  oldPrice: 115,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'No.1',
  image: 'https://tse1.mm.bing.net/th/id/OIP.BvblM5be35P8b6CTX3440wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'No.1 | Sandal Haldi | Yellow Pack of 4',
  stock: 100
},
{
  name: 'No.1 lemon & lime Soap Set',
  weight: '100g x 4',
  price: 95,
  oldPrice: 115,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'No.1',
  image: 'https://tse2.mm.bing.net/th/id/OIP.C4auaH29w1urY8UxMXbXygHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'No.1 | Kesar Milk Cream | Orange Pack of 4',
  stock: 100
},
{
  name: 'No.1 Jasmine Soap Set',
  weight: '100g x 4',
  price: 95,
  oldPrice: 115,
  discount: '17% OFF',
  category: 'Personal Care',
  brand: 'No.1',
  image: 'https://tse1.mm.bing.net/th/id/OIP.FC4Vshp6UHdQcReJnHayMwHaF9?pid=Api&H=128&W=160',
  inStock: true,
  description: 'No.1 | Kesar Milk Cream | Orange Pack of 4',
  stock: 100
},

// ========================================
// 🌿 PATANJALI SOAPS
// ========================================
{
  name: 'Patanjali Aloe Vera Kanti Soap Set',
  weight: '75g x 4',
  price: 85,
  oldPrice: 100,
  discount: '15% OFF',
  category: 'Personal Care',
  brand: 'Patanjali',
  image: '	https://tse1.mm.bing.net/th/id/OIP.PZcmHEcsJgUCbRh22houCwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Patanjali | Aloe Vera Kanti | Natural | Pack of 4',
  stock: 100
},
{
  name: 'Patanjali Haldi Chandan Kanti Soap Set',
  weight: '75g x 4',
  price: 85,
  oldPrice: 100,
  discount: '15% OFF',
  category: 'Personal Care',
  brand: 'Patanjali',
  image: 'https://tse1.mm.bing.net/th/id/OIP.Rdw_I8NRQjb20gFE8qxZ4AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Patanjali | Haldi Chandan | Turmeric Sandalwood | Pack of 4',
  stock: 100
},
{
  name: 'Patanjali Neem Kanti Soap Set',
  weight: '75g x 4',
  price: 85,
  oldPrice: 100,
  discount: '15% OFF',
  category: 'Personal Care',
  brand: 'Patanjali',
  image: 'https://tse1.mm.bing.net/th/id/OIP.D37Osy9GVklACpkDn0To7wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Patanjali | Neem Kanti | Antibacterial | Pack of 4',
  stock: 100
},






// ============ WHISPER SANITARY PADS ============
{
    name: 'Whisper Maxi Fit - L',
    weight: '15 Pads',
    price: 143,
    oldPrice: 170,
    discount: '16% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: '	https://tse2.mm.bing.net/th/id/OIP.C7uvzBaS80XWU6cFxShyFgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Whisper Maxi Fit | Large Size | Heavy Flow Protection | Dry Top Sheet | 15 Pads',
    stock: 100
},
{
    name: 'Whisper Maxi Fit Regular - L',
    weight: '8 Pads',
    price: 100,
    oldPrice: 120,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: 'https://tse1.mm.bing.net/th/id/OIP.C7cfImItRJU-dOSgZV5z5AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Whisper Maxi Fit Regular | Large Size | Daily Comfort | Dry Top Sheet | 8 Pads',
    stock: 100
},
{
    name: 'Whisper Bindazzz Nights - XL+',
    weight: '7 Pads',
    price: 99,
    oldPrice: 120,
    discount: '18% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: '	https://tse2.mm.bing.net/th/id/OIP.9KGOQVxwR-DxqLvcUIvbiQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Whisper Bindazzz Nights | XL+ Size | All Night Protection | No Leakage | 7 Pads',
    stock: 100
},
{
    name: 'Whisper Ultra Choice - XL',
    weight: '6 Pads',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ZhdiXDme5kxDFn2lDlmq_gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Whisper Ultra Choice | XL Size | Soft Cover | Quick Absorption | 6 Pads',
    stock: 100
},
{
    name: 'Whisper Skin Love Soft - XL+',
    weight: '6 Pads',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: '	https://tse1.mm.bing.net/th/id/OIP.nKFuN6imTCZ_htbEi_USnQAAAA?pid=Api&P=0&w=300&h=220',
    inStock: true,
    description: 'Whisper Skin Love Soft | XL+ Size | Soft Cotton Feel | Gentle on Skin | 6 Pads',
    stock: 100
},




// ============ WHISPER SANITARY PADS ============
{
    name: 'Whisper Choice - XL',
    weight: '18 Pads',
    price: 120,
    oldPrice: 145,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: '	https://tse2.mm.bing.net/th/id/OIP.cs4g6n-0Sv_ICuoEL2lLGQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Whisper Choice | XL Size | Wings for Protection | Everyday Use | 18 Pads',
    stock: 100
},
{
    name: 'Whisper Bindazzz Nights - XXXL',
    weight: '10 Pads',
    price: 350,
    oldPrice: 410,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: 'https://tse2.mm.bing.net/th/id/OIP.sxDQ0-PWKrEDOVtR5LbkCAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Whisper Bindazzz Nights | XXXL Size | 0% Leakage | Full Back Coverage | 10 Pads',
    stock: 100
},
{
    name: 'Whisper Bindazzz Nights Koala Soft - XXL+',
    weight: '5 Pads',
    price: 150,
    oldPrice: 175,
    discount: '14% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: 'https://tse2.mm.bing.net/th/id/OIP._qu6Ku0AQ01D5PMRlv2thwHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Whisper Bindazzz Nights Koala Soft | XXL+ Size | Extra Soft Cover | All Night Protection | 5 Pads',
    stock: 100
},
{
    name: 'Whisper Ultra Clean - XL',
    weight: '6 Pads',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Personal Care',
    brand: 'Whisper',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Ds7dFHuPvCSGWMXmH3r_KgHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Whisper Ultra Clean | XL Size | Soft Wings | Quick Dry | 6 Pads',
    stock: 100
},

// ============ STAYFREE SANITARY PADS ============
{
    name: 'Stayfree Secure - XL',
    weight: '18 Pads',
    price: 124,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Stayfree',
    image: '	https://tse1.mm.bing.net/th/id/OIP.DBaHifATDhkmXZQWMTYogAHaH7?pid=Api&P=0&w=400&h=429',
    inStock: true,
    description: 'Stayfree Secure | XL Size | Cottony Soft Cover | 4x Absorption | 18 Pads',
    stock: 100
},
{
    name: 'Stayfree Secure Nights - XXL',
    weight: '6 Pads',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Stayfree',
    image: 'https://tse1.mm.bing.net/th/id/OIP.jDMItO_vzvyrDMq_ZAXv6gHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Stayfree Secure Nights | XXL Size | All Night Protection | Extra Long | 6 Pads',
    stock: 100
},
{
    name: 'Stayfree Secure Regular',
    weight: '6 Pads',
    price: 37,
    oldPrice: 45,
    discount: '18% OFF',
    category: 'Personal Care',
    brand: 'Stayfree',
    image: 'https://tse2.mm.bing.net/th/id/OIP.a5Hgx0wiqaAJLkzhnweXQwHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Stayfree Secure Regular | Normal Size | Daily Use | Cottony Soft | 6 Pads',
    stock: 100
},
{
    name: 'Stayfree Dry Max - XL',
    weight: '16 Pads',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Stayfree',
    image: 'https://tse1.mm.bing.net/th/id/OIP.wRXeDyQ-VJukkRKk_AcdLAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Stayfree Dry Max | XL Size | 100% Dry Feel | Heavy Flow Protection | 16 Pads',
    stock: 100
}





























  // ==================== TOOTHPASTE ====================

  // COLGATE STRONG TEETH
  {
    name: 'Colgate Strong Teeth',
    weight: '100g',
    price: 70,
    oldPrice: 76,
    discount: '8% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse1.mm.bing.net/th/id/OIP.WcCmZoQZQvlSaA4-_WfAKAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Strong Teeth Toothpaste | Amino Shakti Formula | Cavity Protection | 100g',
    stock: 150
  },
  {
    name: 'Colgate Strong Teeth',
    weight: '200g',
    price: 125,
    oldPrice: 140,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse2.mm.bing.net/th/id/OIP.f8sY8qmCAhu9cKG4g2-HMQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Strong Teeth Toothpaste | Amino Shakti Formula | Cavity Protection | 200g',
    stock: 120
  },

  // COLGATE MAXFRESH RED
  {
    name: 'Colgate MaxFresh Red',
    weight: '100g',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse1.mm.bing.net/th/id/OIP.8JtqjGqY5_va3jebaFuugAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate MaxFresh Spicy Fresh Red Gel Toothpaste | Menthol | Cooling Crystals | 100g',
    stock: 100
  },
  {
    name: 'Colgate MaxFresh Red',
    weight: '150g',
    price: 105,
    oldPrice: 133,
    discount: '21% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse2.mm.bing.net/th/id/OIP.WK5ZGvJLk4fjLW-Afqiy_gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate MaxFresh Spicy Fresh Red Gel Toothpaste | Menthol | Cooling Crystals | 150g',
    stock: 100
  },

  // CLOSEUP
  {
    name: 'Closeup Ever Fresh Red Hot',
    weight: '80g',
    price: 52,
    oldPrice: 65,
    discount: '20% OFF',
    category: 'Personal Care',
    brand: 'Closeup',
    image: 'https://tse1.mm.bing.net/th/id/OIP.MDg6uT5CT3WVs1-9r-HIhgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Closeup Ever Fresh Red Hot Gel Toothpaste | 18 Hours Fresh Breath | Zinc Fresh Technology | 80g',
    stock: 100
  },
  {
    name: 'Closeup Ever Fresh Red Hot',
    weight: '150g',
    price: 99,
    oldPrice: 130,
    discount: '24% OFF',
    category: 'Personal Care',
    brand: 'Closeup',
    image: 'https://tse1.mm.bing.net/th/id/OIP.qhFeAq7WSM5QModceVTfGgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Closeup Ever Fresh Red Hot Gel Toothpaste | 18 Hours Fresh Breath | Zinc Fresh Technology | 150g',
    stock: 100
  },

  // COLGATE VISIBLE WHITE
  {
    name: 'Colgate Visible White',
    weight: '50g',
    price: 89,
    oldPrice: 99,
    discount: '10% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse2.mm.bing.net/th/id/OIP.YDAi6Go7R_V6MXw9njPIWgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Visible White Toothpaste | Teeth Whitening in 1 Week | Stain Removal | 50g',
    stock: 80
  },
  {
    name: 'Colgate Visible White',
    weight: '100g',
    price: 131,
    oldPrice: 149,
    discount: '12% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse2.mm.bing.net/th/id/OIP.B-FqXtg8fGMYV7cCqJHAggHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Visible White Toothpaste | Teeth Whitening in 1 Week | Stain Removal | 100g',
    stock: 100
  },

  // DABUR RED PASTE
  {
    name: 'Dabur Red Paste',
    weight: '100g',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Personal Care',
    brand: 'Dabur',
    image: '	https://tse2.mm.bing.net/th/id/OIP.Ask8rnJIdNI7UIh0NmFx7gHaE8?pid=Api&H=106&W=160',
    inStock: true,
    description: 'Dabur Red Paste | Ayurvedic Toothpaste | 13 Herbs | Fluoride Free | 7 Dental Problems | 100g',
    stock: 100
  },
  {
    name: 'Dabur Red Paste',
    weight: '200g',
    price: 124,
    oldPrice: 135,
    discount: '8% OFF',
    category: 'Personal Care',
    brand: 'Dabur',
    image: 'https://tse1.mm.bing.net/th/id/OIP.pC9egT5dRBp7sEwIXWBQKwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dabur Red Paste | Ayurvedic Toothpaste | 13 Herbs | Fluoride Free | 7 Dental Problems | 200g',
    stock: 100
  },

  // PATANJALI DANT KANTI
  {
    name: 'Patanjali Dant Kanti',
    weight: '100g',
    price: 54,
    oldPrice: 62,
    discount: '13% OFF',
    category: 'Personal Care',
    brand: 'Patanjali',
    image: '	https://tse1.mm.bing.net/th/id/OIP.fzGCwi7yluDkccvWwNSMTgHaGu?pid=Api&H=145&W=160',
    inStock: true,
    description: 'Patanjali Dant Kanti Natural Toothpaste | 26 Herbs | Herbal | Ayurvedic | 100g',
    stock: 100
  },
  {
    name: 'Patanjali Dant Kanti',
    weight: '200g',
    price: 106,
    oldPrice: 120,
    discount: '12% OFF',
    category: 'Personal Care',
    brand: 'Patanjali',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Ihm0t6VPbdSvT1UVat2OMQHaFB?pid=Api&H=108&W=160',
    inStock: true,
    description: 'Patanjali Dant Kanti Natural Toothpaste | 26 Herbs | Herbal | Ayurvedic | 200g',
    stock: 100
  },

  // PATANJALI DANT KANTI ALOE VERA
  {
    name: 'Patanjali Dant Kanti Aloe Vera',
    weight: '80g',
    price: 49,
    oldPrice: 55,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Patanjali',
    image: 'https://tse1.mm.bing.net/th/id/OIP.eg1FV8gZX8WgP99JD3jEqQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Patanjali Dant Kanti Aloe Vera Gel Toothpaste | Herbal | Gum Protection | 80g',
    stock: 80
  },

  // COLGATE CIBACA
  {
    name: 'Colgate Cibaca',
    weight: '175g',
    price: 63,
    oldPrice: 70,
    discount: '10% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse1.mm.bing.net/th/id/OIP.8o8RRwUQl1-a-XNNNtcJ0wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Cibaca Anticavity Toothpaste | Minty Fresh | Budget Friendly | 175g',
    stock: 100
  },

  // COLGATE ACTIVE SALT
  {
    name: 'Colgate Active Salt',
    weight: '100g',
    price: 75,
    oldPrice: 85,
    discount: '12% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse2.mm.bing.net/th/id/OIP.bXnxZ3m5YGDlIq5H0JDNlQHaE6?pid=Api&H=105&W=160',
    inStock: true,
    description: 'Colgate Active Salt Toothpaste | Germ Fighting | Salt & Minerals | Healthy Gums | 100g',
    stock: 100
  },
  {
    name: 'Colgate Active Salt',
    weight: '200g',
    price: 140,
    oldPrice: 160,
    discount: '13% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse2.mm.bing.net/th/id/OIP.snZ4uzaBY8AWDYcCSatFywHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Active Salt Toothpaste | Germ Fighting | Salt & Minerals | Healthy Gums | 200g',
    stock: 100
  },

  // COLGATE CHARCOAL CLEAN
  {
    name: 'Colgate Charcoal Clean',
    weight: '120g',
    price: 135,
    oldPrice: 160,
    discount: '16% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse1.mm.bing.net/th/id/OIP.yY1qcpvq8qUWneWN9BOIkwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Charcoal Clean Black Gel Toothpaste | Bamboo Charcoal | Wintergreen Mint | 120g',
    stock: 2
  },

  // COLGATE ACTIVE SALT NEEM
  {
    name: 'Colgate Active Salt Neem',
    weight: '100g',
    price: 88,
    oldPrice: 99,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9drUPSsLsfV8exxg0FE3XAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Active Salt Neem Anticavity Toothpaste | Neem Extract | Germ Protection | 100g',
    stock: 100
  },

  // COLGATE TOTAL
  {
    name: 'Colgate Total',
    weight: '120g',
    price: 151,
    oldPrice: 175,
    discount: '14% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse2.mm.bing.net/th/id/OIP.Ec5M6jX0Ja6UfY4z0UnrrQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Total Charcoal Deep Clean Antibacterial Toothpaste | 12 Hour Protection | 120g',
    stock: 80
  },

  // HIMALAYA SPARKLING WHITE
  {
    name: 'Himalaya Sparkling White',
    weight: '80g',
    price: 58,
    oldPrice: 70,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Himalaya',
    image: 'https://tse1.mm.bing.net/th/id/OIP.naO5lrIjY4SNGPgsfS-XDQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Himalaya Sparkling White Toothpaste | Whiter Teeth in 2 Weeks | Papaya & Pineapple Enzymes | 80g',
    stock: 100
  },


  // COLGATE KIDS BARBIE
  {
    name: 'Colgate Kids Barbie',
    weight: '80g',
    price: 153,
    oldPrice: 180,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse2.mm.bing.net/th/id/OIP.DhcTY9n0IGjZpkrrXdJ3qAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Kids Barbie Toothpaste | Strawberry Flavour | Cavity & Enamel Protection | 6+ Years | 80g',
    stock: 60
  },

  // COLGATE KIDS BATMAN
  {
    name: 'Colgate Kids Batman',
    weight: '80g',
    price: 144,
    oldPrice: 180,
    discount: '20% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse1.mm.bing.net/th/id/OIP.cQ4BWE_bc_nt2bvE2e_vrgHaHh?pid=Api&H=162&W=160',
    inStock: true,
    description: 'Colgate Kids Batman Toothpaste | Bubble Fruit Flavour | Cavity & Enamel Protection | 6+ Years | 80g',
    stock: 60
  },

  // COLGATE KIDS SPIDERMAN
  {
    name: 'Colgate Kids Spiderman',
    weight: '80g',
    price: 153,
    oldPrice: 180,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse2.mm.bing.net/th/id/OIP.11cexZAKMYKo680rkLIwOgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Kids Spiderman Toothpaste | Bubble Fruit Flavour | Cavity & Enamel Protection | 6+ Years | 80g',
    stock: 60
  },

  // VICCO VAJRADANTI (Plain/Regular)
 
  {
    name: 'Vicco Vajradanti',
    weight: '200g',
    price: 127,
    oldPrice: 150,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Vicco',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9aD2aAWKk9qH4CtfZiN9kQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Vicco Vajradanti Ayurvedic Toothpaste | 18 Herbs | Healthy Gums & Teeth | Fluoride Free | 200g',
    stock: 100
  },

  // VICCO VAJRADANTI SAUNF (Green)
  {
    name: 'Vicco Vajradanti Saunf',
    weight: '100g',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Vicco',
    image: '	https://tse2.mm.bing.net/th/id/OIP.QTybgrZiIp8jJmN-jhgB4QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Vicco Vajradanti Saunf Flavour Toothpaste | 18 Ayurvedic Herbs | Fresh Breath | Green | 100g',
    stock: 80
  },
 

  // SENSODYNE FRESH GEL
  {
    name: 'Sensodyne Fresh Gel',
    weight: '75g',
    price: 119,
    oldPrice: 140,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: '	https://tse2.mm.bing.net/th/id/OIP.d-U1q7vUOzFPkgTcjI9uoQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Sensodyne Fresh Gel Toothpaste | Sensitivity Relief | Fresh Breath | Dentist Recommended | 75g',
    stock: 80
  },
  {
    name: 'Sensodyne Fresh Gel',
    weight: '150g',
    price: 224,
    oldPrice: 252,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: '	https://tse2.mm.bing.net/th/id/OIP.h8bNIjDvW6-c6osfySpsJwHaHZ?pid=Api&H=159&W=160',
    inStock: true,
    description: 'Sensodyne Fresh Gel Toothpaste | Sensitivity Relief | Fresh Breath | Dentist Recommended | 150g',
    stock: 80
  },

  // SENSODYNE FRESH MINT
  {
    name: 'Sensodyne Fresh Mint',
    weight: '75g',
    price: 119,
    oldPrice: 140,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ejuGl7_Ed-SexvZw_5yUfwHaJg?pid=Api&H=205&W=160',
    inStock: true,
    description: 'Sensodyne Fresh Mint Toothpaste | Sensitivity Relief | Healthy Gums | Dentist Recommended | 75g',
    stock: 80
  },
  {
    name: 'Sensodyne Fresh Mint',
    weight: '150g',
    price: 224,
    oldPrice: 252,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: '	https://tse1.mm.bing.net/th/id/OIP.F_MaD2ug74vl3MfdgaCjbgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Sensodyne Fresh Mint Toothpaste | Sensitivity Relief | Healthy Gums | Dentist Recommended | 150g',
    stock: 80
  },

  // SENSODYNE RAPID RELIEF
  {
    name: 'Sensodyne Rapid Relief',
    weight: '80g',
    price: 169,
    oldPrice: 210,
    discount: '20% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: 'https://tse1.mm.bing.net/th/id/OIP.XPwJlrwybnM0-XJbdwTb9gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Sensodyne Rapid Relief Toothpaste | Fast Sensitivity Relief | Clinically Proven | 80g',
    stock: 60
  },

  // SENSODYNE REPAIR & PROTECT
  {
    name: 'Sensodyne Repair & Protect',
    weight: '70g',
    price: 180,
    oldPrice: 225,
    discount: '20% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: '	https://tse2.mm.bing.net/th/id/OIP.p-2Xh-3anVrctk3gfXvYfAHaCW?pid=Api&P=0&w=1259&h=400',
    inStock: true,
    description: 'Sensodyne Repair & Protect Toothpaste | Deep Repair | Long-lasting Relief | Dentist Recommended | 70g',
    stock: 60
  },
  {
    name: 'Sensodyne Repair & Protect',
    weight: '100g',
    price: 240,
    oldPrice: 270,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: 'https://tse2.mm.bing.net/th/id/OIP.kWulvt_60NaLmhdDRr2ZdwHaEJ?pid=Api&P=0&w=713&h=400',
    inStock: true,
    description: 'Sensodyne Repair & Protect Toothpaste | Deep Repair | Long-lasting Relief | Dentist Recommended | 100g',
    stock: 60
  },

  // ==================== TOOTHBRUSH ====================

  // COLGATE TOOTHBRUSHES
  {
    name: 'Colgate Extra Clean Medium',
    weight: '1 Pc',
    price: 18,
    oldPrice: 20,
    discount: '10% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse2.mm.bing.net/th/id/OIP.JJ4kdaaaURgwE04dxrO7zwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Extra Clean Toothbrush | Medium Bristles | Power Tip | Advanced Handle | 1 Pc',
    stock: 150
  },
  {
    name: 'Colgate Sensitive Ultra Soft',
    weight: '1 Pc',
    price: 51,
    oldPrice: 60,
    discount: '15% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse1.mm.bing.net/th/id/OIP.MXAj6o52aiA1X5Z8DT9PWAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Sensitive Toothbrush | Ultra Soft Bristles | Gentle on Sensitive Teeth | 1 Pc',
    stock: 100
  },
  {
    name: 'Colgate Zig Zag Medium',
    weight: '3 Pcs',
    price: 80,
    oldPrice: 90,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse1.mm.bing.net/th/id/OIP.WuQrZyUzuHe-ufprHxsEPwHaJG?pid=Api&H=196&W=160',
    inStock: true,
    description: 'Colgate Zig Zag Deep Clean Toothbrush | Medium Bristles | Removes Bacteria | Pack of 3',
    stock: 80
  },
  {
    name: 'Colgate Kids Barbie Toothbrush',
    weight: '1 Pc',
    price: 72,
    oldPrice: 79,
    discount: '9% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '	https://tse2.mm.bing.net/th/id/OIP.q8tM5GsdjGyI1r2yC4OzzAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Kids Barbie Toothbrush | Extra Soft Bristles | 5+ Years | Tongue Cleaner | 1 Pc',
    stock: 60
  },
   {
    name: 'Colgate Kids Batman Toothbrush',
    weight: '1 Pc',
    price: 72,
    oldPrice: 79,
    discount: '9% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: '		https://tse2.mm.bing.net/th/id/OIP.XbHA9ynvYsBkH4SPG8cExAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Colgate Kids Batman Toothbrush | Extra Soft Bristles | 5+ Years | Tongue Cleaner | 1 Pc',
    stock: 60
  },

 

  // SENSODYNE TOOTHBRUSHES
  {
    name: 'Sensodyne Sensitive Toothbrush',
    weight: '1 Pc',
    price: 62,
    oldPrice: 70,
    discount: '11% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: '	https://tse2.mm.bing.net/th/id/OIP.KX9daGhJf9Vb7T-dwEmPWAHaCk?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sensodyne Sensitive Toothbrush | Soft Rounded Bristles | Dentist Recommended | 1 Pc',
    stock: 80
  },
  {
    name: 'Sensodyne Sensitive Toothbrush',
    weight: '3 Pcs',
    price: 123,
    oldPrice: 140,
    discount: '12% OFF',
    category: 'Personal Care',
    brand: 'Sensodyne',
    image: 'https://sp.yimg.com/ib/th?id=OPAC.deYdFr2LsT0%2bEA474C474&o=5&pid=21.1&w=160&h=105',
    inStock: true,
    description: 'Sensodyne Sensitive Toothbrush | Soft Rounded Bristles | Buy 2 Get 1 Free | 3 Pcs',
    stock: 60
  },
 

  // COLGATE CLASSIC HARD
  {
    name:'Classic Hard Toothbrush',
    weight: '1 Pc',
    price: 25,
    oldPrice: 30,
    discount: '17% OFF',
    category: 'Personal Care',
    brand: 'Colgate',
    image: 'https://tse1.mm.bing.net/th/id/OIP.2_e5OaTIBIQ_AX5wDaEeBQAAAA?pid=Api&P=0&w=118&h=250',
    inStock: true,
    description: 'Classic Hard Toothbrush | Hard Bristles | Deep Cleaning | Power Tip | 1 Pc',
    stock: 100
  }











  
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🧴 Starting Smart Migration for Personal Care Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Personal Care" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of personalCareProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Personal Care" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();