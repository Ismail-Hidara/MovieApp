package com.pfe.movieapp.controller;

import com.pfe.movieapp.model.History;
import com.pfe.movieapp.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/{userId}")
    public List<History> getUserHistory(@PathVariable Long userId) {
        return historyService.getUserHistory(userId);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addToHistory(@PathVariable Long userId, @RequestBody History historyItem) {
        try {
            History saved = historyService.addToHistory(userId, historyItem);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
