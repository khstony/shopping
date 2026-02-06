import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type {Offer} from "../types/offer"
import "./SellerOfferCell.css";

type OfferCellProps = Offer;

function SellerOfferCell(props: Offer) {
  const {
    id,
    uploader,
    product_name,
    product_image,
    product_desc,
    product_price,
    discount_rate,
    stock,
  } = props;

  const isSoldOut = stock===0;
  const isDiscounted = discount_rate > 0;
  const actualPrice = product_price * (1 - discount_rate/100);


  return (
    <div className="cell-seller-wrapper">
        <div className = "cell-seller-image"></div>
        <div className = "cell-seller-right">
            <div className = "cell-seller-name-price-box">
                <div className = "cell-seller-product-name">{product_name}</div>
                <div className = "cell-seller-price-discount-box">
                    <div className = {`cell-seller-price ${isDiscounted? `cell-seller-discount-tag`:``}`}>{actualPrice}원</div>
                    <div className = "cell-seller-stock">재고 : {stock}개</div>
                    {isDiscounted && (
                        <div className = "cell-seller-discount-info">
                            <div className= "cell-seller-prediscount-price">{product_price}원</div>
                            <div className = "cell-seller-discount-rate">{discount_rate}% 할인</div>
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