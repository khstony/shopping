
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Offer } from "../types/offer"
import logo from "../assets/logo-transparent.png"
import "./Header.css"
import Logo from "../components/Logo"


function Header(){

  const navigate = useNavigate();
  const gotoMain = () => {
    navigate("/main");
  }
  return (
    <div className = "header-wrapper">
        <Logo/>
        <div className = "header-menubox">
          
          <input className = "header-searchbox"/>
          <div className = "header-search-button">검색</div>
        </div>
        
      </div>
  )

}
export default Header 