
const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();

const url = 'http://google.com';

request(url, function(e, res, body) {
  if(e) console.log('Error:', e);
  console.log(body);
});

const dest = fs.createWriteStream('./Downloads/index.html');
request(url).pipe(dest).on('finish', () => console.log('Done'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on ${port}...`));
