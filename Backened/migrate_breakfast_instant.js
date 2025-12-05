// migrate_breakfast_instant_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_breakfast_instant_IMPROVED.js

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

// ========== BREAKFAST & INSTANT FOODS PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const breakfastInstantProducts = [



// ============ MTR DOSA MIX ============

{
    name: 'MTR Rava Dosa Mix',
    weight: '500g',
    price: 125,
    oldPrice: 145,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://tse1.mm.bing.net/th/id/OIP.zbN3C0DlE8jcDSxx9-GQlgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Rava Dosa Mix | Crispy & Tasty | Ready in Minutes | 500g Pack',
    stock: 100
},

{
    name: 'MTR Dosa Mix',
    weight: '500g',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: '	https://tse1.mm.bing.net/th/id/OIP.T17PKjAMgct3fL6xZBoecwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Dosa Mix | Soft & Crispy | Instant Breakfast | 500g Pack',
    stock: 100
},


{
    name: 'MTR Rava Idli Mix',
    weight: '500g',
    price: 125,
    oldPrice: 145,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: '	https://tse2.mm.bing.net/th/id/OIP.pun8tJZS76fLIk_A7nFtLwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Rava Idli Mix | Soft & Fluffy | Quick Breakfast | 500g Pack',
    stock: 100
},

{
    name: 'MTR Rice Idli Mix',
    weight: '500g',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://tse2.mm.bing.net/th/id/OIP.cV2qVD3YSy_2GDV2G0qQ3QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Idli Mix | Soft & Spongy | Instant Breakfast | 500g Pack',
    stock: 100
},
{
    name: 'MTR Masala Idli Mix',
    weight: '500g',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: '	https://tse1.mm.bing.net/th/id/OIP.BIrkipxCFz8NYy1uJubCggHaJC?pid=Api&H=195&W=160',
    inStock: true,
    description: 'MTR Masala Idli Mix | Spiced & Tasty | Ready in Minutes | 200g Pack',
    stock: 100
},

// ============ MTR UPMA & UTTAPAM ============

{
    name: 'MTR Upma Mix',
    weight: '500g',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://tse2.mm.bing.net/th/id/OIP.iPIs8RTgbH6pFkpJG0vJzAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Upma Mix | Soft & Tasty | South Indian Breakfast | 500g Pack',
    stock: 100
},

{
    name: 'MTR Uttapam Mix',
    weight: '500g',
    price: 125,
    oldPrice: 145,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: '	https://tse2.mm.bing.net/th/id/OIP.FJlSEPAqxUtklo0EAEFO3wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Uttapam Mix | Soft & Thick | Instant Breakfast | 500g Pack',
    stock: 100
},

// ============ MTR VADA MIX ============
{
    name: 'MTR Vada Mix',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: '	https://tse1.mm.bing.net/th/id/OIP.XxYRv2B89LTD_GeqpjMtxAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Vada Mix | Crispy & Crunchy | South Indian Snack | 200g Pack',
    stock: 100
},


// ============ MTR COCONUT CHUTNEY ============

{
    name: 'MTR Coconut Chutney Powder',
    weight: '200g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://tse1.mm.bing.net/th/id/OIP.hsZ8Js0SDrhsOx7bYWZ0QwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Coconut Chutney Powder | Instant Chutney | Just Add Water | 200g Pack',
    stock: 100
},

// ============ MTR SAMBHAR ============
{
    name: 'MTR Sambhar Mix',
    weight: '200g',
    price: 75,
    oldPrice: 90,
    discount: '17% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Tkzei0A6RbG6Agz0OfU-QwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Sambhar Mix | Ready to Cook | Authentic South Indian | 200g Pack',
    stock: 100
},


{
    name: 'MTR Sambhar Powder',
    weight: '200g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9losb6U2cmycqAxVtP3G3gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Sambhar Powder | Aromatic Spice Blend | Authentic Taste | 200g Pack',
    stock: 100
},





