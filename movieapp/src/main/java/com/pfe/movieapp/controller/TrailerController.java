package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.TrailerService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/trailer")
public class TrailerController {

    private final TrailerService trailerService;

    public TrailerController(TrailerService trailerService) {
        this.trailerService = trailerService;
    }

    @GetMapping("/{type}/{id}")
    public String getTrailer(@PathVariable String type, @PathVariable int id) {
        return trailerService.getTrailer(type, id);
    }
}
