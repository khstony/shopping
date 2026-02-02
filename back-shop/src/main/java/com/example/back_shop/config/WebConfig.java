package com.example.back_shop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // CORS 적용 경로
                .allowedOrigins("http://localhost:5173") // 허용 도메인
                .allowedMethods("*") // 허용 HTTP 메서드
                .allowedHeaders("*")
                .allowCredentials(true); // 쿠키 허용 여부
    }

}
