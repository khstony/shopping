1. 접속
ssh -i "C:\Users\PC\Downloads\shop_key.pem" ubuntu@13.238.180.77
도커on
sudo systemctl start docker
sudo systemctl enable docker

2. 실행
docker login
r
docker run -d -p 80:80 --name front khstony/final-front:v2

docker run -d -p 8080:8080 \
  --name backend \
  --network app-network \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DB_URL=jdbc:mysql://mysql:3306/shop?serverTimezone=Asia/Seoul&characterEncoding=UTF-8 \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=1234 \
  khstony/shop-backend:v1

java -jar /home/ubuntu/app.jar
nohup java -jar app.jar > app.log 2>&1 &

MYSQL접속
mysql -u root -p

* db 재실행
sudo systemctl restart mysql
ps -ef | grep java
docker stop front 
docker rm front
docker stop backend
docker rm backend
이미지 pull	docker pull khstony/final-front:v2
실행	docker run -d -p 80:80 --name front khstony/final-front:v2  



도커업로드 프론트 v3
cd front
npm run build
docker build -t shop-front:vX .    
docker build --no-cache -t shop-front:vX .
docker tag shop-front:v3 khstony/shop-front:vX
docker push khstony/shop-front:vX
접속후
docker pull khstony/shop-front:vX
docker stop front
docker rm front
docker run -d -p 80:80 --name front khstony/shop-front:vX

도커업로드 백엔드 v16
cd backend
./gradlew clean build
./gradlew bootJar
docker build --no-cache -t khstony/shop-backend:vX .
docker build -t shop-backend:v7 .
docker tag shop-backend:vX khstony/shop-backend:vX
docker push khstony/shop-backend:vX
접속후
docker pull khstony/shop-backend:vX
docker stop backend
docker rm backend

docker run -d -p 8080:8080 -v /home/ubuntu/uploads:/home/ubuntu/uploads --name backend khstony/shop-backend:v16

docker rm -f backend

docker run -d -p 8080:8080 --name backend -e SPRING_PROFILES_ACTIVE=prod -e DB_URL="jdbc:mysql://172.17.0.1:3306/shop?serverTimezone=Asia/Seoul&characterEncoding=UTF-8" -e DB_USERNAME=khstony -e DB_PASSWORD=ks3792 khstony/shop-backend:v2

docker run -d -p 8080:8080 --name backend -e SPRING_PROFILES_ACTIVE=prod khstony/shop-backend:vX

docker logs backend -f
삭제?
docker rmi IMAGE_ID



