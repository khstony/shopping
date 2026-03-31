import React, { useEffect, useState, useRef } from 'react';
import "./Mainpage.css";

import { testshop } from "../testdata/testshop";
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
  const [sortedOffers, setSortedOffers] = useState<Offer[]>([]);
  const keyword = params.get("keyword") || "";
  const [isAsc, setIsAsc] = useState(true);
  const [sortType, setSortType] = useState("");

  const handleSort = (type) => {
    let sorted = [...offerList];
    let asc = true;
    console.log("sorting...");
    if(sortType === type){
        asc = !isAsc
    }
    else{
        asc = true;
    }
    if (type === "price") {
      sorted.sort((a, b) => asc ? a.productPrice - b.productPrice : b.productPrice - a.productPrice);
  
      console.log(asc);
    }

    else if (type === "stock") {
      sorted.sort((a, b) => asc? a.stock - b.stock :  b.stock - a.stock);
      console.log(asc);
    }
    else if (type === "date") {
      sorted.sort((a, b) => asc?  a.offerId - b.offerId : b.offerId - a.offerId);
      console.log(asc);
    }
    setSortType(type);
    setIsAsc(asc);
    setSortedOffers(sorted);
  }

  const fetchOffer = async () => {

    try {
      const res = await api.get("offers/load", {
        params: {
          keyword: keyword || ""
        }
      });
      setOfferList(res.data);
      setSortedOffers(res.data);

      console.log("오퍼 패치됨", res.data);
    } catch (err) {
      console.error("에러", err);
    }

  }

  useEffect(() => {
    fetchOffer(keyword);
    console.log("오퍼 패치됨", offerList);
  }, [keyword]);



  return (
    <div className="main-wrapper">
      <Header />
      <div className="main-center-zone">
        <div className="multi-banner">
          <Banner onSortChange={handleSort} />
        </div>
        <div className="main-offer-list">
          {sortedOffers.map((offer) => (
            <OfferCell
              key={offer.offerId}
              {...offer}

            />
          ))}
        </div>

      </div>
    </div>

  )
}
export default MainPage