import { useState, useCallback } from "react";

// 생년월일 유효성 검사 함수 (기존 로직을 React 훅으로 변환)
const checkValidDate = (value) => {
    // 기존의 복잡한 정규식 대신, 간결하고 신뢰할 수 있는 Date 객체 검증을 사용합니다.
    if (!value) return false;
    
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month는 0부터 시작
    
    // Date 객체의 값과 입력된 값이 일치하고, 유효한 날짜 범위 내인지 확인
    if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    ) {
        // 추가: 1925-01-01 ~ 2006-12-31 범위 확인 (Signup.jsx의 input max/min과 일치)
        const minDate = new Date(1925, 0, 1).getTime();
        const maxDate = new Date(2006, 11, 31).getTime();
        const inputTime = date.getTime();
        
        return inputTime >= minDate && inputTime <= maxDate;
    }
    return false;
};

/**
 * 회원가입 폼 데이터 및 주소 배열의 유효성을 검사하는 훅
 * @param {object} data - 폼 데이터 (last_name, email 등)
 * @param {array} addresses - 주소 배열
 * @param {string} error - 서버 오류 메시지 상태
 * @returns {object} { validate, validationError }
 */
function useSignupValidation() {
    const [validationError, setValidationError] = useState("");

    const validate = useCallback((data, addresses) => {
        setValidationError(""); // 검사 시작 전 에러 초기화

        // 이름 유효성 검사
        if (data.last_name.trim() === "" || data.first_name.trim() === "") {
            setValidationError("이름을 공백 없이 입력해주세요.");
            return false;
        }

        // 이메일 유효성 검사
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
            setValidationError("이메일 주소가 유효하지 않습니다.");
            return false;
        }

        // 전화번호 유효성 검사 (010으로 시작하는 11자리 숫자)
        if (!/^010\d{8}$/.test(data.phone)) {
            setValidationError("전화번호가 유효하지 않습니다. '- 없이 11자리를 입력해주세요.'");
            return false;
        }

        // 생년월일 유효성 검사
        if (!checkValidDate(data.birth)) {
            setValidationError("생년월일이 유효하지 않거나 유효 범위(1925~2006)를 벗어났습니다.");
            return false;
        }
        
        // 비밀번호 확인 검사
        if (data.password.length < 8) { // 최소 길이 추가 (예시: 8자)
            setValidationError("비밀번호는 최소 8자 이상이어야 합니다.");
            return false;
        }
        if (data.password !== data.checkPw) {
            setValidationError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return false;
        }

        // 주소 유효성 검사
        if (addresses.length === 0) {
             setValidationError("주소를 최소 1개 이상 입력해야 합니다.");
             return false;
        }
        for (const addr of addresses) {
            if (addr.address.trim() === "" || addr.zip_code.trim() === "") {
                setValidationError("검색된 주소와 우편번호를 모두 입력해야 합니다.");
                return false;
            }
            if (addr.detail.trim() === "") {
                setValidationError("상세 주소를 입력해주세요.");
                return false;
            }
        }

        // 개인통관고유부호 유효성 검사 (선택 입력)
        if (data.pccc.trim() !== "" && !/^P\d{12}$/.test(data.pccc)) {
            setValidationError("개인통관고유번호가 유효하지 않습니다. (P + 12자리 숫자)");
            return false;
        }
        
        return true; // 모든 검사 통과
    }, []);

    return { validate, validationError };
}

export default useSignupValidation;