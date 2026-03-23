import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import Header from "../components/Header";
import "./Chat.css";
import send from "../assets/send.png"
import api from "../api/axiosInstance";
import Message from "../components/Message";

function Chat() {

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const senderId = localStorage.getItem("id");
  const roomId = 1;     // 테스트용

  const fetchChat = async () =>{
      try{
        const response = await api.get(`/chatRoom/chat/load/${roomId}`);
        setMessages(response.data);
        console.log(response.data);
      }catch(error){
        console.error("메시지 패치 에러", error);
      }
  }

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws/chat");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("WebSocket 연결됨");

        // 채팅방 구독
        stompClient.subscribe(`/topic/chat/room/${roomId}`, (msg) => {
          const body = JSON.parse(msg.body);
          console.log("📩 받은 메시지:", body);

          setMessages(prev => [...prev, body]);
        });
      },

      onStompError: (frame) => {
        console.error("❌ STOMP 에러:", frame);
      }
    });

    

    stompClient.activate();
    setClient(stompClient);
    fetchChat();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  

  // 메시지 전송
  const sendMessage = () => {
    if (!client || !client.connected) {
      console.log("❌ 아직 연결 안됨");
      return;
    }

    const message = {
      roomId: roomId,
      senderId: senderId,
      message: input
    };

    client.publish({
      destination: "/app/chat/message",
      body: JSON.stringify(message)
    });

    console.log("📤 보낸 메시지:", message);

    setInput("");
  };

  return (
    <div className="chat-wrapper">
      <Header />
      <div className="chat-center-zone">
        <div className="chat-room-name">채팅 테스트</div>

        <div className="chat-msg-container">

          {messages.map((msg) => (
            <Message
              key = {msg.key}
              {...msg}
            />
          ))}
        </div>

        <div className="chat-bottom-zone">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지 입력"
          />

          <div className = "chat-send-button "onClick={sendMessage}>
             <img className = "chat-send-icon"
                  src = {send}
                  alt = "전송"/>
          </div>
        </div>


      </div>

    </div>
  );
}

export default Chat;