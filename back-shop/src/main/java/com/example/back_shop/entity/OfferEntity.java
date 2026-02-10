package com.example.back_shop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;;

@Entity
@Table(name = "offers")
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OfferEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploader", nullable = false)
    private UserEntity uploader;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_image", nullable = false)
    private String productImage;

    @Column(name = "product_desc", nullable = false)
    private String productDesc;

    @Column(name = "product_price", nullable = false)
    private int productPrice;

    @Column(name = "discount_rate", nullable = false)
    private int discountRate;

    @Column(name = "stock", nullable = false)
    private int stock;

}
