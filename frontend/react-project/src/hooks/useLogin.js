import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function useLogin(setUser) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            //1. 통신 로직과 await 비동기 처리
            const res = await axios.post("/login", {email, password});

            // 2. 비즈니스 로직 및 상태 처리
            if (res.data.success) {
                setUser(res.data.username);
                navigate("/main");
            } else {
                setError(res.data.message || "로그인 실패");
            }
        } catch (err) {
            console.error(err);
            setError("로그인 서버 오류 발생");
        } finally {
            setIsLoading(false);
        }
    };

    return { login, error, isLoading, setError };
}

export { useLogin };