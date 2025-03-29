import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaDesktop,
  FaChartLine,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import SalesChart from "../AdminComponents/SalesChart";
import { Box, Typography } from "@mui/material";
// import DailySalesSummary from "../AdminComponents/DailySalesSummary";
import DailyRevenueDonut from "../AdminComponents/DailyRevenueDonut";
import { FaBlog } from "react-icons/fa";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const location = useLocation(); // Get current path
  const navigate = useNavigate(); // For navigating between routes
  const [isMobile, setIsMobile] = useState(false);
  const isDashboard = location.pathname === "/admin-dashboard";

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set mobile if screen width <= 768px
    };

    // Check on initial load and listen for resize events
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/logout`
      );

      if (response.data.message === "Logout successful") {
        // Clear admin information from localStorage
        localStorage.removeItem("admin");

        // Redirect to the login page or homepage after logout
        navigate("/");
      }
    } catch (err) {
      console.log("Error during logout:", err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          {admin && (
            <img
              src={admin.profilePicture}
              alt="Profile"
              style={styles.profilePic}
            />
          )}
        </div>
        <ul style={styles.navMenu}>
          <li
            style={
              location.pathname === "/admin-dashboard"
                ? styles.activeNavItem
                : styles.navItem
            }
            onClick={() => navigate("/admin-dashboard")}
          >
            <FaHome style={styles.icon} />
            {!isMobile && <span style={styles.navItemText}>Dashboard</span>}
          </li>
          <li style={styles.navItem} onClick={() => navigate("/")}>
            <FaDesktop style={styles.icon} />
            {!isMobile && <span style={styles.navItemText}>Visit Website</span>}
          </li>
          <li style={styles.navItem}>
            <FaChartLine style={styles.icon} />
            {!isMobile && <span style={styles.navItemText}>Orders</span>}
          </li>
          <li
            style={
              location.pathname === "/admin-dashboard/products"
                ? styles.activeNavItem
                : styles.navItem
            }
            onClick={() => navigate("/admin-dashboard/products")}
          >
            <FaShoppingCart style={styles.icon} />
            {!isMobile && <span style={styles.navItemText}>Products</span>}
          </li>
          <li
            style={
              location.pathname === "/admin-dashboard/blogs"
                ? styles.activeNavItem
                : styles.navItem
            }
            onClick={() => navigate("/admin-dashboard/blogs")}
          >
            <FaBlog style={styles.icon} />
            {!isMobile && <span style={styles.navItemText}>Blog</span>}
          </li>
        </ul>
        <div style={styles.navRight}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt style={styles.icon} />
            {!isMobile && <span>Logout</span>}
          </button>
        </div>
      </nav>

      {/* Main content area where nested routes will render */}
      <div style={styles.mainContent}>
        {isDashboard && (
          <Box>
            {/* Greeting Section */}
            <Box display="flex" alignItems="center" gap="15px" mb={3}>
              <img
                src={admin?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#333",
                }}
              >
                Hello, {admin?.name || "Admin"} 👋
              </Typography>
            </Box>

            {/* Dashboard Widgets */}
            <Box>
              <DailyRevenueDonut />
              <SalesChart />
            </Box>
          </Box>
        )}
        <Outlet />
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
  },
  navMenu: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  navItem: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#ccc",
    fontSize: "16px",
    textDecoration: "none",
  },
  activeNavItem: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "white",
    fontSize: "16px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  logoutButton: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
  },
  icon: {
    fontSize: "18px",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  // Responsive styles
  navItemText: {
    display: "inline", // Default is to show the text
  },
  navItemTextHidden: {
    display: "none", // Hide text for mobile screens
  },
};

export default AdminDashboard;
