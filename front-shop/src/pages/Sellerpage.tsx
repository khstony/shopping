import React, { useEffect, useState, useRef } from 'react';
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import SellerOfferCell from "../components/SellerOfferCell"
import "./Sellerpage.css";
import api from "../api/axiosInstance";

function SellerPage() {
 


  const [offerList, setOfferList] = useState<Offer[]>([]);
  const idKey = localStorage.getItem("id");
  const fetchOffer = async() =>{

    try{
      const res = await api.get(`offers/load/uploader/${idKey}`);
      setOfferList(res.data);
      console.log("오퍼 패치됨", res.data);
    } catch (err){
      console.error("에러", err);
    }
    
  }

  useEffect(() => {
    fetchOffer();
    console.log("오퍼 패치됨", offerList);
  },[]);

  return (
    <div className = "main-wrapper">
      <div className = "main-header">
        <div className = "main-header-menubox">
          <input className = "main-searchbox"/>
          <div className = "main-search-button">검색</div>
        </div>
      </div>
      <div className = "seller-main-center-zone">
        {offerList.map((offer) => (
          <SellerOfferCell
            key = {offer.offerId}
            {...offer}
            
          />
        ))} 
      </div>
    </div>

  )
}
export default SellerPage