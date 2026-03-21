package com.example.back_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_shop.entity.ChatRoomEntity;
import com.example.back_shop.entity.MessageEntity;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
}