package com.pfe.movieapp.controller;

import com.pfe.movieapp.service.MovieService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/trending")
    public String getTrendingMovies() {
        return movieService.getTrendingMovies();
    }

    @GetMapping("/popular")
    public String getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/top-rated")
    public String getTopRatedMovies() {
        return movieService.getTopRatedMovies();
    }

    @GetMapping("/now-playing")
    public String getNowPlayingMovies() {
        return movieService.getNowPlayingMovies();
    }

    @GetMapping("/genre/{genreId}")
    public String getMoviesByGenre(@PathVariable int genreId) {
        return movieService.getMoviesByGenre(genreId);
    }

    @GetMapping("/{movieId}")
    public String getMovieDetails(@PathVariable int movieId) {
        return movieService.getMovieDetails(movieId);
    }
}
