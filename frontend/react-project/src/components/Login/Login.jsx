import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({setUser}) {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    // await를 사용하기 위한 async 함수
    const handleSubmit = async (e) => {
        // form 태그의 폼 전송 기능 차단
        e.preventDefault();

        // react의 강점인 SPA 방식을 살리기 위해선 JSON 비동기 방식으로 로그인을 처리해야 한다.
        // 기존에는 form을 전송하고 Controller에서 폼을 보내주는 방식을 사용했기에 @Controller 를 사용했다.
        // 추후 Spring단의 코드를 개편할때는 뷰 렌더링 기능은 뺄 테니 JSON 응답에 특화된 @RestController로 변경하면 될 듯 하다.

        try {
            // await는 post가 서버 응답을 줄 때까지 기다린 후 JSON 결과값을 res에 부여해 줌
            // axios.post 를 통해 HTTP POST 요청을 /login 경로로 보냄
            // 요청 본문에 { email, password } 라는 JSON 데이터를 담아서 보냄
            // 결과값으로 { succes : true , username : "123" } 과 같은 JSON 응답을 받음
            const res = await axios.post("/login", { email, password });
            if (res.data.success) {
              setUser(res.data.username); // 로그인 성공 → App 상태 갱신
              navigate("/main"); // 로그인 성공 후 /main 이동
            } else {
              setError(res.data.message);
            }
        } catch (err) {
            setError("로그인 서버 오류");
            console.error(error);
        }

        // 위의 await 방식을 함수형 체인 구조로 변환하면 이렇게도 변환할 수 있다.
        // axios.post("/login", { email, password })
        // .then(res => res.data.success ? setUser(res.data.username) : setError(res.data.message))
        // .catch(err => setError("로그인 서버 오류"));

    }
    
    return (
        // <main>
        //     <a th:href="@{/main}">
        //         <h1>CALTIZM</h1>
        //     </a>
        //     <p id={styles.title}>로그인</p>
        //     <form th:action="@{/login}" method="post">
        //         <div id={styles.login_box}>
        //             <input type="text" id={styles.email} name="email" placeholder="이메일주소를 입력해주세요">
        //             <input type="password" id={styles.passwd} name="password" placeholder="비밀번호를 입력해주세요">
        //             <button id={styles.login_btn}>로그인</button>
        //         </div>
        //     </form>
        //     <div id={styles.anchor_box}>
        //         <a th:href="@{/signup}" id={styles.sign_up}>회원가입</a>
        //         <a th:href="@{/find-password}" id={styles.find_passwd}>비밀번호를 잊으셨나요?</a>
        //     </div>
        // </main>
        <div className={styles.main_wrap}>
            <div className={styles.main_box}>
            {/* a태그 대신 Link 태그를 이용해서 이동 */}
            <Link to="/main">
                <h1 className={styles.h1}>CALTIZM</h1>
            </Link>
            <p id={styles.title}>로그인</p>
            {/* form태그는 동일하게 사용한다. 다만 페이지 리로드 + 서버 전송 방식으로 사용하지 않는다. onSubmit 핸들러를 이용한다. */}
            <form onSubmit={handleSubmit}>
                <div id={styles.login_box}>
                    {/* onChange 핸들러를 통해 내부의 value값이 변할때마다 해당 값을 바인딩함 */}
                    <input type="text" id={styles.email} name="email" placeholder="이메일주소를 입력해주세요" value={email} onChange={
                        (e) => setEmail(e.target.value)
                    }/>
                    <input type="password" id={styles.passwd} name="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={
                        (e) => setPassword(e.target.value)
                    }/>
                    <button id={styles.login_btn} type="submit">로그인</button>
                </div>
            </form>
            <div id={styles.anchor_box}>
                <Link to="/signup" id={styles.sign_up}>회원가입</Link>
                <Link to="/find-password" id={styles.find_passwd}>비밀번호를 잊으셨나요?</Link>
            </div>
        </div>
        </div>

    )
}

export default Login