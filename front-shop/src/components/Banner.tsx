//물품 목록 정렬 & 필터링 버튼을 표시하는 컴포넌트
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
        <div className = "banner-button" onClick = {gotoMain}>날짜순</div>
        <div className = "banner-button">가격순</div>
        <div className = "banner-button">재고순</div>
    </div>
  )

}
export default Banner 