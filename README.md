# CALTIZM SPA 프로젝트

## 프로젝트 개요
기존 Thymeleaf + Spring 기반 웹 서비스를 React 구조에 맞춘 SPA(Single Page Application)로 재구현한 프로젝트입니다.  
주요 기능으로는 로그인/회원가입, 마이페이지 주소 관리, 장바구니 동기화 등이 있으며, React + Spring Boot 환경에서 구현되었습니다.

### 주요 특징
- 기존 서버 렌더링(Thymeleaf) 구조를 React SPA로 전환
- 세션 기반 인증 유지 및 새로고침 시 상태 보존
- 마이페이지 주소 CRUD 일괄 처리 및 동기화
- Custom Hook 기반 로직 분리로 React 스타일 적용
- Axios + 세션 기반 통신 구조 구현
- DB가 필요하지 않은 api Spring -> React 로 전환

---

## 개발 기록
자세한 개발 이력은 [CHANGELOG.md](https://github.com/tkdals1144/React-migration-project/blob/main/docs/CHANGELOG.md)에서 확인할 수 있습니다.

---

## 기술 스택
- **Frontend:** React, React Router, Axios
- **Backend:** Spring Boot, MyBatis
- **Database:** MySQL / Oracle
- **Styling:** CSS Modules
- **Custom Hooks:** useLogin, useLogout, useAuth, useModal 등

---

## 프로젝트 특징
- SPA 전환: 기존 서버 렌더링에서 React SPA로 변환
- 인증/세션: useAuth + Axios + HttpSession으로 로그인 상태 유지
- MyPage 동기화: 주소 CRUD 및 장바구니 동기화 로직 최적화
- 컴포넌트 구조: Custom Hook 기반 코드 재사용 및 결합도 최소화
- 상태 관리: Props와 useState로 간단하게 관리

---

## 향후 개선 사항 (다음 프로젝트부터 활용 예정)
- Redux 또는 Zustand 등 상태 관리 라이브러리 적용
- JWT 기반 토큰 인증 전환
- 테스트 코드 작성 (React Testing Library, JUnit)
- UI/UX 개선 및 반응형 디자인 적용
