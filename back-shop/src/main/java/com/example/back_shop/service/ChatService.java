package com.example.back_shop.service;

import com.example.back_shop.repository.MessageRepository;
import com.example.back_shop.repository.OfferRepository;
import com.example.back_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.back_shop.dto.ChatRequestDto;
import com.example.back_shop.dto.ChatResponseDto;
import com.example.back_shop.dto.ChatRoomRequestDto;
import com.example.back_shop.dto.ChatRoomResponseDto;
import com.example.back_shop.entity.CartEntity;
import com.example.back_shop.entity.ChatRoomEntity;
import com.example.back_shop.entity.ChatRoomStatus;
import com.example.back_shop.entity.UserEntity;
import com.example.back_shop.entity.MessageEntity;
import com.example.back_shop.entity.OfferEntity;
import com.example.back_shop.repository.ChatRoomRepository;

@Service
@RequiredArgsConstructor

public class ChatService {
        private final MessageRepository messageRepository;
        private final ChatRoomRepository chatRoomRepository;
        private final UserRepository userRepository;
        private final OfferRepository offerRepository;

        @Transactional
        public MessageEntity saveMessage(ChatRequestDto request) {

                System.out.println("전송 로직1");
                ChatRoomEntity room = chatRoomRepository.findById(request.getRoomId())
                                .orElseThrow(() -> new IllegalArgumentException("채팅방 없음"));

                UserEntity sender = userRepository.findById(request.getSenderId())
                                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
                System.out.println("전송 로직2");
                MessageEntity message = MessageEntity.builder()
                                .room(room)
                                .sender(sender)
                                .message(request.getMessage())
                                .createdAt(LocalDateTime.now())
                                .build();

                System.out.println("전송 로직3");
                return messageRepository.save(message);
        }

        public List<ChatResponseDto> loadChat(Long id) {

                List<MessageEntity> messages = messageRepository.findByRoom_Id(id);

                return messages.stream()
                                .map(msg -> new ChatResponseDto(
                                                msg.getId(),
                                                msg.getRoom().getId(),
                                                msg.getSender().getId(),
                                                msg.getSender().getNickname(),
                                                msg.getMessage(),
                                                msg.getCreatedAt()))
                                .collect(Collectors.toList());
        }

        public ChatRoomResponseDto makeRoom(ChatRoomRequestDto request) {
                System.out.println("진행1");
                System.out.println("buyerid : " + request.getBuyerId());
                System.out.println("sellerid : " + request.getSellerId());
                System.out.println("offerid : " + request.getOfferId());
                UserEntity buyer = userRepository.findById(request.getBuyerId())
                                .orElseThrow(() -> new IllegalArgumentException("에러 : 구매자 무효"));

                UserEntity seller = userRepository.findById(request.getSellerId())
                                .orElseThrow(() -> new IllegalArgumentException("에러 : 판매자 무효"));

                OfferEntity offer = offerRepository.findById(request.getOfferId())
                                .orElseThrow(() -> new IllegalArgumentException("에러 : 상품 무효"));
                System.out.println("진행2");
                Optional<ChatRoomEntity> existingRoom = chatRoomRepository.findByBuyerAndSellerAndOffer(buyer, seller,
                                offer);
                System.out.println("진행3");
                ChatRoomEntity room = existingRoom.orElseGet(() -> chatRoomRepository.save(
                                ChatRoomEntity.builder()
                                                .buyer(buyer)
                                                .seller(seller)
                                                .offer(offer)
                                                .status(ChatRoomStatus.ACTIVE)
                                                .build()));
                System.out.println("진행4");
                return ChatRoomResponseDto.builder()
                                .id(room.getId())
                                .createdAt(room.getCreatedAt())
                                .buyerId(room.getBuyer().getId())
                                .sellerId(room.getSeller().getId())
                                .offerId(room.getOffer().getId())
                                .build();
        }

        public Long getRoomId(Long buyerId, Long offerId) {
                UserEntity user = userRepository.findById(buyerId)
                                .orElseThrow(() -> new IllegalArgumentException("유저 무효"));

                OfferEntity offer = offerRepository.findById(offerId)
                                .orElseThrow(() -> new IllegalArgumentException("오퍼 무효"));

                ChatRoomEntity room = chatRoomRepository.findByBuyerAndOffer(user, offer);

                Long roomId = room.getId();

                return roomId;
        }
}
