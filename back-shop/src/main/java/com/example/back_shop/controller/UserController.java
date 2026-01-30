package com.example.back_shop.controller;

import com.example.back_shop.dto.UserRegisterRequestDto;
import com.example.back_shop.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegisterRequestDto request) {
        userService.register(request);
        return ResponseEntity.ok("회원가입 성공");
    }
}
