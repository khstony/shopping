
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Offer } from "../types/offer"
import logo from "../assets/logo-transparent.png"
import "./Header.css"
import Logo from "../components/Logo"
import icon from "../assets/shopping-cart (1).png"

function Header(){

  const navigate = useNavigate();
  const goCart = () => {
    navigate("/cart");
  }
  const userType = localStorage.getItem("userType");

  return (
    <div className = "header-wrapper">
        <Logo/>
        <div className = "header-menubox">
          
          <input className = "header-searchbox"/>
          <div className = "header-search-button">검색</div>
          
        </div>
        {userType === "BUYER" && (
          <div className = "header-cart-button" onClick={goCart}>
            <img className = "header-cart-icon"
                  src = {icon}
                  alt = "carrt"/>
          </div>
          )}
     
      </div>
  )

}
export default Header 