import React, { useEffect, useState, useRef } from 'react';
import "./Chat.css";
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import CartCell from "../components/CartCell";
import api from "../api/axiosInstance";
import logo from "../assets/logo-transparent.png"
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo";
import Header from '../components/Header';

function Chat() {



  
  return (
    <div className = "chat-wrapper">
      <Header/>
      <div className = "chat-center-zone">

      </div>
      
    </div>

  )
}
export default Chat