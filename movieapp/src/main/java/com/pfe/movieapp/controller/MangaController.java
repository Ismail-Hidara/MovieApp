package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.MangaService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/manga")
public class MangaController {

    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @GetMapping("/trending")
    public String getTrendingManga(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String format
    ) {
        return mangaService.getTrendingManga(page, perPage, genre, format);
    }

    @GetMapping("/{mangaId}")
    public String getMangaDetails(@PathVariable int mangaId) {
        return mangaService.getMangaDetails(mangaId);
    }

    @GetMapping("/search")
    public String searchManga(@RequestParam String query) {
        return mangaService.searchManga(query);
    }
}
