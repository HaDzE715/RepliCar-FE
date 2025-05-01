import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import ReactGA from "react-ga";
import BlogCard from "../Components/BlogCard";
import SEO from "../Components/SEO";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // No need for animation setup options with DotLottieReact

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
    bannerContainer: {
      width: "100%",
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px 0",
      borderBottom: "1px solid #e0e0e0",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      position: "relative",
    },
    bannerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "1200px",
      padding: "0 20px",
      direction: "rtl",
    },
    bannerText: {
      fontFamily: "Noto Sans Hebrew, sans-serif",
      color: "#333",
      textAlign: "right",
      flex: 1,
    },
    bannerTitle: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      margin: "0 0 10px 0",
    },
    bannerSubtitle: {
      fontSize: "1.2rem",
      color: "#666",
      margin: 0,
    },
    animationContainer: {
      width: "150px",
      height: "150px",
      marginLeft: "20px",
    },
    mainContent: {
      flex: "1", // This makes the content area take up all available space
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
      direction: "rtl",
    },
    pageTitle: {
      textAlign: "center",
      margin: "30px 0",
      fontFamily: "Noto Sans Hebrew, sans-serif",
      color: "#333",
    },
    blogsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "30px",
      marginTop: "30px",
    },
    blogSkeleton: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      paddingBottom: "20px",
    },
    noBlogs: {
      textAlign: "center",
      gridColumn: "1 / -1",
      padding: "40px",
      color: "#666",
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Add SEO component with blog page specific metadata */}
      <SEO
        title="הבלוג | Replicar - רפליקאר"
        description="הבלוג של רפליקאר – טיפים, מידע וחדשות בנושא דגמי רכבים, אספנות, ועולם הדייקאסט"
        url="https://replicar.co.il/blogs"
      />

      {/* Banner Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto 40px auto",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #202020 0%, #353535 100%)",
          position: "relative",
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "-20px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #6a6a6a, #949494)",
            zIndex: 1,
            filter: "blur(15px)",
            opacity: 0.3,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-15px",
            right: "-15px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #949494, #c4c4c4)",
            zIndex: 1,
            filter: "blur(15px)",
            opacity: 0.3,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Text Container */}
          <div
            style={{
              flex: "1 1 300px",
              padding: "20px",
              textAlign: "right",
              direction: "rtl",
            }}
          >
            <h2
              style={{
                fontFamily: "'Heebo', 'Noto Sans Hebrew', sans-serif",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "15px",
              }}
            >
              הבלוג של רפליקאר
            </h2>

            <p
              style={{
                fontFamily: "'Heebo', 'Noto Sans Hebrew', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: "1.6",
                color: "#d9d9d9",
                marginBottom: "25px",
              }}
            >
              טיפים, מידע וחדשות בנושא דגמי רכבים, אספנות, ועולם הדייקאסט
            </p>
          </div>

          {/* Animation Container */}
          <div
            style={{
              flex: "1 1 400px",
              maxWidth: "480px",
              minWidth: "300px",
              margin: "0 auto",
              background:
                "radial-gradient(circle, rgba(40,40,40,0.7) 0%, rgba(30,30,30,0) 70%)",
              borderRadius: "8px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                boxShadow: "inset 0 0 15px rgba(200, 200, 200, 0.1)",
                pointerEvents: "none",
              }}
            />
            <DotLottieReact
              src="https://lottie.host/0331535c-8ae0-4a6f-8d37-736fd1971c9b/S3zZyM6595.lottie"
              loop
              autoplay
              style={{
                width: "100%",
                height: "100%",
                filter: "drop-shadow(0 8px 12px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            padding: "15px 20px",
            background: "rgba(0, 0, 0, 0.4)",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            direction: "rtl",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 15px",
              color: "#ffffff",
            }}
          >
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>📝</span>
            <span
              style={{
                fontFamily: "'Heebo', 'Noto Sans Hebrew', sans-serif",
                fontSize: "0.9rem",
              }}
            >
              מאמרים חדשים
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 15px",
              color: "#ffffff",
            }}
          >
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>🚗</span>
            <span
              style={{
                fontFamily: "'Heebo', 'Noto Sans Hebrew', sans-serif",
                fontSize: "0.9rem",
              }}
            >
              עולם הדייקאסט
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 15px",
              color: "#ffffff",
            }}
          >
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>💡</span>
            <span
              style={{
                fontFamily: "'Heebo', 'Noto Sans Hebrew', sans-serif",
                fontSize: "0.9rem",
              }}
            >
              טיפים מקצועיים
            </span>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>הבלוג שלנו</h1>
        <div style={styles.blogsContainer}>
          {loading ? (
            Array.from(new Array(3)).map((_, index) => (
              <div key={index} style={styles.blogSkeleton}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton
                  width="80%"
                  height={30}
                  style={{ marginTop: "10px" }}
                />
                <Skeleton
                  width="60%"
                  height={20}
                  style={{ marginTop: "8px" }}
                />
                <Skeleton
                  width="90%"
                  height={20}
                  style={{ marginTop: "8px" }}
                />
                <Skeleton
                  width="40%"
                  height={30}
                  style={{ marginTop: "15px" }}
                />
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
