import React, { useEffect, useState, useRef } from 'react';
import "./Mainpage.css";
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import OfferCell from "../components/OfferCell";
import api from "../api/axiosInstance";
import logo from "../assets/logo-transparent.png"
import { useNavigate } from 'react-router-dom';
import Logo from "../components/logo";

function MainPage() {
 
 const navigate = useNavigate();

  const [offerList, setOfferList] = useState<Offer[]>([]);

  const fetchOffer = async() =>{

    try{
      const res = await api.get('offers/load');
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


  const gotoMain =() =>{
    navigate("/main")
  }
  return (
    <div className = "main-wrapper">
      <div className = "main-header">
        <Logo/>
        <div className = "main-header-menubox">
          
          <input className = "main-searchbox"/>
          <div className = "main-search-button">검색</div>
        </div>
        <div className = "main-cart-button">장</div>
      </div>
      <div className = "main-center-zone">
        {offerList.map((offer) => (
          <OfferCell
            key = {offer.offerId}
            {...offer}
            
          />
        ))}
      </div>
    </div>

  )
}
export default MainPage