// ============ GM INSTANT MIX ============

{
    name: 'GM Bhatura Mix',
    weight: '500g',
    price: 99,
    oldPrice: 120,
    discount: '18% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'GM',
    image: 'https://tse2.mm.bing.net/th/id/OIP.3E_YvkLKKZ1x7DigUSYS3AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'GM Bhatura Mix | Soft & Fluffy | Ready in Minutes | 500g Pack',
    stock: 100
},

{
    name: 'GM Moong Tawa Chila Mix',
    weight: '500g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'GM',
    image: 'https://tse1.mm.bing.net/th/id/OIP.HHKTO6xGnK9RgrjT8neu9QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'GM Moong Tawa Chila Mix | Protein Rich | Crispy & Tasty | 500g Pack',
    stock: 100
},

{
    name: 'GM Tawa Naan Mix',
    weight: '500g',
    price: 99,
    oldPrice: 120,
    discount: '18% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'GM',
    image: 'https://tse2.mm.bing.net/th/id/OIP.CAhnLrIW3jKZ6_-OFkemrgHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'GM Tawa Naan Mix | Soft & Fluffy | No Oven Needed | 500g Pack',
    stock: 100
},

{
    name: 'GM Bedmi Puri Mix',
    weight: '500g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'GM',
    image: 'https://tse2.mm.bing.net/th/id/OIP.qH6EHOl805o42h56XEjtAgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'GM Bedmi Puri Mix | Crispy & Spiced | Traditional Taste | 500g Pack',
    stock: 100
},
{
    name: 'MTR Gulab Jamun Mix',
    weight: '200g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: '	https://tse1.mm.bing.net/th/id/OIP.lKL6h3h4uK5zFVWWeEwKVQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'MTR Gulab Jamun Mix | Soft & Spongy | Easy to Make | 200g Pack',
    stock: 100
},


// ============ KELLOGG'S OATS ============
{
    name: 'Kellogg\'s Oats',
    weight: '500g',
    price: 145,
    oldPrice: 170,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.a4X8UQasH6gX1wbPS44oZQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Oats | 100% Whole Grain | High in Fibre & Protein | 500g Pack',
    stock: 100
},


// ============ SAFFOLA OATS ============
{
    name: 'Saffola Oats',
    weight: '1kg',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Saffola',
    image: '	https://tse1.mm.bing.net/th/id/OIP.3voCrVS-Q1X340TrtzYkwQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Saffola Oats | 100% Natural | Heart Healthy | High Fibre | 1kg Pack',
    stock: 100
},


// ============ QUAKER OATS ============
{
    name: 'Quaker Oats',
    weight: '350g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Quaker',
    image: 'https://tse2.mm.bing.net/th/id/OIP.wIM1tBE5DgzAEJd9W8vTQwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Quaker Oats | 100% Wholegrain | Good Source of Fibre | 350g Pack',
    stock: 100
},

{
    name: 'Quaker Oats',
    weight: '1kg',
    price: 255,
    oldPrice: 299,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Quaker',
    image: 'https://tse1.mm.bing.net/th/id/OIP.UpTU3ok05u_3XTY1RowiAwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Quaker Oats | 100% Wholegrain | Good Source of Fibre | 1kg Pack',
    stock: 100
},

// ============ SAFFOLA MASALA OATS ============

{
    name: 'Saffola Masala Oats - Classic Masala',
    weight: '500g',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Saffola',
    image: 'https://tse2.mm.bing.net/th/id/OIP.iZDbxELCQMynrRC-7BisuAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Saffola Masala Oats Classic Masala | Tasty & Healthy | Family Pack | 500g Pack',
    stock: 100
},

{
    name: 'Saffola Masala Oats - Peppy Tomato',
    weight: '500g',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Saffola',
    image: 'https://tse1.mm.bing.net/th/id/OIP.XfS2blOfIHMs8WVxWTZD8AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Saffola Masala Oats Peppy Tomato | Tangy Tomato Flavour | Family Pack | 500g Pack',
    stock: 100
},

