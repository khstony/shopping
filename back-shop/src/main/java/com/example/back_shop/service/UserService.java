package com.example.back_shop.service;

import com.example.back_shop.entity.*;
import com.example.back_shop.repository.UserRepository;
import com.example.back_shop.dto.UserRegisterRequestDto;
import com.example.back_shop.dto.UserRegisterResponseDto;
import com.example.back_shop.dto.LoginRequestDto;
import com.example.back_shop.dto.LoginResponseDto;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.back_shop.security.JwtUtil;
import com.example.back_shop.exception.*;
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
    public UserRegisterResponseDto register(UserRegisterRequestDto request) {
        if (userRepository.findByUserId(request.getUserId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // UserType type = request.getUserType();

        UserType type;

        try {
            type = request.getUserType();
        } catch (Exception e) {
            throw new IllegalArgumentException("유저 타입 무효");
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
        return UserRegisterResponseDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .userType(user.getUserType())
                .build();
    }

    @Transactional
    public LoginResponseDto login(LoginRequestDto request) {
        UserEntity user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }

        String token = jwtUtil.generateToken(user.getUserId());

        return LoginResponseDto.builder()
                .token(token)
                .id(user.getId())
                .userType(user.getUserType())
                .build();

    }

    public String getNickname(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("이름 검색실패"));

        return user.getNickname();
    }
}
