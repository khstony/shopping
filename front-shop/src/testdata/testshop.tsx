import type{Offer} from "../types/offer"

export const testshop : Offer[] = [
  {
    id: 1,
    uploader: 1,
    product_name: "무선 블루투스 이어폰",
    product_image: "/images/earphone.jpg",
    product_desc: "노이즈 캔슬링 기능이 포함된 무선 블루투스 이어폰입니다.",
    product_price: 89000,
    discount_rate: 0,
    stock: 50
  },
  {
    id: 2,
    uploader: 2,
    product_name: "게이밍 마우스",
    product_image: "/images/mouse.jpg",
    product_desc: "고감도 센서를 탑재한 RGB 게이밍 마우스입니다.",
    product_price: 45000,
    discount_rate: 15,
    stock: 120
  },
  {
    id: 3,
    uploader: 1,
    product_name: "기계식 키보드",
    product_image: "/images/keyboard.jpg",
    product_desc: "청축 스위치를 사용한 기계식 키보드입니다.",
    product_price: 120000,
    discount_rate: 20,
    stock: 30
  },
  {
    id: 4,
    uploader: 3,
    product_name: "27인치 모니터",
    product_image: "/images/monitor.jpg",
    product_desc: "QHD 해상도를 지원하는 27인치 모니터입니다.",
    product_price: 320000,
    discount_rate: 5,
    stock: 25
  },
  {
    id: 5,
    uploader: 2,
    product_name: "노트북 거치대",
    product_image: "/images/laptop_stand.jpg",
    product_desc: "각도 조절이 가능한 알루미늄 노트북 거치대입니다.",
    product_price: 39000,
    discount_rate: 10,
    stock: 0
  },
  {
    id: 6,
    uploader: 3,
    product_name: "외장 SSD 1TB",
    product_image: "/images/ssd.jpg",
    product_desc: "고속 전송을 지원하는 USB-C 외장 SSD입니다.",
    product_price: 185000,
    discount_rate: 0,
    stock: 40
  },
  {
    id: 7,
    uploader: 1,
    product_name: "스마트 워치",
    product_image: "/images/smartwatch.jpg",
    product_desc: "심박수 측정과 운동 기록이 가능한 스마트 워치입니다.",
    product_price: 210000,
    discount_rate: 18,
    stock: 0
  },
  {
    id: 8,
    uploader: 2,
    product_name: "블루투스 스피커",
    product_image: "/images/speaker.jpg",
    product_desc: "휴대성이 좋은 방수 블루투스 스피커입니다.",
    product_price: 78000,
    discount_rate: 8,
    stock: 90
  },
  {
    id: 9,
    uploader: 3,
    product_name: "웹캠",
    product_image: "/images/webcam.jpg",
    product_desc: "Full HD 화질의 화상회의용 웹캠입니다.",
    product_price: 65000,
    discount_rate: 25,
    stock: 70
  },
  {
    id: 10,
    uploader: 1,
    product_name: "USB-C 허브",
    product_image: "/images/hub.jpg",
    product_desc: "HDMI, USB, PD 충전을 지원하는 멀티 허브입니다.",
    product_price: 52000,
    discount_rate: 10,
    stock: 150
  }
];
