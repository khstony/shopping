import React, { useEffect, useState, useRef } from 'react';
import "./Register.css";

function Register() {

const [idRegister,setIdRegister] = useState("");
const [pwRegister,setPwRegister] = useState("");
const [nickRegister,setNickRegister] = useState("");
const [addressRegister,setAddressRegister] = useState("");
const [phoneRegister,setPhoneRegister] = useState("");
const [emailRegister,setEmailRegister] = useState("");

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
          <div className = "register-button-user-type">구매자</div>
          <div className = "register-button-user-type">판매자</div>
        </div>
      </div>

      <div className = "register-confirm-button">가입하기</div>
    </div>

  )
}
export default Register