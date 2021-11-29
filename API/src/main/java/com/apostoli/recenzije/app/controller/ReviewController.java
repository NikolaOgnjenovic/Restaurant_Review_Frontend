package com.apostoli.recenzije.app.controller;

import com.apostoli.recenzije.app.model.CreateReviewDto;
import com.apostoli.recenzije.app.model.ReturnReviewDto;
import com.apostoli.recenzije.app.model.Review;
import com.apostoli.recenzije.app.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class ReviewController {

    @RequestMapping(method = RequestMethod.OPTIONS)
    ResponseEntity<?> options() {
        return ResponseEntity
                .ok()
                .allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.DELETE)
                .build();
    }

    private final ReviewService reviewService;

    @GetMapping
    List<ReturnReviewDto> getAllReviews() {
        log.info("Getting all reviews");
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    ReturnReviewDto getReviewById(@PathVariable Long id) {
        log.info("Getting review by id {}", id);
        return reviewService.getReviewById(id);
    }

    @PostMapping
    ReturnReviewDto createReview(@RequestBody @Valid CreateReviewDto review) {
        Review createReview = Review.builder()
                .title(review.title())
                .description(review.description())
                .foodCost(review.foodCost())
                .build();
        return reviewService.createReview(createReview);
    }

    @PutMapping("/{id}")
    ReturnReviewDto updateReviewById(@PathVariable Long id, @RequestBody Review ReviewUpdated) {
        return reviewService.updateReviewById(id, ReviewUpdated);
    }

    @PutMapping("/likeReviewById")
    ReturnReviewDto likeReviewById(@RequestBody Pair<Long, Long> reviewAndUserId) {
        return reviewService.likeReviewById(reviewAndUserId.getFirst(), reviewAndUserId.getSecond());
    }

    @PutMapping("/dislikeReviewById")
    ReturnReviewDto dislikeReviewById(@RequestBody Pair<Long, Long> reviewAndUserId) {
        return reviewService.dislikeReviewById(reviewAndUserId.getFirst(), reviewAndUserId.getSecond());
    }

    @DeleteMapping("/{id}")
    void deleteById(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
    }
}
