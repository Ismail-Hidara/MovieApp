package com.pfe.movieapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mediaId;     // e.g., TMDB ID, Anilist ID
    private String mediaType; // "movie", "tv", "anime", "manga"
    private String title;     // Title of the media
    private String posterPath; // URL path for poster image


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
