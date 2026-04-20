import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Order } from "../types/order"
import "./OrderCell.css";
import arrow from "../assets/arrow.png"


type OrderCellProps = Order & {
  fetchOrder: () => void;
};

function OrderCell(props: OrderCellProps) {
    const {
        address,
        buyerId,
        offerId,
        orderDate,
        quantity,
        sellerId,
        status,
        id,
        fetchOrder
    } = props;


    const navigate = useNavigate();

    const statusMap = {
        ORDERED: "주문 완료",
        SHIPPING: "배송 중",
        COMPLETE: "배송 완료",
        CANCEL: "주문 취소"
    };

    

    const statusSwitch = async() =>{
        //console.log(id);
        const newStatus = statusChanger(status);

        try{
            const response = await api.put("/order/edit", {
                id : id,
                address : address,
                buyerId : buyerId,
                status : newStatus,
                orderDate : orderDate,
                quantity : quantity,
                offerId : offerId,
                sellerId : sellerId,
            });
            //console.log("order edidte")
            fetchOrder();
            //console.log(response)
        }catch(error){
      //console.error(error.response.data);
      alert(error?.response?.data.message);
    }
    }

    function statusChanger(status){
        if(status === "ORDERED")
            return "SHIPPING";
        else if (status ==="SHIPPING")
            return "COMPLETE"
        else if (status ==="COMPLETE")
            return "CANCEL"
        else if (status ==="CANCEL")
            return "ORDERED"
    }

    return (
        <div className="order-cell-wrapper">
            <div className={`order-cell-top`}>
                <div className={`order-status-tag ${statusMap[String(status)]}`}>{statusMap[String(status)]}</div>
                <div className = "order-status-switch-button" onClick={statusSwitch}>
                    <img
                        className = "order-arrow-icon"
                        src ={arrow} 
                        alt = "aro"
                    />
                 
                </div>
                <div className="order-date-tag">주문 일자 : {orderDate.toLocaleString()}</div>
            </div>

            <div className='order-cell-center'>
                <div className="order-address">주소 : {address} </div>
            </div>

            <div className="order-cell-bottom">
                <div className="order-quantity">수량 : {quantity}개</div>
                <div className="order-buttons-section">

                    {/* <div className="order-button">버튼1</div>
                    <div className="order-button">버튼2</div> */}
                </div>
            </div>

        </div>
    )

}
export default OrderCell 