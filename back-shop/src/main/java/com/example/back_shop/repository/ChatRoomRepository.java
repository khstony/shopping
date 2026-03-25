package com.example.back_shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_shop.entity.ChatRoomEntity;
import com.example.back_shop.entity.MessageEntity;
import com.example.back_shop.entity.OfferEntity;
import com.example.back_shop.entity.UserEntity;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
    Optional<ChatRoomEntity> findByBuyerAndSellerAndOffer(UserEntity buyer, UserEntity seller, OfferEntity offer);

    ChatRoomEntity findByBuyerAndOffer(UserEntity buyer, OfferEntity offer);
}