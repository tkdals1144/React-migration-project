import axios from "axios";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

function usePwdChange() {
    const [isLoading2, setIsLoading2] = useState(false);
    const navigate = useNavigate();
    const changePwd = async ({ pwd, pwdCheck }) => {
        if (isLoading2) return;
        if (pwd !== pwdCheck) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        setIsLoading2(true);
        try {
            const res = await axios.patch(
                "/api/changePassword",
                { newPassword1: pwd, newPassword2: pwdCheck },
                { withCredentials: true }
            );
            if (res.data.success) {
                console.log("비밀번호 변경 성공");
                alert("비밀번호가 변경되었습니다.");
                navigate("/main", { replace: true });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading2(false);
        }
    };
    return { isLoading2, changePwd };
}

export default usePwdChange;
