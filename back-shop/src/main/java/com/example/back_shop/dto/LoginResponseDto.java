package com.example.back_shop.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LoginResponseDto {
    private String token;
    private String userId;
    private Long id;
}
