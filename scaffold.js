
const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();

request('http://google.com', function(e, res, body) {
  if(e) console.log('Error:', e);
  console.log(body);
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on ${port}...`));
