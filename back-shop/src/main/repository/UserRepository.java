package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUserId(String userId);
}