{
    name: 'Saffola Masala Oats - Veggie Twist',
    weight: '500g',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Saffola',
    image: '	https://tse1.mm.bing.net/th/id/OIP.zR1YUCd13mKMBO1D4OXdGwHaLu?pid=Api&H=253&W=160',
    inStock: true,
    description: 'Saffola Masala Oats Veggie Twist | Mixed Vegetables | Family Pack | 500g Pack',
    stock: 100
},





// ============ KELLOGG'S MUESLI ============
{
    name: 'Kellogg\'s Muesli - 0% Added Sugar',
    weight: '500g',
    price: 299,
    oldPrice: 350,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: '	https://tse2.mm.bing.net/th/id/OIP.Qdbu83Zcy7hxWCchkM4diwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Muesli 0% Added Sugar | Diabetic Friendly | High Fibre | 500g Pack',
    stock: 100
},

{
    name: 'Kellogg\'s Muesli - Fruit Magic',
    weight: '500g',
    price: 285,
    oldPrice: 335,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: '	https://tse2.mm.bing.net/th/id/OIP.X5FwODMaiPLMRwnsWx8XjgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Muesli Fruit Magic | Loaded with Fruits | Tasty & Healthy | 500g Pack',
    stock: 100
},

{
    name: 'Kellogg\'s Muesli - Fruit Nut',
    weight: '500g',
    price: 310,
    oldPrice: 365,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.L8DpMzt78fQQJYNLzY5eZQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Muesli Fruit Nut | Fruits & Nuts | High Protein | 500g Pack',
    stock: 100
},

{
    name: 'Kellogg\'s Muesli - Nuts Delight',
    weight: '500g',
    price: 320,
    oldPrice: 375,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: '	https://tse1.mm.bing.net/th/id/OIP.fzRBBnhGt3GG12dpYdtU0gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Muesli Nuts Delight | Loaded with Nuts | Crunchy & Tasty | 500g Pack',
    stock: 100
},
// ============ KELLOGG'S CHOCOS ============
{
    name: 'Kellogg\'s Chocos Duet',
    weight: '340g',
    price: 199,
    oldPrice: 235,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: '	https://tse2.mm.bing.net/th/id/OIP.cC_WmjhoiaiKfqlDOM6dmwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Chocos Duet | Choco & Vanilla | Crunchy & Tasty | 340g Pack',
    stock: 100
},
{
    name: 'Kellogg\'s Chocos Chota Ladoo',
    weight: '340g',
    price: 199,
    oldPrice: 235,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Pa38AkPhv405ozTrDStISQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Chocos Chota Ladoo | Chocolatey Balls | Kids Favourite | 340g Pack',
    stock: 100
},
{
    name: 'Kellogg\'s Chocos Moon & Stars',
    weight: '340g',
    price: 199,
    oldPrice: 235,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: '	https://tse1.mm.bing.net/th/id/OIP.uqp3N7vfKLLv5IBDHR1atgAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Chocos Moon & Stars | Fun Shapes | Chocolatey Taste | 340g Pack',
    stock: 100
},





// ============ KELLOGG'S CORNFLAKES ============
{
    name: 'Kellogg\'s Corn Flakes Original',
    weight: '1kg',
    price: 399,
    oldPrice: 465,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.D_SWMWhVIgVmUI6eH1DM7wHaIB?pid=Api&H=173&W=160',
    inStock: true,
    description: 'Kellogg\'s Corn Flakes Original | Crispy & Crunchy | Iron Rich | 1kg Pack',
    stock: 100
},
{
    name: 'Kellogg\'s Corn Flakes Original',
    weight: '250g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ik2FS4SqsptVTGNOb6RaogHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kellogg\'s Corn Flakes Original | Crispy & Crunchy | Iron Rich | 250g Pack',
    stock: 100
},


