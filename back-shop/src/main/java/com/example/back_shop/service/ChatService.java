package com.example.back_shop.service;

import com.example.back_shop.repository.MessageRepository;
import com.example.back_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.back_shop.dto.ChatRequestDto;
import com.example.back_shop.entity.ChatRoomEntity;
import com.example.back_shop.entity.UserEntity;
import com.example.back_shop.entity.MessageEntity;
import com.example.back_shop.repository.ChatRoomRepository;

@Service
@RequiredArgsConstructor

public class ChatService {
    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Transactional
    public MessageEntity saveMessage(ChatRequestDto request) {

        ChatRoomEntity room = chatRoomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("채팅방 없음"));

        UserEntity sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        MessageEntity message = MessageEntity.builder()
                .room(room)
                .sender(sender)
                .message(request.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
        return messageRepository.save(message);
    }
}
