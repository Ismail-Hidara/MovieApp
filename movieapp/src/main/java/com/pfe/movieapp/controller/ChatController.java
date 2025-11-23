package com.pfe.movieapp.controller;

import com.pfe.movieapp.dto.ChatRequest;
import com.pfe.movieapp.dto.ChatResponse;
import com.pfe.movieapp.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ask")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return geminiService.getGeminiReply(request);
    }
}
