
const request = require('request-promise');
const cheerio = require('cheerio');
const url = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm";

async function getTopMovies() {
  const html = await request.get(url);
  const $ = await cheerio.load(html);

  const movies = $('tr').map((i, movie) => {
    const title = $(movie).find('.titleColumn > a').text();
    const year = $(movie).find('.titleColumn > span').text();
    const rating = $(movie).find('.imdbRating > strong').text();

    let link = $(movie).find('.posterColumn > a').attr('href');
    link = 'http://www.imdb.com' +link;

    return ({ title, year, rating, rank: i, link });
  }).get();
  console.log(movies);
}

getTopMovies();