// ============ TOPS CORNFLAKES ============

{
    name: 'Tops Corn Flakes',
    weight: '500g',
    price: 120,
    oldPrice: 140,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.mK_1IfZnxRK1Cr179fSoSAHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Tops Corn Flakes | Crispy & Tasty | Budget Friendly | 500g Pack',
    stock: 100
},


// ============ MOHAN CORNFLAKES ============

{
    name: 'Mohan Corn Flakes',
    weight: '1kg',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Mohan',
    image: 'https://tse2.mm.bing.net/th/id/OIP.ydTBawj4xxePcxiuJOvDZQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Mohan Corn Flakes | Crispy & Light | Family Pack | 1kg Pack',
    stock: 100
},



// ============ BOURNVITA ============
{
    name: 'Cadbury Bournvita - Refill',
    weight: '500g',
    price: 235,
    oldPrice: 275,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Qz2VHdmAEzKhEyESkTMtfwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Bournvita Refill | Vitamin D for Immunity | Chocolate Flavour | 500g Pack',
    stock: 100
},
{
    name: 'Cadbury Bournvita - Jar',
    weight: '500g',
    price: 255,
    oldPrice: 299,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.f-wHai07Mh95DKxg7v6gfgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Bournvita Jar | Vitamin D for Immunity | Chocolate Flavour | 500g Jar',
    stock: 100
},
{
    name: 'Cadbury Bournvita - Jar',
    weight: '1kg',
    price: 485,
    oldPrice: 570,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.DueesQXz0FR_bLY4xLO5ZwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Bournvita Jar | Vitamin D for Immunity | Chocolate Flavour | 1kg Jar',
    stock: 100
},

// ============ HORLICKS ============
{
    name: 'Horlicks Classic Malt - Jar',
    weight: '500g',
    price: 265,
    oldPrice: 310,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Horlicks',
    image: '	https://tse1.mm.bing.net/th/id/OIP.xjtgzTbPWm0vBEGPWW_XWAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Horlicks Classic Malt Jar | Clinically Proven | Plain Flavour | 500g Jar',
    stock: 100
},
{
    name: 'Horlicks Chocolate - Jar',
    weight: '500g',
    price: 275,
    oldPrice: 325,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Horlicks',
    image: '	https://tse1.mm.bing.net/th/id/OIP.hemwhkh0N5_JWCLaDwa7SQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Horlicks Chocolate Jar | Clinically Proven | Chocolate Flavour | 500g Jar',
    stock: 100
},
{
    name: 'Horlicks Classic Malt - Jar',
    weight: '1kg',
    price: 499,
    oldPrice: 585,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Horlicks',
    image: 'https://tse1.mm.bing.net/th/id/OIP.d8xz8HBag39AWLftXPDTsQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Horlicks Classic Malt Jar | Clinically Proven | Plain Flavour | 1kg Jar',
    stock: 100
},
{
    name: 'Horlicks Chocolate - Jar',
    weight: '1kg',
    price: 520,
    oldPrice: 610,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Horlicks',
    image: '	https://tse1.mm.bing.net/th/id/OIP.f6D859609Z-3Nd0eVTndCgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Horlicks Chocolate Jar | Clinically Proven | Chocolate Flavour | 1kg Jar',
    stock: 100
},

// ============ COMPLAN ============
{
    name: 'Complan Chocolate - Refill',
    weight: '500g',
    price: 285,
    oldPrice: 335,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Complan',
    image: 'https://tse1.mm.bing.net/th/id/OIP.z76FvTLF8KAQgMuBXhjmbgHaES?pid=Api&H=92&W=160',
    inStock: true,
    description: 'Complan Chocolate Refill | 34 Vital Nutrients | Growth Formula | 500g Pack',
    stock: 100
},
{
    name: 'Complan Chocolate - Jar',
    weight: '500g',
    price: 310,
    oldPrice: 365,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Complan',
    image: '	https://tse1.mm.bing.net/th/id/OIP.l4AQy8IOvYeErXV8dZH2QAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Complan Chocolate Jar | 34 Vital Nutrients | Growth Formula | 500g Jar',
    stock: 100
},

