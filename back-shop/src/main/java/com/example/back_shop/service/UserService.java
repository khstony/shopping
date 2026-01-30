package com.example.back_shop.service;

import com.example.back_shop.entity.*;
import com.example.back_shop.repository.UserRepository;
import com.example.back_shop.dto.UserRegisterRequestDto;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
//import com.example.back_shop.config.*;

import lombok.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    // private final JwtUtil JwtUtil;

    // 회원가입
    @Transactional
    public String register(UserRegisterRequestDto request) {
        if (userRepository.findByUserId(request.getUserId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        UserType type = request.getUserType();

        if (type != UserType.BUYER && type != UserType.SELLER) {
            throw new IllegalArgumentException("회원 타입이 비정상입니다");
        }

        UserEntity user = UserEntity.builder()
                .userId(request.getUserId())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .nickname(request.getNickname())
                .address(request.getAddress())
                .phone(request.getPhone())
                .userType(type)
                .status(UserStatus.NORMAL)
                .build();

        userRepository.save(user);
        return ("회원가입 성공");
    }
}
