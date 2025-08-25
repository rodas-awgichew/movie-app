const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const downloadDiv = document.querySelector('.download');

fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`)
  .then(res => res.json())
  .then(data => {
      console.log(data);
    const movie = data.data.movie;
    document.getElementById('movieTitle').textContent = movie.title;
    document.getElementById('moviePoster').src = movie.medium_cover_image;
    document.getElementById('movieDescription').textContent = movie.description_full;
    document.getElementById('movieRating').textContent = movie.rating;
    document.getElementById('movieGenres').textContent = movie.genres.join(', ');
    document.getElementById('year').textContent = movie.year;
    document.getElementById('language').textContent = movie.language;
    document.getElementById('runtime').textContent = movie.runtime;
   
    // document.getElementById('download').href = movie.torrents[0].url;
 
    document.getElementById('download1').href =  `https://yts.mx/movies/${movie.slug}`;
    document.getElementById('download2').href = `https://yts.mx/movies/${movie.slug}`;


    movie.torrents.forEach(torrent => {
        const btn = document.createElement('button');
        const link = document.createElement('a');
        link.href = torrent.url;
        link.textContent = `Download .torrent (${torrent.quality}, ${torrent.type})`;
        link.target = '_blank';
        btn.appendChild(link);
        downloadDiv.appendChild(btn);
      });
      
  })
  .catch(error => {
    console.error('Error fetching movie details:', error);
    document.querySelector('.details-container').innerHTML = `
      <p style="color:red;">Oops! Something went wrong. Try refreshing the page or check your internet connection.</p>`;
  });

  function toggleDescription() {
    const desc = document.getElementById('movieDescription');
    desc.classList.toggle('expanded');
  }

  function addToFavorites() {
    const movieId = 'sample-id';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Added to favorites!');
    } else {
      alert('Already in favorites!');
    }
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
  
 
 

