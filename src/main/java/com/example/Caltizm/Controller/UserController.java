package com.example.Caltizm.Controller;

import com.example.Caltizm.DTO.AddressResponseDTO;
import com.example.Caltizm.DTO.PostDTO;
import com.example.Caltizm.DTO.UserDataDTO;
import com.example.Caltizm.Repository.BoardRepository;
import com.example.Caltizm.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

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
}
















