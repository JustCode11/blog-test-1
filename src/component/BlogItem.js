import React from 'react'
import templateImg from "../../assets/images/dreaming.jpg";
import { GrClock } from "react-icons/gr";
import { FaUser, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../styles/blogitem.module.css";

function BlogItem({ blog }) {
    let date = new Date(blog.createdAt);
    var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className={styles.blogContainer}>
            <div className={styles.imageContainer}>
                <img src={blog.images[0] && blog.images[0].base64} className={styles.image} alt="test image" />
            </div>
            <div className={styles.genreContainer}>{blog.genre}</div>
            <div className={styles.textContainer}>
                <h2 className={styles.blogItemTitle}>{blog.title}</h2>
                <div className={styles.infoBlogContainer}>
                    <span className={styles.iconContainer}><FaUser />{blog.user.name}</span>
                    <span className={styles.iconContainer}><GrClock />{date.toLocaleDateString("en-US", dateOptions)}</span>
                    <span className={styles.iconContainer}><FaComment />{blog.posts.length}</span>
                </div>
                <div>{blog.body.length > 300 ?
                    blog.body.substring(0, 300) + "..." :
                    blog.body
                }</div>
            </div>
            <Link to={`/blog/${blog.id}`}>
                <div className={styles.moreContainer}>
                    Mehr
                </div>
            </Link>
        </div>
    )
}

export default BlogItem
