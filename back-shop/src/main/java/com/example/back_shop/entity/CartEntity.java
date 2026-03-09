package com.example.back_shop.entity;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cart", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "owner_id", "offer_id" })
})

@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private UserEntity ownerId;

    @ManyToOne
    @JoinColumn(name = "offer_id", nullable = false)
    private OfferEntity offerId;

    @Column(name = "quantity", nullable = false)
    private int quantity;

}
