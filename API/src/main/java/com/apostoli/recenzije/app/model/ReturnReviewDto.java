package com.apostoli.recenzije.app.model;

import java.util.ArrayList;

public record ReturnReviewDto(
        Long id,
        String title,
        String description,
        int likes,
        int dislikes,
        int foodCost,
        Long userId,
        ArrayList<Long> likedBy,
        ArrayList<Long> dislikedBy,
        String placeId
) {
}