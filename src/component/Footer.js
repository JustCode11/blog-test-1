import React from 'react'

import styles from "../styles/footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                &copy; {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer
