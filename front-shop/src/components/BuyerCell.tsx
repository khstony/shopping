import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { chatRoom } from "../types/chatRoom"
import "./BuyerCell.css";


type ChatRoomCellProps = chatRoom;

function BuyerCell(props: ChatRoomCellProps) {
  const {
    id,
    createdAt,
    buyerId,
    sellerId,
    offerId
  } = props;
  const [nick, setNick] = useState("");
  const navigate = useNavigate();
  const fetchName = async() =>{

    try{
      const res = await api.get(`/users/nickname/${buyerId}`);
      setNick(res.data);
      console.log("닉네임", res.data);
    } catch (err){
      console.error("에러", err);
    }
    
  }

  useEffect(() => {
      fetchName();
    },[]);

const goChat = async () => {
        try {
            const response = await api.post(`/chatRoom/chat/findRoom`, {
                buyerId: buyerId,
                offerId: offerId
            });

            localStorage.setItem("roomId", response.data);
            console.log("new room id : "+ response.data);
            navigate(`/chat`);
        }catch(error){
            console.log("방이 없으므로 생성합니다" + buyerId);
            try{
                const response = await api.post(`/chatRoom/chat/create`,{
                    buyerId : buyerId,
                    sellerId : sellerId,
                    offerId : offerId
                });
                console.log("new created room id : " + response.data.id);
                 localStorage.setItem("roomId",  response.data.id);
                 navigate(`/chat`);
               
            }catch(error: any){
                console.log(error);
            }
            
        }
        
    }

  return (
    <div>
      {buyerId} {nick}
      <div className = "buyercell-gochat" onClick = {goChat}>이동</div>
    </div>
  )

}
export default BuyerCell 