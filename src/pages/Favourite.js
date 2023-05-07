import React, { useState, useEffect } from "react";

function Favourites() {
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("favouriteList"));
    if (storedList) {
      setFavourite(storedList);
    }
  }, []);

  const removeFromFavourite = (movie) => {
    const updatedList = favourite.filter((item) => item.id !== movie.id);
    setFavourite(updatedList);
    localStorage.setItem("favouriteList", JSON.stringify(updatedList));
  };

  const renderFavouriteMovies = () =>
    favourite.map((movie) => (
      <li key={movie.id}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150x225.png?text=Poster+Not+Available"
            alt={movie.title}
          />
        )}
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <button onClick={() => removeFromFavourite(movie)}>
            Remove from Favourite
          </button>
        </div>
      </li>
    ));

  return (
    <div>
      <h1>Favourite List</h1>
      <ul>
        {favourite.length > 0 ? (
          renderFavouriteMovies()
        ) : (
          <p>No movies added to favourite list.</p>
        )}
      </ul>
    </div>
  );
}

export default Favourites;
