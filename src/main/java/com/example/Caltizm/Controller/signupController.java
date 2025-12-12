package com.example.Caltizm.Controller;

import com.example.Caltizm.DTO.SignupRequestDTO;
import com.example.Caltizm.DTO.UserAddressDTO;
import com.example.Caltizm.Service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
public class signupController {

    @Autowired
    SignupService service;

    public record AuthResponse(boolean success, String message) { }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody SignupRequestDTO user) {

        // 이메일 중복 검사
        if(service.userCheck(user.getEmail())) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, "중복된 이메일이 존재합니다."));
        }
        // 전화번호 중복 검사
        if(!service.telDupCheck(user.getPhone_number())) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, "중복된 전화번호가 존재합니다."));
        }

        service.registUser(user);
        service.registUserAddr(user);

        return ResponseEntity.ok().body(new AuthResponse(true, "회원가입이 완료되었습니다."));
    }
}