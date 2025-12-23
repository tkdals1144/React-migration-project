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

-------------------------------------
## 2025-12-15
- UseModal Custom Hook을 제작하여 주소값 수정 로직 추가
- extension으로 prettier 추가 및 settings.json 전역 설정
- myPage modal CRUD 설정 추가 완료 


-------------------------------------
## 2025-12-16
- AddressList를 관리하기 위한 DTO 생성
- AddressRepository와 AddressService를 생성
- useAuth custom hook을 이용해 인증 구조 리팩터링
- Mypage 주소 CRUD 일괄 동기화 구조 정립

-------------------------------------
## 2025-12-19
- Optional Chaining을 통한 에러 가드 추가
- 최초 모달이 열린 시점에만 주소 배열을 서버의 값으로 업데이트하여 mypage 주소 업데이트시 발생하는 일시적 상태 오류 해결

-------------------------------------
## 2025-12-21
- Build.gradle 에 SpringSecurity 의존성 추가
- PasswordEncoder를 추가하여 보안 수준 강화
- localhost:5173 으로부터의 CORS 허용 전역 설정
- 쿠키 전송을 위한 withCredentials: true 추가
- 모든 전송에 쿠키를 포함시키기 위한 api.js 생성
- SecurityConfig를 생성하여 들어오는 요청에 대한 권한 확인 작업 추가
- 필터를 추가해 공통 api 요청을 알맞은 컨트롤러에 매칭

-------------------------------------
## 2025-12-22
- 필터를 추가해 공통 api 요청을 알맞은 컨트롤러에 매칭
- usePwdChange hook을 통한 비밀번호 변경 로직 추가
- mypage 주소 모달창 세세한 오류 디버깅 및 해결

-------------------------------------
## 2025-12-23
- controlled input이 리스트 리렌더링 과정에서 한글 IME 상태가 깨지는 버그 수정
- *데이터 크롤링 로직 에러 발생 수정중*
  - 초기 데이터 수집 로직 중 상품 데이터, 환율 데이터 수집 로직 분리
  - 크롤링 오류 분석 -> 기존 사이트 url계층 변경






