package com.pfe.movieapp.controller;

import com.pfe.movieapp.model.Watchlist;
import com.pfe.movieapp.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    // ✅ Get user's watchlist
    @GetMapping("/{userId}")
    public List<Watchlist> getUserWatchlist(@PathVariable Long userId) {
        return watchlistService.getUserWatchlist(userId);
    }

    // ✅ Add to watchlist
    @PostMapping("/{userId}")
    public ResponseEntity<?> addToWatchlist(@PathVariable Long userId, @RequestBody Watchlist item) {
        try {
            watchlistService.addToWatchlist(userId, item);
            return ResponseEntity.ok("Item added to watchlist");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ Remove from watchlist
    @DeleteMapping("/{userId}/{mediaId}/{mediaType}")
    public ResponseEntity<?> removeFromWatchlist(
            @PathVariable Long userId,
            @PathVariable Long mediaId,
            @PathVariable String mediaType) {
        watchlistService.removeFromWatchlist(userId, mediaId, mediaType);
        return ResponseEntity.ok().build();
    }
}
