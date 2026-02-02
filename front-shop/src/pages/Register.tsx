import React, { useEffect, useState, useRef } from 'react';
import "./Register.css";
import api from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

function Register() {

const navigate = useNavigate();
const [idRegister,setIdRegister] = useState("");
const [pwRegister,setPwRegister] = useState("");
const [nickRegister,setNickRegister] = useState("");
const [addressRegister,setAddressRegister] = useState("");
const [phoneRegister,setPhoneRegister] = useState("");
const [emailRegister,setEmailRegister] = useState("");
const [userType, setUserType] = useState("");

const registerConfirm = async () => {
  if(userType !== "BUYER" && userType !=="SELLER"){
    alert("구매자나 판매자 중에서 선택하세요");
    return;
  }

  try{
    const response = await api.post("/users/register", {
        userId : idRegister,
        password : pwRegister,
        nickname : nickRegister,
        address : addressRegister,
        phone : phoneRegister,
        email : emailRegister,
        userType : userType
    });

    alert("회원가입을 완료했습니다");
    console.log(response);
    navigate("/");
  } catch(error){
    console.error(error);
    alert("에러 발생");
  }
};

const clickNormal = () =>{
  setUserType("BUYER");
}

const clickSeller = () =>{
  setUserType("SELLER");
}

  return (
    <div className="register-wrapper">
      <div className="register-logo">회원가입</div>
      <div className="register-slot">

        <div className="register-extra-slot">
          <input className = "register-input" placeholder = "ID" onChange={(e) => setIdRegister(e.target.value)}></input>
          <input className = "register-input" placeholder = "PW" onChange={(e) => setPwRegister(e.target.value)} type = "password"></input>
        </div>
        <div className="register-extra-slot">
          <input className = "register-input" placeholder = "이름" onChange={(e) => setNickRegister(e.target.value)}></input>
          <input className = "register-input" placeholder = "주소" onChange={(e) => setAddressRegister(e.target.value)}></input>
        </div>
        <div className="register-extra-slot">
          <input className = "register-input" placeholder = "전화번호" onChange={(e) => setPhoneRegister(e.target.value)}></input>
          <input className = "register-input" placeholder = "메일" onChange={(e) => setEmailRegister(e.target.value)} type = "email"></input>
        </div>
        <div className = "register-extra-slot">
          <div className =  {`register-button-user-type ${userType === "BUYER" ? "button-selected":"" }`} onClick={clickNormal}>구매자</div>
          <div className =  {`register-button-user-type ${userType === "SELLER" ? "button-selected":"" }`} onClick = {clickSeller}>판매자</div>
        </div>
      </div>

      <div className = "register-confirm-button" onClick={registerConfirm}>가입하기</div>
    </div>

  )
}
export default Register