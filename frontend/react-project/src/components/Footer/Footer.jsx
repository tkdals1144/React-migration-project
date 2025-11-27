import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer>
        <div className={styles.footer_box}>
            <div className={styles.footer_ul_wrap}>
                <ul className={styles.footer_list_wrap}>
                    <li className={`${styles.footer_list} ${styles.footer_link}`} id={styles.footer_info}>
                        <img src="/img/footer_info.svg" alt="" className={styles.footer_icon}/>
                        <Link id={styles.footer_info_anchor} className={styles.footer_paragraph} to="/info">About Us</Link>
                    </li>
                    <li className={`${styles.footer_list} ${styles.footer_link}`} id={styles.footer_git} onClick={() => window.open("https://github.com/tkdals1144/React-migration-project")}>
                        <img src="/img/footer_git.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>GitHub</p>
                    </li>
                </ul>
                <ul className={styles.footer_list_wrap}>
                    <li className={styles.footer_list}>
                        <img src="/img/footer_phone.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>010-2282-7617</p>
                    </li>
                    <li className={styles.footer_list}>
                        <img src="/img/footer_mail.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>rioran@naver.com</p>
                    </li>
                    <li className={styles.footer_list}>
                        <img src="/img/footer_talk.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>Yoritokk</p>
                    </li>
                </ul>
            </div>
            <div className={styles.footer_link2} onClick={() => window.open("https://www.cultizm.com/")}>
                <div className={styles.footer_box}>
                    <h2 className={styles.h2}>Visit the page for more details</h2>
                </div>
                <div className={styles.footer_box2_btn}>
                    <p className={styles.footer_box2_p}>go cultizm</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer