import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type {Offer} from "../types/offer"
import "./SellerOfferCell.css";

type OfferCellProps = Offer;

function SellerOfferCell(props: Offer) {
  const {
    offerId,
    uploader,
    productName,
    productImage,
    productDesc,
    productPrice,
    discountRate,
    stock,
  } = props;

  const isSoldOut = stock===0;
  const isDiscounted = discountRate > 0;
  const actualPrice = productPrice * (1 - discountRate/100);


  return (
    <div className="cell-seller-wrapper">
        <div className = "cell-seller-image">
            <img
                className = "cell-seller-image-inner"
                src = {productImage}
                alt = {productName}
            />
             
            
        </div>
        <div className = "cell-seller-right">
            <div className = "cell-seller-name-price-box">
                <div className = "cell-seller-product-name">{productName}</div>
                <div className = "cell-seller-price-discount-box">
                    <div className = {`cell-seller-price ${isDiscounted? `cell-seller-discount-tag`:``}`}>{actualPrice}원</div>
                    <div className = "cell-seller-stock">재고 : {stock}개</div>
                    {isDiscounted && (
                        <div className = "cell-seller-discount-info">
                            <div className= "cell-seller-prediscount-price">{productPrice}원</div>
                            <div className = "cell-seller-discount-rate">{discountRate}% 할인</div>
                        </div>
                    )}
                </div>
            </div>

            <div className = "cell-seller-bottom">
                <div className = "cell-seller-button-section">
                    <div className = "cell-seller-button">문의</div>
                    <div className = "cell-seller-button">수정</div>
                    <div className = "cell-seller-button">삭제</div>
                </div>
            </div>
            
        </div>
    </div>
  )

}
export default SellerOfferCell 