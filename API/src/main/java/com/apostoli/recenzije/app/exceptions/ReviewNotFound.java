package com.apostoli.recenzije.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ReviewNotFound extends RuntimeException {

    public ReviewNotFound(String message) {
        super(message);
    }
}