package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.WatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/watch")
public class WatchController {

    private final WatchService watchService;

    public WatchController(WatchService watchService) {
        this.watchService = watchService;
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<String> getMovieWatchLink(@PathVariable String id) {
        String url = watchService.getMovieEmbedUrl(id);
        return ResponseEntity.ok(url);
    }

    @GetMapping("/tv/{id}/{season}/{episode}")
    public ResponseEntity<String> getTVWatchLink(@PathVariable String id,
                                                 @PathVariable int season,
                                                 @PathVariable int episode) {
        String url = watchService.getTVEmbedUrl(id, season, episode);
        return ResponseEntity.ok(url);
    }

    @GetMapping("/anime/{id}/{episode}/{dub}/{skip}")
    public ResponseEntity<String> getAnimeWatchLink(@PathVariable String id,
                                                    @PathVariable int episode,
                                                    @PathVariable int dub,
                                                    @PathVariable int skip) {
        String url = watchService.getAnimeEmbedUrl(id, episode, dub, skip);
        return ResponseEntity.ok(url);
    }

    @GetMapping("/manga/{id}/{chapter}")
    public ResponseEntity<String> getMangaReadLink(@PathVariable String id,
                                                   @PathVariable int chapter) {
        String url = watchService.getMangaEmbedUrl(id, chapter);
        return ResponseEntity.ok(url);
    }
}
