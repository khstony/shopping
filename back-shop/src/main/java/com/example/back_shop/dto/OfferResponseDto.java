package com.example.back_shop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OfferResponseDto {

    private Long offerId;
    private String productName;
    private String productDesc;
    private int productPrice;
    private int stock;

    private Long uploaderId;
    private int discountRate;
    private String productImage;
}