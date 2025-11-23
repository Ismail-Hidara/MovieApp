package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.AnimeService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/anime")
public class AnimeController {

    private final AnimeService animeService;

    public AnimeController(AnimeService animeService) {
        this.animeService = animeService;
    }

    @GetMapping("/trending")
    public String getTrendingAnime(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String format
    ) {
        return animeService.getTrendingAnime(page, perPage, genre, format);
    }

    @GetMapping("/{animeId}")
    public String getAnimeDetails(@PathVariable int animeId) {
        return animeService.getAnimeDetails(animeId);
    }

    @GetMapping("/search")
    public String searchAnime(@RequestParam String query) {
        return animeService.searchAnime(query);
    }
}
