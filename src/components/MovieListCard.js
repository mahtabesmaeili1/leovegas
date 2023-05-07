import React from "react";

const MovieListCard = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  console.log(movie);
  return (
    <div>
      {movie.poster_path ? (
        <img src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
      ) : null}
      <h5>{movie.title}</h5>
    </div>
  );
};
export default MovieListCard;
