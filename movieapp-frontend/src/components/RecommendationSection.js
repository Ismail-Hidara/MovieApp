import React, { useEffect, useState } from "react";
import { fetchWatchlistRecommendations } from "../api";
import MediaCard from "./MediaCard";

const RecommendationSection = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        const res = await fetchWatchlistRecommendations(userId);
        const patched = res.map(item => ({
          ...item,
          poster_path: item.posterPath || item.poster_path
        }));
        setRecommendations(patched);
      } catch (err) {
        console.error("Recommendation fetch failed:", err);
      }
    };

    load();
  }, [userId]);

  if (recommendations.length === 0) return null;

  return (
    <div className="trending-block">
      <h2 className="section-title">🎯 Recommended For You</h2>
      <div className="media-grid">
        {recommendations.map((item, index) => (
          <MediaCard key={index} item={item} type="movie" />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
