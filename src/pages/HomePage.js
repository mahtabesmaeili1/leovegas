import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieListCard from "../components/MovieListCard";
import "../App.css";
const HomePage = () => {
  const apiUrl = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const {
      data: { results },
    } = await axios.get(`${apiUrl}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    });

    setMovies(results);
  };

  useEffect(() => {
    getMovie();
  }, []);
  const renderMovies = () =>
    movies.map((movie) => <MovieListCard key={movie.id} movie={movie} />);

  return (
    <div>
      <h1> WATCH ME </h1>

      <div className="container"> {renderMovies()}</div>
    </div>
  );
};

export default HomePage;
