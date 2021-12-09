
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const url = process.env.NODE_URL;

const schema = {
  position,
  name,
  location,
  rate
}

async function main() {
  try {
    const html = await request.get(url);
    console.log(html)
    fs.writeFileSync('./index.html', html);
  } catch(err) {
    console.error(err);
  }
}
main();
