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
    public String getTrendingAnime() {
        return animeService.getTrendingAnime();
    }

    @GetMapping("/popular")
    public String getPopularAnime() {
        return animeService.getPopularAnime();
    }

    @GetMapping("/{animeId}")
    public String getAnimeDetails(@PathVariable int animeId) {
        return animeService.getAnimeDetails(animeId);
    }
}
