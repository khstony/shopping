package com.example.back_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.back_shop.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUserId(String userId);
}
