
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Offer } from "../types/offer"
import "./Logo.css"
import logo from "../assets/logo-transparent.png"



function Logo() {
  const userType = localStorage.getItem("userType");
  const idKey = localStorage.getItem("id"); //db넘버
    const [nick, setNick] = useState("");
  const navigate = useNavigate();
  const gotoMain = () => {
    //console.log("btn cliked");
    //console.log(userType);
    //console.log(nick);
    if (userType == "BUYER")
      navigate("/main");
    else if (userType == "SELLER") {
      navigate("/seller")
    }
  }

  const fetchName = async () => {

    try {
      const res = await api.get(`/users/nickname/${idKey}`);
      setNick(res.data);
     // console.log("닉네임", res.data);
    } catch (err) {
      //console.error("닉네임에러 : ", err);
    }

    

  }
  useEffect(() => {
        fetchName();
      }, [idKey]);
  return (
    <div className="main-logo-button" onClick={gotoMain}>
      
      
      <img
        className="main-logo"
        src={logo}
        alt="기"
      />
    </div>
  )

}
export default Logo 