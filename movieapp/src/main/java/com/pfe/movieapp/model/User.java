package com.pfe.movieapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "`user`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // Should be encrypted in production

    @ElementCollection
    private List<Long> favoriteMovies; // Store movie IDs

    @ElementCollection
    private List<Long> watchlist;

    @ElementCollection
    private List<Long> history;
}
