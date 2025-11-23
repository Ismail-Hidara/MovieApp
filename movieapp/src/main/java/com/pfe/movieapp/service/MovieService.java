package com.pfe.movieapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MovieService {

    private final WebClient webClient;

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    public MovieService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    // Fetch Trending Movies
    public String getTrendingMovies() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/trending/movie/day")
                        .queryParam("api_key", tmdbApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch Popular Movies
    public String getPopularMovies() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/movie/popular")
                        .queryParam("api_key", tmdbApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch Top Rated Movies
    public String getTopRatedMovies() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/movie/top_rated")
                        .queryParam("api_key", tmdbApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch Now Playing Movies
    public String getNowPlayingMovies() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/movie/now_playing")
                        .queryParam("api_key", tmdbApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch Movies by Genre
    public String getMoviesByGenre(int genreId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/discover/movie")
                        .queryParam("api_key", tmdbApiKey)
                        .queryParam("with_genres", genreId)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch Movie Details by ID
    public String getMovieDetails(int movieId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/movie/{movie_id}")
                        .queryParam("api_key", tmdbApiKey)
                        .build(movieId))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
