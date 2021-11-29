package com.apostoli.recenzije.app.repository;

import com.apostoli.recenzije.app.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
