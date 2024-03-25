import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css'
import { run } from './gemini';
//import { randomMoves } from './randomselection';
// import {randomMoves} from './randomselection';
//const randomMovess = randomMoves();
//console.log(randomMovess);

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({
    movieTitle: '',
    year: '',
    review: '',
    rating: '',
    timewatched: '',
    clout: '',
    attackDamage: '',
    superpower: '',
    image: ''
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieTitle = localStorage.getItem('movie-title');
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${movieTitle}`);
      const movieId = movieResponse.data.results[0].id;
      const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US`);
      const totalPopularity = creditsResponse.data.cast.reduce((total, castMember) => total + castMember.popularity, 0);
      const randomIndex = Math.floor(Math.random() * creditsResponse.data.cast.length);
      let geminiResponse = await run(creditsResponse.data.cast[randomIndex].character)
      setMovieDetails({
        movieTitle: movieTitle,
        year: localStorage.getItem('year'),
        review: localStorage.getItem('review').slice(0, 500),
        rating: localStorage.getItem('rating'),
        timewatched: localStorage.getItem('timewatched'),
        clout: movieResponse.data.results[0].popularity,
        attackDamage: totalPopularity,
        superpower: geminiResponse,
        image: `https://image.tmdb.org/t/p/w500${movieResponse.data.results[0].poster_path}`
      });
    };

    fetchMovieDetails(); //create main playing card
  }, []);
  

  return (
    <div className="v4_21">
      <div className="v3_2"></div>
      <span className="v3_5">{movieDetails.movieTitle}</span>
      <span className="v4_2">{movieDetails.year}</span>
      <span className="v4_13">{movieDetails.attackDamage}</span>
      <span className="v4_15">SCANDAL HERE</span>
      <span className="v4_16">{movieDetails.clout}</span>
      <span className="v4_18">{movieDetails.review}</span>
      <span className="v4_19">{movieDetails.rating}</span>
      <span className="v4_20">{movieDetails.timewatched}</span>
      <span className="v4_14">{movieDetails.superpower}</span>
      <span className="v4_5">attack damage</span>
      <span className="v4_6">super power</span>
      <div className="v4_8">
        <img id="image" src={movieDetails.image} alt="Stored Image" />
      </div>
      
      <span className="v4_10">scandal score</span>
      <span className="v4_12">clout score</span>
      <span className="v4_17">your stats</span>
    </div>

  );
}

async function CreateDeck() {
  const numbers = [1, 2, 3, 4];
  const indexToRemove = numbers.indexOf(localStorage.getItem('random-int'));
  if (indexToRemove !== -1) {
    numbers.splice(indexToRemove, 1);
  } 
  const deckVar = JSON.parse(localStorage.getItem('deck'))
  let totaldeck = [];
  let tempdeck = {};

  const promises = numbers.map(async (item) => { //the deck of all the other 4 movies generated
    let tempmovie = deckVar[item].movietitle
    let tempMovieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${tempmovie}`);
    let tempImage = `https://image.tmdb.org/t/p/w500${tempMovieResponse.data.results[0].poster_path}`
    let tempOverview = tempMovieResponse.data.results[0].overview
    let tempVoter = tempMovieResponse.data.results[0].vote_average
    tempdeck = {
        image: tempImage,
        overview: tempOverview,
        voter: tempVoter
    }
    return tempdeck;
  });
  // const randomMovieTitles = [randomMovie(), randomMovie()];
  // const promises2 = randomMovieTitles.map(async (tempmovie) => { //tempmovie is the movie title
  //   let tempMovieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb76d810eac6dda796c6389702e136b2&language=en-US&query=${tempmovie}`);
  //   let tempImage = `https://image.tmdb.org/t/p/w500${tempMovieResponse.data.results[0].poster_path}`
  //   let tempOverview = tempMovieResponse.data.results[0].overview
  //   let tempVoter = tempMovieResponse.data.results[0].vote_average
  //   let tempYear = tempMovieResponse.data.results[0].year
  //   tempdeck = {
  //       image: tempImage,
  //       overview: tempOverview,
  //       voter: tempVoter,
  //       year: tempYear
  //   }
  //   return tempdeck;
  // });
  totaldeck = await Promise.all(promises)
  //totaldeck = await Promise.all([promises, promises2]);
  console.log(totaldeck);
  return totaldeck; // Returns voter, image, overview
}

