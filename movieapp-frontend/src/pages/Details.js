import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchTVShowDetails, fetchAnimeDetails } from "../api";
import "../App.css";

const Details = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      let data;
      if (type === "movie") data = await fetchMovieDetails(id);
      else if (type === "tv") data = await fetchTVShowDetails(id);
      else if (type === "anime") data = await fetchAnimeDetails(id);

      console.log("API Response:", data); // 🔥 Debugging: Log API response

      if (!data) {
        console.error("❌ API returned NULL or undefined!");
      } else if (Array.isArray(data) && data.length === 0) {
        console.error("❌ API returned an empty array!");
      } else if (typeof data === "object" && Object.keys(data).length === 0) {
        console.error("❌ API returned an empty object!");
      } else {
        console.log("✅ API returned data:", data);
      }
      
      setDetails(data);
      setLoading(false);
    };

    getDetails();
  }, [type, id]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>Details not found</p>;

  return (
    <div>
      <h1>{details.title || details.name}</h1>
      <img src={details.posterPath} alt={details.title || details.name} />
      <p>{details.overview}</p>
      <h3>Rating: {details.vote_average}</h3>
      <h3>Release Date: {details.release_date || details.first_air_date}</h3>
    </div>
  );
};

export default Details;
