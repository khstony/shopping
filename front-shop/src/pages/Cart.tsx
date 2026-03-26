import React, { useEffect, useState, useRef } from 'react';
import "./Cart.css";
import { testshop } from "../testdata/testshop";
import type { Offer } from "../types/offer"
import CartCell from "../components/CartCell";
import api from "../api/axiosInstance";
import logo from "../assets/logo-transparent.png"
import { useNavigate } from 'react-router-dom';
import Logo from "../components/Logo";
import Header from '../components/Header';

function Cart() {
  const [cartList, setCartList] = useState([]);

  const totalPrice = cartList.reduce((sum, cart) => {
    const actualPrice = cart.productPrice * (1 - cart.discountRate / 100);
    return sum + actualPrice * cart.quantity;
  }, 0);

  const id = localStorage.getItem("id");
  const userId = localStorage.getItem("userId");
  const fetchOffer = async () => {

    try {
      const res = await api.get(`/cart/view/${id}`);
      setCartList(res.data);
      console.log("아디" + id);
      console.log("장바구니 패치됨", res.data);
    } catch (err) {
      console.error("에러", err);
    }

  }

  useEffect(() => {
    fetchOffer();
    console.log("장바구니 패치됨", cartList);
  }, []);

  const purchase = async () => {
    try {
      const res = await api.post(`/cart/purchase/${id}`);
      alert("구매를 완료했습니다.");
      fetchOffer();
    } catch (err) {
      console.error("에러 : ", err);
      alert(error.res?.data.message)

    }
  }



  return (
    <div className="cart-wrapper">
      <Header />
      <div className="cart-center-zone">
        <div className="cart-list">
          {cartList.map((cart) => (
            <CartCell
              key={cart.id}
              {...cart}
              fetchOffer={fetchOffer}
            />
          ))}
        </div>

        {cartList.length == 0 && (
          <div className="cart-empty">
            장바구니에 담은 상품이 없습니다
          </div>
        )}

        {cartList.length > 0 && (
          <div className="cart-purchase-button" onClick={purchase}>
            총합 {totalPrice}원
            <div className="cart-purchase-text">구매</div>
          </div>
        )}

      </div>

    </div>

  )
}
export default Cart