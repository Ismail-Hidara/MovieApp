package com.pfe.movieapp.service;

import com.pfe.movieapp.model.User;
import com.pfe.movieapp.model.Watchlist;
import com.pfe.movieapp.repository.UserRepository;
import com.pfe.movieapp.repository.WatchlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;

    public WatchlistService(WatchlistRepository watchlistRepository, UserRepository userRepository) {
        this.watchlistRepository = watchlistRepository;
        this.userRepository = userRepository;
    }

    public List<Watchlist> getUserWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public void addToWatchlist(Long userId, Watchlist item) {
        boolean exists = watchlistRepository.existsByUserIdAndMediaIdAndMediaType(
                userId, item.getMediaId(), item.getMediaType()
        );

        if (exists) {
            throw new RuntimeException("Item already exists in watchlist");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        item.setUser(user);
        watchlistRepository.save(item);
    }

    public void removeFromWatchlist(Long userId, Long mediaId, String mediaType) {
        watchlistRepository.deleteByUserIdAndMediaIdAndMediaType(userId, mediaId, mediaType);
    }


}
