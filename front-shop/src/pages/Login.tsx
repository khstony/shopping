import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../api/axiosInstance";

function Login() {


  const navigate = useNavigate();
  const [idLogin,setIdLogin] = useState("");
  const [pwLogin,setPwLogin] = useState("");

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
            localStorage.setItem("accessToken", token);
            localStorage.setItem("userId", idLogin);
            localStorage.setItem("id", idKey);
            console.log(response);
            alert("로그인");
            navigate("/main");
        } catch (error) {
            console.error(error);
            alert("로그인 실패: " );
        }
    };

  return (
    <div className="login-wrapper">
      <div className="login-logo">로그인</div>
      <input className="login-id-input" placeholder='아이디' onChange={(e) => setIdLogin(e.target.value)} />
      <input className="login-pw-input" placeholder='비밀번호' onChange={(e) => setPwLogin(e.target.value)}/>
      <div className="login-confirm" onClick={loginConfirm}>확인</div>
      <div className="login-bottom-container">
        <div className="login-register-button" onClick={goToRegister}>회원가입</div>
      </div>

    </div>
  )

}
export default Login 