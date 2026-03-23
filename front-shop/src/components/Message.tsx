import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Message } from "../types/message"
import "./Message.css";


type MessageProps = Message;

function Message(props: MessageProps) {
  const {
    id,
    roomId,
    senderId,
    message,
    createdAt
  } = props;


  
  const idKey = localStorage.getItem("id");



 

  return (
   <div className = "message-wrapper">
    <div className = {idKey == senderId ? "message-me" : "message-you" }>
         {id} {roomId} {senderId} {message}
    </div>
   </div>
  )

}
export default Message 
