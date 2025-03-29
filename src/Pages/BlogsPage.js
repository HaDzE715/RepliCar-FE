import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import ReactGA from "react-ga";
import BlogCard from "../Components/BlogCard";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blogs`
        );
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  const styles = {
    pageWrapper: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // This makes the wrapper take at least the full viewport height
    },
    mainContent: {
      flex: "1", // This makes the content area take up all available space
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
      direction: "rtl"
    },
    pageTitle: {
      textAlign: "center",
      margin: "30px 0",
      fontFamily: "Noto Sans Hebrew, sans-serif",
      color: "#333"
    },
    blogsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "30px",
      marginTop: "30px"
    },
    blogSkeleton: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      paddingBottom: "20px"
    },
    noBlogs: {
      textAlign: "center",
      gridColumn: "1 / -1",
      padding: "40px",
      color: "#666",
      fontSize: "18px"
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>הבלוג שלנו</h1>
        <div style={styles.blogsContainer}>
          {loading ? (
            Array.from(new Array(3)).map((_, index) => (
              <div key={index} style={styles.blogSkeleton}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="80%" height={30} style={{ marginTop: "10px" }} />
                <Skeleton width="60%" height={20} style={{ marginTop: "8px" }} />
                <Skeleton width="90%" height={20} style={{ marginTop: "8px" }} />
                <Skeleton width="40%" height={30} style={{ marginTop: "15px" }} />
              </div>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                summary={blog.summary}
                image={blog.image}
                date={blog.date}
                author={blog.author}
                slug={blog.slug}
              />
            ))
          ) : (
            <p style={styles.noBlogs}>אין מאמרים זמינים כרגע.</p>
          )}
        </div>
      </div>
      {/* The footer component will be rendered here by your router/layout */}
    </div>
  );
};

export default BlogsPage;