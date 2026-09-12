import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    
    await page.goto('http://localhost:5175/', { waitUntil: 'networkidle0', timeout: 10000 });
    console.log('Page loaded successfully');
    
    await browser.close();
  } catch (e) {
    console.error('Puppeteer Error:', e);
  }
})();
