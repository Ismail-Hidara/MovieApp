package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.StreamingService;
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
}
