import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieListCard from "../components/MovieListCard";
import "../App.css";

const HomePage = () => {
  const apiUrl = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const getMovie = async (search) => {
    const keyword = search ? "search" : "discover";

    const {
      data: { results },
    } = await axios.get(`${apiUrl}/${keyword}/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: search,
      },
    });

    setMovies(results);
  };

  useEffect(() => {
    getMovie();
  }, []);

  const renderMovies = () =>
    movies.map((movie) => (
      <MovieListCard
        key={movie.id}
        movie={movie}
        addToWatchLater={addToWatchLater}
        addToFavourite={addToFavourite}
      />
    ));

  const searchMovies = (e) => {
    e.preventDefault();
    getMovie(search);
  };

  const addItemToList = (listName, movie) => {
    const list = JSON.parse(localStorage.getItem(listName)) || [];
    const updatedList = [...list, movie];
    localStorage.setItem(listName, JSON.stringify(updatedList));
  };

  const addToWatchLater = (movie) => {
    addItemToList("watchLaterList", movie);
  };
  const addToFavourite = (movie) => {
    addItemToList("favouriteList", movie);
  };

  return (
    <div>
      <header className="header"></header>
      <form className="form" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="search your movie here..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="searchButton" type={"submit"}>
          🔍
        </button>
      </form>
      <div className="container"> {renderMovies()}</div>
    </div>
  );
};

export default HomePage;
