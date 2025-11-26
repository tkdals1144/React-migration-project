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
                        <img src="/footer_info.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>About Us</p>
                        <Link id={styles.footer_info_anchor} to="/info"></Link>
                    </li>
                    <li className={`${styles.footer_list} ${styles.footer_link}`} id={styles.footer_git} onClick={() => window.open("https://github.com/tkdals1144/React-migration-project")}>
                        <img src="/footer_git.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>GitHub</p>
                    </li>
                </ul>
                <ul className={styles.footer_list_wrap}>
                    <li className={styles.footer_list}>
                        <img src="/footer_phone.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>010-3016-7609</p>
                    </li>
                    <li className={styles.footer_list}>
                        <img src="/footer_mail.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>abcde@gmail.com</p>
                    </li>
                    <li className={styles.footer_list}>
                        <img src="/footer_talk.svg" alt="" className={styles.footer_icon}/>
                        <p className={styles.footer_paragraph}>TwT</p>
                    </li>
                </ul>
            </div>
            <Link to="https://www.cultizm.com/">
                <div className={styles.footer_box}>
                    <h2 className={styles.h2}>Visit the page for more details</h2>
                    <div className={styles.footer_box2_btn}>
                        <p className={styles.footer_box2_p}>go cultizm</p>
                    </div>
                </div>
            </Link>
        </div>
    </footer>
  )
}

export default Footer