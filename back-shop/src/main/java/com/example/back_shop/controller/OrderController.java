package com.example.back_shop.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.example.back_shop.service.*;
import com.example.back_shop.dto.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor

public class OrderController {
    private final OrderService orderService;

    @GetMapping("/load/{offerId}")
    public ResponseEntity<List<OrderResponseDto>> getOrder(@PathVariable Long offerId) {
        return ResponseEntity.ok(orderService.loadOrders(offerId));
    }

}
