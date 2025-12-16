import { useEffect, useState } from "react";
import axios from "axios";

function useAuth() {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        userId: null,
        email: null,
        isLoading: true,
    });

    const refreshAuth = async () => {
        try {
            const res = await axios.get("/api/auth/me", {
                withCredentials: true,
            });

            setAuth({
                isLoggedIn: true,
                userId: res.data.userId,
                email: res.data.email,
                isLoading: false,
            });
        } catch {
            setAuth({
                isLoggedIn: false,
                userId: null,
                email: null,
                isLoading: false,
            });
        }
    };

    // 최초 진입 시 세션 확인
    useEffect(() => {
        refreshAuth();
    }, []);

    return { auth, setAuth, refreshAuth };
}

export default useAuth;