// ============ PEDIASURE ============
{
    name: 'Pediasure Vanilla - Jar',
    weight: '375g',
    price: 599,
    oldPrice: 699,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Pediasure',
    image: '	https://tse2.mm.bing.net/th/id/OIP.EmxwTMvPBKJqXkuwthRDXAHaJJ?pid=Api&P=0&w=400&h=494',
    inStock: true,
    description: 'Pediasure Vanilla Jar | Complete Balanced Nutrition | 37 Nutrients | 375g Jar',
    stock: 100
},


// ============ PROTINEX ============
{
    name: 'Protinex Mothers - Jar',
    weight: '400g',
    price: 499,
    oldPrice: 585,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Protinex',
    image: '	https://tse2.mm.bing.net/th/id/OIP.qWtRFstml08TaPuMNHQU7wHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Protinex Mothers Jar | For Pregnant & Lactating Mothers | DHA & Protein | 400g Jar',
    stock: 100
},


{
    name: 'Protinex Lite Chocolate Zero Added Sugar - Jar',
    weight: '400g',
    price: 499,
    oldPrice: 585,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Protinex',
    image: 'https://tse1.mm.bing.net/th/id/OIP.OO3mnsq-sxIJhBkTd49U3AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Protinex Lite Chocolate Zero Sugar Jar | High Protein | Diabetic Friendly | 400g Jar',
    stock: 100
},



// ============ NESTLE LACTOGEN ============
{
    name: 'Nestle Lactogen 1 Infant Formula',
    weight: '400g',
    price: 450,
    oldPrice: 525,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: '	https://tse1.mm.bing.net/th/id/OIP.uIx7vGU6rbdDsAcc6tybCQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Lactogen 1 | Infant Formula (0-6 Months) | With Probiotics | 400g Tin',
    stock: 100
},

{
    name: 'Nestle Lactogen 2 Follow-Up Formula',
    weight: '400g',
    price: 450,
    oldPrice: 525,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.5exNU3mJ-EbQzPbOxSFSOgHaJs?pid=Api&H=209&W=160',
    inStock: true,
    description: 'Nestle Lactogen 2 | Follow-Up Formula (6-12 Months) | With Probiotics | 400g Tin',
    stock: 100
},

{
    name: 'Nestle Lactogen 3 Follow-Up Formula',
    weight: '400g',
    price: 435,
    oldPrice: 510,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.J2gnE1i9jxhD5OtyiUw79wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Lactogen 3 | Follow-Up Formula (1-3 Years) | With Probiotics | 400g Tin',
    stock: 100
},

{
    name: 'Nestle Lactogen 4 Follow-Up Formula',
    weight: '400g',
    price: 420,
    oldPrice: 495,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.WDRz2wiXVjgMAeCeHC5-vgAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Lactogen 4 | Follow-Up Formula (3-6 Years) | With Probiotics | 400g Tin',
    stock: 100
},




// ============ NESTLE CERELAC - STAGE 8 (8 Months+) ============
{
    name: 'Nestle Cerelac Wheat Orange',
    weight: '350g',
    price: 325,
    oldPrice: 380,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.kB03gkv8Hv-wP3b4ZfrxXgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Cerelac Wheat Orange | Stage 8 (8 Months+) | Iron Fortified | 350g Pack',
    stock: 100
},
{
    name: 'Nestle Cerelac Wheat Apple Cherry',
    weight: '350g',
    price: 325,
    oldPrice: 380,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.2nfbEetktVesaQiCGTuAvwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Cerelac Wheat Apple Cherry | Stage 8 (8 Months+) | Iron Fortified | 350g Pack',
    stock: 100
},

