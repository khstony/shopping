package com.example.back.service;

import com.example.back.entity.UserEntity;
import com.example.back.repository.UserRepository;
import com.example.back.dto.UserRegisterRequestDto;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

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
                .userStatus(UserStatus.NORMAL)
                .build();

        userRepository.save(user);
        return ("회원가입 성공");
    }
}
