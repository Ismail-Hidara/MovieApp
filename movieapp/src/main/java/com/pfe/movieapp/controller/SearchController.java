package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.SearchService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public String searchMedia(
            @RequestParam String query,
            @RequestParam(required = false, defaultValue = "") String type
    ) {
        return searchService.searchMedia(query, type);
    }
}
