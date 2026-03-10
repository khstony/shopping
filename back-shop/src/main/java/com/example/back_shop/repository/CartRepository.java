package com.example.back_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_shop.entity.CartEntity;
import com.example.back_shop.entity.OfferEntity;
import com.example.back_shop.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Optional<CartEntity> findByOwnerIdAndOfferId(UserEntity ownerId, OfferEntity offerId);

    List<CartEntity> findByOwnerId(Long ownerId);
}
