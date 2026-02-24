package com.example.back_shop.controller;

import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.example.back_shop.service.OfferService;

import io.swagger.v3.oas.models.media.MediaType;

import com.example.back_shop.dto.*;

import java.io.IOException;
import java.util.List;

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

    @GetMapping("/load")
    public ResponseEntity<List<OfferResponseDto>> loadAll() {
        return ResponseEntity.ok(offerService.loadAll());
    }

    @GetMapping("/load/uploader/{id}")
    public ResponseEntity<List<OfferResponseDto>> loadByUploader(@PathVariable Long id) {

        return ResponseEntity.ok(offerService.loadUploader(id));
    }

    @GetMapping("/load/single/{id}")
    public ResponseEntity<OfferResponseDto> loadSingleOffer(@PathVariable Long id) {
        return ResponseEntity.ok(offerService.loadOffer(id));
    }

}
