export interface Message {
    id : number;
  roomId : number;
  senderId : number;
  message : string;
  createdAt : Date;
}