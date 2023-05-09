import React, { useState } from "react";
import "../App.css";

const MovieListCard = ({
  movie,
  addToWatchLater,
  addToFavourite,
  selectedHero,
}) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const [isAddedToWatchLater, setIsAddedToWatchLater] = useState(
    JSON.parse(localStorage.getItem("watchLaterList"))?.some(
      (item) => item.id === movie.id
    )
  );
  const [isAddedToFavourite, setIsAddedToFavourite] = useState(
    JSON.parse(localStorage.getItem("favouriteList"))?.some(
      (item) => item.id === movie.id
    )
  );

  const toggleWatchLater = () => {
    if (isAddedToWatchLater) {
      setIsAddedToWatchLater(false);
      removeWatchLater(movie);
    } else {
      setIsAddedToWatchLater(true);
      addToWatchLater(movie);
    }
  };

  const removeWatchLater = (movie) => {
    const updatedList = JSON.parse(
      localStorage.getItem("watchLaterList")
    ).filter((item) => item.id !== movie.id);
    localStorage.setItem("watchLaterList", JSON.stringify(updatedList));
  };

  const toggleFavourite = () => {
    if (isAddedToFavourite) {
      setIsAddedToFavourite(false);
      removeFavourite(movie);
    } else {
      setIsAddedToFavourite(true);
      addToFavourite(movie);
    }
  };

  const removeFavourite = (movie) => {
    const updatedList = JSON.parse(
      localStorage.getItem("favouriteList")
    ).filter((item) => item.id !== movie.id);
    localStorage.setItem("favouriteList", JSON.stringify(updatedList));
  };

  return (
    <div
      className="movieCard"
      onClick={() => {
        selectedHero(movie);
      }}
    >
      {movie.poster_path ? (
        <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
      ) : (
        <div className="moviePlaceHolder">No Image found</div>
      )}
      <h4>{movie.title}</h4>
      <button className="watchLaterBtn" onClick={toggleWatchLater}>
        {isAddedToWatchLater ? "Remove" : "Watch Later"}
      </button>
      <button className="favouriteBtn" onClick={toggleFavourite}>
        {isAddedToFavourite ? "⭐" : "☆"}
      </button>
    </div>
  );
};
export default MovieListCard;
