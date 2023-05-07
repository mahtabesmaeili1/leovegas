import React, { useState, useEffect } from "react";

function Favourites() {
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("favourite"));
    if (storedList) {
      setFavourite(storedList);
    }
  }, []);

  const removeFromWFavourite = (movie) => {
    const updatedList = favourite.filter((item) => item.id !== movie.id);
    setFavourite(updatedList);
    localStorage.setItem("favourite", JSON.stringify(updatedList));
  };

  return (
    <div>
      <h1>Watch Later List</h1>
      <ul>
        {favourite.length > 0 ? (
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
                <button onClick={() => removeFromWFavourite(movie)}>
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No movies added to favourite list.</p>
        )}
      </ul>
    </div>
  );
}

export default Favourites;
