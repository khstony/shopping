package com.example.back_shop.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import java.nio.file.Paths;

@Service

public class ImageService {
    @Value("${file.save-path}")
    private String uploadPath;

    public String imageUpload(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path savePath = Paths.get(uploadPath, fileName);

        Files.createDirectories(savePath.getParent());
        file.transferTo(savePath.toFile());

        return "/images/" + fileName;
    }
}