package com.example.back_shop.dto;

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

public class OfferRequestDto {
    private String productName;
    private String productDesc;

    private Long uploader; // 업로더의 id
    private int productPrice;
    private int discountRate;
    private int stock;
}
