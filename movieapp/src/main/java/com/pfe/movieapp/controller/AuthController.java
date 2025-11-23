package com.pfe.movieapp.controller;

import com.pfe.movieapp.model.User;
import com.pfe.movieapp.security.JwtUtil;
import com.pfe.movieapp.service.AuthService;
import com.pfe.movieapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;


    public AuthController(AuthService authService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = authService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        String token = authService.login(email, password);
        if (token == null) {
            return ResponseEntity.status(401).body("Incorrect email or password");
        }

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.get().getId());
        return ResponseEntity.ok(response);
    }


    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> passwords) {

        String oldPassword = passwords.get("oldPassword");
        String newPassword = passwords.get("newPassword");

        if (!authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Invalid token format");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);// get user email from token

        boolean result = authService.changePassword(email, oldPassword, newPassword);
        if (result) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(403).body("Old password is incorrect");
        }
    }

}
