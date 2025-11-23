package com.pfe.movieapp.service;

import com.pfe.movieapp.model.History;
import com.pfe.movieapp.model.User;
import com.pfe.movieapp.repository.HistoryRepository;
import com.pfe.movieapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final UserRepository userRepository;

    public HistoryService(HistoryRepository historyRepository, UserRepository userRepository) {
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    public List<History> getUserHistory(Long userId) {
        return historyRepository.findByUserId(userId);
    }

    public History addToHistory(Long userId, History historyItem) {
        if (!historyRepository.existsByUserIdAndMediaIdAndMediaType(userId, historyItem.getMediaId(), historyItem.getMediaType())) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            historyItem.setUser(user);
            return historyRepository.save(historyItem);
        } else {
            throw new RuntimeException("Item already exists in history");
        }
    }
}
