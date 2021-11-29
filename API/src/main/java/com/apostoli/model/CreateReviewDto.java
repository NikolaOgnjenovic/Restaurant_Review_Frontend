package com.apostoli.model;

import javax.validation.constraints.NotBlank;

public record CreateReviewDto(
        @NotBlank
        String title,
        @NotBlank
        String description,
        int likes,
        int dislikes
) {
}