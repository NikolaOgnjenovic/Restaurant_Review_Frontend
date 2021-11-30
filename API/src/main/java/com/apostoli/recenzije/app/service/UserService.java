package com.apostoli.recenzije.app.service;

import com.apostoli.recenzije.app.exceptions.ReviewNotFound;
import com.apostoli.recenzije.app.repository.UserRepository;
import com.apostoli.recenzije.app.model.ReturnUserDto;
import com.apostoli.recenzije.app.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.asm.Advice;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository UserRepository;

    public List<ReturnUserDto> getAllUsers() {
        return UserRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ReturnUserDto getUserById(Long id) {
        Optional<User> optionalUser = UserRepository.findById(id);

        if (optionalUser.isPresent()) {
            return mapToDto(optionalUser.get());
        } else {
            throw new ReviewNotFound("Requested id not present [" + id + "]");
        }
    }

    public boolean validateLogin(String username, String password) {
        List<ReturnUserDto> users = getAllUsers();
        for(ReturnUserDto user : users) {
            if(Objects.equals(user.username(), username) && Objects.equals(user.password(), password))
                return true;
        }

        return false;
    }

    public ReturnUserDto createUser(User user) {
        try {
            return mapToDto(UserRepository.save(user));
        } catch (DataIntegrityViolationException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't create duplicates");
        }
    }

    private ReturnUserDto mapToDto(User user) {
        return new ReturnUserDto(
                user.getId(),
                user.getUsername(),
                user.getPassword()
        );
    }
}
