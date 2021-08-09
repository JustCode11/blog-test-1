import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import useFetch from "../config/useFetch";
import { useParams } from "react-router-dom";
import { GrClock } from "react-icons/gr";
import { FaUser, FaComment } from "react-icons/fa";
//import content from "../markdown/test1.md";

import styles from "../styles/blogdetail.module.css";

function BlogDetails() {
    const { id } = useParams();
    const { data: blog, loading, error } = useFetch(`http://localhost:8000/blogs/${id}`);
    console.log("blogDetails: ", blog);
    const [mdText, setMdText] = useState('');

    useEffect(() => {
        if (!loading) {
            const content = `http://localhost:8080/${blog.file}.md`
            //const content = require(`../markdown/${blog.file}.md`);
            console.log('content: ', content);
            fetch(content)
                .then((res) => {
                    if (res.ok) {
                        return res.text();
                    } else {
                        return Promise.reject("Didn't fetch text correctly!");
                    }
                })
                .then((text) => {
                    setMdText(text);
                })
                .catch((error) => console.error(error))
        }
    }, [blog]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>error.message</div>;
    }

    var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className={styles.blogDetailContainer}>
            {blog && (
                <>
                    <div className={styles.imageContainer}>
                        <img src={blog.images[0].base64} className={styles.image} alt="test image" />
                    </div>
                    <div className={styles.blogContentContainer}>
                        <div className={styles.genreContainer}>{blog.genre}</div>
                        <h1 className={styles.blogDetailHeader}>{blog.title}</h1>
                        <div className={styles.infoBlogContainer}>
                            <span className={styles.iconContainer}><FaUser />{blog.user.name}</span>
                            <span className={styles.iconContainer}><GrClock />{
                                new Date(blog.createdAt).toLocaleDateString("en-US", dateOptions)}</span>
                            <span className={styles.iconContainer}><FaComment />{blog.posts.length}</span>
                        </div>
                        <ReactMarkdown
                            remarkPlugins={[gfm]}
                            children={mdText}
                            components={{
                                img: ({ node, ...props }) => <img style={{ width: "300px", height: "220px", objectFit: "cover" }} {...props} />,
                                p: ({ node, ...props }) => <p style={{ display: "inline-block" }} {...props} />,
                                th: ({ node, ...props }) => <th style={{ fontWeight: "normal", textAlign: "left" }} {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className={styles.blockquoteStyle} {...props} />
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default BlogDetails
