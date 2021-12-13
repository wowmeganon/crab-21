
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const url = process.env.NODE_URL;

const results = [];

async function main() {
    const html = await request.get(url);
    const $ = await cheerio.load(html);

  $('.thumbnail').each((index, element) => {
    const caption = $(element).children('.caption');
    const price = caption.children('.price').text();
    const name = caption.find('.title').text();
    const desc = caption.children('.description').text();

    const rating = $(element).children('.ratings');
    const review = rating.children('p.pull-right').text();
    const star = rating.children('p').attr('data-rating');

    const result = { name, price, desc, review, star };
    results.push(result);
    console.log(result);
  });

}
main();
