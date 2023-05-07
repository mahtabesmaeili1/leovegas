import React, { useState } from "react";
import "../App.css";

const MovieListCard = ({ movie, addToWatchLater }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const [isAdded, setIsAdded] = useState(
    JSON.parse(localStorage.getItem("watchLaterList"))?.some(
      (item) => item.id === movie.id
    )
  );

  const toggleWatchLater = () => {
    if (isAdded) {
      setIsAdded(false);
      removeWatchLater(movie);
    } else {
      setIsAdded(true);
      addToWatchLater(movie);
    }
  };

  const removeWatchLater = (movie) => {
    const updatedList = JSON.parse(
      localStorage.getItem("watchLaterList")
    ).filter((item) => item.id !== movie.id);
    localStorage.setItem("watchLaterList", JSON.stringify(updatedList));
  };

  return (
    <div className="movieCard">
      {movie.poster_path ? (
        <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
      ) : null}
      <h4>{movie.title}</h4>
      <button onClick={toggleWatchLater}>
        {isAdded ? "Remove from Watch Later" : "Add to Watch Later"}
      </button>
    </div>
  );
};
export default MovieListCard;
