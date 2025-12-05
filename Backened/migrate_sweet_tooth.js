// migrate_sweet_tooth_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_sweet_tooth_IMPROVED.js

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

// ========== SWEET TOOTH PRODUCTS ==========
const sweetToothProducts = [
 // ============ KINDER CHOCOLATES ============
{
    name: 'Kinder Joy - Boys',
    weight: '20g',
    price: 55,
    oldPrice: 60,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ARdXgt6dP7iscohax1JCrwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kinder Joy Boys | Chocolate with Surprise Toy | Fun for Kids | 20g',
    stock: 100
},
{
    name: 'Kinder Joy - Girls',
    weight: '20g',
    price: 55,
    oldPrice: 60,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    image: '	https://tse2.mm.bing.net/th/id/OIP.FTih0fng3gpZylqSKZ8HhwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kinder Joy Girls | Chocolate with Surprise Toy | Fun for Kids | 20g',
    stock: 100
},
{
    name: 'Kinder Creamy',
    weight: '19g',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    image: '	https://tse1.mm.bing.net/th/id/OIP.3WusmSEWVZJrE0rLUBh7rwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kinder Creamy | Milky & Cocoa | Smooth Texture | 19g',
    stock: 100
},
{
    name: 'Kinder Schoko Bons',
    weight: '40g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    image: 'https://tse2.mm.bing.net/th/id/OIP.eN24BzgSqWS_GlKHF87VJAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kinder Schoko Bons | Crispy Chocolate Balls | Hazelnut Filling | 40g Pack',
    stock: 100
},

// ============ FERRERO ROCHER ============
{
    name: 'Ferrero Rocher',
    weight: '300g',
    price: 550,
    oldPrice: 650,
    discount: '15% OFF',
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    image: 'https://tse2.mm.bing.net/th/id/OIP.4hDSvRMuSoQ5lDlz4OKWtAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ferrero Rocher | Hazelnut Chocolate | Premium Gift Pack | 300g (24 Pieces)',
    stock: 100
},
{
    name: 'Ferrero Rocher',
    weight: '375g',
    price: 900,
    oldPrice: 1050,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    image: 'https://tse2.mm.bing.net/th/id/OIP.qn_mWX6jJrC8UeZbucymEwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ferrero Rocher | Hazelnut Chocolate | Premium Gift Pack | 375g (30 Pieces)',
    stock: 100
},
// ============ CADBURY CELEBRATIONS ============
{
    name: 'Cadbury Celebrations',
    weight: '59.8g',
    price: 110,
    oldPrice: 125,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.sYYUakL_0YY5IdJNkbXGPgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Celebrations | Assorted Chocolates | Gift Pack | 59.8g Box',
    stock: 100
},
{
    name: 'Cadbury Celebrations',
    weight: '136g',
    price: 160,
    oldPrice: 180,
    discount: '11% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.TlPAyvsFtjNkxoCeH6SV5wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Celebrations | Assorted Chocolates | Gift Pack | 136g Box',
    stock: 100
},
{
    name: 'Cadbury Celebrations',
    weight: '178g',
    price: 250,
    oldPrice: 285,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.nL7SLUwDeMUsh6uRGkW6OAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Celebrations | Assorted Chocolates | Gift Pack | 178g Box',
    stock: 100
},
{
    name: 'Cadbury Celebrations',
    weight: '188g',
    price: 275,
    oldPrice: 315,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.3LGsGC7J_lNTpSa_gtT7hQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Celebrations | Assorted Chocolates | Premium Gift Pack | 188g Box',
    stock: 100
},
{
    name: 'Cadbury Celebrations',
    weight: '281g',
    price: 400,
    oldPrice: 460,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ZzDUecumcQwczGzLTphcrQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Celebrations | Assorted Chocolates | Premium Gift Pack | 281g Box',
    stock: 100
},
{
    name: 'Cadbury Celebrations',
    weight: '361g',
    price: 525,
    oldPrice: 600,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.-Ykoo4ixZd8myJ7uxU0MVAAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Celebrations | Assorted Chocolates | Big Gift Pack | 361g Box',
    stock: 100
},

// ============ AMUL CHOCOLATES ============
{
    name: 'Amul Chocomini Gift Pack',
    weight: '250g',
    price: 140,
    oldPrice: 160,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Amul',
    image: 'https://tse1.mm.bing.net/th/id/OIP.qtjdlHA0izARpmXUnp_F7wHaEK?pid=Api&H=89&W=160',
    inStock: true,
    description: 'Amul Chocomini Gift Pack | Assorted Mini Chocolates | 250g Box',
    stock: 100
},
{
    name: 'Amul Dark Chocolate - Fruit & Nut',
    weight: '150g',
    price: 125,
    oldPrice: 145,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Amul',
    image: '	https://tse2.mm.bing.net/th/id/OIP.0O7w5zrv3WGtrY1YTwWA9QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Dark Chocolate Fruit & Nut | Premium Cocoa | Almonds & Raisins | 150g Bar',
    stock: 100
},
{
    name: 'Amul Dark Chocolate - Plain',
    weight: '150g',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Sweet Tooth',
    brand: 'Amul',
    image: '	https://tse2.mm.bing.net/th/id/OIP.urLPWqsBsTRiVUOer7VBOgHaJl?pid=Api&H=206&W=160',
    inStock: true,
    description: 'Amul Dark Chocolate | 55% Rich Cocoa | Bitter Sweet | 150g Bar',
    stock: 100
},


// ============ NESTLE MUNCH ============
{
    name: 'Nestle Munch',
    weight: '10.1g',
    price: 10,
    oldPrice: 10,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Nestle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.NpHPLDiNjBa1VAYDPN1hhgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Munch | Crunchy Wafer Chocolate | Pocket Pack | 10.1g Bar',
    stock: 100
},
{
    name: 'Nestle Munch Max',
    weight: '23g',
    price: 20,
    oldPrice: 20,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Nestle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.8-v8eYiZn1l6gPh-tIVHHQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Munch Max | Crunchy Wafer Chocolate | Regular | 23g Bar',
    stock: 100
},

// ============ NESTLE KITKAT ============
{
    name: 'Nestle KitKat',
    weight: '27.5g',
    price: 30,
    oldPrice: 30,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Nestle',
    image: '	https://tse1.mm.bing.net/th/id/OIP.BK9LaIymjP30suQ8lELmsAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle KitKat | Crispy Wafer in Chocolate | 2 Finger | 27.5g Bar',
    stock: 100
},
{
    name: 'Nestle KitKat',
    weight: '37.3g',
    price: 55,
    oldPrice: 60,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.fKtg5vz8FqIvP5DzuydzEQHaC8?pid=Api&H=63&W=160',
    inStock: true,
    description: 'Nestle KitKat | Crispy Wafer in Chocolate | 4 Finger | 37.3g Bar',
    stock: 100
},
{
    name: 'Nestle KitKat',
    weight: '50g',
    price: 60,
    oldPrice: 65,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Atjg8Mj6J_wcW7o9JP7skQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle KitKat | Crispy Wafer in Chocolate | Duo Pack | 50g',
    stock: 100
},

// ============ NESTLE MILKYBAR ============
{
    name: 'Nestle Milkybar',
    weight: '13g',
    price: 20,
    oldPrice: 20,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Nestle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.rsqx-QSzYsQi3gO7TDHsjwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Milkybar | Creamy White Chocolate | Kids Favourite | 13g Bar',
    stock: 100
},

// ============ TOFFEES & CANDIES ============

{
    name: 'Cadbury Choclairs Gold',
    weight: '310.5g',
    price: 130,
    oldPrice: 150,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.gtgAksy0KZLQtK5USJlvoQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Choclairs Gold | Caramel with Choco Centre | 56 Pieces | 310.5g Jar',
    stock: 100
},

{
    name: 'Pulse Candy - Kachcha Aam',
    weight: '100g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Sweet Tooth',
    brand: 'DS Group',
    image: '	https://tse1.mm.bing.net/th/id/OIP.lPP6-wEvVKHviWzK_lkw9gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Pulse Candy Kachcha Aam | Tangy Mango | Masala Filled | 100g Pack',
    stock: 100
},

{
    name: 'Parle Melody Chocolaty',
    weight: '195.5g',
    price: 50,
    oldPrice: 55,
    discount: '9% OFF',
    category: 'Sweet Tooth',
    brand: 'Parle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.D9sRQzyWsvTpQKgSzF18ngHaJ4?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Parle Melody Chocolaty | Toffee with Chocolate | Why Should Grown Ups Have All The Fun | 195.5g Pack',
    stock: 100
},


{
    name: 'Mentos Fruit',
    weight: '36.4g',
    price: 20,
    oldPrice: 20,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Perfetti',
    image: 'https://tse2.mm.bing.net/th/id/OIP.fHV_9Aic79yrmKSpVWrzXgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Mentos Fruit | Mixed Fruit | Chewy Candy Roll | 36.4g',
    stock: 100
},
{
    name: 'Happydent White',
    weight: '26.6g',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Perfetti',
    image: '	https://tse1.mm.bing.net/th/id/OIP.OXQffJMMBU2KFjWqEJtmQgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Happydent White | Xylitol Chewing Gum | Fresh Mint | 26.6g Pack',
    stock: 100
},

// ============ CADBURY DAIRY MILK ============
{
    name: 'Cadbury Dairy Milk',
    weight: '13.2g',
    price: 20,
    oldPrice: 20,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.E1LyNGE7i_oiJ21_dLJd-QHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Cadbury Dairy Milk | Classic Milk Chocolate | Pocket Size | 13.2g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk',
    weight: '50g',
    price: 55,
    oldPrice: 60,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.5F557ZUns0TqlmQM_LwKKgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk | Smooth & Creamy | Classic Milk Chocolate | 50g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk',
    weight: '110g',
    price: 100,
    oldPrice: 110,
    discount: '9% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.uO55SFbBEZS-122WhXGz_wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk | Smooth & Creamy | Classic Milk Chocolate | 110g Bar',
    stock: 100
},

// ============ CADBURY FUSE ============
{
    name: 'Cadbury Fuse',
    weight: '24g',
    price: 20,
    oldPrice: 20,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.w3kjTFvfyDrAJa5eUbvA3wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Fuse | Chocolate with Peanuts & Caramel | 24g Bar',
    stock: 100
},
{
    name: 'Cadbury Fuse',
    weight: '45g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.1KnnPEPzDfrwQgxORai3NgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Fuse | Chocolate with Peanuts & Caramel | 45g Bar',
    stock: 100
},

// ============ CADBURY 5 STAR ============
{
    name: 'Cadbury 5 Star',
    weight: '22g',
    price: 20,
    oldPrice: 20,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.HwK6LCz7OlHZk3ce7c7WRQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury 5 Star | Chewy Caramel & Nougat | 22g Bar',
    stock: 100
},
{
    name: 'Cadbury 5 Star Oreo',
    weight: '42g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.jT6r7QJzHl_KuyjqLwN2pgHaH7?pid=Api&H=171&W=160',
    inStock: true,
    description: 'Cadbury 5 Star Oreo | Caramel with Oreo Crumbs | 42g Bar',
    stock: 100
},
{
    name: 'Cadbury 5 Star 3D',
    weight: '42g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.jDuL6DX0bKUME1EQLnxzPgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury 5 Star 3D | Chewy Caramel | New Shape | 42g Bar',
    stock: 100
},

// ============ CADBURY GEMS ============
{
    name: 'Cadbury Gems',
    weight: '8.9g',
    price: 10,
    oldPrice: 10,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.ZC5VcNzr7wpYZ7BsmSmMqQHaEl?pid=Api&P=0&w=647&h=400',
    inStock: true,
    description: 'Cadbury Gems | Colourful Sugar Coated Chocolate | Mini Pack | 8.9g',
    stock: 100
},
{
    name: 'Cadbury Gems',
    weight: '17.8g',
    price: 20,
    oldPrice: 20,
    discount: '0% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.VFAS5mjbGI4dC-epunY5GgHaFe?pid=Api&H=118&W=160',
    inStock: true,
    description: 'Cadbury Gems | Colourful Sugar Coated Chocolate | Regular Pack | 17.8g',
    stock: 100
},

// ============ CADBURY DAIRY MILK VARIANTS (50g) ============
{
    name: 'Cadbury Dairy Milk Fruit & Nut',
    weight: '36g',
    price: 50,
    oldPrice: 55,
    discount: '9% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.9X-kosHceFbo_PknluosoAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Fruit & Nut | Raisins & Almonds | 36g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Roast Almond',
    weight: '36g',
    price: 50,
    oldPrice: 55,
    discount: '9% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.5mZxg40WjJlksULt7x50pAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Roast Almond | Crunchy Almonds | 36g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Crackle',
    weight: '36g',
    price: 50,
    oldPrice: 55,
    discount: '9% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.z80w9tZjXGQKs86Mc6T3wgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Crackle | Crunchy Rice Puffs | 36g Bar',
    stock: 100
},

// ============ CADBURY DAIRY MILK SILK ============
{
    name: 'Cadbury Dairy Milk Silk',
    weight: '60g',
    price: 110,
    oldPrice: 120,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.MpXFqdTjHxMLvr5fHM8pOAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk | Silky Smooth | Premium Chocolate | 60g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk',
    weight: '150g',
    price: 230,
    oldPrice: 260,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.rNy0busJw2JH5kh0az1KJgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk | Silky Smooth | Premium Chocolate | 150g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Roast Almond',
    weight: '58g',
    price: 110,
    oldPrice: 120,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hbOSAC2FFwE7a2XUVNUldQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Roast Almond | Crunchy Almonds | 58g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Roast Almond',
    weight: '143g',
    price: 230,
    oldPrice: 260,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.4aNbbDQuhbZZQ2T34I76ewHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Roast Almond | Crunchy Almonds | 143g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Hazelnut',
    weight: '58g',
    price: 110,
    oldPrice: 120,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.RjDNRMj_HzAkJ5dORsan9QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Hazelnut | Rich Hazelnut | 58g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Hazelnut',
    weight: '143g',
    price: 230,
    oldPrice: 260,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.lfre1Vx3N9aa0LalCzkAwwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Hazelnut | Rich Hazelnut | 143g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Bubbly',
    weight: '50g',
    price: 110,
    oldPrice: 120,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.7q1O35kvCiwJ3tmMlWnnYAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Bubbly | Aerated Chocolate | Melt in Mouth | 50g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Bubbly',
    weight: '120g',
    price: 230,
    oldPrice: 260,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.AIR_PiNrssRhHTby9IO7mgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Bubbly | Aerated Chocolate | Melt in Mouth | 120g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Oreo',
    weight: '60g',
    price: 110,
    oldPrice: 120,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.I7qe71fGvDviudp1qfwXxAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Oreo | Chocolate with Oreo Crumbs | 60g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Oreo',
    weight: '130g',
    price: 230,
    oldPrice: 260,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.MflqscccROV5BrT7xpenJQHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Oreo | Chocolate with Oreo Crumbs | 130g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Fruit & Nut',
    weight: '55g',
    price: 110,
    oldPrice: 120,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Aw3GEWf7OcERy4oel-xwbwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Fruit & Nut | Raisins & Almonds | 55g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Fruit & Nut',
    weight: '137g',
    price: 230,
    oldPrice: 260,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.p3jWUuLOtCyboaRjUYBjKAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Fruit & Nut | Raisins & Almonds | 137g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Mousse',
    weight: '50g',
    price: 110,
    oldPrice: 120,
    discount: '8% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.FQ8OfpqeCy3RNZ3J6NkCPwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Mousse | Soft Mousse Centre | 50g Bar',
    stock: 100
},
{
    name: 'Cadbury Dairy Milk Silk Mousse',
    weight: '116g',
    price: 230,
    oldPrice: 260,
    discount: '12% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.R1L-AXWkee3I4uRM2eJCeQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Dairy Milk Silk Mousse | Soft Mousse Centre | 116g Bar',
    stock: 100
},

// ============ CADBURY BOURNVILLE ============
{
    name: 'Cadbury Bournville Rich Cocoa',
    weight: '31g',
    price: 50,
    oldPrice: 55,
    discount: '9% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse1.mm.bing.net/th/id/OIP.PFjI_cftgjGXo5zaDhbcDAAAAA?pid=Api&H=342&W=160',
    inStock: true,
    description: 'Cadbury Bournville Rich Cocoa | Dark Chocolate | 31g Bar',
    stock: 100
},
{
    name: 'Cadbury Bournville Rich Cocoa',
    weight: '80g',
    price: 130,
    oldPrice: 150,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.c6ng1dPxMkgUrxFjYHuARAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Bournville Rich Cocoa | Dark Chocolate | 80g Bar',
    stock: 100
},

// ============ CADBURY TEMPTATIONS ============
{
    name: 'Cadbury Temptations Almond Treat',
    weight: '72g',
    price: 130,
    oldPrice: 150,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ui5kF4ksQoSrvjfUvZbLTgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Temptations Almond Treat | Premium Chocolate | Whole Almonds | 72g Bar',
    stock: 100
},
{
    name: 'Cadbury Temptations Rum & Raisin',
    weight: '72g',
    price: 130,
    oldPrice: 150,
    discount: '13% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.L2NcZ7kQipL3_WGeUzSYmQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Temptations Rum & Raisin | Premium Chocolate | Rum Flavoured | 72g Bar',
    stock: 100
},


// ============ CADBURY CHOCO LICKABLES ============
{
    name: 'Cadbury Choco Lickables',
    weight: '20g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    image: 'https://tse2.mm.bing.net/th/id/OIP.AVJ3PrprRQCMhlYlSZ6NsgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Choco Lickables | Chocolate with Surprise Toy | Kids Favourite | 20g',
    stock: 100
},






// ============ HALDIRAM'S SWEETS ============
{
    name: 'Haldiram\'s Rasgulla',
    weight: '1kg',
    price: 250,
    oldPrice: 290,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Haldiram\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.xqq1OsXh38RjIeK-UCcbsAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldiram\'s Rasgulla | Soft & Spongy | Tin Pack | 1kg (12-14 Pieces)',
    stock: 100
},
{
    name: 'Haldiram\'s Gulab Jamun',
    weight: '1kg',
    price: 250,
    oldPrice: 290,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Haldiram\'s',
    image: '	https://tse2.mm.bing.net/th/id/OIP.iq99zXGZDeH3aQKRHevXGAHaIb?pid=Api&H=181&W=160',
    inStock: true,
    description: 'Haldiram\'s Rasgulla | Soft & Spongy | Tin Pack | 1kg (12-14 Pieces)',
    stock: 100
},
{
    name: 'Bicano Rasgulla',
    weight: '1kg',
    price: 250,
    oldPrice: 290,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Bicano',
    image: '	https://tse2.mm.bing.net/th/id/OIP.eBv-JGxfogPXtU5EeMzySgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldiram\'s Rasgulla | Soft & Spongy | Tin Pack | 1kg (12-14 Pieces)',
    stock: 100
},
{
    name: 'Haldiram\'s Desi Ghee Soan Papdi',
    weight: '500g',
    price: 180,
    oldPrice: 210,
    discount: '14% OFF',
    category: 'Sweet Tooth',
    brand: 'Haldiram\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.g3nf9mxvt5gHCytNfyIN6gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldiram\'s Desi Ghee Soan Papdi | Flaky & Melt in Mouth | Premium Quality | 500g Box',
    stock: 100
},
{
    name: 'Haldiram\'s Desi Ghee Soan Papdi',
    weight: '1kg',
    price: 340,
    oldPrice: 399,
    discount: '15% OFF',
    category: 'Sweet Tooth',
    brand: 'Haldiram\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.8o9KHAnJo-laWluFyCpBAAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldiram\'s Desi Ghee Soan Papdi | Flaky & Melt in Mouth | Premium Quality | 1kg Box',
    stock: 100
},{
    name: 'Lotte Choco Pie',
    weight: '336g (12 Pcs)',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Sweet Tooth',
    brand: 'Lotte',
    image: 'https://tse1.mm.bing.net/th/id/OIP.OyWZ3zsuEOAjOnpHpRLZGAHaGP?pid=Api&H=134&W=160',
    inStock: true,
    description: 'Lotte Choco Pie | Soft Cake with Marshmallow | 12 Pieces Family Box',
    stock: 80
},
 
  
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍫 Starting Smart Migration for Sweet Tooth...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Sweet Tooth" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of sweetToothProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Sweet Tooth" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🍫 Cadbury Dairy Milk: 3 products');
    console.log('   🍫 KitKat & Small Chocolates: 5 products');
    console.log('   🌍 International Brands: 3 products');
    console.log('   💎 Premium Chocolates: 2 products');
    console.log('   🎁 Assortments: 2 products');
    console.log('   🍬 Gems & Candies: 4 products');
    console.log('   🍡 Indian Sweets: 3 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();