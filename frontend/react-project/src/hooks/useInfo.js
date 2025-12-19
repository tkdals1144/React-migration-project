// mypage의 info 데이터를 가져오기 위한 커스텀 훅

import axios from "axios";
import { useEffect, useState } from "react";

// 가장 먼저 이메일을 받아오는것이 중요.
function useInfo(email) {
    const [info, setInfo] = useState(null);
    // 주소값과 작성글은 List 형태로 묶인 JSON 데이터기 때문에 빈 배열로 초기화
    const [addresses, setAddresses] = useState([]);
    const [posts, setPosts] = useState([]);

    // 로딩 및 에러 상태를 체크
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // email이 처음에 null이더라도 나중에라도 들어오면 다시 작동되는 안전한 구조
    useEffect(() => {
        if (!email) {
            setError("이메일 미확인");
            console.log(error);
            return; // 이메일이 없다면 API를 더 호출하지 않음
        }

        const fetchAllInfo = async () => {
            setIsLoading(true);
            setError(null);

            const apiCalls = [
                // 1. 모든 정보 (axios.get() 호출 즉시 Promise 객체를 반환)
                axios.get("/api/userInfo", { params: { email } }),
                axios.get("/api/userAddress", { params: { email } }),
                axios.get("/api/userPosts", { params: { email } }),
            ];

            try {
                // 2. Promise.all을 통해 모든 API 호출을 병렬로 처리
                // 3. 컨트롤러에서 400, 404가 아닌 200 OK와 빈 배열을 반환하도록 했기에
                // 4. Promise.all 에서 발생하는 오류는 전부 통신 문제로 간주
                const [infoRes, addressesRes, postsRes] = await Promise.all(apiCalls);

                console.log(infoRes.data);
                console.log(addressesRes.data);
                console.log(postsRes.data);

                setInfo(infoRes.data || null);
                setAddresses(addressesRes.data || []);
                setPosts(postsRes.data || []);
            } catch (err) {
                console.error("정보 조회 실패 : " + err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        // const fetchInfo = async() => {
        //     // 현재 로딩중 + 에러는 없다!
        //     setIsLoading(true);
        //     setError(null);
        //     try {
        //         const res = await axios.get("/api/userInfo", {
        //             params : {email}
        //         });
        //         if (res.data) {
        //             setInfo(res.data);
        //             setError(null);
        //         } else {
        //             setError("정보 로딩 실패");
        //         }
        //     } catch (err) {
        //         setError(err);
        //         console.log(err);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // }

        // fetchInfo();
        fetchAllInfo();
    }, [email]);
    return { info, addresses, posts, isLoading, error };
}

export default useInfo;
