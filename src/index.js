//import "semantic-ui-css/semantic.css";
import "./css/style.css";
const START_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=340af08aad86d2a893fef0bc25ea615d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
const API_KEY = "340af08aad86d2a893fef0bc25ea615d";
const API_URL = "https://api.themoviedb.org/3/";
const MONTH = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const MOVIE_ID =
  window.location.search !== ""
    ? window.location.search.split("=")[1]
    : undefined;

const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("result");

// Вызываем при загрузке страницы

searchInput !== null
  ? searchInput.addEventListener("input", event => {
      const query = getValue(event);
      const URL =
        "https://api.themoviedb.org/3/search/movie?api_key=340af08aad86d2a893fef0bc25ea615d&language=en-US&query=" +
        query +
        "&page=1&include_adult=false";
      fetchMoviesData(URL);
      console.log(query, URL);
    })
  : null;

const getValue = event => event.target.value;

const fetchMoviesData = URL =>
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .then(data => makeMovieTamplate(data.results));

const fetchMovieData = URL => {
  return fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json());
};

const makeMovieTamplate = data => {
  const html = data
    .map(movie => {
      return `
        <div class="card-container">
        <div class="ui card">
        <div class="image">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        </div>
        <div class="content">
        <a class="header" id="${movie.id}" href="movie.html?id=${movie.id}">${
        movie.title
      }</a>
        <div class="meta">
        <span class="date">${movie.release_date}</span>
        </div>
        <div class="description">
        ${movie.title}
        </div>
        </div>
        
        </div>
        </div>
        `;
    })
    .join(" ");
  movieContainer !== null ? (movieContainer.innerHTML = html) : null;
};

const fillPageWithData = data => {
  const poster = document.getElementsByClassName("poster-img")[0];
  const backdrop = document.getElementsByClassName("backdrop-img")[0];
  const title = document.getElementsByClassName("title")[0];
  const description = document.getElementsByClassName("description-text")[0];
  const genres = document.getElementsByClassName("genres")[0];
  const release = document.getElementsByClassName("release")[0];
  const reating = document.getElementsByClassName("avg-reating")[0];
  const releaseStatus = document.getElementsByClassName("release-status")[0];
  const prodactionCountry = document.getElementsByClassName(
    "prodaction-country"
  )[0];
  const slogan = document.getElementsByClassName("slogan")[0];

  const avgRaiting = Math.ceil(+data.vote_average / 2);
  const releaseDate = data.release_date.split("-");
  const releaseDateTamplate = `${releaseDate[2]} ${MONTH[releaseDate[1]]} ${
    releaseDate[1]
  }`;
  const prodactionCountryList = data.production_countries
    .map(country => country.name)
    .join(", ");
  console.log(avgRaiting);
  const genresList = data.genres.map(genre => genre.name).join(", ");

  poster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  backdrop.src = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
  title.innerHTML = `${data.original_title}`;
  description.innerHTML = `${data.overview}`;
  genres.innerHTML = genresList;
  release.innerHTML = releaseDateTamplate;
  reating.innerHTML = `${data.vote_average} / 10`;
  releaseStatus.innerHTML = data.status;
  prodactionCountry.innerHTML = prodactionCountryList;
  slogan.innerHTML = data.tagline;
};

console.log(MOVIE_ID);
if (MOVIE_ID !== undefined) {
  const URL = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=340af08aad86d2a893fef0bc25ea615d&language=en-US`;
  console.log(URL);
  fetchMovieData(URL).then(data => {
    console.log(data);
    fillPageWithData(data);
  });
}
fetchMoviesData(START_URL);
