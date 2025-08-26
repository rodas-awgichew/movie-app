const favoritesContainer = document.getElementById('favoritesContainer');
const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];

if (favoriteIds.length === 0) {
  favoritesContainer.innerHTML = '<p>You haven’t added any favorites yet.</p>';
} else {
  favoriteIds.forEach(id => {
    fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then(res => res.json())
      .then(data => {
        const movie = data.data.movie;
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
          <img src="${movie.medium_cover_image}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>Rating: ${movie.rating}</p>
          <button onclick="removeFavorite(${id})">Remove</button>
        `;
        favoritesContainer.appendChild(card);
      })
      .catch(error => {
        console.error(`Error loading movie ${id}:`, error);
      });
  });
}

function removeFavorite(id) {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const updatedFavorites = storedFavorites.filter(favId => Number(favId) !== Number(id));
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  location.reload();
}





