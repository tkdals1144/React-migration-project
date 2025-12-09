package com.example.Caltizm.Controller;

import com.example.Caltizm.DTO.MyPageResponseDTO;
import com.example.Caltizm.DTO.UserDataDTO;
import com.example.Caltizm.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<UserDataDTO> getUserInfo(@PathVariable String email) {
        UserDataDTO dto = userRepository.selectUserInfo2(email);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }
}
