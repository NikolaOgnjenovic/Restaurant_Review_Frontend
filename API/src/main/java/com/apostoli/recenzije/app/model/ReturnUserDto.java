package com.apostoli.recenzije.app.model;

public record ReturnUserDto(
        Long id,
        String username,
        String password
) {
}