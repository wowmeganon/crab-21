
const request = require('request-promise');
const cheerio = require('cheerio');
const url = process.env.NODE_URL;

async function main() {
  try {
    const html = await request.get(url);
    console.log(html)
  } catch(err) {
    console.error(err);
  }
}
main();
