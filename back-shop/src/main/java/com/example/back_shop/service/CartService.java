package com.example.back_shop.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.example.back_shop.repository.*;
import com.example.back_shop.dto.*;

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
                                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

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

        @Transactional
        public CartResponseDto addOne(CartUpdateRequestDto request) {
                System.out.println("로그");
                System.out.println(request);
                OfferEntity offer = offerRepository.findById(request.getOfferId())
                                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));

                UserEntity user = userRepository.findById(request.getOwnerId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

                CartEntity cart = cartRepository.findById(request.getId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 장바구니 항목 무효."));

                if (offer.getStock() < request.getQuantity() + 1) {
                        throw new IllegalArgumentException("더이상 추가로 담을 수 없습니다.");
                }

                cart.setQuantity(cart.getQuantity() + 1);

                return CartResponseDto.builder()
                                .Id(cart.getId())
                                .ownerId(cart.getOwnerId().getId())
                                .offerId(cart.getOfferId().getId())
                                .quantity(cart.getQuantity())
                                .build();
        }

        @Transactional
        public CartResponseDto minusOne(CartUpdateRequestDto request) {
                System.out.println("로그");
                System.out.println(request);
                OfferEntity offer = offerRepository.findById(request.getOfferId())
                                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));

                UserEntity user = userRepository.findById(request.getOwnerId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

                CartEntity cart = cartRepository.findById(request.getId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 장바구니 항목 무효."));

                if (request.getQuantity() == 1) {
                        throw new IllegalArgumentException("더이상 줄일 수 없습니다. 대신 삭제 버튼을 이용하세요.");
                }

                cart.setQuantity(cart.getQuantity() - 1);

                return CartResponseDto.builder()
                                .Id(cart.getId())
                                .ownerId(cart.getOwnerId().getId())
                                .offerId(cart.getOfferId().getId())
                                .quantity(cart.getQuantity())
                                .build();
        }

        @Transactional
        public List<CartResponseDto> loadCart(Long ownerId) {

                System.out.println("서비스진입");
                UserEntity user = new UserEntity();
                user.setId(ownerId);
                System.out.println("검사" + user.getId());
                System.out.println("검사" + cartRepository.findByOwnerId(user));
                List<CartEntity> carts = cartRepository.findByOwnerId(user);

                return carts.stream()
                                .map(cart -> new CartResponseDto(
                                                cart.getId(),
                                                cart.getOwnerId().getId(),
                                                cart.getOfferId().getId(),
                                                cart.getQuantity()))
                                .collect(Collectors.toList());
        }

        @Transactional // 단순히 장바구니 취소 기능
        public void cartRemove(Long cartId) {
                cartRepository.deleteById(cartId);
        }

        @Transactional // 여기는 cartRemove에서 재고 카운트 로직 추가할것
        public void cartPurchase(Long cartId) {
                cartRepository.deleteById(cartId);
        }

}
