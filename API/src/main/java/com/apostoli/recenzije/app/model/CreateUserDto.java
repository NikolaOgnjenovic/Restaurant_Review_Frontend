package com.apostoli.recenzije.app.model;

import javax.validation.constraints.NotBlank;

public record CreateUserDto(
        Long id,
        @NotBlank
        String username,
        @NotBlank
        String password
) {
}