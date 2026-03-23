package com.example.back_shop.service;

import com.example.back_shop.repository.MessageRepository;
import com.example.back_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back_shop.dto.ChatRequestDto;
import com.example.back_shop.dto.ChatResponseDto;
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
                System.out.println("전송 로직1");
                ChatRoomEntity room = chatRoomRepository.findById(request.getRoomId())
                                .orElseThrow(() -> new IllegalArgumentException("채팅방 없음"));

                UserEntity sender = userRepository.findById(request.getSenderId())
                                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
                System.out.println("전송 로직2");
                MessageEntity message = MessageEntity.builder()
                                .room(room)
                                .sender(sender)
                                .message(request.getMessage())
                                .createdAt(LocalDateTime.now())
                                .build();

                System.out.println("전송 로직3");
                return messageRepository.save(message);
        }

        public List<ChatResponseDto> loadChat(Long id) {

                List<MessageEntity> messages = messageRepository.findByRoom_Id(id);

                return messages.stream()
                                .map(msg -> new ChatResponseDto(
                                                msg.getId(),
                                                msg.getRoom().getId(),
                                                msg.getSender().getId(),
                                                msg.getMessage(),
                                                msg.getCreatedAt()))
                                .collect(Collectors.toList());
        }
}
