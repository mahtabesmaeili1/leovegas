import "./App.css";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WatchLater from "./pages/WatchLater";
import Favourites from "./pages/Favourite";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/watchlater" element={<WatchLater />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
