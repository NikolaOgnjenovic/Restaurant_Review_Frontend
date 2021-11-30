package com.apostoli.recenzije.app.service;

import com.apostoli.recenzije.app.exceptions.ReviewNotFound;
import com.apostoli.recenzije.app.model.ReturnReviewDto;
import com.apostoli.recenzije.app.model.Review;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private final com.apostoli.recenzije.app.repository.ReviewRepository ReviewRepository;

    public List<ReturnReviewDto> getAllReviews() {
        return ReviewRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ReturnReviewDto> getReviewsByPlaceId(String placeId) {
        List<ReturnReviewDto> reviewList = getAllReviews();

        reviewList.removeIf(review -> !Objects.equals(review.placeId(), placeId));

        return reviewList;
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

    public ReturnReviewDto likeReviewById(Long reviewId, Long userId) {
        Optional<Review> optionalReview = ReviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {
            Review savedReview = optionalReview.get();
            savedReview.setLikes(savedReview.getLikes() + 1);

            //Add the review's author id to the list of users who have liked the review
            ArrayList<Long> newLikedByList = savedReview.getLikedBy();
            if (newLikedByList == null) newLikedByList = new ArrayList<>();
            newLikedByList.add(userId);
            savedReview.setLikedBy(newLikedByList);

            return mapToDto(ReviewRepository.save(savedReview));
        } else {
            throw new ReviewNotFound("Requested id not present [" + reviewId + "]");
        }
    }

    public ReturnReviewDto dislikeReviewById(Long reviewId, Long userId) {
        Optional<Review> optionalReview = ReviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {
            Review savedReview = optionalReview.get();
            savedReview.setDislikes(savedReview.getDislikes() + 1);

            //Add the review's author id to the list of users who have disliked the review
            ArrayList<Long> newDislikedByList = savedReview.getDislikedBy();
            if (newDislikedByList == null) newDislikedByList = new ArrayList<>();
            newDislikedByList.add(userId);
            savedReview.setDislikedBy(newDislikedByList);

            return mapToDto(ReviewRepository.save(savedReview));
        } else {
            throw new ReviewNotFound("Requested id not present [" + reviewId + "]");
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
                review.getDislikes(),
                review.getFoodCost(),
                review.getUserId(),
                (review.getLikedBy() == null) ? new ArrayList<>() : review.getLikedBy(),
                (review.getDislikedBy() == null) ? new ArrayList<>() : review.getDislikedBy(),
                review.getPlaceId()
        );
    }
}
