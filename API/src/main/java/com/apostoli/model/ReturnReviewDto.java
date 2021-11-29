package com.apostoli.model;

public record ReturnReviewDto(
        Long id,
        String title,
        String description,
        int likes,
        int dislikes
) {
}