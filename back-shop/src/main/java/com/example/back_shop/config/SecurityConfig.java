package com.example.back_shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {
                })
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/images/**",
                                "/swagger-ui.html",
                                "/api/users/register",
                                "/api/users/login",
                                "/users/login",
                                "/users/register",
                                "/offers/upload",
                                "/api/offers/upload",
                                "/offers/load/**",

                                "/api/offers/load/**")
                        .permitAll()
                        .anyRequest().authenticated())
                .formLogin(form -> form.disable()); // 로그인 페이지 비활성화

        return http.build();
    }
}
