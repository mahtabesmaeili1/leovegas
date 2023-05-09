import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import MovieListCard from "../components/MovieListCard";
import "../App.css";

const HomePage = () => {
  const apiUrl = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]); //get all movies
  const [search, setSearch] = useState(""); //to search
  const [selectHero, setSelectHero] = useState({}); //hero
  const [playTrailer, setPlayTrailer] = useState(false);

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
    await selectedHero(results[0]);

    setMovies(results);
  };

  //to fetch videos of the movies in here
  //fetch movie
  const fetchVideos = async (id) => {
    const { data } = await axios.get(`${apiUrl}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        append_to_response: "videos",
      },
    });
    return data;
  };
  //select movie
  const selectedHero = async (movie) => {
    setPlayTrailer(false);
    const video = await fetchVideos(movie.id);
    setSelectHero(video);
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
        selectedHero={selectedHero}
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
  const renderTrailer = () => {
    const trailer = selectHero.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : selectHero.videos.results[0].key;
    return (
      <YouTube
        className="youtube-container"
        videoId={key}
        containerClassName={"youtube-container"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
    );
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
          {playTrailer ? (
            <button
              className="trailerButton btnClose"
              onClick={() => setPlayTrailer(false)}
            >
              Close
            </button>
          ) : null}
          {selectHero.videos && playTrailer ? renderTrailer() : null}
          <button
            className="trailerButton"
            onClick={() => setPlayTrailer(true)}
          >
            Play Trailer
          </button>
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
