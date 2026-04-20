package com.example.back_shop.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back_shop.entity.CartEntity;
import com.example.back_shop.entity.OfferEntity;
import com.example.back_shop.entity.OrderEntity;
import com.example.back_shop.entity.OrderStatus;
import com.example.back_shop.repository.*;
import com.example.back_shop.dto.*;
import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;

import lombok.*;

@Service
@RequiredArgsConstructor

public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public void createOrders(List<CartEntity> carts, String address) {
        // System.out.println("오더 서비스 진입");
        for (CartEntity cart : carts) {

            OfferEntity offer = cart.getOfferId();

            OrderEntity order = OrderEntity.builder()
                    .buyerId(cart.getOwnerId().getId())
                    .sellerId(offer.getUploader().getId())
                    .offer(offer)
                    .quantity(cart.getQuantity())
                    .address(address)
                    .orderDate(LocalDateTime.now())
                    .status(OrderStatus.ORDERED)
                    .build();

            orderRepository.save(order);
        }
    }

    @Transactional
    public List<OrderResponseDto> loadOrders(Long offerId) {
        // System.out.println("load order 시작");
        List<OrderEntity> orders = orderRepository.findByOfferId(offerId);
        // System.out.println("load order 진입");
        return orders.stream()
                .map(order -> new OrderResponseDto(
                        order.getId(),
                        order.getAddress(),
                        order.getBuyerId(),
                        order.getStatus(),
                        order.getOrderDate(),
                        order.getQuantity(),
                        order.getOffer().getId(),
                        order.getSellerId()))
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDto editOrder(OrderRequestDto request) {
        // System.out.println("orderedit 진입" + request.getId());
        OrderEntity order = orderRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 주문 무효"));
        // System.out.println("에딧 시작");
        order.setStatus(request.getStatus());
        return OrderResponseDto.builder()
                .address(order.getAddress())
                .buyerId(order.getBuyerId())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .quantity(order.getQuantity())
                .offerId(order.getOffer().getId())
                .sellerId(order.getSellerId())
                .build();
    }

}
