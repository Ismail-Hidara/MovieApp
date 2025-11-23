package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.TVService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tv")
public class TVController {

    private final TVService tvService;

    public TVController(TVService tvService) {
        this.tvService = tvService;
    }

    @GetMapping("/trending")
    public String getTrendingTVShows() {
        return tvService.getTrendingTVShows();
    }

    @GetMapping("/popular")
    public String getPopularTVShows() {
        return tvService.getPopularTVShows();
    }

    @GetMapping("/top-rated")
    public String getTopRatedTVShows() {
        return tvService.getTopRatedTVShows();
    }

    @GetMapping("/{tvId}")
    public String getTVShowDetails(@PathVariable int tvId) {
        return tvService.getTVShowDetails(tvId);
    }
}
