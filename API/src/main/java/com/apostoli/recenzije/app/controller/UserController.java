package com.apostoli.recenzije.app.controller;

import com.apostoli.recenzije.app.model.*;
import com.apostoli.recenzije.app.service.ReviewService;
import com.apostoli.recenzije.app.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class UserController {
    @RequestMapping(method = RequestMethod.OPTIONS)
    ResponseEntity<?> options() {
        return ResponseEntity
                .ok()
                .allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.DELETE)
                .build();
    }

    private final UserService userService;

    @GetMapping
    List<ReturnUserDto> getAllUsers() {
        log.info("Getting all reviews");
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    ReturnUserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/validateLogin")
    boolean validateLogin(@RequestBody Pair<String, String> usernameAndPassword) {
        return userService.validateLogin(usernameAndPassword.getFirst(), usernameAndPassword.getSecond());
    }

    @GetMapping("/{id}/getLikes")
    int getLikesByUserId(@PathVariable Long id) {
        return userService.getLikesByUserId(id);
    }

    @GetMapping("/{id}/getDislikes")
    int getDislikesByUserId(@PathVariable Long id) {
        return userService.getDislikesByUserId(id);
    }

    @GetMapping("/{id}/getReviews")
    List<ReturnReviewDto> getReviewsByUserId(@PathVariable Long id) {
        return userService.getReviewsByUserId(id);
    }

    @PostMapping
    ReturnUserDto createUser(@RequestBody @Valid CreateUserDto user) {
        User createUser = User.builder()
                .username(user.username())
                .password(user.password())
                .build();
        return userService.createUser(createUser);
    }
}
