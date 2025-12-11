// mypage의 info 데이터를 가져오기 위한 커스텀 훅

import axios from "axios";
import { useEffect, useState } from "react";

// 가장 먼저 이메일을 받아오는것이 중요.
function useInfo(email) {
    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // email이 처음에 null이더라도 나중에라도 들어오면 다시 작동되는 안전한 구조
    useEffect(() => {
        if (!email) {
            setError("이메일 미확인");
            console.log(error);
            return; // 이메일이 없다면 API를 더 호출하지 않음
        }

        const fetchInfo = async() => {
            setIsLoading(true);
            try {
                const res = await axios.get("/api/userInfo", {
                    params : {email}
                });
                if (res.data) {
                    setInfo(res.data);
                    setError(null);
                } else {
                    setError("정보 로딩 실패");
                }
            } catch (err) {
                setError(err);
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchInfo();

    }, [email])
    return { info, isLoading, error };
}

export default useInfo;