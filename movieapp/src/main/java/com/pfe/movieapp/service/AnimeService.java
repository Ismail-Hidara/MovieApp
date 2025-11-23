package com.pfe.movieapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AnimeService {

    private final WebClient webClient;

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    public AnimeService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    // Fetch Trending Anime
    public String getTrendingAnime() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/trending/tv/day")
                        .queryParam("api_key", tmdbApiKey)
                        .queryParam("with_keywords", "210024") // Anime keyword ID
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch Popular Anime
    public String getPopularAnime() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/discover/tv")
                        .queryParam("api_key", tmdbApiKey)
                        .queryParam("with_genres", "16") // Animation
                        .queryParam("with_keywords", "210024") // Anime keyword
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch Anime Details by ID
    public String getAnimeDetails(int animeId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/tv/{tv_id}")
                        .queryParam("api_key", tmdbApiKey)
                        .build(animeId))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
