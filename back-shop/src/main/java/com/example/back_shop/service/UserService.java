package com.example.back_shop.service;

import com.example.back_shop.entity.*;
import com.example.back_shop.repository.UserRepository;
import com.example.back_shop.dto.UserRegisterRequestDto;
import com.example.back_shop.dto.LoginRequestDto;
import com.example.back_shop.dto.LoginResponseDto;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.back_shop.security.JwtUtil;
//import com.example.back_shop.config.*;

import lombok.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

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

    @Transactional
    public LoginResponseDto login(LoginRequestDto request) {
        UserEntity user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 틀립니다");
        }

        String token = jwtUtil.generateToken(user.getUserId());

        return LoginResponseDto.builder()
                .token(token)
                .id(user.getId())
                .build();

    }
}
