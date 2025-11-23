package com.pfe.movieapp.repository;

import com.pfe.movieapp.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {

    List<Watchlist> findByUserId(Long userId);

    boolean existsByUserIdAndMediaIdAndMediaType(Long userId, Long mediaId, String mediaType);

    void deleteByUserIdAndMediaIdAndMediaType(Long userId, Long mediaId, String mediaType);
}
