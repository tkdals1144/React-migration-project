import { useState, useCallback, useRef } from "react";

// 초기 주소 항목
const initialAddress = {
    address: "",
    zip_code: "",
    detail: "",
    // 고유 키는 map에서 렌더링할 때 필요합니다.
    id: Date.now(),
    detailRef: null, // 각 상세 주소 입력 필드에 포커스를 주기 위한 Ref
};

/**
 * 다중 주소 필드를 관리하고, 주소 검색 API 통합 로직을 제공하는 훅.
 * @returns {object} { addresses, handleAddAddress, handleRemoveAddress, handleDetailChange, handleAddressComplete }
 */
function useMultiAddress() {
    // 주소 항목들을 배열로 관리
    const [addresses, setAddresses] = useState([initialAddress]);
    const maxAddresses = 3;

    // 전체 주소 항목에 대한 Ref를 저장하는 객체
    const addressRefs = useRef({});

    // 주소 항목 추가
    const handleAddAddress = useCallback(() => {
        if (addresses.length >= maxAddresses) {
            // alert() 대신 사용자 지정 UI(Toast, Modal 등) 또는 Console 메시지 사용
            console.warn(`[알림] 주소는 최대 ${maxAddresses}개까지만 추가할 수 있습니다.`);
            return false;
        }

        // 새로운 주소 항목을 추가하고, 고유 ID를 부여합니다.
        setAddresses((prev) => [...prev, { ...initialAddress, id: Date.now() + Math.random() }]);
        return true;
    }, [addresses.length]);

    // 특정 주소 항목 제거
    const handleRemoveAddress = useCallback(
        (id) => {
            if (addresses.length === 1) {
                console.warn("[알림] 주소는 최소 1개 이상 존재해야 합니다.");
                return;
            }
            setAddresses((prev) => prev.filter((item) => item.id !== id));
        },
        [addresses.length]
    );

    // 상세 주소 입력 필드 변경
    const handleDetailChange = useCallback((id, value) => {
        setAddresses((prev) => prev.map((item) => (item.id === id ? { ...item, detail: value } : item)));
    }, []);

    // Daum Postcode API 결과 처리 (Custom Hook의 onComplete 콜백으로 사용됨)
    const handleAddressComplete = useCallback((id, data) => {
        setAddresses((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          zip_code: data.zonecode,
                          address: data.roadAddress,
                      }
                    : item
            )
        );

        // 해당 주소 항목의 상세 주소 필드에 포커스
        if (addressRefs.current[id]) {
            addressRefs.current[id].focus();
        }
    }, []);

    // 각 주소 항목의 상세 주소 입력 필드 Ref를 등록
    const setDetailAddressRef = useCallback((id, element) => {
        addressRefs.current[id] = element;
    }, []);

    const handleUpdateAddress = useCallback((id, updatedValues) => {
        setAddresses((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedValues } : item)));
    }, []);

    return {
        addresses,
        handleAddAddress,
        handleRemoveAddress,
        handleDetailChange,
        handleUpdateAddress,
        setDetailAddressRef,
    };
}

export default useMultiAddress;