// ============ NESTLE CERELAC - STAGE 10 (10 Months+) ============
{
    name: 'Nestle Cerelac Wheat Rice Mix Fruit',
    weight: '350g',
    price: 330,
    oldPrice: 385,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Usx2W-4uHW57mmncYb-ttwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Cerelac Wheat Rice Mix Fruit | Stage 10 (10 Months+) | Iron Fortified | 350g Pack',
    stock: 100
},

// ============ NESTLE CERELAC - STAGE 12 (12 Months+) ============
{
    name: 'Nestle Cerelac Multigrain Fruits',
    weight: '350g',
    price: 335,
    oldPrice: 395,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.w9j76TNMLHN9QxwGXgmzWAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Cerelac Multigrain Fruits | Stage 12 (12 Months+) | Iron Fortified | 350g Pack',
    stock: 100
},
{
    name: 'Nestle Cerelac Multigrain Dal Veg',
    weight: '350g',
    price: 335,
    oldPrice: 395,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.7MqB_QNXZiGDnRxk3WX1vQHaJZ?pid=Api&H=202&W=160',
    inStock: true,
    description: 'Nestle Cerelac Multigrain Dal Veg | Stage 12 (12 Months+) | Iron Fortified | 350g Pack',
    stock: 100
},

// ============ NESTLE CERELAC - STAGE 18 (18 Months+) ============
{
    name: 'Nestle Cerelac 5 Grains & Vegetables',
    weight: '350g',
    price: 340,
    oldPrice: 399,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.UrU6EbVRlqvV67JwK_xBWAHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Nestle Cerelac 5 Grains & Vegetables | Stage 18 (18 Months+) | Iron Fortified | 350g Pack',
    stock: 100
},
{
    name: 'Nestle Cerelac 5 Grains & Fruits',
    weight: '350g',
    price: 340,
    oldPrice: 399,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: '	https://tse3.mm.bing.net/th/id/OIP.GR1QmMmUA14kEzpyY_33UwHaI2?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Nestle Cerelac 5 Grains & Fruits | Stage 18 (18 Months+) | Iron Fortified | 350g Pack',
    stock: 100
},

// ============ NESTLE EVERYDAY ============
{
    name: 'Nestle Everyday Dairy Whitener',
    weight: '200g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: '	https://tse4.mm.bing.net/th/id/OIP.jrtA4DHjDhl7k4PdAfGWvwHaHs?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Nestle Everyday Dairy Whitener | Rich & Creamy Tea | Milk Powder | 200g Pack',
    stock: 100
},
{
    name: 'Nestle Everyday Dairy Whitener',
    weight: '400g',
    price: 210,
    oldPrice: 245,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.BN0yZpH7ZDafVk4hg9paigHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Nestle Everyday Dairy Whitener | Rich & Creamy Tea | Milk Powder | 400g Pack',
    stock: 100
},
{
    name: 'Nestle Everyday Dairy Whitener',
    weight: '1kg',
    price: 499,
    oldPrice: 585,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestle',
    image: 'https://tse3.mm.bing.net/th/id/OIP.FS30Ig8Ukag7R92fSPWkbgHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Nestle Everyday Dairy Whitener | Rich & Creamy Tea | Milk Powder | 1kg Pack',
    stock: 100
},





