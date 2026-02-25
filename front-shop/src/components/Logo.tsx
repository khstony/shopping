
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Offer } from "../types/offer"
import "./logo.css"
import logo from "../assets/logo-transparent.png"



function Logo(){

  const navigate = useNavigate();
  const gotoMain = () => {
    navigate("/main");
  }
  return (
    <div className = "main-logo-button" onClick={gotoMain}>
          <img
              className="main-logo"
              src={logo}
              alt="기"
            />
        </div>
  )

}
export default Logo 