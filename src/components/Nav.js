import "../App.css";
const Nav = () => {
  return (
    <div className="navbar">
      <a className="logo" href="/">
        <span className="span">W</span>ATCHFLIX
      </a>
      <div className="navbar-links">
        <a className="nav-link" href="/watchlater">
          watch later
        </a>
        <a className="nav-link" href="/favourites">
          favourites
        </a>
      </div>
    </div>
  );
};

export default Nav;
