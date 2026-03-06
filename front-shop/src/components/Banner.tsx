
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Offer } from "../types/offer"
import "./Banner.css"
import logo from "../assets/logo-transparent.png"



function Banner(){

  const navigate = useNavigate();
  const gotoMain = () => {
    navigate("/main");
  }
  return (
    <div className = "banner-wrapper">
        <div className = "banner-button" onClick = {gotoMain}>상품</div>
        <div className = "banner-button">장바구니</div>
        <div className = "banner-button">상품</div>
    </div>
  )

}
export default Banner 