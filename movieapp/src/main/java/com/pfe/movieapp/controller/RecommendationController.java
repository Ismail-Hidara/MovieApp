package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.HistoryService;
import com.pfe.movieapp.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {
    
    private final RestTemplate restTemplate;

    @GetMapping("/watchlist/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getWatchlistRecommendations(@PathVariable Long userId) {
        String flaskUrl = "http://localhost:5001/recommend/watchlist/" + userId;
        ResponseEntity<List> response = restTemplate.getForEntity(flaskUrl, List.class);
        return ResponseEntity.ok(response.getBody());
    }

}