{
    name: 'Sugar Free Gold Powder',
    weight: '100g',
    price: 185,
    oldPrice: 215,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Sugar Free',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ro4mkHfkPFo2nOzkdLi2eQHaES?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sugar Free Gold Powder | Low Calorie Sweetener | Diabetic Friendly | 100g Pack',
    stock: 100
},
{
    name: 'Sugar Free Natura Powder',
    weight: '220g',
    price: 399,
    oldPrice: 465,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Sugar Free',
    image: 'https://tse1.mm.bing.net/th/id/OIP.cT-WGGOb7OA8CUltL5yW_QAAAA?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sugar Free Natura Powder | Made from Natural Stevia | Zero Calories | 220g Pack',
    stock: 100
},
// ============ SUGAR FREE TABLETS & DROPS ============
{
    name: 'Sugar Free Gold Tablets',
    weight: '300 Pellets',
    price: 220,
    oldPrice: 260,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Sugar Free',
    image: 'https://tse3.mm.bing.net/th/id/OIP.07Kw1aVQIQwdmiTjXcmOhgHaH8?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sugar Free Gold Tablets | Low Calorie Sweetener | Diabetic Friendly | 300 Pellets',
    stock: 100
},
{
    name: 'Sugar Free Gold Tablets',
    weight: '100 Pellets',
    price: 85,
    oldPrice: 99,
    discount: '14% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Sugar Free',
    image: '	https://tse4.mm.bing.net/th/id/OIP.ma_9ENQLugeT4xUPV2y_BwHaIz?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sugar Free Gold Tablets | Low Calorie Sweetener | Diabetic Friendly | 100 Pellets',
    stock: 100
},
{
    name: 'Sugar Free Natura Tablets',
    weight: '200 Pellets',
    price: 199,
    oldPrice: 235,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Sugar Free',
    image: 'https://tse2.mm.bing.net/th/id/OIP.9Nb3yPwXw-NEzVb6wIVIJwHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sugar Free Natura Tablets | Made from Natural Stevia | Zero Calories | 200 Pellets',
    stock: 100
},
{
    name: 'Sugar Free Natura Tablets',
    weight: '300 Pellets',
    price: 285,
    oldPrice: 335,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Sugar Free',
    image: 'https://tse4.mm.bing.net/th/id/OIP.GPFLuhklRNvB7Yxu36HpzwHaH2?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sugar Free Natura Tablets | Made from Natural Stevia | Zero Calories | 300 Pellets',
    stock: 100
},
{
    name: 'Sugar Free Natura Drops',
    weight: '200 Drops',
    price: 175,
    oldPrice: 205,
    discount: '15% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Sugar Free',
    image: '	https://tse3.mm.bing.net/th/id/OIP.0_p4Ew6y_p_VdSseC-uqdgHaIL?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Sugar Free Natura Drops | Made from Natural Stevia | Easy to Use | 200 Drops',
    stock: 100
},
// ========================================
// 🥤 BOURNVITA POUCH - Breakfast & Instant Foods
// ========================================
{
    name: 'Cadbury Bournvita - Pouch',
    weight: '30g',
    price: 15,
    oldPrice: 20,
    discount: '25% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.yXtTqvX7sdEvnzx6xP_NTgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Bournvita Pouch | Single Serve | Vitamin D for Immunity | 30g',
    stock: 200
},

// ========================================
// 🥤 HORLICKS POUCH - Breakfast & Instant Foods
// ========================================

{
    name: 'Horlicks Chocolate - Pouch',
    weight: '30g',
    price: 15,
    oldPrice: 20,
    discount: '25% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Horlicks',
    image: '	https://tse1.mm.bing.net/th/id/OIP.E3r6dbEFARulFkh4nxmoWwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Horlicks Chocolate Pouch | Single Serve | Clinically Proven | 30g',
    stock: 200
},
{
    name: 'Magic Handwash Pouch - Pack of 10',
    weight: '10ml x 10',
    price: 18,
    oldPrice: 25,
    discount: '28% OFF',
    category: 'Personal Care',
    brand: 'Magic',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ucDrV0s4V7d9KyzdswRUMQAAAA?pid=Api&P=0&w=300&h=288',
    inStock: true,
    description: 'Magic Handwash Pouch Pack | 10 Sachets | Germ Protection | Value Pack',
    stock: 150
},













  // CEREALS
 
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🥣 Starting Smart Migration for Breakfast & Instant Foods...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Breakfast & Instant Foods" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of breakfastInstantProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Breakfast & Instant Foods" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();