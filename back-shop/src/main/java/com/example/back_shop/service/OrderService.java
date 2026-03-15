package com.example.back_shop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.back_shop.entity.CartEntity;
import com.example.back_shop.entity.OfferEntity;
import com.example.back_shop.entity.OrderEntity;
import com.example.back_shop.entity.OrderStatus;
import com.example.back_shop.repository.*;

import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor

public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public void createOrders(List<CartEntity> carts, String address) {
        System.out.println("오더 서비스 진입");
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

}
