import React, { useEffect, useState, useRef } from 'react';
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import SellerOfferCell from "../components/SellerOfferCell"
import "./Upload.css"

function Upload() {
 


  const [offerList, setOfferList] = useState<Offer[]>([]);

  const fetchOffer = () =>{
    setOfferList(testshop);
  }

  useEffect(() => {
    fetchOffer();
    console.log("오퍼 패치됨", offerList);
  },[]);

  return (
    <div className = "upload-main-wrapper">
      <div className = "upload-main-header">
        
      </div>
      <div className = "upload-seller-main-center-zone">
        <div className = "upload-seller-top">
            <div className = "upload-left-section">
                <div className = "upload-image-section"></div>
                <div className = "upload-image-select-button">이미지 선택</div>
                <div className = "upload-price-zone">
                    <div className= "upload-price-tag">가격</div>
                    <input className='upload-price-input' type = "number"/>
                    <div className= "upload-price-tag">원</div>
                </div>

                <div className = "upload-stock-zone">
                    <div className= "upload-stock-tag">할인</div>
                    <input className='upload-stock-input' type = "number"/>
                    <div className= "upload-stock-tag">%</div>
                </div>

                <div className = "upload-stock-zone">
                    <div className= "upload-stock-tag">재고</div>
                    <input className='upload-stock-input' type = "number"/>
                    <div className= "upload-stock-tag">개</div>
                </div>
            </div>
            <div className = "upload-right-section">
                <div className = "upload-title-tag">상품명</div>
                <input className = "upload-title-textbox"/>
                <div className = "upload-description-tag">상품 설명</div>
                <textarea className = "upload-description-textbox"/>
            </div>
        </div>

        <div className='upload-seller-bottom'>
            <div className='upload-confirm'>등록하기</div>
        </div>
        
      </div>
    </div>

  )
}
export default Upload