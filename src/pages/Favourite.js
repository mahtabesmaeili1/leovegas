import React, { useState, useEffect } from "react";
import "../App.css";
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
          <h4>{movie.title}</h4>
          <p>{movie.overview}</p>
          <button className="fwBTN" onClick={() => removeFromFavourite(movie)}>
            X
          </button>
        </div>
      </li>
    ));

  return (
    <div>
      <h2 className="watchLfavPageTitle">Favourite List</h2>
      <div className="wfpCard">
        <ul>
          {favourite.length > 0 ? (
            renderFavouriteMovies()
          ) : (
            <h5 className="nothingAddedYet">
              No movies added to favourite list.
            </h5>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Favourites;
