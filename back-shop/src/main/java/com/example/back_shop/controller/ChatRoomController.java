package com.example.back_shop.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import com.example.back_shop.dto.*;
import com.example.back_shop.service.ChatService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/chatRoom")
@RequiredArgsConstructor

public class ChatRoomController {
    private final ChatService chatService;

    @GetMapping("/chat/load/{roomId}")
    public ResponseEntity<List<ChatResponseDto>> loadChat(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatService.loadChat(roomId));
    }
}
