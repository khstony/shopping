package com.example.back_shop.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.swagger.v3.oas.annotations.Hidden;

//@RestControllerAdvice(annotations = RestController.class)

public class GlobalExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        ErrorCode errorcode = e.getErrorCode();

        return ResponseEntity
                .status(errorcode.getStatus())
                .body(ErrorResponse.builder()
                        .status(errorcode.getStatus().value())
                        .message(errorcode.getMessage())

                        .build());

    }
}
