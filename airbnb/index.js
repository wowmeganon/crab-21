
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = process.env.NODE_URL;

async function getHomes() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const html = await page.evaluate(() => document.body.innerHTML);
  const $ = await cheerio.load(html);

  const homes = $("[itemprop='url']").map((i, home) => $(home).attr('content')).get();
  return homes;

}

async function main() {
  const homes = await getHomes();
  console.log(homes);
}

main();
