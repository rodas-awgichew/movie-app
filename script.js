const movieContainer = document.getElementById('movieContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Load default movies on page load
function loadMovies() {
  fetch('https://yts.mx/api/v2/list_movies.json?limit=20')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      movieContainer.innerHTML = '';
      const movies = data.data.movies;

      movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
          <img src="${movie.medium_cover_image}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>Rating: ${movie.rating}</p>
          <a href="details.html?id=${movie.id}" class="details-btn">View Details</a>


        `;
        movieContainer.appendChild(card);
      
      });
    })
    .catch(error => {
      console.log(`Error is: ${error}`);
      movieContainer.innerHTML = `<p style="color: red;">Something went wrong. Try again!</p>`;
    });
}

// Search movies by query
function searchMovies(query) {
  if (!query) return;

  fetch(`https://yts.mx/api/v2/list_movies.json?limit=20&query_term=${query}`)
    .then(res => res.json())
    .then(data => {
      movieContainer.innerHTML = '';
      const movies = data.data.movies;

      if (!movies || movies.length === 0) {
        movieContainer.innerHTML = `<p>No results found for "${query}"</p>`;
        return;
      }

      movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
          <img src="${movie.medium_cover_image}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>Rating: ${movie.rating}</p>
        `;
        movieContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.log(`Error is: ${error}`);
      movieContainer.innerHTML = `<p style="color: red;">Something went wrong. Try again!</p>`;
    });
}


// Trigger search on button click
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  searchMovies(query);
});

// Trigger search on input (live search)
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    searchMovies(query);
  }
});

document.addEventListener('DOMContentLoaded', loadMovies);
