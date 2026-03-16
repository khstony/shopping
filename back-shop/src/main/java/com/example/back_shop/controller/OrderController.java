package com.example.back_shop.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.example.back_shop.service.*;
import com.example.back_shop.dto.*;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor

public class OrderController {
    private final OrderService orderService;

    @GetMapping("/load/{offerId}")
    public ResponseEntity<List<OrderResponseDto>> getOrder(@PathVariable Long offerId) {
        return ResponseEntity.ok(orderService.loadOrders(offerId));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editOrder(@RequestBody OrderRequestDto request) {
        try {
            OrderResponseDto response = orderService.editOrder(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

}
