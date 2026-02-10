package com.example.back_shop.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
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
                .build();
    }

}
