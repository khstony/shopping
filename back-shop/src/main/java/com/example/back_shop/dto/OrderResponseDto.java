package com.example.back_shop.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.back_shop.entity.OrderStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderResponseDto {
    private Long id;
    private String address;
    private Long buyerId;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private int quantity;
    private Long offerId;
    private Long sellerId;
}
