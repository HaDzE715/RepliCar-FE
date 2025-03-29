import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, summary, image, date, author, slug }) => {
  // Format date - assuming date is a string in ISO format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  };

  const styles = {
    blogCard: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      backgroundColor: "#fff",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    imageContainer: {
      width: "100%",
      height: "200px",
      overflow: "hidden"
    },
    blogImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease"
    },
    content: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
    },
    title: {
      marginTop: 0,
      marginBottom: "10px",
      fontSize: "1.5rem",
      fontFamily: "Noto Sans Hebrew, sans-serif",
      color: "#333"
    },
    meta: {
      display: "flex",
      justifyContent: "space-between",
      color: "#777",
      fontSize: "0.9rem",
      marginBottom: "15px",
      fontFamily: "Noto Sans Hebrew, sans-serif"
    },
    summary: {
      color: "#555",
      marginBottom: "20px",
      fontFamily: "Noto Sans Hebrew, sans-serif",
      lineHeight: 1.5,
      flexGrow: 1
    },
    readMoreLink: {
      alignSelf: "flex-start",
      textDecoration: "none",
      color: "#4169E1",
      fontWeight: "bold",
      fontFamily: "Noto Sans Hebrew, sans-serif",
      padding: "8px 0",
      position: "relative"
    }
  };

  return (
    <div 
      style={styles.blogCard}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
        e.currentTarget.querySelector("img").style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        e.currentTarget.querySelector("img").style.transform = "scale(1)";
      }}
    >
      <div style={styles.imageContainer}>
        <img src={image} alt={title} style={styles.blogImage} />
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <div style={styles.meta}>
          <span>{formatDate(date)}</span>
          {author && <span>מאת: {author}</span>}
        </div>
        <p style={styles.summary}>{summary}</p>
        <Link 
          to={`/blog/${slug || id}`} 
          style={styles.readMoreLink}
          onMouseOver={(e) => {
            e.target.style.color = "#274293";
            e.target.style.borderBottom = "2px solid #4169E1";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "#4169E1";
            e.target.style.borderBottom = "none";
          }}
        >
          קרא עוד
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;