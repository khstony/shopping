import React, { useEffect, useState, useRef } from 'react';
import "./Mainpage.css";

import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import OfferCell from "../components/OfferCell";
import api from "../api/axiosInstance";
import logo from "../assets/logo-transparent.png"
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../components/Logo";
import Banner from '../components/Banner';
import Header from '../components/Header';

function MainPage() {
 const location = useLocation();
 const params = new URLSearchParams(location.search);
 const navigate = useNavigate();

  const [offerList, setOfferList] = useState<Offer[]>([]);
  const keyword = params.get("keyword") || "";
 
  const fetchOffer = async() =>{

    try{
      const res = await api.get("offers/load",{
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


  const gotoMain =() =>{
    navigate("/main")
  }
  return (
    <div className = "main-wrapper">
      <Header/>
      <div className = "main-center-zone">
        <div className = "multi-banner">
          <Banner/>
        </div>
        <div className = "main-offer-list">
          {offerList.map((offer) => (
          <OfferCell
            key = {offer.offerId}
            {...offer}
            
          />
        ))}
        </div>
        
      </div>
    </div>

  )
}
export default MainPage