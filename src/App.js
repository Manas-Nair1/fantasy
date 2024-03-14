import React, { useState } from 'react';
import Papa from 'papaparse';
import MovieDetails from './card';
import { run } from './gemini';

const Home = () => {
  const [parsedData, setParsedData] = useState(null);
  const [cardReady, setCardReady] = useState(false)
  const toggleReady = () => {
    setCardReady(!cardReady)
  }
  const geminiResponse = "";
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
  
    const x_second = Math.floor(Math.random() * 5);
    localStorage.setItem('movie-title', deck[x_second].movietitle);
    localStorage.setItem('year', deck[x_second].year);
    localStorage.setItem('review', deck[x_second].review);
    localStorage.setItem('rating', deck[x_second].rating);
    localStorage.setItem('timewatched', deck[x_second].timewatched);
    console.log(parsedData); // Log parsedData if needed
    // window.location.href = "index.html";
    run().then((result) => {geminiResponse = result})
    toggleReady()
  };
  return (
      <div>
      <input type="file" id="upload-file" accept=".csv" onChange={handleFileChange} />
      <button id="upload-confirm" disabled={!parsedData} onClick={createCard}>Upload File</button>
      <button type="button" id="create-card" onClick={createCard}>Create Card</button>
      {cardReady && (
        <MovieDetails powers={geminiResponse}></MovieDetails>
      )}
    </div>
    
  );
}

export default Home
