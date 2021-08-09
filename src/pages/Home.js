import React from 'react';
import useFetch from "../config/useFetch";
import BlogItem from "../component/BlogItem";

import styles from "../styles/home.module.css";

function Home() {
    const { data: blogs, loading, error } = useFetch("http://localhost:8000/blogs");
    console.log('data: ', blogs);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>error.message</div>;
    }
    return (
        <div className={styles.homeBackground}>
            <div className={styles.homeContainer}>
                {blogs && blogs.map((blog) => (
                    <BlogItem key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default Home
