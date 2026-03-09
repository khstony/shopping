package com.example.back_shop.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartResponseDto {
    private Long Id;
    private Long ownerId;
    private Long offerId;
    private int quantity;
}
