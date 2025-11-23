package com.pfe.movieapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

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

    public String getSeasonEpisodes(int tvId, int seasonNumber) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/tv/{tv_id}/season/{season_number}")
                        .queryParam("api_key", tmdbApiKey)
                        .build(tvId, seasonNumber))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getFilteredTVShows(int page, String genre, String language) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/discover/tv")
                        .queryParam("api_key", tmdbApiKey)
                        .queryParam("page", page)
                        .queryParam("sort_by", "popularity.desc")
                        .queryParamIfPresent("with_genres", Optional.ofNullable(genre))
                        .queryParamIfPresent("with_original_language", Optional.ofNullable(language))
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
