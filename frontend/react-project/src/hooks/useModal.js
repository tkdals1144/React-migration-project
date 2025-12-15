import { useState, useCallback, useRef } from "react";

// =======================================================
// [가정] 서버 통신 함수 (실제 환경에 맞게 구현 필요)
// =======================================================

// PUT 요청: 주소 목록 전체 동기화 API (하나의 트랜잭션으로 처리)
const apiSyncAddresses = async (syncData) => {
    console.log("[API] 주소 일괄 동기화 요청 (PUT /sync):", syncData);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 서버 응답 가정: 동기화 후 최종적으로 DB에 저장된 주소 목록 전체를 반환
    const finalAddresses = [
        ...syncData.addresses.filter((addr) => addr.addressId !== "DUMMY"), // 임시 주소는 서버 ID 할당되었다고 가정
        // 서버에서 삭제 처리된 항목을 제외한 최종 목록
    ];

    console.log("[API] 동기화 응답 최종 주소 목록:", finalAddresses);
    return {
        success: true,
        // 서버에서 부여받은 addressId를 포함하여 최종 목록 반환 가정
        finalAddresses: finalAddresses.map((addr) => ({
            ...addr,
            // 임시 ID가 있으면 서버 ID로 교체되었다고 가정
            addressId: addr.addressId.startsWith("TEMP") ? "S-" + Date.now() : addr.addressId,
        })),
    };
};

// =======================================================

// 초기 주소 항목 형식 (서버의 addressId 사용)
const initialAddress = {
    addressId: "TEMP-" + Date.now(), // 클라이언트 측 임시 ID (TEMP- 접두사 사용)
    email: "",
    address: "",
    zipCode: "",
    detail: "",
};

const MAX_ADDRESSES = 3;

/**
 * 마이페이지 주소 관리 모달을 위한 훅. (모달 닫기 시 일괄 동기화 방식)
 * @param {Array<Object>} initialMyAddresses - 서버에서 받은 사용자 주소 목록 (addressId 포함)
 */
function useModal(initialMyAddresses) {
    // 서버에서 받은 초기 데이터를 원본으로 보관
    const [originalAddresses, setOriginalAddresses] = useState(initialMyAddresses || []);
    // 현재 모달에서 수정 중인 데이터
    const [myAddresses, setMyAddresses] = useState(initialMyAddresses || []);
    // 삭제 예정인 기존 주소의 ID 목록 (addressId)
    const [deletedAddressIds, setDeletedAddressIds] = useState([]);

    // 포커스 관리를 위한 Ref 관리 (addressId 사용)
    const addressRefs = useRef({});

    // 주소 항목 추가 (로컬에서만 처리)
    const handleAddAddress = useCallback(() => {
        if (myAddresses.length >= MAX_ADDRESSES) {
            console.warn(`[알림] 주소는 최대 ${MAX_ADDRESSES}개까지만 추가할 수 있습니다.`);
            return false;
        }

        // 새로운 주소 항목을 추가하고, 임시 ID를 부여
        setMyAddresses((prev) => [...prev, { ...initialAddress, addressId: "TEMP-" + Date.now() + Math.random() }]);
        return true;
    }, [myAddresses.length]);

    // 특정 주소 항목 제거 (로컬에서만 처리)
    const handleRemoveAddress = useCallback(
        (id) => {
            if (myAddresses.length <= 1) {
                console.warn("[알림] 주소는 최소 1개 이상 존재해야 합니다.");
                return;
            }

            const addressToRemove = myAddresses.find((addr) => addr.addressId === id);

            // 1. myAddresses 목록에서 제거
            setMyAddresses((prev) => prev.filter((item) => item.addressId !== id));

            // 2. 서버에 존재하는 항목이라면 deletedAddressIds에 추가
            if (addressToRemove && !addressToRemove.addressId.startsWith("TEMP")) {
                setDeletedAddressIds((prev) => [...prev, addressToRemove.addressId]);
            }
        },
        [myAddresses.length, myAddresses]
    );

    // 주소 항목 업데이트 (상세 주소 입력 또는 API 결과 처리)
    const handleUpdateAddressLocally = useCallback((id, updatedValues) => {
        setMyAddresses((prev) => prev.map((item) => (item.addressId === id ? { ...item, ...updatedValues } : item)));
    }, []);

    // Daum Postcode API 결과 처리
    const handleAddressComplete = useCallback(
        (id, data) => {
            // 1. 상태 업데이트 (주소, 우편번호)
            handleUpdateAddressLocally(id, {
                zipCode: data.zonecode, // zipCode 사용
                address: data.roadAddress,
            });

            // 2. 상세 주소 필드에 포커스
            if (addressRefs.current[id]) {
                addressRefs.current[id].focus();
            }
        },
        [handleUpdateAddressLocally]
    );

    // 각 주소 항목의 상세 주소 입력 필드 Ref를 등록
    const setDetailAddressRef = useCallback((id, element) => {
        addressRefs.current[id] = element;
    }, []);

    // =======================================================
    // 최종 동기화 로직 (모달 닫기 시 호출)
    // =======================================================
    const handleSyncAddresses = useCallback(async () => {
        // 변경 사항이 전혀 없는지 확인 (최적화)
        // (깊은 비교가 필요하며, JSON.stringify는 완벽하지 않으나 단순 비교 목적으로 사용)
        const isAddressesChanged = JSON.stringify(originalAddresses) !== JSON.stringify(myAddresses);

        if (!isAddressesChanged && deletedAddressIds.length === 0) {
            console.log("변경 사항 없음. API 호출 생략.");
            return true;
        }

        // 서버에 보낼 최종 데이터 구조 생성
        const syncData = {
            addresses: myAddresses.map((addr) => ({
                ...addr,
                // 서버는 TEMP-ID를 가진 항목을 새 항목으로 인식
            })),
            deleted_ids: deletedAddressIds,
        };

        try {
            const response = await apiSyncAddresses(syncData);

            if (response.success) {
                // 동기화 성공 후, 상태를 서버로부터 받은 최종 데이터로 덮어쓰기
                setOriginalAddresses(response.finalAddresses);
                setMyAddresses(response.finalAddresses);
                setDeletedAddressIds([]); // 삭제 목록 초기화
                console.log("주소 일괄 동기화 성공!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("주소 일괄 동기화 실패:", error);
            return false;
        }
    }, [myAddresses, deletedAddressIds, originalAddresses]);

    return {
        myAddresses,
        handleAddAddress,
        handleRemoveAddress, // 로컬 삭제 함수
        handleAddressComplete,
        handleUpdateAddressLocally,
        handleSyncAddresses, // 모달 닫기 시 호출
        setDetailAddressRef,
    };
}

export default useModal;
