import React, { useState } from 'react';
import Papa from 'papaparse';
import MovieDetails from './card';
import {randomMovie} from './randomselection';


const Home = () => {
  const [parsedData, setParsedData] = useState(null);
  const [cardReady, setCardReady] = useState(false)
  const toggleReady = () => {
    setCardReady(!cardReady)
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedData(results.data);
      }
    });
  };

  const createCard = () => {
    if (!parsedData) return; // Ensure parsedData is available

    const deck = [];
    for (let i = 0; i < 5; i++) { // Create 5 different movies
      const x = Math.floor(Math.random() * parsedData.length); // Generate random movie number index
      const movie = {
        movietitle: parsedData[x].Name,
        year: parsedData[x].Year,
        review: parsedData[x].Review,
        timewatched: parsedData[x].Date,
        rating: parsedData[x].Rating,
      };
      deck.push(movie);
    }
    localStorage.setItem('deck', JSON.stringify(deck))
    const x_second = Math.floor(Math.random() * 5);
    localStorage.setItem('random-int', x_second)
    localStorage.setItem('movie-title', deck[x_second].movietitle);
    localStorage.setItem('year', deck[x_second].year);
    localStorage.setItem('review', deck[x_second].review);
    localStorage.setItem('rating', deck[x_second].rating);
    localStorage.setItem('timewatched', deck[x_second].timewatched);
    toggleReady()
  };
  return (
      <div>
      <input type="file" id="upload-file" accept=".csv" onChange={handleFileChange} />
      <button id="upload-confirm" disabled={!parsedData} onClick={createCard}>Upload File</button>
      {cardReady && (
        <MovieDetails></MovieDetails>
      )}
    </div>

  );
}


export default Home