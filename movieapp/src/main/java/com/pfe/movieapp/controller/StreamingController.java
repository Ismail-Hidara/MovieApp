package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.StreamingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/streaming")
public class StreamingController {

    private final StreamingService streamingService;

    public StreamingController(StreamingService streamingService) {
        this.streamingService = streamingService;
    }

    @GetMapping("/providers/{movieId}")
    public String getStreamingProviders(@PathVariable int movieId) {
        return streamingService.getStreamingProviders(movieId);
    }

    @GetMapping("/availability/{imdbId}")
    public String getStreamingAvailability(@PathVariable String imdbId) {
        return streamingService.getStreamingAvailability(imdbId);
    }

    // Add inside your existing StreamingController.java

    @GetMapping("/movie/{id}")
    public ResponseEntity<String> getMovieEmbedUrl(@PathVariable String id) {
        String embedUrl = "https://vidsrc.icu/embed/movie/" + id;
        return ResponseEntity.ok(embedUrl);
    }

    @GetMapping("/tv/{id}/{season}/{episode}")
    public ResponseEntity<String> getTvEmbedUrl(@PathVariable String id,
                                                @PathVariable int season,
                                                @PathVariable int episode) {
        String embedUrl = "https://vidsrc.icu/embed/tv/" + id + "/" + season + "/" + episode;
        return ResponseEntity.ok(embedUrl);
    }

    @GetMapping("/anime/{id}/{episode}/{dub}/{skip}")
    public ResponseEntity<String> getAnimeEmbedUrl(@PathVariable String id,
                                                   @PathVariable int episode,
                                                   @PathVariable int dub,
                                                   @PathVariable int skip) {
        String embedUrl = "https://vidsrc.icu/embed/anime/" + id + "/" + episode + "/" + dub + "/" + skip;
        return ResponseEntity.ok(embedUrl);
    }

    @GetMapping("/manga/{id}/{chapter}")
    public ResponseEntity<String> getMangaEmbedUrl(@PathVariable String id,
                                                   @PathVariable int chapter) {
        String embedUrl = "https://vidsrc.icu/embed/manga/" + id + "/" + chapter;
        return ResponseEntity.ok(embedUrl);
    }

}
