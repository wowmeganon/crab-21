
const request = require('request-promise');
const cheerio = require('cheerio');
const url = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm";

async function getTopMovies() {
  const html = await request.get(url);
  const $ = await cheerio.load(html);

  const movies = $('td.titleColumn > a').map((i, title) => {
    return $(title).text();
  }).get();
  console.log(movies);
}

getTopMovies();
