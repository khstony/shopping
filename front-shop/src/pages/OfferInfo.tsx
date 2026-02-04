import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./MainPage.css"
import "./OfferInfo.css"
import type {Offer} from "../types/offer";
import { testOfferDetail } from '../testdata/testOfferDetail';
import api from "../api/axiosInstance";

function OfferInfo() {


  const navigate = useNavigate();
  const [offerDetail, setOfferDetail] = useState<Offer>();

  const fetchOfferDetail = () =>{
    setOfferDetail(testOfferDetail);
  }

  useEffect(() => {
    fetchOfferDetail();
    console.log("상세정보 패치", testOfferDetail);
  });
  
  if (!offerDetail) return <div>로딩중...</div>;
  const isDiscounted = offerDetail.discount_rate>0;
  const actualPrice = offerDetail.product_price * (1 - offerDetail.discount_rate / 100);
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
                {isSoldOut && <div className = "soldout-tag">품절</div>}
            </div>
            <div className = "offer-extra-zone">
                {offerDetail && (<>
                <div className = "offer-product-name">{offerDetail.product_name}</div>
                {offerDetail.discount_rate>0 && (<div className = "offer-discount-exclusive-section">
                    <div className = "offer-pre-discount">{offerDetail.product_price}원</div>
                    <div className = "offer-discount-rate">{offerDetail.discount_rate}% 할인</div>
                </div>)}
                <div className = {`offer-product-price ${isDiscounted? "discount-highlight":""}`}>{actualPrice}원</div>
                <div className = "offer-product-description">{offerDetail.product_desc}</div>
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