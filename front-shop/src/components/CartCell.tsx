import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Cart } from "../types/cart"
import "./CartCell.css";


type CartCellProps = Cart & {fetchOffer:() => void};

function CartCell(props: CartCellProps) {
  const {
    Id,
    ownerId,
    offerId,
    productName,
    productImage,
    quantity,
    productPrice,
    discountRate,
    stock,
    fetchOffer
  } = props;
  const token = localStorage.getItem("token");
  const isSoldOut = stock === 0;
  const isDiscounted = discountRate > 0;
  const actualPrice = productPrice * (1 - discountRate / 100);
  const navigate = useNavigate();

  const showInfo = () => {
    navigate(`/offer/${offerId}`);
  }

  const cartPlus = async () =>{
    console.log("플러스");
    try{
      const response = await api.put("/cart/addOne",{
        id : Id,
        ownerId : ownerId,
        offerId : offerId,
        quantity : quantity
      });
      console.log("플러스 수행");
      console.log(response);
      fetchOffer();
    }catch(error){
      console.error(error.response.data);
      alert(error?.response?.data.message);
    }
  }

  const cartMinus = async () =>{
    console.log("마이너스");
    try{
      const response = await api.put("/cart/minusOne",{
        id : Id,
        ownerId : ownerId,
        offerId : offerId,
        quantity : quantity
      });
      console.log("마이너스 수행");
      console.log(response);
      fetchOffer();
    }catch(error){
      console.error(error.response.data);
      alert(error?.response?.data.message);
    }
  }

  const cartDelete = async () =>{
    console.log("삭제");
    try{
      const response = await api.delete(`/cart/delete/${Id}`);
      console.log("삭제 수행");
      alert("상품을 삭제했습니다.");
      console.log(response);
      fetchOffer();
    }catch(error){
      console.error(error.response.data);
      alert(error?.response?.data.message);
    }
  }

  return (
    <div className="cart-cell-wrapper">
      {Id}/구매자{ownerId}/{offerId}/{quantity}
      <div className = "cart-cell-left-zone">
        <div className = "cart-cell-image">
          <img className="cart-cell-image-inner"
            src={productImage}
            alt={productName}/>
          {stock==0 &&(<div className = "cart-cell-soldout">품절</div>)}
          {stock < quantity &&(<div className = "cart-cell-quantity-out">재고 부족</div>)}
        </div>
      </div>
      <div className = "cart-cell-right-zone">
        <div className = "cart-cell-right-1">
            <div className = "cart-cell-product-name">{productName}</div>
            <div className = "cart-cell-product-price-zone">
              <div className = {`cart-cell-product-price ${isDiscounted? "cart-cell-discount-tag":""}`}>{actualPrice * quantity}원</div>
              {isDiscounted && 
              <div className = "cart-cell-discount-rate">
                <div className = "cart-cell-pre-discount">{productPrice * quantity}원 </div>
                {discountRate}% 할인</div>}
            </div>      
        </div>
        
        <div className = "cart-cell-right-2">
          <div className = "cart-quantity">수량 : {quantity}개</div>
          <div className = "cart-quantity-button-zone">
            <div className = "cart-quantity-button cart-button" onClick={cartPlus}>+</div>
            <div className = "cart-quantity-button cart-button" onClick={cartMinus}>-</div>
          </div>   
        </div>

        <div className = "cart-cell-right-3">
          <div className = "cart-action-button cart-button" onClick = {cartDelete}>삭제</div>
          <div className = "cart-action-button cart-button">버튼2</div>
          <div className = "cart-action-button cart-button">버튼3</div>
        </div>

        
      </div>
      
    </div>
  )

}
export default CartCell 