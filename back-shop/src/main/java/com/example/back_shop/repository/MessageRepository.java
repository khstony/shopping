package com.example.back_shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_shop.entity.ChatRoomEntity;
import com.example.back_shop.entity.MessageEntity;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findByRoom_Id(Long id);

    MessageEntity findTopByRoom_IdOrderByCreatedAtDesc(Long id);

}