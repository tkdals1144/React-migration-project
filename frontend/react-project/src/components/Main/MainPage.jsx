import React, { useEffect, useRef, useState } from 'react'
import styles from './MainPage.module.css'
import { getNextIndex, getPrevIndex } from '../../utils/bannerUtils'

function MainPage() {
    // 여기서만 쓰면 되니 main에서 변수 선언
    const bannerImages = [
        "/img/banner1.webp",
        "/img/banner2.webp",
        "/img/banner3.webp",
        "/img/banner1.webp"
    ];

    const bannerCount = bannerImages.length;

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);
    const bannerRef = useRef(null);

    useEffect(() => {
        if (bannerRef.current) {
            const offset = -currentIndex * 25;
            bannerRef.current.style.transform = `translateX(${offset}%)`;
            bannerRef.current.style.transition = 'transform 0.5s ease';
        }
    }, [currentIndex]);

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [])

    const handlePrev = () => {
        setCurrentIndex(prev => getPrevIndex(prev, bannerCount));
    }

    const handleNext = () => {
        setCurrentIndex(prev => getNextIndex(prev, bannerCount));
    }

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const startAutoSlide = () => {
        stopAutoSlide(); // 혹시 기존 interval이 있으면 제거
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => getNextIndex(prev, bannerCount));
        }, 3000);
    }

    return (
        <>
            <div className={styles.main}>
                <div id={styles.banner_wrap} onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
                    <div id={styles.prev_btn_wrap} className={styles.btn_wrap} onClick={handlePrev}>
                        <img src='/img/prev.svg' alt='' className={styles.btn}/>
                    </div>
                    <div id={styles.next_btn_wrap} className={styles.btn_wrap} onClick={handleNext}>
                        <img src='/img/next.svg' alt='' className={styles.btn}/>
                    </div>
                    <ul id={styles.banner} ref={bannerRef}>
                        {
                            bannerImages.map((src, idx) => (
                                <li key={idx} className={styles.banner_img_wrap}>
                                    <img src={src} alt={`banner-${idx}`} className={styles.banner_img}/>
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