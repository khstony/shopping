import React, { useEffect, useState, useRef } from 'react';
import "./Mainpage.css";
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import OfferCell from "../components/OfferCell";

function SellerPage() {
 


  const [offerList, setOfferList] = useState<Offer[]>([]);

  const fetchOffer = () =>{
    setOfferList(testshop);
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
      <div className = "main-center-zone">
        {offerList.map((offer) => (
          <OfferCell
            key = {offer.id}
            {...offer}
            
          />
        ))}
      </div>
    </div>

  )
}
export default SellerPage