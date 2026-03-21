package com.example.back_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_shop.entity.MessageEntity;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
}