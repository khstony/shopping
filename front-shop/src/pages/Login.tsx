import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {


  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  }
  
  return (
    <div className="login-wrapper">
      <div className="login-logo">로그인</div>
      <input className="login-id-input" placeholder='아이디' />
      <input className="login-pw-input" placeholder='비밀번호' />
      <div className="login-confirm">확인</div>
      <div className="login-bottom-container">
        <div className="login-register-button" onClick={goToRegister}>회원가입</div>
      </div>

    </div>
  )

}
export default Login 