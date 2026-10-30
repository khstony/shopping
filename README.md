# 🛒 Shopping (쇼핑몰 및 실시간 거래 플랫폼)

<p align="center">
  <img src="front-shop/src/assets/logo-transparent.png" alt="Shopping Logo" width="220" />
</p>

React + Spring Boot 기반의 쇼핑몰 웹 서비스입니다.  
일반적인 상품 조회, 장바구니, 주문 기능뿐만 아니라 **실시간 1:1 채팅(WebSocket/STOMP)**을 통한 구매자-판매자 간 소통 기능을 제공합니다.

---

## 📌 주요 기능 (Features)

### 1. 사용자 인증 (User & Auth)
- 회원가입 및 로그인 (구매자 / 판매자 구분)
- JWT (JSON Web Token) 및 Spring Security 기반 인증/인가

### 2. 상품 및 장바구니 (Products & Cart)
- 판매자의 상품 등록(이미지 업로드 포함), 수정, 삭제
- 구매자의 전체 상품 목록 및 상세 페이지 조회
- 장바구니 담기, 수량 변경, 삭제 기능

### 3. 주문 및 결제 (Order)
- 장바구니 상품 주문 생성 및 상태 관리
- 주문 내역 조회

### 4. 실시간 채팅 (Real-time Chat)
- WebSocket & STOMP 프로토콜 기반 1:1 실시간 채팅
- 구매자-판매자 간 거래 문의 및 소통 채널 제공

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework / Library**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing & Network**: React Router, Axios
- **Real-time**: `@stomp/stompjs`, `sockjs-client`
- **Web Server**: Nginx

### Backend
- **Framework**: Spring Boot 4.0.2, Java 17
- **Security**: Spring Security, JWT (jjwt)
- **Database / ORM**: MySQL, Spring Data JPA
- **Communication**: Spring WebSocket (STOMP)
- **API Docs**: SpringDoc OpenAPI (Swagger UI)

### DevOps & Infrastructure
- **Container**: Docker, Docker Compose
- **Cloud / Server**: AWS EC2 (Ubuntu)
- **Registry**: Docker Hub

---

## 📂 프로젝트 구조 (Directory Structure)

```text
shopping/
├── back-shop/              # Spring Boot 백엔드 애플리케이션
│   ├── src/main/java/      # 엔티티, 컨트롤러, 서비스, DTO 등
│   ├── build.gradle        # 백엔드 의존성 설정
│   └── Dockerfile          # 백엔드 Docker 빌드 파일
├── front-shop/             # React 프론트엔드 애플리케이션
│   ├── src/                # 컴포넌트, 페이지(Chat, Cart, Offer 등)
│   ├── nginx.conf          # Nginx 리버스 프록시 및 정적 서빙 설정
│   └── Dockerfile          # 프론트엔드 Docker 빌드 파일
├── develop.txt             # 배포 가이드 및 인프라 운영 메모
└── README.md               # 프로젝트 안내 문서
```

---

## 🚀 시작하기 (Getting Started)

### 1. 사전 요구사항 (Prerequisites)
- Node.js (v18+)
- Java 17 (JDK 17)
- MySQL Server

### 2. 로컬 실행 방법 (Local Development)

#### Backend
```powershell
cd back-shop
./gradlew bootRun
```
> 기본 포트: `http://localhost:8080` (Swagger UI: `http://localhost:8080/swagger-ui.html`)

#### Frontend
```powershell
cd front-shop
npm install
npm run dev
```
> 기본 포트: `http://localhost:5173`

---

## 🚢 배포 및 인프라 운영 (Deployment)

Docker Compose와 AWS EC2를 활용한 빌드 및 배포 절차, 서버 설정 가이드는 [develop.txt](file:///c:/Users/PC/Documents/GitHub/shopping/develop.txt) 문서를 참고해주세요.

