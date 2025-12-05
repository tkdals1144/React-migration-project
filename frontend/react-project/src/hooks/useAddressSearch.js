import { useCallback, useEffect, useState } from "react";

function useAddressSearch(onComplete) {
    // state변수로 스크립트 로드 상태 관리
    const [scriptLoaded, setScriptLoaded] = useState(false);
    useEffect(() => {
        // 로드되었는지 아닌지 확인
        if (window.daum && window.daum.Postcode) {
            setScriptLoaded(true);
            return;
        }
        // 기본적으로 dom을 건들이는건 좋지 않지만 외부 api를 로드시기키기 위해 불가피
        // 그러니 useEffect로 관리
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            setScriptLoaded(true);
        };
        document.head.appendChild(script);
    }, []);

    const openPostcode = useCallback((id) => {
        // 스크립트 로드 후에만 API 호출
        if (!scriptLoaded) {
            console.error("Daum Postcode API가 아직 로드되지 않았습니다.");
            return;
        }
        new daum.Postcode({
            oncomplete: (data) => {
                onComplete(id, data);
            }
            // ... 나머지 로직
        }).open();
    }, [scriptLoaded, onComplete]);

    return openPostcode;
};

export default useAddressSearch;