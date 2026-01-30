package com.example.back.controller;

import com.example.back.dto.UserRegisterRequestDto;
import com.example.back.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public String register(@requestBody UserRequest request) {
        userService.register(request);
        return ResponseEntity.ok("회원가입 성공");
    }
}
