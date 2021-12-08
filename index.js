
const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();

const url = process.env.NODE_URL || 'http://www.google.com';

request(url, function(e, res, body) {
  if(e) console.log('Error:', e);

  const $ = cheerio.load(body);
  const about = $('.about');
  console.log(about);
});

const dest = fs.createWriteStream('./index.html');
request(url).pipe(dest).on('finish', () => console.log('Done'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on ${port}...`));
