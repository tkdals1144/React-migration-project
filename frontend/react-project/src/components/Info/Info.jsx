import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Info.module.css'

function Info() {
  return (
    <div className={styles.main_info}>
        <div className={styles.info_wrap_wrap}>
            <div className={styles.info_img_wrap}>
                <img src="/img/infoImg.webp" alt="" className={styles.info_img}/>
            </div>
            <div className={styles.info_box}>
                <h1 className={styles.team_name}><b>the</b> " TEAM 1 "</h1>
                <ul className={styles.team_info_wrap}>
                    <li className={styles.team_info}><img src="/img/star2.svg" alt="" className={styles.team_info_img}/>소병학 (Main, Currency)</li>
                    <li className={styles.team_info}><img src="/img/medal.svg" alt="" className={styles.team_info_img}/>백바울 (Cart, Product)</li>
                    <li className={styles.team_info}><img src="/img/medal.svg" alt="" className={styles.team_info_img}/>송병화 (Authentication, Address)</li>
                    <li className={styles.team_info}><img src="/img/medal.svg" alt="" className={styles.team_info_img}/>송수빈 (Community)</li>
                    <li className={styles.team_info}><img src="/img/medal.svg" alt="" className={styles.team_info_img}/>용지민 (Wishlist, MyPage)</li>
                    <li className={styles.team_info}><img src="/img/medal.svg" alt="" className={styles.team_info_img}/>이상민 (Front)</li>
                </ul>
                <h2 className={styles.team_slogan}>More easily, more conveniently</h2>
            </div>
            <ul className={styles.info_box2}>
                <li className={styles.info_link}><img src="/img/figma.svg" alt="" className={styles.info_link_img}/><a className={styles.a} href="https://www.figma.com/design/oX7nOuiN4E4uPu8dZRhAGk/CALTIZM_FRONT?node-id=0-1&p=f&t=sQq9WBxXrjiSysoy-0">Figma</a></li>
                <li id="none" className={styles.info_link}><img src="/img/project.svg" alt="" className={styles.info_link_img}/><Link to="/" download="">PPT</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Info