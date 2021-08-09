import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

import styles from "../styles/header.module.css";

function Header() {
    const [isShrunk, setShrunk] = useState(styles.bigHeader);
    useEffect(() => {
        const handler = () => {
            setShrunk((isShrunk) => {
                if (document.body.scrollTop > 20 ||
                    document.documentElement.scrollTop > 20) {
                    return styles.smallHeader;
                }

                if (document.body.scrollTop <= 1 &&
                    document.documentElement.scrollTop <= 1) {
                    return styles.bigHeader;
                }

                return isShrunk;
            })
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);
    return (
        <header className={`${styles.header} ${isShrunk}`}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <Link className={styles.linkLogo} to="/">
                        <h2 className={styles.headerLogo}>
                            <span className={styles.iconLogo}>&#1421;</span> <span className={`${styles.textLogo} ${isShrunk}`}>My Blog</span>
                        </h2>
                    </Link>
                </div>
                <nav></nav>
            </div>
        </header>
    )
}

export default Header
