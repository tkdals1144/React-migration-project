import React from 'react'
import { Link } from 'react-router-dom'
import styles from './MyPage.moudle.css'

function MyPage() {
  return (
    <div className={styles.main}>
        <Link to="/main">
            <h1>CALTIZM</h1>
        </Link>
        <div id={styles.tab_wrap}>
            <p class="tab">내 정보</p>
            <p class="tab">비밀번호 변경</p>
            <p class="tab">내 게시글</p>
        </div>
        <div id={styles.info_box}>
            <div id={styles.user_info_wrap} className={styles.box_wrap}>
                <div id={styles.update_btn_wrap} className={styles.btn_wrap}>
                    <button id="update_btn" class="btn">정보일괄수정</button>
                </div>
                <ul id="user_info" class="info_wrap">
                    <li class="info">
                        <p>이름</p>
                        <input id="name" name="name" class="info_input" type="text" th:value="${user.firstName} + ' ' + ${user.lastName}" placeholder="영문 이름을 적어주세요" readonly required/>
                    </li>
                    <li class="info">
                        <p>이메일</p>
                        <input id="email" name="email" class="info_input_readonly" type="email" th:value="${user.email}" placeholder="이메일을 적어주세요" readonly required/>
                    </li>
                    <li class="info">
                        <p>전화번호</p>
                        <input id="phone" name="phoneNumber" class="info_input" type="tel" th:value="${user.phoneNumber}" placeholder="번호를 적어주세요" readonly maxlength="11" required/>
                    </li>
                    <li class="info">
                        <p>생년월일</p>
                        <input id="birth" name="birthDate" class="info_input" type="date" th:value="${user.birthDate}" min="1925-01-01" max="2006-12-31" placeholder="생년월일을 적어주세요" readonly required/>
                    </li>
                    <li class="info">
                        <p>개인통관고유번호</p>
                        <input id="pcc" name="pccc" class="info_input" type="text"
                            th:value="${user.pccc != null ? user.pccc : ''}"
                            placeholder="[none]"
                            readonly/>
                    </li>
                </ul>
            </div>
            <div id="address_info_wrap" class="box_wrap">
                <div id="address_btn_wrap" class="btn_wrap">
                    <button id="address_btn" class="btn">주소록관리</button>
                </div>
                <ul class="info_wrap" th:each="address : ${addressList}" th:data-address-id="${address.addressId}">
                    <li class="info">
                        <p>영문주소</p>
                        <p id="eng_addr" th:text="${address.address}">Geombae-ro, Guri-si, Gyeonggi-do, Republic of Korea</p>
                    </li>
                    <li class="info">
                        <p>우편번호</p>
                        <p id="postcode" th:text="${address.zipCode}">0123456</p>
                    </li>
                    <li class="info">
                        <p>상세주소</p>
                        <p id="detailed" th:text="${address.detail}">홍길시 홍길동 홍길로123 홍길아파트 홍길홍길</p>
                    </li>
                </ul>
            </div>
        </div>
        <div id="passwd_box" style="display: none;">
            <div class="box_wrap">
                <ul id="pwd_info" class="info_wrap">
                    <li class="info">
                        <p>새 비밀번호</p>
                        <div id="pwd_wrap">
                            <input id="pwd" name="newPassword1" type="password" placeholder="비밀번호입력" required/>
                        </div>
                    </li>
                    <li class="info">
                        <p>새 비밀번호 확인</p>
                        <div id="pwd_check_wrap">
                            <input id="pwd_check" name="newPassword2" type="password" placeholder="비밀번호입력 확인" required/>
                        </div>
                    </li>
                </ul>
                <div id="pwd_btn_wrap" class="btn_wrap">
                    <button id="pwd_btn" class="btn" type="submit">비밀번호변경</button>
                </div>
            </div>
        </div>
        <div id="board_box" style="display: none;">
            <div class="box_wrap">
                <ul id="board_info" class="info_wrap">
                    <li class="info2" th:each="post : ${postList}">
                        <p th:text="${#strings.equals(post.subject, '자유게시판') ? '자유' : post.subject}"></p>
                        <p><a th:href="@{/postone/{id}(id = ${post.post_id})}" style="cursor: pointer">[[${post.title}]]</a></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default MyPage