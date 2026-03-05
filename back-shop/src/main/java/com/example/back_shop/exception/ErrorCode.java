package com.example.back_shop.exception;

import org.springframework.http.HttpStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor

public enum ErrorCode {

    USER_DUPLICATE(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디입니다."),
    USER_TYPE_INVALID(HttpStatus.BAD_REQUEST, "유저 타입이 유효하지 않습니다."),
    USER_ID_ERROR(HttpStatus.BAD_REQUEST, "없는 아이디입니다."),
    USER_PASSSWORD_ERROR(HttpStatus.BAD_REQUEST, "비밀번호가 틀렸습니다.");

    private final HttpStatus status;
    private final String message;
}
