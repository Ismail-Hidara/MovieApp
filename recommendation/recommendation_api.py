from flask import Flask, request, jsonify
import mysql.connector
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# TMDB API Key
TMDB_API_KEY = "49472b877102293a1321b7b6e05822df"

# Database Config (adjust with your phpMyAdmin credentials)
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',       #  Replace with your actual password
    'database': 'movieapp'          #  Replace with your actual database name
}

# Fetch trending movies from TMDB
def fetch_trending_movies():
    url = f"https://api.themoviedb.org/3/trending/movie/week?api_key={TMDB_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get("results", [])
    return []

# Fetch movie details by TMDB ID
def fetch_tmdb_details(media_id):
    url = f"https://api.themoviedb.org/3/movie/{media_id}?api_key={TMDB_API_KEY}&language=en-US"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

# Get watchlist media IDs for a specific user from MySQL
def get_user_watchlist_media_ids(user_id):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT media_id FROM watchlist WHERE user_id = %s", (user_id,))
    media_ids = [row["media_id"] for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return media_ids

@app.route("/recommend/watchlist/<int:user_id>", methods=["GET"])
def recommend_from_watchlist(user_id):
    watchlist_ids = get_user_watchlist_media_ids(user_id)
    watchlist_descriptions = []

    # Step 1: Get overviews from user's watchlist
    for media_id in watchlist_ids:
        details = fetch_tmdb_details(media_id)
        if details and details.get("overview"):
            watchlist_descriptions.append(details["overview"])

    if not watchlist_descriptions:
        return jsonify([])

    # Step 2: Get candidate movies (trending)
    candidates = fetch_trending_movies()

    # ❌ Step 2.5: Filter out already-watched movies by ID
    candidates = [movie for movie in candidates if movie["id"] not in watchlist_ids]

    candidate_descriptions = [movie.get("overview", "") for movie in candidates]

    # Step 3: TF-IDF + Cosine Similarity
    all_texts = watchlist_descriptions + candidate_descriptions
    vectorizer = TfidfVectorizer().fit_transform(all_texts)
    similarity_matrix = cosine_similarity(vectorizer[:len(watchlist_descriptions)], vectorizer[len(watchlist_descriptions):])
    avg_scores = similarity_matrix.mean(axis=0)

    # Step 4: Get top 5 similar trending movies
    top_indices = avg_scores.argsort()[-10:][::-1]
    recommendations = [candidates[i] for i in top_indices]

    # Step 5: Return selected fields only
    output = [
        {
            "id": movie["id"],
            "title": movie["title"],
            "posterPath": movie["poster_path"],
            "overview": movie["overview"]
        }
        for movie in recommendations
    ]

    return jsonify(output)

if __name__ == "__main__":
    app.run(port=5001)
