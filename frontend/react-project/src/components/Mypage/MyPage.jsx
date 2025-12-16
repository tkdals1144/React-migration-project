import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MyPage.module.css";
import useInfo from "./../../hooks/useInfo";
import useModal from "../../hooks/useModal";
import useAddressSearch from "../../hooks/useAddressSearch";

function MyPage({ email }) {
    const { info, addresses, posts, isLoading, error } = useInfo(email);
    // 주소값과 정보값은 변화시킬수 있으니 state 변수로 관리
    const [myAddresses, setMyAddresses] = useState([]);
    const [user, setUser] = useState(info);
    const [active, setActive] = useState(0);
    const [modal, setModal] = useState(false);

    const {
        myAddresses2,
        handleAddAddress,
        handleRemoveAddress,
        handleAddressComplete,
        handleUpdateAddressLocally,
        handleSyncAddresses, // 모달 닫기 시 호출될 최종 동기화 함수
        setDetailAddressRef, // Ref 등록 함수
    } = useModal(addresses); // useInfo에서 받아온 초기 주소 목록을 전달

    useEffect(() => {
        console.table(myAddresses2);
    }, [myAddresses2]);

    // Daum Postcode API 팝업 상태 및 ID 관리
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [targetAddressId, setTargetAddressId] = useState(null);

    const handleCloseModal = useCallback(async () => {
        // 1. 최종 동기화 요청 (추가/수정/삭제 사항을 서버에 PUT으로 일괄 전송)
        const success = await handleSyncAddresses();

        // 2. 성공 시에만 모달 닫기
        if (success) {
            setModal(false);
        }
        // 실패 시: 훅 내부에서 콘솔 출력 또는 사용자 알림 처리
    }, [handleSyncAddresses, setModal]);

    const onCompletePostcode = useCallback(
        (addrId, data) => {
            handleAddressComplete(addrId, data);
            // 상세 주소 입력 필드로 포커스를 이동시키는 로직은 여전히 유효합니다.
        },
        [handleAddressComplete]
    );

    const openPostcode = useAddressSearch(onCompletePostcode);

    // [B] 리스트 항목 클릭 시 (주소 검색 API 팝업 열기)
    const handleEditAddressClick = (addrId) => {
        // useAddressSearch의 openPostcode를 호출
        openPostcode(addrId);
    };

    // [D] 상세 주소 필드 값 변경 핸들러
    const handleDetailChange = (addrId, value) => {
        handleUpdateAddressLocally(addrId, { detail: value });
    };

    // [E] '주소록 추가' 버튼 클릭 시
    const handleAddAddressAndOpenPostcode = useCallback(() => {
        // 1. 훅에 새 주소 항목 추가 (새 주소의 ID를 반환받아야 함)
        const newTempAddressId = handleAddAddress();

        if (newTempAddressId) {
            // 2. 팝업 띄우는 함수 호출 (새 주소의 ID 전달)
            openPostcode(newTempAddressId);
        } else {
            console.error("주소 추가 실패 또는 훅이 새 주소 ID를 반환하지 않음.");
        }
    }, [handleAddAddress, openPostcode]);

    useEffect(() => {
        if (info) setUser(info);
    }, [info]);
    useEffect(() => {
        if (addresses) setMyAddresses(addresses);

        // 확인용
        // console.table(myAddresses);
        // console.table(user);
    }, [addresses]);

    return (
        <>
            {modal && (
                <div className={styles.modal_wrap} id={styles.modal1}>
                    <div className={styles.modal}>
                        <div className={styles.modal_title}>
                            <p className={styles.title_txt}>주소록 관리</p>
                            <div className={styles.close_wrap} id={styles.close_wrap} onClick={handleCloseModal}>
                                <img src="/img/close.svg" alt="" id={styles.close} />
                            </div>
                        </div>
                        <ul className={styles.modal_boxs}>
                            {myAddresses2.map((addr, idx) => (
                                <li
                                    key={addr.addressId}
                                    className={styles.modal_box}
                                    onClick={() => handleEditAddressClick(addr.addressId)}
                                >
                                    <div className={styles.modal_box_title}>
                                        <p className={styles.box_title_txt}>주소록 {idx + 1}</p>
                                        <div
                                            className={styles.close_wrap}
                                            onClick={(e) => {
                                                e.stopPropagation(); // li 클릭 이벤트 방지
                                                handleRemoveAddress(addr.addressId); // 로컬에서만 삭제
                                            }}
                                        >
                                            <img src="/img/close.svg" alt="" className={styles.close} />
                                        </div>
                                    </div>
                                    <div className={styles.modal_box_items}>
                                        <p className={styles.modal_box_item}>{addr.address}</p>
                                        <p className={styles.modal_box_item}>우편번호 - {addr.zipCode}</p>
                                        <input
                                            className={styles.modal_box_item}
                                            value={addr.detail || ""}
                                            onChange={(e) => handleDetailChange(addr.addressId, e.target.value)}
                                            ref={(el) => setDetailAddressRef(addr.addressId, el)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className={styles.modal_btn} onClick={handleAddAddressAndOpenPostcode}>
                            주소록 추가
                        </button>
                    </div>
                </div>
            )}
            <div className={styles.main_wrap}>
                <div className={styles.main}>
                    <Link to="/main">
                        <h1 className={styles.h1}>CALTIZM</h1>
                    </Link>
                    <div id={styles.tab_wrap}>
                        <p
                            className={`${styles.tab} ${active === 0 ? styles.tab_active : ""}`}
                            onClick={() => setActive(0)}
                        >
                            내 정보
                        </p>
                        <p
                            className={`${styles.tab} ${active === 1 ? styles.tab_active : ""}`}
                            onClick={() => setActive(1)}
                        >
                            비밀번호 변경
                        </p>
                        <p
                            className={`${styles.tab} ${active === 2 ? styles.tab_active : ""}`}
                            onClick={() => setActive(2)}
                        >
                            내 게시글
                        </p>
                    </div>
                    {active === 0 && (
                        <div id={styles.info_box}>
                            <div id={styles.user_info_wrap} className={styles.box_wrap}>
                                <div id={styles.update_btn_wrap} className={styles.btn_wrap}>
                                    <button id={styles.update_btn} className={styles.btn}>
                                        정보일괄수정
                                    </button>
                                </div>
                                <ul id={styles.user_info} className={styles.info_wrap}>
                                    <li className={styles.info}>
                                        <p>이름</p>
                                        <input
                                            id={styles.name}
                                            name="name"
                                            className={styles.info_input}
                                            type="text"
                                            value={user ? user.lastName + user.firstName : null}
                                            placeholder="영문 이름을 적어주세요"
                                            readOnly
                                            required
                                        />
                                    </li>
                                    <li className={styles.info}>
                                        <p>이메일</p>
                                        <input
                                            id={styles.email}
                                            name="email"
                                            className={styles.info_input_readonly}
                                            type="email"
                                            value={user ? user.email : null}
                                            placeholder="이메일을 적어주세요"
                                            readOnly
                                            required
                                        />
                                    </li>
                                    <li className={styles.info}>
                                        <p>전화번호</p>
                                        <input
                                            id={styles.phone}
                                            name="phoneNumber"
                                            className={styles.info_input}
                                            type="tel"
                                            value={user ? user.phoneNumber : null}
                                            placeholder="번호를 적어주세요"
                                            readOnly
                                            maxLength="11"
                                            required
                                        />
                                    </li>
                                    <li className={styles.info}>
                                        <p>생년월일</p>
                                        <input
                                            id={styles.birth}
                                            name="birthDate"
                                            className={styles.info_input}
                                            type="date"
                                            value={user ? user.birthDate : null}
                                            min="1925-01-01"
                                            max="2006-12-31"
                                            placeholder="생년월일을 적어주세요"
                                            readOnly
                                            required
                                        />
                                    </li>
                                    <li className={styles.info}>
                                        <p>개인통관고유번호</p>
                                        <input
                                            id={styles.pcc}
                                            name="pccc"
                                            className={styles.info_input}
                                            type="text"
                                            value={user ? user.pccc : null}
                                            placeholder="[none]"
                                            readOnly
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div id={styles.address_info_wrap} className={styles.box_wrap}>
                                <div id={styles.address_btn_wrap} className={styles.btn_wrap}>
                                    <button
                                        id={styles.address_btn}
                                        className={styles.btn}
                                        onClick={() => setModal(true)}
                                    >
                                        주소록관리
                                    </button>
                                </div>
                                <ul
                                    className={styles.info_wrap}
                                    th:each="address : ${addressList}"
                                    th:data-address-id="${address.addressId}"
                                >
                                    <li className={styles.info}>
                                        <p>영문주소</p>
                                        <p id={styles.eng_addr} th:text="${address.address}">
                                            Geombae-ro, Guri-si, Gyeonggi-do, Republic of Korea
                                        </p>
                                    </li>
                                    <li className={styles.info}>
                                        <p>우편번호</p>
                                        <p id={styles.postcode} th:text="${address.zipCode}">
                                            0123456
                                        </p>
                                    </li>
                                    <li className={styles.info}>
                                        <p>상세주소</p>
                                        <p id={styles.detailed} th:text="${address.detail}">
                                            홍길시 홍길동 홍길로123 홍길아파트 홍길홍길
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {active === 1 && (
                        <div id={styles.passwd_box}>
                            <div className={styles.box_wrap}>
                                <ul id={styles.pwd_info} className={styles.info_wrap}>
                                    <li className={styles.info}>
                                        <p>새 비밀번호</p>
                                        <div id={styles.pwd_wrap}>
                                            <input
                                                id={styles.pwd}
                                                name="newPassword1"
                                                type="password"
                                                placeholder="비밀번호입력"
                                                required
                                            />
                                        </div>
                                    </li>
                                    <li className={styles.info}>
                                        <p>새 비밀번호 확인</p>
                                        <div id={styles.pwd_check_wrap}>
                                            <input
                                                id={styles.pwd_check}
                                                name="newPassword2"
                                                type="password"
                                                placeholder="비밀번호입력 확인"
                                                required
                                            />
                                        </div>
                                    </li>
                                </ul>
                                <div id={styles.pwd_btn_wrap} className={styles.btn_wrap}>
                                    <button id={styles.pwd_btn} className={styles.btn} type="submit">
                                        비밀번호변경
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {active === 2 && (
                        <div id={styles.board_box}>
                            <div className={styles.box_wrap}>
                                <ul id={styles.board_info} className={styles.info_wrap}>
                                    {/* <li className={styles.info2} th:each="post : ${postList}"> */}
                                    <p th:text="${#strings.equals(post.subject, '자유게시판') ? '자유' : post.subject}"></p>
                                    {/* <p><a th:href="@{/postone/{id}(id = ${post.post_id})}" style="cursor: pointer">[[${post.title}]]</a></p> */}
                                    {/* </li> */}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyPage;
