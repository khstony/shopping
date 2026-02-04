import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type {Offer} from "../types/offer"
import "./OfferCell.css";

type OfferCellProps = Offer;

function OfferCell(props: Offer) {
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
    <div className="cell-wrapper">
        <div className = "cell-image"></div>
        <div className = {`cell-product-name`}>{product_name} {stock}개</div>
        
        <div className = {`cell-product-price ${isDiscounted && !isSoldOut? "font-discount-highlight" : ""} ${isSoldOut? "sold-out-hightlight" : ""}` } >{actualPrice}원</div>
        <div className = "price-row">
            {discount_rate > 0 &&(<div className = "pre-price-tag">{product_price}원</div>)}
            {discount_rate > 0 &&(<div className = "discount-tag">{discount_rate}% 할인</div>)}
        </div>
        
        {isSoldOut && (<div className = "sold-out-tag">품절</div>)}
    </div>
  )

}
export default OfferCell 