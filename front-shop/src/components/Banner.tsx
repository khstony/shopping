//물품 목록 정렬 & 필터링 버튼을 표시하는 컴포넌트
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Offer } from "../types/offer"
import "./Banner.css"
import logo from "../assets/logo-transparent.png"



function Banner({onSortChange}){
  
  const navigate = useNavigate();
  
  return (
    <div className = "banner-wrapper">
        <div className = "banner-button" onClick = {() => onSortChange("date")}>날짜순</div>
        <div className = "banner-button" onClick = {() => onSortChange("price")}>가격순</div>
        <div className = "banner-button" onClick = {() => onSortChange("stock")}>재고순</div>
    </div>
  )

}
export default Banner 