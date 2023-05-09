import React, { useState, useEffect } from "react";
import "../App.css";
import Nav from "../components/Nav";
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
    <div className="forHeight">
      <Nav />
      <h2 className="watchLfavPageTitle">Watch Later List</h2>
      <div className="wfpCard">
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
                  <h4>{movie.title}</h4>
                  <p>{movie.overview}</p>
                  <button
                    className="fwBTN"
                    onClick={() => removeFromWatchLater(movie)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))
          ) : (
            <h5 className="nothingAddedYet">
              No movies added to Watch Later list.
            </h5>
          )}
        </ul>
      </div>
    </div>
  );
}

export default WatchLater;
