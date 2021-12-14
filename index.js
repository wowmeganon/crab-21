
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const url = process.env.NODE_URL;

const results = [];

async function getItems() {
    const html = await request.get(url);
    const $ = await cheerio.load(html);

    $('.thumbnail').each((index, element) => {
        const caption = $(element).children('.caption');
        const price = caption.children('.price').text();
        const name = caption.find('.title').text();
        const summary = caption.children('.description').text();

        let link = caption.find('.title').attr('href');
        const getDomain = (url) => {
            const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            return matches && matches[1];
        };
        link = 'http://' +getDomain(url).concat(link);

        const rating = $(element).children('.ratings');
        const review = rating.children('p.pull-right').text();
        const star = rating.children('p').attr('data-rating');

        const result = { name, price, summary, review, star, link };
        results.push(result);
    });
    return results;
}

async function gotoItems() {
    const items = await getItems();
    await items.map(async (item) => {
        const html = await request.get(item.link);
        const $ = await cheerio.load(html);

        $('.caption').each((i, caption) => {
            results.description = $(caption).find('.description').text();
        });

        $('.swatches').each((i, swatch) => {
            results.memory = $(swatch).find('.btn-primary').text();
        });
    })
}

gotoItems();
