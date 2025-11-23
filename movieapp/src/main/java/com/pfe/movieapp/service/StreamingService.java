package com.pfe.movieapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class StreamingService {

    private final WebClient webClient;

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    @Value("${rapidapi.key}")
    private String rapidApiKey;

    public StreamingService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    // Fetch streaming providers from TMDB
    public String getStreamingProviders(int movieId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/movie/{movie_id}/watch/providers")
                        .queryParam("api_key", tmdbApiKey)
                        .build(movieId))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // Fetch streaming availability from RapidAPI
    public String getStreamingAvailability(String imdbId) {
        WebClient rapidClient = WebClient.builder()
                .baseUrl("https://streaming-availability.p.rapidapi.com")
                .defaultHeader("X-RapidAPI-Key", rapidApiKey)
                .build();

        return rapidClient.get()
                .uri(uriBuilder -> uriBuilder.path("/search/title")
                        .queryParam("title", imdbId)
                        .queryParam("country", "US")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
