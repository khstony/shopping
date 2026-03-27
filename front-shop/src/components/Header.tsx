
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
  const [nick, setNick] = useState("");
  const idKey = localStorage.getItem("id");
  const goCart = () => {
    navigate("/cart");
  }
  const userType = localStorage.getItem("userType");
  const fetchName = async () => {

    try {
      const res = await api.get(`/users/nickname/${idKey}`);
      setNick(res.data);
      console.log("닉네임", res.data);
    } catch (err) {
      console.error("닉네임에러 : ", err);
    }

    

  }
  useEffect(() => {
        fetchName();
      }, [idKey]);

  return (
    <div className = "header-wrapper">
        <Logo/>
        
        <div className = "header-menubox">
          <div className='header-nick'>{nick}</div>
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