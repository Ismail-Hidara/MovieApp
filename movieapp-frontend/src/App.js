import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Anime from "./pages/Anime";
import Details from "./pages/Details";
import MovieDetails from "./pages/details/MovieDetails";
import TVShowDetails from "./pages/details/TVShowDetails";
import AnimeDetails from "./pages/details/AnimeDetails";
import MangaDetails from "./pages/details/MangaDetails";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import Watchlist from "./pages/Watchlist";
import History from "./pages/History";
import Login from "./pages/Login";
import ChatAssistant from "./components/Chat/ChatAssistant";
import Search from "./pages/Search";


function App() {
  return (
    <Router>
      <Navbar />
      <ChatAssistant />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/anime" element={<Anime />} />
        {/* <Route path="/manga" element={<Manga />} /> */}
        <Route path="/details/:type/:id" element={<Details />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TVShowDetails />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/manga/:id" element={<MangaDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
