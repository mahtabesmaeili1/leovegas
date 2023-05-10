import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import MovieListCard from "../components/MovieListCard";
import "../App.css";
import styled from "styled-components";
const HomePage = () => {
  const apiUrl = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]); //get all movies
  const [search, setSearch] = useState(""); //to search
  const [selectHero, setSelectHero] = useState({}); //hero
  const [playTrailer, setPlayTrailer] = useState(false);
  const [open, setOpen] = useState(false);
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
  //SEARCH
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
    const key = trailer ? trailer.key : null;
    if (!key) {
      return <p className="sorry">Sorry, this movie doesn't have a trailer.</p>;
    }
    return (
      <YouTube
        className="youtube-container"
        videoId={key}
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
      <Nav>
        <Logo className="logo" href="/">
          <span className="span">W</span>ATCHFLIX
        </Logo>
        <Hamburger onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu open={open}>
          <div>
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
          </div>
          <a className="nav-link" href="/watchlater">
            watch later
          </a>{" "}
          <a className="nav-link" href="/favourites">
            favourites
          </a>
        </Menu>
      </Nav>
      <div
        className="hero"
        style={{
          backgroundImage: `url('${IMAGE_PATH}${selectHero.backdrop_path}')`,
        }}
      >
        <div className="heroContent">
          {selectHero.videos && playTrailer ? renderTrailer() : null}
          {selectHero.videos && !playTrailer && (
            <button
              className="trailerButton"
              onClick={() => setPlayTrailer(true)}
            >
              Play Trailer
            </button>
          )}
          <h1 className="heroTitle"> {selectHero.title}</h1>
          <div className="heroOverview">
            {" "}
            {selectHero.overview ? (
              <p style={{ marginLeft: "30px" }}>{selectHero.overview}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container"> {renderMovies()}</div>
    </div>
  );
};

export default HomePage;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #000000be;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #ececec;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;

  span {
    font-weight: 700;
    font-size: 2rem;
  }
  @media (max-width: 780px) {
    font-size: 1.3rem;
    span {
      font-size: 1.7rem;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: #ececec;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;
