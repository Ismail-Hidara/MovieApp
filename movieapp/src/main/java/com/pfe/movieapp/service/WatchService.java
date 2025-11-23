package com.pfe.movieapp.service;

import org.springframework.stereotype.Service;

@Service
public class WatchService {

    private static final String BASE_URL = "https://vidsrc.icu/embed";

    public String getMovieEmbedUrl(String tmdbOrImdbId) {
        return BASE_URL + "/movie/" + tmdbOrImdbId;
    }

    public String getTVEmbedUrl(String tmdbOrImdbId, int season, int episode) {
        return BASE_URL + "/tv/" + tmdbOrImdbId + "/" + season + "/" + episode;
    }

    public String getAnimeEmbedUrl(String anilistId, int episode, int dub, int skip) {
        return BASE_URL + "/anime/" + anilistId + "/" + episode + "/" + dub + "/" + skip;
    }

    public String getMangaEmbedUrl(String anilistId, int chapter) {
        return BASE_URL + "/manga/" + anilistId + "/" + chapter;
    }
}
