import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './MyPage.module.css'
import useInfo from './../../hooks/useInfo'

function MyPage( {email} ) {
    const { info, addresses, posts, isLoading, error } = useInfo(email);
    // 주소값과 정보값은 변화시킬수 있으니 state 변수로 관리
    const [myAddresses, setMyAddresses] = useState([]);
    const [user, setUser] = useState(info);
    const [active, setActive] = useState(0);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (info) setUser(info);
    }, [info]);
    useEffect(() => {
        if (addresses) setMyAddresses(addresses);
    }, [addresses]);

    return (
        <>
        {modal &&
        <div className={styles.modal_wrap} id={styles.modal1}>
            <div className={styles.modal}>
                <div className={styles.modal_title}>
                    <p className={styles.title_txt}>주소록 관리</p>
                    <div className={styles.close_wrap} id={styles.close_wrap} onClick={() => setModal(false)}>
                        <img th:src="/img/close.svg}" alt="" id={styles.close}/>
                    </div>
                </div>
                <ul className={styles.modal_boxs}>
                    <li className={styles.modal_box} th:each="address, addressStat : ${addressList}" th:data-address-id="${address.addressId}">
                        <a th:href="@{/address/update/{id}(id = ${address.addressId})}">
                            <div className={styles.modal_box_title}>
                                <p className={styles.box_title_txt} th:text="주소록 + ' ' + ${addressStat.count}">주소록</p>
                                <div className={styles.close_wrap}>
                                    <img th:src="/img/close.svg" alt="" className={styles.close}/>
                                </div>
                            </div>
                            <div className={styles.modal_box_items}>
                                <p className={styles.modal_box_item} th:text="${address.address}">Geombae-ro, Guri-si, Gyeonggi-do, Republic of Korea, KoreaKoreaKoreaKoreaKoreaKoreaKorea</p>
                                <p className={styles.modal_box_item} th:text="${address.zipCode}">우편번호 - 0123456</p>
                                <p className={styles.modal_box_item} th:text="${address.detail}">홍길시 홍길동 홍길로123 홍길아파트 홍길홍길</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <a th:href="@{/address/create}">
                    <button className={styles.modal_btn}>주소록 추가</button>
                </a>
            </div>
        </div>}
        <div className={styles.main_wrap}>
        <div className={styles.main}>
        <Link to="/main">
            <h1 className={styles.h1}>CALTIZM</h1>
        </Link>
        <div id={styles.tab_wrap}>
            <p className={`${styles.tab} ${active === 0 ? styles.tab_active : ""}`} onClick={() => setActive(0)}>내 정보</p>
            <p className={`${styles.tab} ${active === 1 ? styles.tab_active : ""}`} onClick={() => setActive(1)}>비밀번호 변경</p>
            <p className={`${styles.tab} ${active === 2 ? styles.tab_active : ""}`} onClick={() => setActive(2)}>내 게시글</p>
        </div>
        {active === 0 &&
        <div id={styles.info_box}>
            <div id={styles.user_info_wrap} className={styles.box_wrap}>
                <div id={styles.update_btn_wrap} className={styles.btn_wrap}>
                    <button id={styles.update_btn} className={styles.btn}>정보일괄수정</button>
                </div>
                <ul id={styles.user_info} className={styles.info_wrap}>
                    <li className={styles.info}>
                        <p>이름</p>
                        <input id={styles.name} name="name" className={styles.info_input} type="text" value={user ? user.lastName + user.firstName : null} placeholder="영문 이름을 적어주세요" readOnly required/>
                    </li>
                    <li className={styles.info}>
                        <p>이메일</p>
                        <input id={styles.email} name="email" className={styles.info_input_readonly} type="email" value={user ? user.email : null} placeholder="이메일을 적어주세요" readOnly required/>
                    </li>
                    <li className={styles.info}>
                        <p>전화번호</p>
                        <input id={styles.phone} name="phoneNumber" className={styles.info_input} type="tel" value={user ? user.phoneNumber : null} placeholder="번호를 적어주세요" readOnly maxLength="11" required/>
                    </li>
                    <li className={styles.info}>
                        <p>생년월일</p>
                        <input id={styles.birth} name="birthDate" className={styles.info_input} type="date" value={user ? user.birthDate : null} min="1925-01-01" max="2006-12-31" placeholder="생년월일을 적어주세요" readOnly required/>
                    </li>
                    <li className={styles.info}>
                        <p>개인통관고유번호</p>
                        <input id={styles.pcc} name="pccc" className={styles.info_input} type="text"
                            value={user ? user.pccc : null}
                            placeholder="[none]"
                            readOnly/>
                    </li>
                </ul>
            </div>
            <div id={styles.address_info_wrap} className={styles.box_wrap}>
                <div id={styles.address_btn_wrap} className={styles.btn_wrap}>
                    <button id={styles.address_btn} className={styles.btn} onClick={() => setModal(true)}>주소록관리</button>
                </div>
                <ul className={styles.info_wrap} th:each="address : ${addressList}" th:data-address-id="${address.addressId}">
                    <li className={styles.info}>
                        <p>영문주소</p>
                        <p id={styles.eng_addr} th:text="${address.address}">Geombae-ro, Guri-si, Gyeonggi-do, Republic of Korea</p>
                    </li>
                    <li className={styles.info}>
                        <p>우편번호</p>
                        <p id={styles.postcode} th:text="${address.zipCode}">0123456</p>
                    </li>
                    <li className={styles.info}>
                        <p>상세주소</p>
                        <p id={styles.detailed} th:text="${address.detail}">홍길시 홍길동 홍길로123 홍길아파트 홍길홍길</p>
                    </li>
                </ul>
            </div>
        </div>}
        {active === 1 &&
        <div id={styles.passwd_box}>
            <div className={styles.box_wrap}>
                <ul id={styles.pwd_info} className={styles.info_wrap}>
                    <li className={styles.info}>
                        <p>새 비밀번호</p>
                        <div id={styles.pwd_wrap}>
                            <input id={styles.pwd} name="newPassword1" type="password" placeholder="비밀번호입력" required/>
                        </div>
                    </li>
                    <li className={styles.info}>
                        <p>새 비밀번호 확인</p>
                        <div id={styles.pwd_check_wrap}>
                            <input id={styles.pwd_check} name="newPassword2" type="password" placeholder="비밀번호입력 확인" required/>
                        </div>
                    </li>
                </ul>
                <div id={styles.pwd_btn_wrap} className={styles.btn_wrap}>
                    <button id={styles.pwd_btn} className={styles.btn} type="submit">비밀번호변경</button>
                </div>
            </div>
        </div>}
        {active === 2 &&
        <div id={styles.board_box}>
            <div className={styles.box_wrap}>
                <ul id={styles.board_info} className={styles.info_wrap}>
                    {/* <li className={styles.info2} th:each="post : ${postList}"> */}
                        <p th:text="${#strings.equals(post.subject, '자유게시판') ? '자유' : post.subject}"></p>
                        {/* <p><a th:href="@{/postone/{id}(id = ${post.post_id})}" style="cursor: pointer">[[${post.title}]]</a></p> */}
                    {/* </li> */}
                </ul>
            </div>
        </div>}
        </div>
        </div>
        </>

    )
}

export default MyPage