import { useEffect, useState } from "react";
import { fetchWatchlist, removeFromWatchlist } from "../api";
import { useAuth } from "../context/AuthContext";

const Watchlist = () => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (user) {
            fetchWatchlist(user.id).then(setWatchlist);
        }
    }, [user]);

    const handleRemove = async (movieId) => {
        await removeFromWatchlist(user.id, movieId);
        setWatchlist(watchlist.filter(movie => movie.movieId !== movieId));
    };

    return (
        <div>
            <h2>My Watchlist</h2>
            <ul>
                {watchlist.map(movie => (
                    <li key={movie.movieId}>
                        {movie.title}
                        <button onClick={() => handleRemove(movie.movieId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
