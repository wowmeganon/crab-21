
const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on ${port}...`));
