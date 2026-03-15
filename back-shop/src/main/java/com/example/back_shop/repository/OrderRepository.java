package com.example.back_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_shop.entity.*;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

}