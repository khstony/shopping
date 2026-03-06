import React, { useEffect, useState, useRef } from 'react';
import "./Mainpage.css";
import {testshop} from "../testdata/testshop";
import type { Offer } from "../types/offer"
import OfferCell from "../components/OfferCell";
import api from "../api/axiosInstance";
import logo from "../assets/logo-transparent.png"
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo";
import Banner from '../components/Banner';

function Cart() {
 



  
  return (
    <div className = "">
    cart
    </div>

  )
}
export default Cart