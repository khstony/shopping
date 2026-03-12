import React, { useEffect, useState, useRef } from 'react';
import "./Cart.css";
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import OfferCell from "../components/OfferCell";
import api from "../api/axiosInstance";
import logo from "../assets/logo-transparent.png"
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo";
import Header from '../components/Header';

function Cart() {
  const [cartList, setCartList] = useState([]);

  const id = localStorage.getItem("id");
  const userId = localStorage.getItem("userId");
  const fetchOffer = async() =>{

    try{
      const res = await api.get(`/cart/view/${id}`);
      setCartList(res.data);
      console.log("아디"+id);
      console.log("장바구니 패치됨", res.data);
    } catch (err){
      console.error("에러", err);
    }
    
  }

  useEffect(() => {
    fetchOffer();
    console.log("오퍼 패치됨", cartList);
  },[]);


  
  return (
    <div className = "cart-wrapper">
      <Header/>
      <div className = "cart-center-zone">
    {id}, {userId}
      </div>
    </div>

  )
}
export default Cart