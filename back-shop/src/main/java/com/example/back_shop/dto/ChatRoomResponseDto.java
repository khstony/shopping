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
public class ChatRoomResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private Long buyerId;
    private Long sellerId;
    private Long offerId;
}