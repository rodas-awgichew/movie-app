# Movie App

## Overview

Movie App is a modern web application that allows users to search, discover, and explore movies and TV shows. The app provides detailed information including ratings, synopses, trailers, and cast information. Built with a focus on user experience, responsive design, and seamless interaction, Movie App is perfect for film enthusiasts and casual browsers alike.

## Features

- Browse and Search: Search for movies and TV shows by title, genre, or year.
- Detailed Movie Pages: View synopsis, cast, crew, ratings, and trailers.
- Trending & Popular: Explore trending movies, popular picks, and new releases.
- User Authentication: Sign up, log in, and manage your favorite list.
- Responsive Design: Works perfectly on desktop, tablet, and mobile devices.
- API Integration: Fetches up-to-date data from a reliable movie database API.
- Dark Mode Support: Easy on the eyes with a built-in dark mode.

## Technologies Used

- **Frontend:** React.js 
- **Styling:** CSS3, styled-components
- **API:** [The Movie Database (TMDb)](https://www.themoviedb.org/) API
- **Deployment:** Vercel 


API Key Configuration:
   - Obtain an API key from [TMDb](https://www.themoviedb.org/) or your chosen provider.
   - Create a `.env` file in the root directory and add:
     ```env
     REACT_APP_API_KEY=your_api_key_here
     ```
     
## Folder Structure

```
movie-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── App.js
├── .env
├── package.json
└── README.md
```


## License

This project is licensed under the MIT License.


