const http = require('http');

async function checkEndpoint(url, method = 'GET') {
  try {
    const res = await fetch(url, { method });
    console.log(`${method} ${url.padEnd(50)} -> Status: ${res.status}`);
  } catch (err) {
    console.log(`${method} ${url.padEnd(50)} -> ERROR: ${err.message}`);
  }
}

async function runTests() {
  const baseUrl = 'https://anant-ayurveda.vercel.app';
  console.log('--- RUNNING API HEALTH CHECKS ---');
  
  // Public Endpoints
  await checkEndpoint(`${baseUrl}/api/products`);
  await checkEndpoint(`${baseUrl}/api/hero`);
  await checkEndpoint(`${baseUrl}/api/about`);
  await checkEndpoint(`${baseUrl}/api/footer`);
  
  // Protected Endpoints (Expected to return 401 Unauthorized since we are not passing a session cookie)
  await checkEndpoint(`${baseUrl}/api/orders/me`);
  await checkEndpoint(`${baseUrl}/api/admin/orders`);
  await checkEndpoint(`${baseUrl}/api/checkout`, 'POST');
  
  console.log('--- CHECKS COMPLETE ---');
}

runTests();
