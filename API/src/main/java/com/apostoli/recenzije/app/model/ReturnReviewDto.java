package com.apostoli.recenzije.app.model;

public record ReturnReviewDto(
        Long id,
        String title,
        String description,
        int likes,
        int dislikes,
        int foodCost
) {
}