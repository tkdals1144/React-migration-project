import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

function Login({ refreshAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Custom Hook 인 useLogin 호출
    const { login, error, isLoading, setError } = useLogin(refreshAuth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError("이메일과 비밀번호를 모두 입력해주세요");
            return;
        }
        // 유효성 통과 후, Hook의 로그인 함수를 호출해 비즈니스 로직에 위임
        await login(email, password);
    };

    return (
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
                        <input
                            type="text"
                            id={styles.email}
                            name="email"
                            placeholder="이메일주소를 입력해주세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            id={styles.passwd}
                            name="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button id={styles.login_btn} type="submit" disabled={isLoading}>
                            로그인
                        </button>
                    </div>
                </form>
                <div id={styles.anchor_box}>
                    <Link to="/signup" id={styles.sign_up}>
                        회원가입
                    </Link>
                    <Link to="/find-password" id={styles.find_passwd}>
                        비밀번호를 잊으셨나요?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
