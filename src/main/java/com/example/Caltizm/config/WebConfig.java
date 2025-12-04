package com.example.Caltizm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private String connectPath = "/uploadPath/**";
    final Path FILE_ROOT = Paths.get("./").toAbsolutePath().normalize();    // resources 폴더가 아닌 위치 일때 , 현재 위치를 지정함
    private String uploadPath = FILE_ROOT.toString() + "/upload/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler(connectPath)                       // src 에 들어갈 경로
                .addResourceLocations("file:///"+uploadPath);               // 파일 경로
    }

    // CORS 설정을 추가합니다
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 API 경로에 대해 CORS를 적용
                .allowedOrigins("http://localhost:5173") // 👈 React 프론트엔드의 출처(포트)를 명시적으로 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowCredentials(true); // 👈 세션 쿠키(JSESSIONID)를 요청에 포함시켜 전송 허용 (세션 기반 인증에 필수)
    }
}
