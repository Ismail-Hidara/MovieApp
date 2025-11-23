import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/"; // Your backend API

const safeApiCall = async (url, isList = true) => {
  try {
    const token = localStorage.getItem("token"); // Get JWT token from storage
    const response = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}, // ✅ Include token
    });
    return isList ? response.data.results || [] : response.data || {};
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return isList ? [] : {};
  }
};

export const searchMedia = async (query) => {
  return safeApiCall(`${API_BASE_URL}search?query=${query}`, true);
};

export const fetchStreamingProviders = async (movieId) => {
  return safeApiCall(`${API_BASE_URL}streaming/providers/${movieId}`, true);
};

export const fetchTrailer = async (type, id) => {
  return safeApiCall(`${API_BASE_URL}trailer/${type}/${id}`, false);
};

export const getMovieWatchLink = async (tmdbId) => {
  return safeApiCall(`${API_BASE_URL}watch/movie/${tmdbId}`, false);
};

export const getTVShowWatchLink = async (tmdbId, season, episode) => {
  return safeApiCall(`${API_BASE_URL}watch/tv/${tmdbId}/${season}/${episode}`, false);
};

export const fetchSeasonEpisodes = async (tvId, seasonNumber) => {
  return safeApiCall(`${API_BASE_URL}tv/${tvId}/season/${seasonNumber}`, true);
};

export const fetchWatchlist = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/watchlist/${userId}`);
  return response.data;
};

export const addToWatchlist = async (userId, movie) => {
  const response = await axios.post(`${API_BASE_URL}/watchlist/${userId}`, movie);
  return response.data;
};

export const removeFromWatchlist = async (userId, movieId) => {
  await axios.delete(`${API_BASE_URL}/watchlist/${userId}/${movieId}`);
};

export const fetchHistory = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/history/${userId}`);
  return response.data;
};

export const addToHistory = async (userId, movie) => {
  const response = await axios.post(`${API_BASE_URL}/history/${userId}`, movie);
  return response.data;
};

export const fetchTrendingMovies = async () => safeApiCall(`${API_BASE_URL}movies/trending`, true);
export const fetchPopularMovies = async () => safeApiCall(`${API_BASE_URL}movies/popular`, true);
export const fetchTopRatedMovies = async () => safeApiCall(`${API_BASE_URL}movies/top-rated`, true);
export const fetchNowPlayingMovies = async () => safeApiCall(`${API_BASE_URL}movies/now-playing`, true);

export const fetchTrendingTVShows = async () => safeApiCall(`${API_BASE_URL}tv/trending`, true);
export const fetchPopularTVShows = async () => safeApiCall(`${API_BASE_URL}tv/popular`, true);
export const fetchTopRatedTVShows = async () => safeApiCall(`${API_BASE_URL}tv/top-rated`, true);

export const fetchTrendingAnime = async () => safeApiCall(`${API_BASE_URL}anime/trending`, true);
export const fetchPopularAnime = async () => safeApiCall(`${API_BASE_URL}anime/popular`, true);

export const fetchMovieDetails = async (movieId) => safeApiCall(`${API_BASE_URL}movies/${movieId}`, false);
export const fetchTVShowDetails = async (tvId) => safeApiCall(`${API_BASE_URL}tv/${tvId}`, false);
export const fetchAnimeDetails = async (animeId) => safeApiCall(`${API_BASE_URL}anime/${animeId}`, false);