
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const url = process.env.NODE_URL;

const results = [];

async function main() {
  try {
    const html = await request.get(url);
    const $ = await cheerio.load(html);

    $('[itemprop="itemListElement"]').each(function(index,element) {
      let result = $(element).children('[itemprop="name"]');
      const title = result.text();
      const url = result.attr('href');

      result = { tiltle, url };
      results.push(result);
    });
    console.log(result);

  } catch(err) { console.error(`Error: ${err}`) }
}
main();
