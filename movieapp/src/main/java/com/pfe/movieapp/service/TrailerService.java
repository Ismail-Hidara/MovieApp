package com.pfe.movieapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TrailerService {

    private final WebClient webClient;

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    public TrailerService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public String getTrailer(String type, int id) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/{type}/{id}/videos")
                        .queryParam("api_key", tmdbApiKey)
                        .build(type, id))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
