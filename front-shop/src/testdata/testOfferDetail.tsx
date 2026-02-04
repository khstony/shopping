import type { Offer } from "../types/offer";

export const testOfferDetail: Offer = {
  id: 2,
  uploader: 2,
  product_name: "게이밍 마우스",
  product_image: "/images/mouse.jpg",
  product_desc: `
고감도 센서를 탑재한 RGB 게이밍 마우스입니다.

- 최대 16,000 DPI 지원
- RGB 커스터마이징 가능
- 인체공학적 디자인
- FPS / MMO 게임 최적화
`,
  product_price: 45000,
  discount_rate: 15,
  stock: 1,
};
