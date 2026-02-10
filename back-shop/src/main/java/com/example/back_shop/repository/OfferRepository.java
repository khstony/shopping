package com.example.back_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.back_shop.entity.OfferEntity;

public interface OfferRepository extends JpaRepository<OfferEntity, Long> {
    Optional<OfferEntity> findByUploaderId(Long uploaderId);
}
