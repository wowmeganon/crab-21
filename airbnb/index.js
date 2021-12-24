
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = process.env.NODE_URL;

async function getHomes() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(html);

    const homes = $("[itemprop='url']").map((i, home) => $(home).attr('content')).get();
    return homes;
  } catch(err) {
    console.error(err);
  }
}

async function main() {
  const homes = await getHomes();
  console.log(homes);
}

main();
