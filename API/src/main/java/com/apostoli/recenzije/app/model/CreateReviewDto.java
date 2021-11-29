package com.apostoli.recenzije.app.model;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;

public record CreateReviewDto(
        @NotBlank
        String title,
        @NotBlank
        String description,
        int likes,
        int dislikes,
        int foodCost,
        Long userId,
        ArrayList<Long> likedBy,
        ArrayList<Long> dislikedBy
) {
}