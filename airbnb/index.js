
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = process.env.NODE_URL;

let browser, page;

async function getHomes() {
  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(html);

    const homes = $("[itemprop='url']")
          .map((i, home) => 'https://' +$(home).attr('content'))
          .get();
    return homes;
  } catch(err) {
    console.error(err);
  }
}

async function getDescription(url) {
  try {
    await page.goto(url);
  }
  catch(err) {
    console.error(err);
  }
}

async function main() {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  const homes = await getHomes(page);
  for(i=0; i <homes.length; i++) {
    await getDescription(homes[i], page);
  }
}

main();
