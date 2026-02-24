import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Offer } from "../types/offer"
import "./OfferCell.css";


type OfferCellProps = Offer;

function OfferCell(props: Offer) {
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

  const isSoldOut = stock === 0;
  const isDiscounted = discountRate > 0;
  const actualPrice = productPrice * (1 - discountRate / 100);
  const navigate = useNavigate();

  const showInfo = () => {
    navigate(`/offer/${offerId}`);
  }

  return (
    <div className="cell-wrapper" onClick={showInfo}>
      <div className="cell-image">
        <img className="cell-image-inner"

          src={productImage}
          alt={productName}

        />
      </div>
      <div className={`cell-product-name`}>{productName} {stock}개 {discountRate}</div>

      <div className={`cell-product-price ${isDiscounted && !isSoldOut ? "font-discount-highlight" : ""} ${isSoldOut ? "sold-out-hightlight" : ""}`} >{actualPrice}원</div>
      <div className="price-row">
        {discountRate > 0 && (<div className="pre-price-tag" >{productPrice}원</div>)}
        {discountRate > 0 && (<div className="discount-tag">{discountRate}% 할인</div>)}
      </div>

      {isSoldOut && (<div className="sold-out-tag">품절</div>)}
    </div>
  )

}
export default OfferCell 