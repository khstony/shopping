import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Order } from "../types/order"
import "./OrderCell.css";


type OrderCellProps = Order;

function OrderCell(props: OrderCellProps) {
    const {
        address,
        buyerId,
        offerId,
        orderDate,
        quantity,
        sellerId,
        status
    } = props;


    const navigate = useNavigate();

    const statusMap = {
        ORDERED: "주문 완료",
        SHIPPED: "배송 중",
        COMPLETE: "배송 완료",
        CANCEL: "주문 취소"
    };

    const statusCss = {
        ORDERED: "ordered",
        SHIPPED: "배송 중",
        COMPLETE: "배송 완료",
        CANCEL: "주문 취소"
    };


    return (
        <div className="order-cell-wrapper">
            <div className={`order-cell-top`}>
                <div className={`order-status-tag ${statusMap[status]}`}>{statusMap[status]}</div>
                <div className="order-date-tag">주문 일자 : {orderDate}</div>
            </div>

            <div className='order-cell-center'>
                <div className="order-address">주소 : {address} </div>
            </div>

            <div className="order-cell-bottom">
                <div className="order-quantity">수량 : {quantity}개</div>
                <div className="order-buttons-section">

                    <div className="order-button">버튼1</div>
                    <div className="order-button">버튼2</div>
                </div>
            </div>

        </div>
    )

}
export default OrderCell 