import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

const desktopDir = path.resolve(__dirname, '../screenshots/desktop');
const mobileDir = path.resolve(__dirname, '../screenshots/mobile');

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

async function run() {
  console.log('Launching headless Chrome from:', CHROME_PATH);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
  });

  const page = await browser.newPage();

  // Helper to load and wait for images
  async function loadPage(url) {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 30000 });
    // Additional short pause to allow all remote Unsplash images to decode
    await new Promise(r => setTimeout(r, 1200));
  }

  // 1. Desktop Screenshots (1440x900)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const desktopScreenshots = [
    { name: 'homepage.png', path: '/', fullPage: false },
    { name: 'categories.png', path: '/categories', fullPage: false },
    { name: 'products.png', path: '/shop', fullPage: false },
    { name: 'shop.png', path: '/shop', fullPage: false },
    { name: 'product-details.png', path: '/product/prod-1', fullPage: false },
    { name: 'cart.png', path: '/cart', fullPage: false },
    { name: 'wishlist.png', path: '/wishlist', fullPage: false },
    { name: 'login.png', path: '/login', fullPage: false },
    { name: 'register.png', path: '/register', fullPage: false },
    { name: 'about.png', path: '/about', fullPage: false }
  ];

  for (const item of desktopScreenshots) {
    await loadPage(`${BASE_URL}${item.path}`);
    const filePath = path.join(desktopDir, item.name);
    await page.screenshot({ path: filePath, fullPage: item.fullPage });
    console.log(`✓ Saved desktop screenshot: ${item.name}`);
  }

  // 2. Mobile Screenshots (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  const mobileScreenshots = [
    { name: 'homepage-mobile.png', path: '/', fullPage: false },
    { name: 'shop-mobile.png', path: '/shop', fullPage: false },
    { name: 'product-details-mobile.png', path: '/product/prod-1', fullPage: false },
    { name: 'cart-mobile.png', path: '/cart', fullPage: false }
  ];

  for (const item of mobileScreenshots) {
    await loadPage(`${BASE_URL}${item.path}`);
    const filePath = path.join(mobileDir, item.name);
    await page.screenshot({ path: filePath, fullPage: item.fullPage });
    console.log(`✓ Saved mobile screenshot: ${item.name}`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
