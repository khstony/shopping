export interface Message {
    id : number;
  roomId : number;
  senderId : number;
  senderName : string;
  message : string;
  createdAt : Date;
}