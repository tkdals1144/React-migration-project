package com.example.Caltizm.Controller;

import com.example.Caltizm.DTO.UserDataDTO;
import com.example.Caltizm.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/userInfo")
    public ResponseEntity<UserDataDTO> getUserInfo(@RequestParam("email") String email) {
        UserDataDTO dto = userRepository.selectUserInfo2(email);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }
}
