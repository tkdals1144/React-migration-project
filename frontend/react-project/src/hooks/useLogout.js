import { useNavigate } from "react-router-dom";
import axios from "axios";

function useLogout(refreshAuth) {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.get("/api/logout", { withCredentials: true });
        } catch (err) {
            console.error("로그아웃 요청 실패", err);
        } finally {
            await refreshAuth();
            navigate("/main", { replace: true });
        }
    };

    return { logout };
}

export default useLogout;
