
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const url = process.env.NODE_URL;

async function main(url) {
    const html = await request.get(url);
    fs.writeFileSync('./request.html', html);

    const $ = cheerio.load(html);
    const innerText = $('h1').text();
    console.log(innerText);

    $('h2').each((index, element) => {
        console.log(index, $(element).text());
    });
}

main(url);
