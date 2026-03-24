package com.example.back_shop.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ChatRoomRequestDto {
    private Long buyerId;
    private Long sellerId;
    private Long offerId;
}
