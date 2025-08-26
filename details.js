const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const downloadDiv = document.querySelector('.download');
const actionsDiv = document.querySelector('.actions');

fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`)
  .then(res => res.json())
  .then(data => {
    const movie = data.data.movie;

    // 🎬 Populate movie details
    document.getElementById('movieTitle').textContent = movie.title;
    document.getElementById('moviePoster').src = movie.medium_cover_image;
    document.getElementById('movieDescription').textContent = movie.description_full;
    document.getElementById('movieRating').textContent = movie.rating;
    document.getElementById('movieGenres').textContent = movie.genres.join(', ');
    document.getElementById('year').textContent = movie.year;
    document.getElementById('language').textContent = movie.language;
    document.getElementById('runtime').textContent = `${movie.runtime} minutes`;

    // 🔗 Static links to YTS page
    document.getElementById('download1').href = `https://yts.mx/movies/${movie.slug}`;
    document.getElementById('download2').href = `https://yts.mx/movies/${movie.slug}`;

    // 📥 Dynamic torrent buttons
    movie.torrents.forEach(torrent => {
      const btn = document.createElement('button');
      const link = document.createElement('a');
      link.href = torrent.url;
      link.textContent = `Download .torrent (${torrent.quality}, ${torrent.type})`;
      link.target = '_blank';
      btn.appendChild(link);
      downloadDiv.appendChild(btn);
    });

    // ❤️ Add to Favorites button
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Add to Favorites';
    favoriteButton.setAttribute('data-id', movie.id);
    // favoriteButton.classList.add('favorite-btn');

    // Check if already in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(String(movie.id))) {
      favoriteButton.textContent = '❤️ Added';
      favoriteButton.disabled = true;
    }

    favoriteButton.onclick = function () {
      addToFavorites(this);
    };

    actionsDiv.appendChild(favoriteButton);
  })
  .catch(error => {
    console.error('Error fetching movie details:', error);
    document.querySelector('.details-container').innerHTML = `
      <p style="color:red;">Oops! Something went wrong. Try refreshing the page or check your internet connection.</p>`;
  });

function addToFavorites(button) {
  const movieId = button.getAttribute('data-id');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    button.textContent = '❤️ Added';
    button.disabled = true;
  } else {
    alert('Already in favorites!');
  }
}