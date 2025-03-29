import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import ReactGA from "react-ga";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/blogs/${slug}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("המאמר המבוקש לא נמצא.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  };

  const handleBackClick = () => {
    navigate("/blogs");
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      direction: "rtl"
    },
    hero: {
      width: "100%",
      height: "400px",
      overflow: "hidden",
      borderRadius: "8px",
      marginBottom: "30px"
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    content: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "15px",
      color: "#333",
      fontFamily: "Noto Sans Hebrew, sans-serif"
    },
    meta: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      color: "#777",
      fontFamily: "Noto Sans Hebrew, sans-serif",
      borderBottom: "1px solid #eee",
      paddingBottom: "15px"
    },
    body: {
      lineHeight: 1.8,
      fontSize: "18px",
      color: "#444",
      fontFamily: "Noto Sans Hebrew, sans-serif"
    },
    backButton: {
      backgroundColor: "#4169E1",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontFamily: "Noto Sans Hebrew, sans-serif",
      fontWeight: "bold",
      marginTop: "30px",
      transition: "background-color 0.3s ease"
    },
    error: {
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
    },
    contentSkeleton: {
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Skeleton variant="rectangular" width="100%" height={400} style={{ borderRadius: "8px", marginBottom: "30px" }} />
        <div style={styles.contentSkeleton}>
          <Skeleton width="80%" height={50} style={{ marginBottom: "20px" }} />
          <Skeleton width="40%" height={20} style={{ marginBottom: "30px" }} />
          <Skeleton width="100%" height={20} style={{ marginBottom: "10px" }} />
          <Skeleton width="100%" height={20} style={{ marginBottom: "10px" }} />
          <Skeleton width="90%" height={20} style={{ marginBottom: "10px" }} />
          <Skeleton width="95%" height={20} style={{ marginBottom: "10px" }} />
          <Skeleton width="100%" height={20} style={{ marginBottom: "10px" }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>{error}</h2>
          <button 
            onClick={handleBackClick} 
            style={styles.backButton}
            onMouseOver={(e) => e.target.style.backgroundColor = "#274293"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4169E1"}
          >
            חזרה לבלוג
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {blog && (
        <>
          <div style={styles.hero}>
            <img src={blog.image} alt={blog.title} style={styles.image} />
          </div>
          
          <div style={styles.content}>
            <h1 style={styles.title}>{blog.title}</h1>
            <div style={styles.meta}>
              <span>{formatDate(blog.date)}</span>
              {blog.author && <span>מאת: {blog.author}</span>}
            </div>
            <div 
              style={styles.body}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <button 
              onClick={handleBackClick} 
              style={styles.backButton}
              onMouseOver={(e) => e.target.style.backgroundColor = "#274293"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#4169E1"}
            >
              חזרה לבלוג
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetail;