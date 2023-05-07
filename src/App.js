import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WatchLater from "./pages/WatchLater";
import Favourites from "./pages/Favourite";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/watchlater" element={<WatchLater />} />
      </Routes>
    </div>
  );
}

export default App;
