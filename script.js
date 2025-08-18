const movieContainer = document.getElementById('movieContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput= document.getElementById('searchInput');



function loadMovies(){
    fetch('https://yts.mx/api/v2/list_movies.json?limit=20')

    .then(res => res.json())
    .then(data => {

        console.log(data);
        movieContainer.innerHTML = '';
        const movies = data.data.movies;

        movies.forEach(movie => {
            const card =document.createElement('div');
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
searchBtn.addEventListener('click', () => {
  
});
document.addEventListener('DOMContentLoaded', loadMovies);
