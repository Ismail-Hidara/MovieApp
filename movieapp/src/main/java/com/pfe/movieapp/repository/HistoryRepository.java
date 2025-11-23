package com.pfe.movieapp.repository;

import com.pfe.movieapp.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByUserId(Long userId);
    boolean existsByUserIdAndMediaIdAndMediaType(Long userId, Long mediaId, String mediaType);
}
