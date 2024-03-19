import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './main.css';

function MovieDetails({ powers }) {
  const [movieDetails, setMovieDetails] = useState({
    movieTitle: '',
    year: '',
    review: '',
    rating: '',
    timewatched: '',
    clout: '',
    attackDamage: '',
    image: '',
    sentimentValues: [], 
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieTitle = localStorage.getItem('movie-title');
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${movieTitle}`);
      const movieId = movieResponse.data.results[0].id;
  
      const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US`);
      const totalPopularity = creditsResponse.data.cast.reduce((total, castMember) => total + castMember.popularity, 0);
  
      // Fetch sentiment values from Flask server
      try {
        const response = await axios.get('http://localhost:5000/sentiment', {
          params: {
            movie_title: movieTitle
          }
        });
        console.log('Response from Flask server:', response.data); // Add this line
        const sentimentValues = Array.isArray(response.data) ? response.data : [response.data];
        setMovieDetails(prevState => ({ ...prevState, sentimentValues: sentimentValues }));
      } catch (error) {
        console.error('Error fetching sentiment values:', error);
      }
  
      setMovieDetails(prevState => ({
        ...prevState,
        movieTitle: movieTitle,
        year: localStorage.getItem('year'),
        review: localStorage.getItem('review').slice(0, 100),
        rating: localStorage.getItem('rating'),
        timewatched: localStorage.getItem('timewatched'),
        clout: movieResponse.data.results[0].popularity,
        attackDamage: totalPopularity,
        image: `https://image.tmdb.org/t/p/w500${movieResponse.data.results[0].poster_path}`,
      }));
    };
  
    fetchMovieDetails();
  }, []);
  

  return (
    <div className="v4_21">
      <div className="v3_2"></div>
      <span className="v3_5">{movieDetails.movieTitle}</span>
      <span className="v4_2">{movieDetails.year}</span>
      <span className="v4_13">{movieDetails.attackDamage}</span>
      <span className="v4_15">{movieDetails.sentimentValues ? movieDetails.sentimentValues.map(obj => obj.scandalScore).join(', ') : 'Loading...'}</span>
      <span className="v4_16">{movieDetails.clout}</span>
      <span className="v4_18">{movieDetails.review}</span>
      <span className="v4_19">{movieDetails.rating}</span>
      <span className="v4_20">{movieDetails.timewatched}</span>
      <span className="v4_14">{powers}</span>
      <span className="v4_5">attack damage</span>
      <span className="v4_6">super power</span>
      <div className="v4_8">
        <img id="image" src={movieDetails.image} alt="Stored Image" />
      </div>
      <span className="v4_10">scandal score</span>
      <span className="v4_15">{movieDetails.sentimentValues ? movieDetails.sentimentValues.map(obj => obj.scandal_score).join(', ') : 'Loading...'}</span>

      <span className="v4_12">clout score</span>
      <span className="v4_17">your stats</span>
    </div>
  );
}

export default MovieDetails;
