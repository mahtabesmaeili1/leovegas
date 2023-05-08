import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieListCard from "../components/MovieListCard";
import "../App.css";

const HomePage = () => {
  const apiUrl = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectHero, setSelectHero] = useState({});
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
    setSelectHero(results[0]);
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
        selectHero={setSelectHero}
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
      <div
        className="hero"
        style={{
          backgroundImage: `url('${IMAGE_PATH}${selectHero.backdrop_path}')`,
        }}
      >
        <div className="heroContent">
          <button className="trailerButton">Play Trailer</button>
          <h1 className="heroTitle"> {selectHero.title}</h1>
          <div className="heroOverview">
            {" "}
            {selectHero.overview ? <p>{selectHero.overview}</p> : null}
          </div>
        </div>
      </div>

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
