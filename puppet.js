
const puppeteer = require('puppeteer');

async function main() {
    await puppeteer.launch({ headless: false });
}
main();
