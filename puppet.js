
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = process.env.NODE_URL;

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const content = await page.content();
  const $ = await cheerio.load(content);
  console.log($('h1').text());
}
main();
