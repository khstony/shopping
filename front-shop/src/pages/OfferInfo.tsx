import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "./OfferInfo.css"
import type { Offer } from "../types/offer";
import { testOfferDetail } from '../testdata/testOfferDetail';
import api from "../api/axiosInstance";
import Logo from "../components/Logo";
import Header from "../components/Header";
import OrderCell from '../components/OrderCell';

function OfferInfo() {

    const { id } = useParams();
    const idKey = localStorage.getItem("id");
    const userType = localStorage.getItem("userType");
    const navigate = useNavigate();
    const [offerDetail, setOfferDetail] = useState<Offer>();
    const [orderList, setOrderList] = useState([]);

    const fetchOfferDetail = async () => {
        try {
            const response = await api.get(`/offers/load/single/${id}`);
            setOfferDetail(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("info 로딩 중에러", error);
        }

    }

    const goChat = async () => {
        try {
            const response = await api.post(`/chatRoom/chat/findRoom`, {
                buyerId: idKey,
                offerId: offerDetail?.offerId
            });

            localStorage.setItem("roomId", response.data);
            console.log("new room id : "+ response.data);
            navigate(`/chat`);
        }catch(error){
            console.log("방이 없으므로 생성합니다" + offerDetail?.uploaderId);
            try{
                const response = await api.post(`/chatRoom/chat/create`,{
                    buyerId : idKey,
                    sellerId : offerDetail?.uploaderId,
                    offerId : offerDetail?.offerId
                });
                console.log("new created room id : " + response.data.id);
                 localStorage.setItem("roomId",  response.data.id);
                 navigate(`/chat`);
               
            }catch(error: any){
                console.log(error);
            }
            
        }
        
    }



    const fetchOrder = async () => {
        try {
            const res = await api.get(`/order/load/${id}`)
            setOrderList(res.data);
            console.log(res.data);
        } catch (error) {
            console.log("오더 에러", error);
        }
    }

    const addCart = async () => {
        console.log("오퍼" + offerDetail?.offerId);
        console.log("판매상" + offerDetail?.uploaderId);

        try {
            const response = await api.post("/cart/add", {
                ownerId: idKey,
                offerId: offerDetail?.offerId,
                quantity: 1
            });

            console.log(response);
            alert("장바구니에 상품을 추가했습니다");
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data.message)
        }
    };



    useEffect(() => {
        if (!id) return;
        fetchOfferDetail();
        fetchOrder();
    }, [id]);


    if (!offerDetail) return <div>로딩중...</div>;
    const isDiscounted = offerDetail.discountRate > 0;
    const actualPrice = offerDetail.productPrice * (1 - offerDetail.discountRate / 100);
    const isSoldOut = offerDetail.stock === 0;


    return (
        <div className="main-wrapper">
            <Header />

            <div className="offer-center-zone">
                <div className="offer-top-zone">
                    <div className="offer-image">
                        <img
                            className="offer-image-inner"
                            src={offerDetail.productImage}
                            alt={offerDetail.productName}
                        />
                        {isSoldOut && <div className="soldout-tag">품절</div>}
                    </div>
                    <div className="offer-extra-zone">
                        {offerDetail && (<>
                            <div className="offer-product-name">{offerDetail.productName}</div>
                            {offerDetail.discountRate > 0 && (<div className="offer-discount-exclusive-section">
                                <div className="offer-pre-discount">{offerDetail.productPrice}원 </div>
                                <div className="offer-discount-rate">{offerDetail.discountRate}% 할인</div>
                            </div>)}
                            <div className={`offer-product-price ${isDiscounted ? "discount-highlight" : ""}`}>{actualPrice}원</div>
                            <div className="offer-product-description">{offerDetail.productDesc}</div>

                            {userType === "BUYER" && (
                                <div className="offer-product-button-zone">
                                    <div className="offer-button offer-check-chat" onClick={goChat}>문의하기</div>
                                    <div className={`offer-button  ${isSoldOut ? "soldout-highlight" : "offer-add-cart"}`} onClick={addCart}>{isSoldOut ? ("품절") : ("장바구니")}</div>
                                </div>
                            )}



                        </>

                        )}

                    </div>
                </div>
                <div className="offer-bottom-zone">
                    {userType === "SELLER" && (
                        <div>
                            <div className = "offer-list-header">주문 리스트</div>
                            {orderList.map((order) => (
                                <OrderCell
                                    key={order.orderId}
                                    {...order}
                                    fetchOrder={fetchOrder}
                                />
                            ))}
                        </div>

                    )}
                </div>


            </div>

        </div>
    )

}
export default OfferInfo 