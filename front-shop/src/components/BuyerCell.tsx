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
  const [lastMsg, setLastMsg] = useState("");
  const [preRoomId, setRoomId] = useState(null);
  const navigate = useNavigate();
  const fetchName = async () => {

    try {
      const res = await api.get(`/users/nickname/${buyerId}`);
      setNick(res.data);
      console.log("닉네임", res.data);
    } catch (err) {
      console.error("에러", err);
    }

  }



  const loadRoomId = async () => {
    try {
      const response = await api.post(`/chatRoom/chat/findRoom`, {
        buyerId: buyerId,
        offerId: offerId
      });

      setRoomId(response.data.id);
      console.log("저장된 방 아이디 : " + response.data.id);
    } catch (error) {
      console.log("방이 없으므로 생성합니다" + buyerId);
      try {
        const response = await api.post(`/chatRoom/chat/create`, {
          buyerId: buyerId,
          sellerId: sellerId,
          offerId: offerId
        });
        console.log("new created room id : " + response.data.id);
        setRoomId(response.data.id);


      } catch (error: any) {
        console.log(error);
      }

    }


  }

  const loadLastMsg = async () => {
    try {
      const response = await api.get(`/chatRoom/chat/room/topmsg/${preRoomId}`);
      setLastMsg(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchName();
    loadRoomId();
  }, []);

  useEffect(() => {
    if (preRoomId) {
      loadLastMsg();
    }
  }, [preRoomId]);

  const goChat = async () => {
    try {
      const response = await api.post(`/chatRoom/chat/findRoom`, {
        buyerId: buyerId,
        offerId: offerId
      });

      localStorage.setItem("roomId", response.data);
      console.log("new room id : " + response.data);
      console.log("방이 이미 있었습니다");
      navigate(`/chat`);
    } catch (error) {
      console.log("방이 없으므로 생성합니다" + buyerId);
      try {
        const response = await api.post(`/chatRoom/chat/create`, {
          buyerId: buyerId,
          sellerId: sellerId,
          offerId: offerId
        });
        console.log("new created room id : " + response.data.id);
        localStorage.setItem("roomId", response.data.id);
        navigate(`/chat`);

      } catch (error: any) {
        console.log(error);
      }

    }

  }

  return (
    <div className='buyer-cell-wrapper'>
      <div className='buyer-cell-top-zone'>
        <div className='buyer-name'>{buyerId} {nick}</div>
        <div className="buyercell-gochat" onClick={goChat}>이동</div>
      </div>
      방 : {preRoomId} 마지막 : {lastMsg}
    </div>
  )

}
export default BuyerCell 