package com.example.Caltizm.Controller;

import com.example.Caltizm.DTO.*;
import com.example.Caltizm.Repository.BoardRepository;
import com.example.Caltizm.Repository.UserRepository;
import com.example.Caltizm.Service.AddressService;
import com.sun.security.auth.UserPrincipal;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final AddressService addressService;

    @GetMapping("/userInfo")
    public ResponseEntity<UserDataDTO> getUserInfo(@RequestParam("email") String email) {
        UserDataDTO dto = userRepository.selectUserInfo2(email);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/userAddress")
    public ResponseEntity<List<AddressResponseDTO>> getUserAddress(@RequestParam("email") String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        // DB 에서 주소 목록을 조회합니다
        List<AddressResponseDTO> addressList = userRepository.selectAddressAll(email);
        if (addressList == null || addressList.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        // 성공시 JSON 형태로 응답
        return ResponseEntity.ok(addressList);
    }

    @GetMapping("/userPosts")
    public ResponseEntity<List<PostDTO>> getUserPosts(@RequestParam("email") String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<PostDTO> postList = boardRepository.selectAllByEmail(email);
        if (postList == null || postList.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        return ResponseEntity.ok(postList);
    }

    @PutMapping("/addresses/sync")
    public ResponseEntity<AddressListResponseDTO> syncAddressList(
            @RequestBody AddressListRequestDTO request,
            HttpSession session
    ) {
        Integer id = (Integer) session.getAttribute("userId");
        Long userId = id.longValue();
        System.out.println("일단 들어옵니다");
        if (userId == null) {
            System.out.println("유저 아이디 미확인");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        AddressListResponseDTO response =
                addressService.syncAddresses(request, userId);

        return ResponseEntity.ok(response);
    }
}
















