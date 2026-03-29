
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
  const [searchWord, setSearchWord] = useState("");
  const idKey = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const goCart = () => {
    navigate("/cart");
  }
  
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


  const search = () => {
    console.log("검색버튼 클릭" + searchWord);

    if(userType === "BUYER"){
      navigate(`/main?keyword=${encodeURIComponent(searchWord)}`);
    }
    else{
      navigate(`/seller?keyword=${encodeURIComponent(searchWord)}`);
    }
  }

  return (
    <div className = "header-wrapper">
        <Logo/>
        
        <div className = "header-menubox">
          <div className='header-nick'>{nick}</div>
          <input className = "header-searchbox" onChange={(e) => setSearchWord(e.target.value)}/>
          <div className = "header-search-button" onClick={search}>검색</div>
          
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