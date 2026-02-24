package com.example.back_shop.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import com.example.back_shop.repository.*;
import com.example.back_shop.dto.*;
import com.example.back_shop.entity.OfferEntity;
import com.example.back_shop.entity.UserEntity;
import com.example.back_shop.service.ImageService;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor

public class OfferService {
        private final OfferRepository offerRepository;
        private final UserRepository userRepository;
        private final ImageService imageService;

        @Transactional
        public OfferResponseDto upload(OfferRequestDto request, MultipartFile imageFile) throws IOException {

                UserEntity uploader = userRepository.getReferenceById(request.getUploader());

                String imageUrl = imageService.imageUpload(imageFile);

                OfferEntity offer = OfferEntity.builder()
                                .productName(request.getProductName())
                                .productDesc(request.getProductDesc())
                                .uploader(uploader)
                                .productPrice(request.getProductPrice())
                                .stock(request.getStock())
                                .productImage(imageUrl)
                                .discountRate(request.getDiscountRate())
                                .build();

                OfferEntity saved = offerRepository.save(offer);

                return OfferResponseDto.builder()
                                .offerId(saved.getId())
                                .productName(saved.getProductName())
                                .productDesc(saved.getProductDesc())
                                .productPrice(saved.getProductPrice())
                                .stock(saved.getStock())
                                .uploaderId(saved.getUploader().getId())
                                .productImage(saved.getProductImage())
                                .discountRate(saved.getDiscountRate())
                                .build();
        }

        @Value("${image-base-url}")
        private String imageUrl;

        public List<OfferResponseDto> loadAll() {
                List<OfferEntity> offers = offerRepository.findAll();

                return offers.stream()
                                .map(offer -> new OfferResponseDto(
                                                offer.getId(),
                                                offer.getProductName(),
                                                offer.getProductDesc(),
                                                offer.getProductPrice(),
                                                offer.getStock(),
                                                offer.getUploader().getId(),
                                                offer.getDiscountRate(),
                                                imageUrl + offer.getProductImage()

                                ))
                                .collect(Collectors.toList());
        }

        public List<OfferResponseDto> loadUploader(Long uploaderId) {
                List<OfferEntity> offers = offerRepository.findByUploaderId(uploaderId);

                return offers.stream()
                                .map(offer -> new OfferResponseDto(
                                                offer.getId(),
                                                offer.getProductName(),
                                                offer.getProductDesc(),
                                                offer.getProductPrice(),
                                                offer.getStock(),
                                                offer.getUploader().getId(),
                                                offer.getDiscountRate(),
                                                imageUrl + offer.getProductImage()

                                ))
                                .collect(Collectors.toList());
        }

        public OfferResponseDto loadOffer(Long offerId) {
                OfferEntity offer = offerRepository.findById(offerId)
                                .orElseThrow(() -> new IllegalArgumentException("탐색 실패"));

                return new OfferResponseDto(
                                offer.getId(),
                                offer.getProductName(),
                                offer.getProductDesc(),
                                offer.getProductPrice(),
                                offer.getStock(),
                                offer.getUploader().getId(),
                                offer.getDiscountRate(),
                                imageUrl + offer.getProductImage());

        }

}
