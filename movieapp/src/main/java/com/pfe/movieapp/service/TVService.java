package com.pfe.movieapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TVService {

    private final WebClient webClient;

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    public TVService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public String getTrendingTVShows() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/trending/tv/day")
                        .queryParam("api_key", tmdbApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getPopularTVShows() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/tv/popular")
                        .queryParam("api_key", tmdbApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getTopRatedTVShows() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/tv/top_rated")
                        .queryParam("api_key", tmdbApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getTVShowDetails(int tvId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/tv/{tv_id}")
                        .queryParam("api_key", tmdbApiKey)
                        .build(tvId))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
