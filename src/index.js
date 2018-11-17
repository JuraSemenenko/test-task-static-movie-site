//import "semantic-ui-css/semantic.css";
import "./css/style.css";
const START_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=340af08aad86d2a893fef0bc25ea615d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
const API_KEY = "340af08aad86d2a893fef0bc25ea615d";
const API_URL = "https://api.themoviedb.org/3/";

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
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .then(data => console.log(data));
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

console.log(MOVIE_ID);
if (MOVIE_ID !== undefined) {
  const URL = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=340af08aad86d2a893fef0bc25ea615d&language=en-US`;
  console.log(URL);
  fetchMovieData(URL);
}
fetchMoviesData(START_URL);
