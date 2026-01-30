package com.example.back_shop.dto;

import lombok.*;
import com.example.back_shop.entity.*;

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
