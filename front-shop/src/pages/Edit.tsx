import React, { useEffect, useState, useRef } from 'react';
import { testshop } from "../testdata/testshop";
import type { Offer } from "../types/offer"
import api from "../api/axiosInstance";
import SellerOfferCell from "../components/SellerOfferCell"
import "./Upload.css"
import { useNavigate } from 'react-router-dom';

function Edit() {

    const [offerList, setOfferList] = useState<Offer | null>(null);
    const originalId = localStorage.getItem("offerIdKey");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [stock, setStock] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const idKey = localStorage.getItem("id"); // 현재 유저의 id값
    const token = localStorage.getItem("token");//유저토큰
    const [previewImage, setPreviewImage] = useState(""); //미리보기 이미지
    const imageRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();


    const fetchOffer = async () => {
        try {
            const response = await api.get(`/offers/load/single/${originalId}`)
            console.log("after herre + ", originalId);
            console.log("result = ", response.data);
            setOfferList(response.data);

            setName(response.data.productName || "");
            setDesc(response.data.productDesc || "");
            setPrice(String(response.data.productPrice || ""));
            setStock(String(response.data.stock || ""));
            setDiscount(String(response.data.discountRate || ""));
            setPreviewImage(response.data.productImage || "");


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchOffer();
        console.log("기존 오퍼의 정보를 불러옴, ", offerList);
    }, []);

    const saveImgFile = () => {
        if (!imageRef.current || imageRef.current?.files.length === 0) return;
        const file = imageRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        }

    }



    const editOffer = async () => {
        console.log("clik");
        if (!idKey) {
            alert("로그인이 필요합니다");
            return;
        }


        const formData = new FormData();
        formData.append("productName", name);
        formData.append("productDesc", desc);
        formData.append("productPrice", price);
        formData.append("stock", stock);
        formData.append("discountRate", discount);
        formData.append("uploader", idKey);

        if (imageRef.current && imageRef.current.files.length > 0) {
            formData.append("image", imageRef.current.files[0]);
        }

        try {
            const res = await api.put(
                `/offers/edit/${originalId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!originalId) {
                alert("상품아이디 부재");
                return;
            }
            alert("상품을 수정했습니다");
            console.log("수정 성공", res.data);
            navigate("/seller");
        } catch (err) {
            console.error("수정 실패", err);
        }
    }


    return (
        <div className="upload-main-wrapper">
            <div className="upload-main-header">
                <div className="upload-edit-mode">상품 내용 수정</div>
            </div>
            <div className="upload-seller-main-center-zone">

                <div className="upload-seller-top">
                    <div className="upload-left-section">
                        <div className="upload-image-section">
                            <img
                                className="upload-image-section"
                                src={previewImage}
                            />
                        </div>

                        <label htmlFor='input_file' className="upload-image-select-button">
                            이미지 선택
                        </label>
                        <input type="file" name="image" id="input_file" accept="image/*" onChange={saveImgFile} ref={imageRef} />

                        <div className='upload-inputs-wrap'>
                            <div className="upload-price-zone">
                                <div className="upload-price-tag">가격</div>
                                <input className='upload-price-input' value={price} type="number" onChange={(e) => setPrice(e.target.value)} />
                                <div className="upload-price-tag">원</div>
                            </div>

                            <div className="upload-stock-zone">
                                <div className="upload-stock-tag">할인</div>
                                <input className='upload-stock-input' value={discount} type="number" onChange={(e) => setDiscount(e.target.value)} />
                                <div className="upload-stock-tag">%</div>
                            </div>

                            <div className="upload-stock-zone">
                                <div className="upload-stock-tag">재고</div>
                                <input className='upload-stock-input' value={stock} type="number" onChange={(e) => setStock(e.target.value)} />
                                <div className="upload-stock-tag">개</div>
                            </div>
                        </div>


                    </div>
                    <div className="upload-right-section">
                        <div className="upload-title-tag">상품명</div>
                        <input className="upload-title-textbox" value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="upload-description-tag">상품 설명</div>
                        <textarea className="upload-description-textbox" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                </div>

                <div className='upload-seller-bottom'>
                    <div className='upload-confirm' onClick={editOffer}>수정 완료</div>
                </div>

            </div>
        </div>

    )
}
export default Edit