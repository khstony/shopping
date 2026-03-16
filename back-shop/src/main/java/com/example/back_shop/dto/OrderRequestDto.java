package com.example.back_shop.dto;

import java.time.LocalDateTime;

import com.example.back_shop.entity.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class OrderRequestDto {
    private Long id;
    private String address;
    private Long buyerId;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private int quantity;
    private Long offerId;
    private Long sellerId;
}