function DeckDetails({ totaldeck }) {
  const deckVar = JSON.parse(localStorage.getItem('deck'))
  return (
      <div>
          <div class="v13_24">
          <div class="v13_25">
          <div class="v13_2"></div>
          <span class="v13_3">{deckVar[1].movietitle}</span>
          <span class="v13_4">{deckVar[1].year}</span>
          <span class="v13_5">{totaldeck[0].overview}</span>
          <span class="v13_8">{totaldeck[0].voter}</span>
          <span class="v13_9"></span>
          <span class="v13_10"></span>
          <span class="v13_11"></span>
          <span class="v13_12">overview</span>
          <span class="v13_13"></span>
          <div class="v13_14">
          <img id="image" src={totaldeck[0].image} alt="Stored Image" />
          </div>
          <span class="v13_15"></span>
          <span class="v13_16"></span>
          <span class="v13_17">voter average</span>
        </div>
        <div class="v13_26">
          <div class="v13_27"></div>
          <span class="v13_28">{deckVar[2].movietitle}</span>
          <span class="v13_29">{deckVar[2].year}</span>
          <span class="v13_30">{totaldeck[1].overview}</span>
          <span class="v13_31"></span>
          <span class="v13_32"></span>
          <span class="v13_33">{totaldeck[1].voter}</span>
          <span class="v13_34"></span>
          <span class="v13_35"></span>
          <span class="v13_36"></span>
          <span class="v13_37">overview</span>
          <span class="v13_38"></span>
          <div class="v13_39">
          <img id="image" src={totaldeck[1].image} alt="Stored Image" />
          </div>
          <span class="v13_40"></span>
          <span class="v13_41"></span>
          <span class="v13_42">voter average</span>
        </div>
        <div class="v13_43">
          <div class="v13_44"></div>
          <span class="v13_45">{deckVar[3].movietitle}</span>
          <span class="v13_46">{deckVar[3].year}</span>
          <span class="v13_47">{totaldeck[2].overview}</span>
          <span class="v13_48"></span>
          <span class="v13_49"></span>
          <span class="v13_50">{totaldeck[2].voter}</span>
          <span class="v13_51"></span>
          <span class="v13_52"></span>
          <span class="v13_53"></span>
          <span class="v13_54">overview</span>
          <span class="v13_55"></span>
          <div class="v13_56">
          <img id="image" src={totaldeck[2].image} alt="Stored Image" />
          </div>
          <span class="v13_57"></span>
          <span class="v13_58"></span>
          <span class="v13_59">voter average</span>
        </div>
        <div class="v13_94">
          <div class="v13_95"></div>
          <span class="v13_96">MOVIE TITLE</span>
          <span class="v13_97">YEAR</span>
          <span class="v13_98">ATTACK HERE</span>
          <span class="v13_99">SCANDAL HERE</span>
          <span class="v13_100">CLOUT HERE</span>
          <span class="v13_101">YOUR REVIEW</span>
          <span class="v13_102">YOUR RATING</span>
          <span class="v13_103">TIME WATCHED</span>
          <span class="v13_104">POWER HERE</span>
          <span class="v13_105">attack damage</span>
          <span class="v13_106">super power</span>
          <div class="v13_107"></div>
          <span class="v13_108">scandal score</span>
          <span class="v13_109">clout score</span>
          <span class="v13_110">movie stats</span>
        </div>
        <div class="v13_128">
          <div class="v13_129"></div>
          <span class="v13_130">MOVIE TITLE</span>
          <span class="v13_131">YEAR</span>
          <span class="v13_132">ATTACK HERE</span>
          <span class="v13_133">SCANDAL HERE</span>
          <span class="v13_134">CLOUT HERE</span>
          <span class="v13_135">YOUR REVIEW</span>
          <span class="v13_136">YOUR RATING</span>
          <span class="v13_137">TIME WATCHED</span>
          <span class="v13_138">POWER HERE</span>
          <span class="v13_139">attack damage</span>
          <span class="v13_140">super power</span>
          <div class="v13_141"></div>
          <span class="v13_142">scandal score</span>
          <span class="v13_143">clout score</span>
          <span class="v13_144">movie stats</span>
        </div>
          </div>
      </div>
  );
}

function App() {
  const [showMovieDetails, setShowMovieDetails] = useState(true);
  const [totalDeckData, setTotalDeckData] = useState([]);

  useEffect(() => {
      async function fetchData() {
          const data = await CreateDeck();
          setTotalDeckData(data);
      }
      fetchData();
  }, []);

  const handleToggleClick = () => {
      setShowMovieDetails(!showMovieDetails);
  };

  return (
      <div>
          <button onClick={handleToggleClick}>Toggle View</button>
          {showMovieDetails ? <MovieDetails /> : <DeckDetails totaldeck={totalDeckData} />}
      </div>
  );
}

export default App;