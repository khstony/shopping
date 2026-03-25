package com.example.back_shop.controller;

import lombok.RequiredArgsConstructor;
import com.example.back_shop.dto.*;
import com.example.back_shop.service.ChatService;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatRoom")
@RequiredArgsConstructor

public class ChatRoomController {
    private final ChatService chatService;

    @GetMapping("/chat/load/{roomId}")
    public ResponseEntity<List<ChatResponseDto>> loadChat(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatService.loadChat(roomId));
    }

    @PostMapping("/chat/create")
    public ResponseEntity<?> makeRoom(@RequestBody ChatRoomRequestDto request) {
        System.out.println("컨트롤러");
        System.out.println("request : " + request);
        System.out.println("buyerid : " + request.getBuyerId());
        System.out.println("sellerid : " + request.getSellerId());
        System.out.println("offerid : " + request.getOfferId());
        try {
            ChatRoomResponseDto response = chatService.makeRoom(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/chat/findRoom")
    public ResponseEntity<?> findRoom(@RequestParam Long buyerId, @RequestParam Long offerId) {
        try {
            Long response = chatService.getRoomId(buyerId, offerId);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

}
