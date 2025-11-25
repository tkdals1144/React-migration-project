import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import styles from './MainPage.module.css'

function MainPage() {
    // 여기서만 쓰면 되니 main에서 state변수 선언
    const[images, setImages] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                // 배너 이미지 호출
                const res = await axios.get("/api/banner");
                setImages(res.data);
            } catch (err) {
                console.error("배너 이미지 로드 실패 : ", err);
            }
        };
        fetchBanners();
    }, []);

    const handlePrev = () => {

    }

    const handleNext = () => {

    }

    return (
        <>
            <div className={styles.main}>
                <div id={styles.banner_wrap}>
                    <div id={styles.prev_btn_wrap} className={styles.btn_wrap} onClick={handlePrev}>
                        <img src='/prev.svg' alt='' className={styles.btn}/>
                    </div>
                    <div id={styles.next_btn_wrap} className={styles.btn_wrap} onCanPlay={handleNext}>
                        <img src='/next.svg' alt='' className={styles.btn}/>
                    </div>
                    <ul id={styles.banner}>
                        {
                            images.map((bi, index) => (
                                <li key={index} className={styles.banner_img_wrap}>
                                    <Link to="/promotion" target='_blank' rel='noreferrer'>
                                        <img src={bi} alt={`Banner ${index + 1}`} className={styles.banner_img}/>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MainPage