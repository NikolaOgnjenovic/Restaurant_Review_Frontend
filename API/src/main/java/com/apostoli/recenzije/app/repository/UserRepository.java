package com.apostoli.recenzije.app.repository;

import com.apostoli.recenzije.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
