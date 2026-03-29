import React, { useEffect, useState, useRef } from 'react';
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import SellerOfferCell from "../components/SellerOfferCell"
import "./Sellerpage.css";
import api from "../api/axiosInstance";
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
function SellerPage() {
 

const location = useLocation();
 const params = new URLSearchParams(location.search);
  const [offerList, setOfferList] = useState<Offer[]>([]);
  const idKey = localStorage.getItem("id");
  const keyword = params.get("keyword") || "";
  const fetchOffer = async() =>{

    try{
      const res = await api.get(`offers/load/uploader/${idKey}`,{
        params:{
          keyword : keyword || ""
        }
      });
      setOfferList(res.data);
      console.log("오퍼 패치됨", res.data);
    } catch (err){
      console.error("에러", err);
    }
    
  }

  useEffect(() => {
    fetchOffer(keyword);
    console.log("오퍼 패치됨", offerList);
  },[keyword]);

  return (
    <div className = "main-wrapper">
      <Header/>
      <div className = "seller-main-center-zone">
        <div className = "seller-main-list">
          {offerList.map((offer) => (
          <SellerOfferCell
            key = {offer.offerId}
            {...offer}
            
          />
        ))} 
        </div>
        
      </div>
    </div>

  )
}
export default SellerPage