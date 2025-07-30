const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector("#movie-box");
const resultCount = document.querySelector("#resultCount");

const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
};

const showMovies = (movies) => {
    movieBox.innerHTML = ""; // Clear previous movies
    resultCount.textContent = movies.length; // Update movie count

    movies.forEach((movie) => {
        const imagePath = movie.poster_path 
            ? IMGPATH + movie.poster_path 
            : "img/image-missing.png";

        const movieCard = document.createElement("div");
        movieCard.classList.add("col-md-4", "col-lg-3", "mb-4","d-flex");

        movieCard.innerHTML = `
          <div class="card h-100 d-flex flex-column">
            <img src="${imagePath}" class="card-img-top" alt="${movie.title}" height="384">

            <div class="card-body d-flex flex-column">
              <h6 class="card-title">${movie.title}</h6>

              <p><strong>Rating:</strong> ⭐ ${movie.vote_average.toFixed(1)}</p>

              <p class="card-text">
                ${truncateAtWord(movie.overview || "No overview available.", 100)}
              </p>

              <a href="https://www.themoviedb.org/movie/${movie.id}"
                 target="_blank"
                 class="btn btn-primary mt-auto">More Info</a>
            </div>
          </div>
        `;


        movieBox.appendChild(movieCard);
    });
};

// Initial Fetch
getMovies(APIURL);

// Search Functionality
document.querySelector("#search").addEventListener("keyup", function (event) {
    const query = event.target.value.trim();
    if (query) {
        getMovies(SEARCHAPI + query);
    } else {
        getMovies(APIURL);
    }
});

function truncateAtWord(text, maxLen = 100) {
  if (text.length <= maxLen) return text;              // short enough
  const trimmed = text.slice(0, maxLen);               // rough cut
  const lastSpace = trimmed.lastIndexOf(" ");          // look back for space
  return (lastSpace > -1 ? trimmed.slice(0, lastSpace) : trimmed).trim() + "…";
}
