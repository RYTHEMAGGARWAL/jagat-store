// test_backend_api.js - Test Backend API Response
// Run: node test_backend_api.js

const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

console.log('\n╔═══════════════════════════════════════════╗');
console.log('║   BACKEND API TEST                        ║');
console.log('╚═══════════════════════════════════════════╝\n');

async function testBackendAPI() {
  try {
    console.log(`🔍 Testing Backend: ${BACKEND_URL}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Test 1: Check if backend is running
    console.log('Test 1: Backend Health Check');
    try {
      const healthCheck = await axios.get(`${BACKEND_URL}/api/products`);
      console.log('✅ Backend is running\n');
    } catch (error) {
      console.log('❌ Backend is NOT running!');
      console.log(`   Error: ${error.message}`);
      console.log('   🔧 Solution: Start backend with: npm start\n');
      process.exit(1);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Test 2: Fetch Pharmacy products
    console.log('Test 2: Fetching Pharmacy Products');
    console.log(`   URL: ${BACKEND_URL}/api/products?category=Pharmacy\n`);
    
    const response = await axios.get(`${BACKEND_URL}/api/products?category=Pharmacy`);
    
    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📦 Products Found: ${response.data.products?.length || 0}\n`);
    
    if (!response.data.products || response.data.products.length === 0) {
      console.log('❌ NO PRODUCTS IN RESPONSE!');
      console.log('   🔧 Solution: Run migrate_pharmacy_products.js\n');
      process.exit(1);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Test 3: Check product structure
    console.log('Test 3: Product Data Structure\n');
    
    const firstProduct = response.data.products[0];
    console.log('First Product:');
    console.log(JSON.stringify(firstProduct, null, 2));
    console.log('\n');
    
    // Check required fields
    const requiredFields = ['_id', 'name', 'price', 'category', 'image'];
    const missingFields = requiredFields.filter(field => !firstProduct[field]);
    
    if (missingFields.length > 0) {
      console.log(`⚠️  Missing Fields: ${missingFields.join(', ')}\n`);
    } else {
      console.log('✅ All required fields present\n');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Test 4: Check image URLs
    console.log('Test 4: Checking Image URLs\n');
    
    let validImages = 0;
    let invalidImages = 0;
    
    response.data.products.slice(0, 5).forEach(product => {
      if (product.image && product.image.startsWith('http')) {
        console.log(`✅ ${product.name}`);
        console.log(`   ${product.image.substring(0, 60)}...\n`);
        validImages++;
      } else {
        console.log(`❌ ${product.name}`);
        console.log(`   Invalid or missing image URL\n`);
        invalidImages++;
      }
    });
    
    console.log(`📊 Valid Image URLs: ${validImages}`);
    console.log(`📊 Invalid Image URLs: ${invalidImages}\n`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Test 5: Response headers (CORS check)
    console.log('Test 5: CORS Headers Check\n');
    
    console.log('Response Headers:');
    console.log(`   Access-Control-Allow-Origin: ${response.headers['access-control-allow-origin'] || 'NOT SET'}`);
    console.log(`   Content-Type: ${response.headers['content-type']}\n`);
    
    if (!response.headers['access-control-allow-origin']) {
      console.log('⚠️  CORS headers not set - may cause frontend issues\n');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Backend API Test Complete!\n');
    
    console.log('📋 Summary:');
    console.log(`   Backend Status: ✅ Running`);
    console.log(`   Products Found: ${response.data.products.length}`);
    console.log(`   Valid Images: ${validImages}/${validImages + invalidImages}`);
    console.log('\n');
    
  } catch (error) {
    console.error('\n❌ API Test Failed:');
    console.error(`   Error: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Backend is not running!');
      console.log('   Start it with: cd Backend && npm start\n');
    }
    
    process.exit(1);
  }
}

testBackendAPI();