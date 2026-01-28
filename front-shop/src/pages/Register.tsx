import React, { useEffect, useState, useRef } from 'react';
import "./Register.css";

function Register() {
  return (
    <div className="register-wrapper">
      <div className="register-logo">회원가입</div>
      <div className="register-slot">

        <div className="register-extra-slot">
          <input className = "register-input" placeholder = "ID"></input>
          <input className = "register-input" placeholder = "PW" type = "password"></input>
        </div>
        <div className="register-extra-slot">
          <input className = "register-input" placeholder = "이름"></input>
          <input className = "register-input" placeholder = "주소"></input>
        </div>
        <div className="register-extra-slot">
          <input className = "register-input" placeholder = "전화번호"></input>
          <input className = "register-input" placeholder = "메일" type = "email"></input>
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