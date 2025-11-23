package com.pfe.movieapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@Service
public class AnimeService {

    private final WebClient webClient;

    public AnimeService(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("https://graphql.anilist.co").build();
    }

    public String getTrendingAnime(int page, int perPage, String genre, String format) {
        String query = """
            query ($page: Int, $perPage: Int, $genre: String, $format: MediaFormat) {
              Page(page: $page, perPage: $perPage) {
                media(type: ANIME, genre: $genre, format: $format, sort: TRENDING_DESC) {
                  id
                  title { romaji english }
                  coverImage { large }
                  genres
                  format
                }
              }
            }
        """;

        Map<String, Object> variables = new HashMap<>();
        variables.put("page", page);
        variables.put("perPage", perPage);
        if (genre != null && !genre.isEmpty()) variables.put("genre", genre);
        if (format != null && !format.isEmpty()) variables.put("format", format);

        Map<String, Object> payload = new HashMap<>();
        payload.put("query", query);
        payload.put("variables", variables);

        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getAnimeDetails(int id) {
        String query = """
            query ($id: Int) {
              Media(id: $id, type: ANIME) {
                id
                title { romaji english }
                description
                episodes
                genres
                coverImage { large }
              }
            }
        """;

        Map<String, Object> variables = new HashMap<>();
        variables.put("id", id);

        Map<String, Object> payload = new HashMap<>();
        payload.put("query", query);
        payload.put("variables", variables);

        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String searchAnime(String searchTerm) {
        String query = """
            query ($search: String) {
              Page(perPage: 10) {
                media(type: ANIME, search: $search) {
                  id
                  title { romaji english }
                  coverImage { large }
                }
              }
            }
        """;

        Map<String, Object> variables = new HashMap<>();
        variables.put("search", searchTerm);

        Map<String, Object> payload = new HashMap<>();
        payload.put("query", query);
        payload.put("variables", variables);

        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
