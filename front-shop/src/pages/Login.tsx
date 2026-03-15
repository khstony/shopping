import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../api/axiosInstance";

function Login() {


  const navigate = useNavigate();
  const [idLogin, setIdLogin] = useState("");
  const [pwLogin, setPwLogin] = useState("");

  const goToRegister = () => {

    navigate("/register");
  }

  const loginConfirm = async () => {
    try {
      const response = await api.post("/users/login", {
        userId: idLogin,
        password: pwLogin
      });


      const token = response.data.token;
      const idKey = response.data.id;
      const userType = response.data.userType;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", idLogin); //입력한 문자열 id
      localStorage.setItem("id", idKey); //db넘버
      console.log("아이디넘버"+idKey);
      console.log("응답"+response);
      if(response.data.userType == "BUYER"){
        localStorage.setItem("userType", userType);
          navigate("/main");
      }
      else if(response.data.userType = "SELLER"){
        localStorage.setItem("userType", userType);
          navigate("/seller");
      }
      else if(response.data.userType = "ADMIN"){
        localStorage.setItem("userType", userType);
          navigate("/seller");
      }
      alert("로그인");
      
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data.message)
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo">로그인</div>
      <input className="login-id-input" placeholder='아이디' onChange={(e) => setIdLogin(e.target.value)} />
      <input className="login-pw-input" type = "password" placeholder='비밀번호' onChange={(e) => setPwLogin(e.target.value)} />
      <div className="login-confirm" onClick={loginConfirm}>확인</div>
      <div className="login-bottom-container">
        <div className="login-register-button" onClick={goToRegister}>회원가입</div>
      </div>

    </div>
  )

}
export default Login 