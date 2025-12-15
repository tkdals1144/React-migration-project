## 2025-11-21
- react-structure 변환을 위한 기반 작성

-------------------------------------
## 2025-11-22
- App.jsx 기반 작성

-------------------------------------
## 2025-11-23
- Header 컴포넌트 작성
- Header css 주입

-------------------------------------
## 2025-11-25
- MainPage 컴포넌트 기반 작성
- MainPage css 주입

-------------------------------------
## 2025-11-26
- Header 드롭다운 구현
- 로그인 후 email 상태 상위로 리프팅
- Footer 컴포넌트 작성

-------------------------------------
## 2025-11-27
- Info 컴포넌트 작성
- 정적 이미지 갱신
- 자잘한 동작 오류 디버깅

-------------------------------------
## 2025-11-28
- Signup 컴포넌트 작성
- 프록시 설정 변경

-------------------------------------
## 2025-12-01
- Wishlist 컴포넌트 작성
- map을 통한 반복 컴포넌트 생성
- delete 연산을 위한 기반 작성

-------------------------------------
## 2025-12-02
- Login 컴포넌트 API 통신 로직 분해
- useLogin Custom Hook 을 통한 의존성 주입 및 결합도 감소

-------------------------------------
## 2025-12-03
- LoginController 구조 변경
- html을 반환하는 기존 형태를 JSON 데이터를 반환하도록 변경
- LoginRequsetDTO getter/setter 추가

-------------------------------------
## 2025-12-04
- SignUpController 구조 변경
- Signup Custom Hook 제작
- react 스타일에 맞춘 유효성 검사 재구성

-------------------------------------
## 2025-12-05
- SignUp Custom Hook 변경 및 추가
- Signup.js 로직 react 스타일에 맞춰 변경

-------------------------------------
## 2025-12-08
- SignUpController 추가변경 (반환 객체 inner class 추가)
- 회원가입 정상동작을 Signup Custom Hook 최종변경
- MainPage 단순 계산 로직 utils 폴더로 분리
- MainPage banner UseRef와 UseEffect를 이용하여 제작

-------------------------------------
## 2025-12-09
- MyPage 컴포넌트 기반 작성
- MyPage 상세정보 fetch 를 위한 Custom Hook 제작
- 기존의 Controller 외의 데이터만을 반환할 UserController 제작
- UserController에 맞춘 UserDataDTO와 그에 맞는 값을 반환할 Repository의 function 제작

-------------------------------------
## 2025-12-11
- MyPage 버블링 오류 수정
- Header 자동 로그아웃 오류 수정
- AxiosError 500, Mapper/Repository 수정
- MyPage css 추가 및 state에 따른 css 상태 변화 구현

-------------------------------------
## 2025-12-12
- UserController에 주소 리스트와 작성글 리스트 매핑을 추가
- Promise.all 을 통해 useInfo.js 에서 여러개의 axios.get 호출을 한번에 처리
- 주소 등록을 위한 SignupService 및 SignupRequestDTO 수정
