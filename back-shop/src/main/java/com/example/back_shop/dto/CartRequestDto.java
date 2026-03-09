package com.example.back_shop.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartRequestDto {
    private Long ownerId;
    private Long offerId;
    private int quantity;
}
