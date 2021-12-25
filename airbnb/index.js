
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
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(html);

    const blob = $('[data-section-id="OVERVIEW_DEFAULT"]').text();
    const guest = blob.match(/\d+ guest/).slice(0,1).toString().match(/\d+/)[0];
    const bedroom = blob.match(/\d+ bedroom/).slice(0,1).toString().match(/\d+/)[0];
    const bed = blob.match(/\d+ bed/).slice(0,1).toString().match(/\d+/)[0];
    const bath = blob.match(/\d+ (.*?) bath/).slice(0,1).toString().match(/\d+/)[0];

    let price = $('#site-content > div > div:nth-child(1) > div:nth-child(3) > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > span');
    price = price.text().toString().replace(/,/g, '').match(/\d+/)[0];
    return { price, guest, bedroom, bed, bath, url };
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
    const description = await getDescription(homes[i], page);
    console.log(description);
  }
}

main();
