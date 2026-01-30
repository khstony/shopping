package com.example.back.dto;

import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserRegisterRequestDto {
    private String userId;
    private String password;
    private String nickname;
    private String address;
    private String phone;
    private String email;
    private UserType userType;
}
