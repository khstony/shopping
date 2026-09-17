# Shopping 배포 가이드

## 1. 배포 구조

```text
[Local PC]
코드 수정 → Build → Docker Image → Docker Hub Push
                                      ↓
[EC2] ← Docker Hub Pull ← Docker Compose
```

* Frontend: React + Nginx → `80`
* Backend: Spring Boot → `8080`
* Database: MySQL → Docker 내부 `3306`
* 업로드 이미지: `~/shopping/back-shop/upload`

---

# 2. 코드 수정 후 재배포

## Backend

### Local

```powershell
cd C:\Users\PC\Documents\GitHub\shopping\back-shop
./gradlew.bat clean bootJar
docker build -t khstony/shop-backend:v2 .
docker push khstony/shop-backend:v2
```

### EC2

`docker-compose.yml`의 Backend 이미지 버전을 변경한 후:

```bash
docker compose pull backend
docker compose up -d backend
```

확인:

```bash
docker ps
docker logs --tail 100 spring-backend
```

---

## Frontend

### Local

```powershell
cd C:\Users\PC\Documents\GitHub\shopping\front-shop
npm run build
docker build -t khstony/shop-front:v2 .
docker push khstony/shop-front:v2
```

### EC2

`docker-compose.yml`의 Front 이미지 버전을 변경한 후:

```bash
docker compose pull front
docker compose up -d front
```

---

# 3. 전체 재배포

Backend와 Frontend 이미지를 모두 변경했다면:

```bash
docker compose pull
docker compose up -d
```

상태 확인:

```bash
docker compose ps
```

---

# 4. 자주 사용하는 확인 명령어

```bash
docker ps
docker compose ps
docker logs --tail 100 spring-backend
docker logs --tail 100 front
docker logs --tail 100 mysql
docker system df
```

---

# 5. EC2 서버를 완전히 삭제한 경우

새 EC2를 생성하고 SSH 접속 후 Docker를 설치한다.

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

SSH를 다시 접속한 후:

```bash
docker --version
docker compose version
docker login
```

---

## 디렉터리 및 `.env` 생성

```bash
mkdir -p ~/shopping/back-shop/upload
cd ~/shopping/back-shop
```

`.env`:

```env
MYSQL_ROOT_PASSWORD=비밀번호
DB_USERNAME=root
DB_PASSWORD=비밀번호
```

```bash
chmod 600 .env
```

`docker-compose.yml`을 기존 설정대로 작성한 후:

```bash
docker compose pull
docker compose up -d
```

확인:

```bash
docker ps
```

브라우저에서:

```text
http://EC2_IP
```

---

# 6. DB 초기화

DB까지 완전히 초기화해야 하는 경우:

```bash
docker compose down -v
```

