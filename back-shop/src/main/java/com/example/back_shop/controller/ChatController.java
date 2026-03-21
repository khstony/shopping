package com.example.back_shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.back_shop.dto.ChatRequestDto;
import com.example.back_shop.dto.ChatResponseDto;
import com.example.back_shop.entity.MessageEntity;
import com.example.back_shop.service.ChatService;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/chat/message")
    public void message(ChatRequestDto request) {
        MessageEntity message = chatService.saveMessage(request);

        ChatResponseDto response = ChatResponseDto.builder()
                .roomId(message.getId())
                .senderId(message.getSender().getId())
                .message(message.getMessage())
                .createdAt(message.getCreatedAt())
                .build();

        messagingTemplate.convertAndSend("/client/chat/room/" + request.getRoomId(), response);
    }
}