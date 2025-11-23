import { useEffect, useState } from "react";
import { fetchHistory } from "../api";
import { useAuth } from "../context/AuthContext";

const History = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user) {
            fetchHistory(user.id).then(setHistory);
        }
    }, [user]);

    return (
        <div>
            <h2>Watch History</h2>
            <ul>
                {history.map(movie => (
                    <li key={movie.movieId}>
                        {movie.title} - Watched on {new Date(movie.watchedAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;
