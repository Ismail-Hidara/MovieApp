import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchTVShowDetails, fetchStreamingProviders, fetchTrailer, fetchSeasonEpisodes, getMovieWatchLink, getTVShowWatchLink } from "../api";
import "../App.css";


const Details = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState(null);
  const [providers, setProviders] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodesBySeason, setEpisodesBySeason] = useState({});
  const [expandedSeason, setExpandedSeason] = useState(null);
  
  
  useEffect(() => {
    const getDetails = async () => {
      let data;
      if (type === "movie") {
        data = await fetchMovieDetails(id);
      } else if (type === "tv") {
        data = await fetchTVShowDetails(id);
        setSeasons(data.seasons || []);
      }
      setDetails(data);
      setProviders(await fetchStreamingProviders(id));
      setTrailer(await fetchTrailer(type, id));
    };
    getDetails();
  }, [type, id]);

  const handleSeasonClick = async (seasonNumber) => {
    if (!episodesBySeason[seasonNumber]) {
      const episodesData = await fetchSeasonEpisodes(id, seasonNumber);
      setEpisodesBySeason((prev) => ({ ...prev, [seasonNumber]: episodesData.episodes || [] }));
    }
    setExpandedSeason(expandedSeason === seasonNumber ? null : seasonNumber);
  };

  const handleEpisodeClick = async (season, episode) => {
    const watchUrl = await getTVShowWatchLink(id, season, episode);
    window.location.href = watchUrl;
  };

   const handleWatchNow = async () => {
    let watchUrl;
    if (type === "movie") {
      watchUrl = await getMovieWatchLink(id);
    } else {
      watchUrl = await getTVShowWatchLink(id, 1, 1); // Default to season 1, episode 1
    }
    window.location.href = watchUrl;
  }; 
  
  const handleAddToWatchlist = async () => {
    const userId = localStorage.getItem("userId"); // Ensure userId is stored after login
    if (!userId) {
      alert("Please log in to add movies to your watchlist.");
      return;
    }
  
    const watchlistItem = {
      movieId: id,
      title: details.title || details.name, // Handle both movies and TV shows
      posterPath: details.poster_path
    };
  
    try {
      const response = await fetch(`http://localhost:8080/api/watchlist/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchlistItem),
      });
  
      if (response.ok) {
        alert("Movie added to your watchlist!");
      } else {
        alert("Failed to add movie to watchlist.");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };
  


  if (!details) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <h1>{details.title || details.name}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt={details.title || details.name} />
      <p>{details.overview}</p>
      <h3>Rating: {details.vote_average}</h3>
      <h3>Release Date: {details.release_date || details.first_air_date}</h3>

      {/* Trailer Section */}
      {trailer && (
        <div className="trailer-container">
          <h2>Trailer</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Streaming Providers */}
      {providers.length > 0 && (
        <div className="providers">
          <h2>Available On:</h2>
          <ul>
            {providers.map((provider) => (
              <li key={provider.provider_id}>{provider.provider_name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Watch Now Button */}
      <button onClick={handleWatchNow} className="watch-now-button">Watch Now</button>
      <button onClick={handleAddToWatchlist} className="watchlist-button">
                  Add to Watchlist
                                       </button>


      {/* Show seasons and episodes if it's a TV show */}
      {type === "tv" && seasons.length > 0 && (
        <div className="seasons">
          <h2>Seasons & Episodes</h2>
          {seasons.map((season) => (
            <div key={season.id}>
              <h3 onClick={() => handleSeasonClick(season.season_number)}>{season.name}</h3>
              {expandedSeason === season.season_number && (
                <div className="episodes">
                  {episodesBySeason[season.season_number]?.map((episode) => (
                    <button key={episode.id} onClick={() => handleEpisodeClick(season.season_number, episode.episode_number)}>
                      {episode.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;