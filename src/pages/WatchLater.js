import React, { useState, useEffect } from "react";

function WatchLater() {
  const [watchLaterList, setWatchLaterList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("watchLaterList"));
    if (storedList) {
      setWatchLaterList(storedList);
    }
  }, []);

  const removeFromWatchLater = (movie) => {
    const updatedList = watchLaterList.filter((item) => item.id !== movie.id);
    setWatchLaterList(updatedList);
    localStorage.setItem("watchLaterList", JSON.stringify(updatedList));
  };

  return (
    <div>
      <h1>Watch Later List</h1>
      <ul>
        {watchLaterList.length > 0 ? (
          watchLaterList.map((movie) => (
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
                <button onClick={() => removeFromWatchLater(movie)}>
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No movies added to watch later list.</p>
        )}
      </ul>
    </div>
  );
}

export default WatchLater;
