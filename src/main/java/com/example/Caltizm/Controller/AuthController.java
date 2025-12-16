package com.example.Caltizm.Controller;

import com.example.Caltizm.DTO.CartDTO;
import com.example.Caltizm.DTO.LoginRequestDTO;
import com.example.Caltizm.Repository.CartRepository;
import com.example.Caltizm.Repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartRepository cartRepository;

    public static class LoginResponse {
        private final boolean success;
        private final String username;
        private final String message;

        public LoginResponse(boolean success, String username, String message) {
            this.success = success;
            this.username = username;
            this.message = message;
        }

        public boolean isSuccess() {return success;}
        public String getUsername() {return username;}
        public String getMessage() {return message;}
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login2(@RequestBody LoginRequestDTO loginRequestDTO, HttpSession session) {

        // 일단 DTO로부터 email과 password를 받아옴
        String email = loginRequestDTO.getEmail();
        String password = loginRequestDTO.getPassword();

        LoginRequestDTO user = userRepository.selectUserLogin(email);
        if (user == null || !password.equals(user.getPassword())) {
            System.out.println("이메일, 비밀번호 불일치");
            // 로그인 실패 시 JSON 응답 반환
            return ResponseEntity.ok(new LoginResponse(false, null, "이메일, 비밀번호 불일치"));
        }

        Integer userId = userRepository.selectUserIdByEmail(user.getEmail());

        session.setAttribute("email", user.getEmail());
        session.setAttribute("userId", userId);

        // 세션에서 cartList 가져오기

        try {
            Integer userID = userRepository.selectUserIdByEmail(user.getEmail());
            List<CartDTO> cartList = (List<CartDTO>) session.getAttribute("cartList");
            List<CartDTO> finalCartList = new ArrayList<>();

            if (cartList != null && !cartList.isEmpty()){
                cartRepository.deleteCartListByUserId(userID);
                Map<String, Object> input = new HashMap<>();
                input.put("user_id", userID);
                input.put("cartList", cartList);
                cartRepository.insertSessionCartList(input);
                finalCartList = cartList;
            } else {
                // 비회원 장바구니가 없으면, DB의 기존 회원 장바구니를 가져옴
                List<CartDTO> cartListByUserId = cartRepository.selectCartListByUserId(userID);
                if (cartListByUserId != null) {
                    finalCartList = cartListByUserId;
                }
            }

            session.setAttribute("cartList", finalCartList);
            // 로그인 성공을 응답
            return ResponseEntity.ok(new LoginResponse(true, user.getEmail(), "로그인 성공"));
        } catch (Exception e) {
            session.invalidate();
            return ResponseEntity.internalServerError().body(new LoginResponse(false, null, "로그인 서버 오류"));
        }

    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email != null){
            Integer userID = userRepository.selectUserIdByEmail(email);
            System.out.println("로그아웃 : " + userID);
            if (userID != null) {
                List<CartDTO> cartList = (List<CartDTO>) session.getAttribute("cartList");
                if (cartList != null && !cartList.isEmpty()) {
                    Map<String, Object> input = new HashMap<>();
                    input.put("user_id", userID);
                    input.put("cartList", cartList);
                    cartRepository.deleteCartListByUserId(userID);
                    cartRepository.insertSessionCartList(input);
                }
                else{
                    cartRepository.deleteCartListByUserId(userID);
                }
                session.invalidate();
            }
        }
        return "redirect:/main";
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> me(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        String email = (String) session.getAttribute("email");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(Map.of(
                "userId", userId,
                "email", email
        ));
    }

}
