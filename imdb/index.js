
const request = require('request-promise');
const cheerio = require('cheerio');
const url = "http://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm";

async function getTopMovies() {
  const html = await request.get(url);
  const $ = await cheerio.load(html);

  const movies = $('tr').map((i, movie) => {
    const title = $(movie).find('.titleColumn > a').text();
    const year = $(movie).find('.titleColumn > span').text();
    const rating = $(movie).find('.imdbRating > strong').text();
    const link = 'http://www.imdb.com' + $(movie).find('.posterColumn > a').attr('href');

    return (title ? { title, year, rating, rank: i, link } : null);
  }).get();

  return movies;
}

async function getMoviesPoster(movies) {
  const posters = await Promise.all(movies.map(async (movie) => {
    try {
      const html = await request.get(movie.link);
      const $ = await cheerio.load(html);
      movie.poster = $('div').find('.ipc-media__img > img').attr('src');
      return movie;
    }
    catch(err) {
      console.log('Error:', err.message);
    }
  }));
  return posters;
}

async function main() {
  let movies = await getTopMovies();
  movies = await getMoviesPoster(movies);
  console.log(movies);
}

main();
