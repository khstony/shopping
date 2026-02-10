package com.example.back_shop.controller;

import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.example.back_shop.service.OfferService;

import io.swagger.v3.oas.models.media.MediaType;

import com.example.back_shop.dto.*;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/offers")
@RequiredArgsConstructor
public class OfferController {
    private final OfferService offerService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<OfferResponseDto> upload(
            @ModelAttribute OfferRequestDto request,
            @RequestParam("image") MultipartFile imageFile) throws IOException {
        OfferResponseDto response = offerService.upload(request, imageFile);
        return ResponseEntity.ok(response);
    }

}
