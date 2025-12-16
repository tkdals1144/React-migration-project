import axios from "axios";
import { useState, useCallback, useRef, useEffect } from "react";

// =======================================================
// [가정] 서버 통신 함수 (실제 환경에 맞게 구현 필요)
// =======================================================

// PUT 요청: 주소 목록 전체 동기화 API (하나의 트랜잭션으로 처리)
const apiSyncAddresses = async (syncData) => {
    const res = await axios.put("api/addresses/sync", syncData, {
        header: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    return res.data;
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
function useModal(initialMyAddresses = []) {
    useEffect(() => {
        if (initialMyAddresses && initialMyAddresses.length > 0) {
            setOriginalAddresses(initialMyAddresses);
            setMyAddresses2(initialMyAddresses);
        }
    }, [initialMyAddresses]);
    // 서버에서 받은 초기 데이터를 원본으로 보관
    const [originalAddresses, setOriginalAddresses] = useState(
        Array.isArray(initialMyAddresses) ? initialMyAddresses : []
    );
    // 현재 모달에서 수정 중인 데이터
    const [myAddresses2, setMyAddresses2] = useState(Array.isArray(initialMyAddresses) ? initialMyAddresses : []);
    // 삭제 예정인 기존 주소의 ID 목록 (addressId)
    const [deletedAddressIds, setDeletedAddressIds] = useState([]);

    // 포커스 관리를 위한 Ref 관리 (addressId 사용)
    const addressRefs = useRef({});

    // 주소 항목 추가 (로컬에서만 처리)
    const handleAddAddress = useCallback(() => {
        if (myAddresses2.length >= MAX_ADDRESSES) {
            console.warn(`[알림] 주소는 최대 ${MAX_ADDRESSES}개까지만 추가할 수 있습니다.`);
            return false;
        }

        const newId = "TEMP-" + Date.now() + Math.random();

        // 새로운 주소 항목을 추가하고, 임시 ID를 부여
        setMyAddresses2((prev) => [...prev, { ...initialAddress, addressId: newId }]);
        return newId;
    }, [myAddresses2]);

    // 특정 주소 항목 제거 (로컬에서만 처리)
    const handleRemoveAddress = useCallback(
        (id) => {
            if (myAddresses2.length <= 1) {
                console.warn("[알림] 주소는 최소 1개 이상 존재해야 합니다.");
                return;
            }

            const addressToRemove = myAddresses2.find((addr) => addr.addressId === id);

            // 1. myAddresses 목록에서 제거
            setMyAddresses2((prev) => prev.filter((item) => item.addressId !== id));

            // 2. 서버에 존재하는 항목이라면 deletedAddressIds에 추가
            if (addressToRemove && !addressToRemove.addressId.startsWith("TEMP")) {
                setDeletedAddressIds((prev) => [...prev, addressToRemove.addressId]);
            }
        },
        [myAddresses2, myAddresses2]
    );

    // 주소 항목 업데이트 (상세 주소 입력 또는 API 결과 처리)
    const handleUpdateAddressLocally = useCallback((id, updatedValues) => {
        setMyAddresses2((prev) => prev.map((item) => (item.addressId === id ? { ...item, ...updatedValues } : item)));
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
        const syncData = {
            addresses: myAddresses2,
            deleted_ids: deletedAddressIds,
        };

        try {
            const result = await apiSyncAddresses(syncData);

            // 서버가 성공을 명확히 내려줘야 함
            if (!result || result.success !== true) {
                throw new Error("서버 동기화 실패");
            }

            setOriginalAddresses(result.finalAddresses);
            setMyAddresses2(result.finalAddresses);
            setDeletedAddressIds([]);

            console.log("주소 일괄 동기화 성공 (서버 기준)");
            return true;
        } catch (err) {
            console.error("주소 동기화 실패:", err);
            alert("주소 저장에 실패했습니다. 다시 시도해주세요.");
            return false;
        }
    }, [myAddresses2, deletedAddressIds]);

    return {
        myAddresses2,
        handleAddAddress,
        handleRemoveAddress, // 로컬 삭제 함수
        handleAddressComplete,
        handleUpdateAddressLocally,
        handleSyncAddresses, // 모달 닫기 시 호출
        setDetailAddressRef,
    };
}

export default useModal;
