import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import styles from './Signup.module.css'
import useAddressSearch from './../../hooks/useAddressSearch';
import useMultiAddress from "./../../hooks/useMultiAddress";
import useSignupValidation from "./../../hooks/useSignupValidation";

function Signup( {setUser} ) {

    const navigate = useNavigate();
    const {
        addresses,
        handleAddAddress,
        handleRemoveAddress,
        handleDetailChange,
        handleUpdateAddress,
        setDetailAddressRef
    } = useMultiAddress();

    useEffect(() => {
        console.log("리렌더링");
    }, [addresses])

    const { validate, validationError } = useSignupValidation();

    const [data, setData] = useState({
        last_name : "",
        first_name : "",
        email : "",
        phone_number : "",
        birth_date : "",
        password : "",
        checkPw : "",
        pccc : ""
    });
    const [error, setError] = useState("");

    // 2. 주소 검색 완료 시 실행될 콜백 함수 정의
    const handleAddressComplete = (id, data) => {
        // id를 기반으로 해당 주소 state만 업데이트
        handleUpdateAddress(id, {
            address: data.roadAddress || data.jibunAddress,
            zip_code: data.zonecode
        });

        // const ref = detailAddressRefs[id];
        // if (ref) ref.focus();
    };

    const openPostcode = useAddressSearch(handleAddressComplete);

    const handleChange = (e) => {
        const {name, value} = e.target;
        // ...prev를 통해 기존의 값 전개
        // 두번째 인자로 중복값을 넣음으로써 해당 값으로 업데이트 ([name] : value)
        setData((prev) => ({ ...prev, [name] : value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("일단 동작")
        console.log(data.phone);

        // 모든 값 검증
        if (!validate(data, addresses)) {
            setError(validationError);
            console.log(error);
            return;
        }
        console.log("??");
        try {
            
            const res = await axios.post("/api/signup", {
                ...data,
                addresses
            });
            if (res.data.success) {
                navigate("/main");
            } else {
                setError(res.data.message);
                console.log(error);
            }
        } catch (err) {
            console.log(err);
            setError("서버 오류");
        }
    }

    return (
        <div className={styles.main_wrap}>
        <main>
        <Link to='/main'>
            <h1 className={styles.h1}>CALTIZM</h1>
        </Link>
        <form onSubmit={handleSubmit}>
            <div id={styles.margin_box}></div>
            <span className={styles.title}>필수입력</span><br/>
            <div id={styles.signUp_box}>
                <div className={styles.bigbox}>
                    <div id={styles.name_box} className={styles.box}>
                        <input type="text" name="last_name" id={styles.last_name} className={styles.input} onChange={handleChange} placeholder="성" required/>
                        <input type="text" name="first_name" id={styles.first_name} className={styles.input} onChange={handleChange} placeholder="이름" required/>
                    </div>
                    <div id={styles.email_box} className={styles.box}>
                        <input type="text" name="email" id={styles.email} className={styles.input} onChange={handleChange} placeholder="이메일을 입력해주세요" required/>
                    </div>
                    <div id={styles.phone_box} className={styles.box}>
                        <input type="text" name="phone_number" id={styles.phone} className={styles.input} onChange={handleChange} placeholder="- 없이 전화번호를 입력해주세요" required/>
                    </div>
                    <div id={styles.birth_box} className={styles.box}>
                        <input type="date" name="birth_date" id={styles.birth} className={styles.input} onChange={handleChange} min="1925-01-01" max="2006-12-31" placeholder="생년월일을 8자로 적어주세요" required/>
                    </div>
                </div>
                {addresses.map(item => (
                    <div 
                        key={item.id} 
                        className={`${styles.bigbox} ${styles.address_bigbox}`}
                    >
                        <div 
                            className={styles.box}
                            onClick={() => openPostcode(item.id)}   // 주소 검색, item.id 기반
                        >
                            <p className={`${styles.input} ${styles.addressEnglishText}`} style={{
                                color : item.address ? "#000" : "#aaa"
                            }}>{item.address ? item.address : "영문주소"}</p>
                            <input 
                                type="text" 
                                value={item.address}
                                className={styles.addressEnglish}
                                readOnly
                                style={{display : 'none'}}
                            />
                        </div>

                        <div 
                            className={styles.box}
                            onClick={() => openPostcode(item.id)}
                        >
                            <p className={`${styles.input} ${styles.postcodeText}`} style={{
                                color : item.zip_code ? "#000" : "#aaa"
                            }}>{item.zip_code ? item.zip_code : "우편번호"}</p>
                            <input 
                                type="text" 
                                value={item.zip_code} 
                                className={styles.postcode}
                                readOnly
                                style={{display : 'none'}}
                            />
                        </div>

                        <div className={styles.box}>
                            <input 
                                type="text" 
                                placeholder="상세주소 입력"
                                value={item.detail}
                                className={`${styles.input} ${styles.detailAddress}`}
                                onChange={(e) => handleDetailChange(item.id, e.target.value)}
                                ref={(el) => setDetailAddressRef(item.id, el)}
                                required
                            />
                        </div>

                        {/* 삭제 버튼 */}
                        <div className={styles.close_wrap}>
                            <img 
                                src="/img/close.svg" 
                                className="close"
                                onClick={() => handleRemoveAddress(item.id)}
                            />
                        </div>
                    </div>
                ))}
                <div id={styles.plus_btn} onClick={handleAddAddress}>
                    <img className={styles.plus} src="/img/plus.svg" alt=""/>
                </div>
                <div className={styles.bigbox}>
                    <div id={styles.passwd_box} className={styles.box}>
                        <input type="password" name="password" id={styles.passwd} className={styles.input} onChange={handleChange} placeholder="비밀번호를 입력해주세요" required/>
                        <input type="password" name="checkPw" id={styles.passwd_check} className={styles.input} onChange={handleChange} placeholder="비밀번호 확인" required/>
                    </div>
                </div>
            </div>
            <p className={styles.title} id={styles.title2}>선택입력</p>
            <div className={styles.bigbox} id={styles.boxbox}>
                <div id={styles.pcc_box} className={styles.box}>
                    <input type="text" name="pccc" id={styles.pcc} className={styles.input} onChange={handleChange} placeholder="개인통관고유번호"/>
                </div>
            </div>
            <button id={styles.btn} type='submit'>가입</button>
        </form>
    </main>
    </div>
  )
}
export default Signup