package com.example.back_shop.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatResponseDto {
    private Long id;
    private Long roomId;
    private Long senderId;
    private String senderName;
    private String message;
    private LocalDateTime createdAt;
}