import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type {Offer} from "../types/offer"
import ReactDOM from "react-dom";
import "./SellerOfferCell.css";
import type { chatRoom } from '../types/chatRoom';
import BuyerCell from './BuyerCell';

type OfferCellProps = Offer;

function SellerOfferCell(props: OfferCellProps) {
  const {
    offerId,
    uploaderId,
    productName,
    productImage,
    productDesc,
    productPrice,
    discountRate,
    stock,
  } = props;
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [buyers, setBuyers] = useState<chatRoom[]>([]);
  const isSoldOut = stock===0;
  const isDiscounted = discountRate > 0;
  const actualPrice = productPrice * (1 - discountRate/100);

  const showInfo = () =>{
    navigate(`/offer/${offerId}`);
  }

  const goEdit = () => {
    localStorage.setItem("offerIdKey", offerId.toString());
    //console.log("goedit id + " + offerId);
    navigate("/edit");
  }
  const fetchBuyer = async() =>{

    try{
      const res = await api.get(`/chatRoom/chat/findRoomsForSeller/${offerId}`);
      setBuyers(res.data);
      
      //console.log("고객 패치됨", res.data);
    } catch (err){
      //console.error("에러", err);
    }
    
  }
    const showModal = () =>{
    //console.log("modal toggled");
    fetchBuyer();
    setModal(!modal);
  }

  const listModal = (
    <div className='offercell-chat-list-overlay'>
        <div className = "offercell-chat-list-wrapper">
             <div className = 'offercell-chat-list-top'>문의 목록</div>
             <div className = 'offercell-chat-list-zone'>
                {buyers.map((buyer) => (
                    <BuyerCell
                        key = {buyer.buyerId}
                        {...buyer}
                    />
                ))}
             </div>
             <div className = "offercell-chat-close" onClick = {showModal}>닫기</div>
        </div>
    </div>
  )


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
                    <div className = "cell-seller-button" onClick={showInfo}>주문</div>
                    <div className = "cell-seller-button" onClick = {showModal}>문의</div>
                    <div className = "cell-seller-button" onClick = {goEdit}>수정</div>
                   
                </div>
            </div>
            
        </div>
         {modal && ReactDOM.createPortal(listModal, document.body)}
    </div>
  )

}
export default SellerOfferCell 