package com.pfe.movieapp.controller;

import com.pfe.movieapp.model.User;
import com.pfe.movieapp.service.UserService;
//import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    }

    // ✅ Get favorite movies
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<Long>> getFavorites(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(u -> ResponseEntity.ok(u.getFavoriteMovies()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Add a movie to favorites
    @PostMapping("/{userId}/favorites/{movieId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long userId, @PathVariable Long movieId) {
        userService.addFavoriteMovie(userId, movieId);
        return ResponseEntity.ok().build();
    }

    // ✅ Remove a movie from favorites
    @DeleteMapping("/{userId}/favorites/{movieId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long userId, @PathVariable Long movieId) {
        userService.removeFavoriteMovie(userId, movieId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("User not found"));
    }


}
