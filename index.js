
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const url = process.env.NODE_URL;

const results = [];

async function main() {
    const html = await request.get(url);
    const $ = await cheerio.load(html);

  $('.caption').each((index, element) => {
    const caption = $(element);
    const name = caption.children('h4').children('a.title').text();
    const price = caption.children('h4.price').text();
    const desc = caption.children('.description').text();

    console.log(`
      Name: ${name}
      Price: ${price}
      Description: ${desc}`);
  });

}
main();
