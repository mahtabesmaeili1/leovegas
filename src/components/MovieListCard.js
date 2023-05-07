import React from "react";
import "../App.css";
const MovieListCard = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  console.log(movie);
  return (
    <div className="movieCard">
      {movie.poster_path ? (
        <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
      ) : null}
      <h4>{movie.title}</h4>
    </div>
  );
};
export default MovieListCard;
