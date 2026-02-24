import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./OfferInfo.css"
import type {Offer} from "../types/offer";
import { testOfferDetail } from '../testdata/testOfferDetail';
import api from "../api/axiosInstance";

function OfferInfo() {

  const {id} = useParams();
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
        <div className="main-header">
            <div className='main-header-menubox'>
                <input className = "main-searchbox"/>
                <div className = "main-search-button">검색</div>
                
            </div>

        </div>

        <div className = "main-center-zone">
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
                    <div className = {`offer-button  ${isSoldOut? "soldout-highlight":"offer-add-cart"}`}>{isSoldOut? ("품절"): ("장바구니")}</div>
                </div>
                </>

                )}
                
            </div>
            
        </div>
      
    </div>
  )

}
export default OfferInfo 