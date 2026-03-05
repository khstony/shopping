package com.example.back_shop.dto;

import com.example.back_shop.entity.UserType;

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
    private UserType userType;
}
