import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const apiUrl = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
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

    getMovie();
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default HomePage;
