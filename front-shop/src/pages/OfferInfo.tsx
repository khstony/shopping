import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./OfferInfo.css"
import type {Offer} from "../types/offer";
import { testOfferDetail } from '../testdata/testOfferDetail';
import api from "../api/axiosInstance";
import Logo from "../components/Logo";
import Header from "../components/Header";
function OfferInfo() {

  const {id} = useParams();
  const idKey = localStorage.getItem("id");
  const navigate = useNavigate();
  const [offerDetail, setOfferDetail] = useState<Offer>();

  const fetchOfferDetail = async () =>{
    try{
        const response = await api.get(`/offers/load/single/${id}`);
        setOfferDetail(response.data);
        console.log(response.data);
    }catch(error){
        console.error("info 로딩 중에러", error);
    }

  }

  const addCart = async() => {
    console.log("오퍼"+offerDetail?.offerId);
    console.log("판매상"+offerDetail?.uploaderId);
    
    
    
    try{
        const response = await api.post("/cart/add", {
            ownerId: idKey,
            offerId: offerDetail?.offerId,
            quantity: 1
        });
        
        console.log(response);
        alert("장바구니에 상품을 추가했습니다");
    }catch(error){
    console.error(error.response?.data);
    alert(error.response?.data.message)
  }
  };

  useEffect(() => {
    if(!id) return;
    fetchOfferDetail();
  }, [id]);
  
  if (!offerDetail) return <div>로딩중...</div>;
  const isDiscounted = offerDetail.discountRate>0;
  const actualPrice = offerDetail.productPrice * (1 - offerDetail.discountRate / 100);
  const isSoldOut = offerDetail.stock === 0;
          

  return (
    <div className="main-wrapper">
        <Header/>

        <div className = "offer-center-zone">
            <div className = "offer-image">
                <img
                    className = "offer-image-inner"
                    src = {offerDetail.productImage}
                    alt = {offerDetail.productName}
                />
                {isSoldOut && <div className = "soldout-tag">품절</div>}
            </div>
            <div className = "offer-extra-zone">
                {offerDetail && (<>
                <div className = "offer-product-name">{offerDetail.productName}</div>
                {offerDetail.discountRate>0 && (<div className = "offer-discount-exclusive-section">
                    <div className = "offer-pre-discount">{offerDetail.productPrice}원</div>
                    <div className = "offer-discount-rate">{offerDetail.discountRate}% 할인</div>
                </div>)}
                <div className = {`offer-product-price ${isDiscounted? "discount-highlight":""}`}>{actualPrice}원</div>
                <div className = "offer-product-description">{offerDetail.productDesc}</div>
                <div className = "offer-product-button-zone">
                    <div className = "offer-button offer-check-chat">문의하기</div>
                    <div className = {`offer-button  ${isSoldOut? "soldout-highlight":"offer-add-cart"}`} onClick={addCart}>{isSoldOut? ("품절"): ("장바구니")}</div>
                </div>
                </>

                )}
                
            </div>
            
        </div>
      
    </div>
  )

}
export default OfferInfo 