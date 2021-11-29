package com.apostoli.service;

import com.apostoli.exceptions.ReviewNotFound;
import com.apostoli.model.ReturnReviewDto;
import com.apostoli.model.Review;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private final com.apostoli.repository.ReviewRepository ReviewRepository;

    public List<ReturnReviewDto> getAllReviews() {
        return ReviewRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ReturnReviewDto getReviewById(Long id) {
        Optional<Review> optionalReview = ReviewRepository.findById(id);

        if (optionalReview.isPresent()) {
            return mapToDto(optionalReview.get());
        } else {
            throw new ReviewNotFound("Requested id not present [" + id + "]");
        }

    }

    public ReturnReviewDto createReview(Review Review) {
        try {
            return mapToDto(ReviewRepository.save(Review));
        } catch (DataIntegrityViolationException exception) {
            log.error("Couldn't create review, {}", exception.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't create duplicates");
        }
    }

    public ReturnReviewDto updateReviewById(Long id, Review Review) {
        Optional<Review> optionalReview = ReviewRepository.findById(id);

        if (optionalReview.isPresent()) {
            Review savedReview = optionalReview.get();
            savedReview.setTitle(Review.getTitle());
            savedReview.setDescription(Review.getDescription());
            return mapToDto(ReviewRepository.save(savedReview));
        } else {
            throw new ReviewNotFound("Requested id not present [" + id + "]");
        }
    }

    public void deleteReviewById(Long id) {
        Optional<Review> optionalReview = ReviewRepository.findById(id);

        if (optionalReview.isPresent()) {
            ReviewRepository.deleteById(id);
        } else {
            throw new ReviewNotFound("Requested id not present [" + id + "]");
        }
    }

    private ReturnReviewDto mapToDto(Review review) {
        return new ReturnReviewDto(
                review.getId(),
                review.getTitle(),
                review.getDescription(),
                review.getLikes(),
                review.getDislikes()
        );
    }
}
