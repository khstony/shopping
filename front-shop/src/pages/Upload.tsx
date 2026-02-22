import React, { useEffect, useState, useRef } from 'react';
import { testshop } from "../testdata/testshop";
import type { Offer } from "../types/offer"
import api from "../api/axiosInstance";
import SellerOfferCell from "../components/SellerOfferCell"
import "./Upload.css"
import { useNavigate } from 'react-router-dom';

function Upload() {

  const [offerList, setOfferList] = useState<Offer[]>([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const idKey = localStorage.getItem("id"); // 현재 유저의 id값
  const token = localStorage.getItem("accessToken");//유저토큰
  const [previewImage, setPreviewImage] = useState(""); //미리보기 이미지
  const imageRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();


  const fetchOffer = () => {
    setOfferList(testshop);
  }

  useEffect(() => {
    fetchOffer();
    console.log("오퍼 패치됨", offerList);
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



  const uploadOffer = async () => {
    console.log("clik");
    if (!idKey) {
      alert("로그인이 필요합니다");
      return;
    }

    if (imageRef.current.files === null) {
      alert("이미지를 등록하십시오");
      return;
    }

    if (0) {

    }

    const formData = new FormData();
    formData.append("productName", name);
    formData.append("productDesc", desc);
    formData.append("productPrice", price);
    formData.append("stock", stock);
    formData.append("uploader", idKey);

    if (imageRef.current && imageRef.current.files.length > 0) {
      formData.append("image", imageRef.current.files[0]);
    }

    try {
      const res = await api.post("/offers/upload", formData);
      alert("상품을 등록했습니다");
      console.log("업로드 성공", res.data);
      navigate("/seller");
    } catch (err) {
      console.error("업로드 실패", err);
    }
  }


  return (
    <div className="upload-main-wrapper">
      <div className="upload-main-header">

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


            <div className="upload-price-zone">
              <div className="upload-price-tag">가격</div>
              <input className='upload-price-input' type="number" onChange={(e) => setPrice(e.target.value)} />
              <div className="upload-price-tag">원</div>
            </div>

            <div className="upload-stock-zone">
              <div className="upload-stock-tag">할인</div>
              <input className='upload-stock-input' type="number" onChange={(e) => setDiscount(e.target.value)} />
              <div className="upload-stock-tag">%</div>
            </div>

            <div className="upload-stock-zone">
              <div className="upload-stock-tag">재고</div>
              <input className='upload-stock-input' type="number" onChange={(e) => setStock(e.target.value)} />
              <div className="upload-stock-tag">개</div>
            </div>
          </div>
          <div className="upload-right-section">
            <div className="upload-title-tag">상품명</div>
            <input className="upload-title-textbox" onChange={(e) => setName(e.target.value)} />
            <div className="upload-description-tag">상품 설명</div>
            <textarea className="upload-description-textbox" onChange={(e) => setDesc(e.target.value)} />
          </div>
        </div>

        <div className='upload-seller-bottom'>
          <div className='upload-confirm' onClick={uploadOffer}>등록하기</div>
        </div>

      </div>
    </div>

  )
}
export default Upload