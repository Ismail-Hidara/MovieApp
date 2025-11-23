import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/"; // Your backend API

const safeApiCall = async (url, isList = true) => {
  try {
    const response = await axios.get(url);
    if (isList) {
      return response.data.results || []; // Return an array for list endpoints
    } else {
      return response.data || {}; // Return an object for single-item endpoints
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return isList ? [] : {}; // Return an empty array or object based on the endpoint type
  }
};

export const searchMedia = async (query, type = "") => {
  const typeParam = type ? `&type=${type}` : "";
  try {
    const response = await axios.get(`${API_BASE_URL}search?query=${query}${typeParam}`);
    return response.data;
  } catch (error) {
    console.error("Error searching media:", error);
    return { results: [] };
  }
};


export const fetchTrendingMovies = async () => safeApiCall(`${API_BASE_URL}movies/trending`, true);
export const fetchPopularMovies = async () => safeApiCall(`${API_BASE_URL}movies/popular`, true);
export const fetchTopRatedMovies = async () => safeApiCall(`${API_BASE_URL}movies/top-rated`, true);
export const fetchNowPlayingMovies = async () => safeApiCall(`${API_BASE_URL}movies/now-playing`, true);

export const fetchTrendingTVShows = async () => safeApiCall(`${API_BASE_URL}tv/trending`, true);
export const fetchPopularTVShows = async () => safeApiCall(`${API_BASE_URL}tv/popular`, true);
export const fetchTopRatedTVShows = async () => safeApiCall(`${API_BASE_URL}tv/top-rated`, true);

//export const fetchTrendingAnime = async () => safeApiCall(`${API_BASE_URL}anime/trending`, true);
export const fetchPopularAnime = async () => safeApiCall(`${API_BASE_URL}anime/popular`, true);

export const fetchMovieDetails = async (movieId) => safeApiCall(`${API_BASE_URL}movies/${movieId}`, false);
export const fetchTVShowDetails = async (tvId) => safeApiCall(`${API_BASE_URL}tv/${tvId}`, false);
export const fetchAnimeDetails = async (animeId) => safeApiCall(`${API_BASE_URL}anime/${animeId}`, false);
export const fetchMangaDetails = async (id) => safeApiCall(`${API_BASE_URL}manga/${id}`, false);

export const fetchTrendingAnime = async () => {
  const response = await axios.get(`${API_BASE_URL}anime/trending`);
  return response.data?.data?.Page?.media || [];
};

export const fetchTrendingManga = async () => {
  const response = await axios.get(`${API_BASE_URL}manga/trending`);
  return response.data?.data?.Page?.media || [];
};

export async function fetchWatchlistRecommendations(userId) {
  const res = await fetch(`http://localhost:8080/api/recommendations/watchlist/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}



