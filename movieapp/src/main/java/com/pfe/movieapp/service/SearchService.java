package com.pfe.movieapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SearchService {

    private final WebClient tmdbClient;

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    public SearchService(WebClient.Builder webClientBuilder) {
        this.tmdbClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public String searchMedia(String query, String type) {
        if ("movie".equalsIgnoreCase(type) || "tv".equalsIgnoreCase(type)) {
            return tmdbClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search/" + type)
                            .queryParam("api_key", tmdbApiKey)
                            .queryParam("query", query)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } else if ("anime".equalsIgnoreCase(type) || "manga".equalsIgnoreCase(type)) {
            return searchAniList(query, type);
        } else {
            // fallback to TMDB multi-search
            return tmdbClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search/multi")
                            .queryParam("api_key", tmdbApiKey)
                            .queryParam("query", query)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        }
    }

    private String searchAniList(String query, String type) {
        String mediaType = "anime".equalsIgnoreCase(type) ? "ANIME" : "MANGA";

        String graphqlRequest = """
        {
          "query": "query ($search: String) { Page(perPage: 20) { media(search: $search, type: %s) { id title { romaji english } coverImage { large } } } }",
          "variables": {
            "search": "%s"
          }
        }
        """.formatted(mediaType, query.replace("\"", "\\\""));

        WebClient aniClient = WebClient.create("https://graphql.anilist.co");

        return aniClient.post()
                .header("Content-Type", "application/json")
                .bodyValue(graphqlRequest)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
