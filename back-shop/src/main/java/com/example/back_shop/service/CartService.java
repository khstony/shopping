package com.example.back_shop.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.example.back_shop.repository.*;
import com.example.back_shop.dto.CartRequestDto;
import com.example.back_shop.dto.CartResponseDto;
import com.example.back_shop.entity.*;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor

public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final OfferRepository offerRepository;

    @Transactional
    public CartResponseDto addCart(CartRequestDto request) {

        OfferEntity offer = offerRepository.findById(request.getOfferId())
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));

        UserEntity user = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new IllegalArgumentException("사용자가 없습니다."));

        if (cartRepository.findByOwnerIdAndOfferId(user, offer).isPresent()) {
            throw new IllegalArgumentException("이미 장바구니에 담은 상품입니다.");
        }

        if (offer.getStock() <= 1) {
            throw new IllegalArgumentException("재고가 없어 상품을 담을 수 없습니다.");
        }

        CartEntity cart = CartEntity.builder()
                .offerId(offer)
                .ownerId(user)
                .quantity(request.getQuantity())
                .build();

        cartRepository.save(cart);

        return CartResponseDto.builder()
                .Id(cart.getId())
                .ownerId(cart.getOwnerId().getId())
                .offerId(cart.getOfferId().getId())
                .quantity(cart.getQuantity())
                .build();
    }

}
