import React, { useState, useEffect, useRef } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaHome,
  FaDesktop,
  FaChartLine,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { useLocation, useNavigate, Outlet } from "react-router-dom"; // Add Outlet for nested routes

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [collapsed, setCollapsed] = useState(true); // Sidebar collapse state
  const sidebarRef = useRef(null); // Reference for sidebar to detect outside clicks
  const location = useLocation(); // Get current path
  const navigate = useNavigate(); // For navigating between routes

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const handleSidebarClick = () => {
    if (collapsed) {
      setCollapsed(false); // Expand sidebar on click
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setCollapsed(true); // Collapse sidebar if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed]);

  return (
    <div style={styles.container}>
      <div
        ref={sidebarRef}
        onClick={handleSidebarClick}
        style={styles.sidebarContainer}
      >
        <Sidebar collapsed={collapsed} style={styles.sidebar}>
          <div style={styles.profileContainer}>
            {admin && (
              <img
                src={admin.profilePicture}
                alt="Profile"
                style={
                  collapsed ? styles.profilePicSmall : styles.profilePicLarge
                }
              />
            )}
          </div>

          <Menu iconShape="circle">
            <MenuItem
              icon={<FaHome style={styles.icon} />}
              active={location.pathname === "/admin-dashboard"}
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaDesktop style={styles.icon} />}>
              Visit Website
            </MenuItem>
            <MenuItem icon={<FaChartLine style={styles.icon} />}>
              Orders
            </MenuItem>
            <div
              style={{ ...styles.divider, width: collapsed ? "50%" : "80%" }}
            ></div>
            <MenuItem
              icon={<FaShoppingCart style={styles.icon} />}
              active={location.pathname === "/admin-dashboard/products"}
              onClick={() => navigate("/admin-dashboard/products")}
            >
              Products
            </MenuItem>
          </Menu>

          <div style={styles.logoutContainer}>
            <Menu iconShape="circle">
              <MenuItem icon={<FaSignOutAlt style={styles.icon} />}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Sidebar>
      </div>

      {/* Main content area where nested routes will render */}
      <div style={styles.mainContent}>
        <Outlet /> {/* Renders the ProductManagement component */}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    height: "100vh", // Ensure the entire viewport height is used
  },
  sidebarContainer: {
    height: "100%", // Ensure the sidebar fills the height of the container
  },
  sidebar: {
    height: "100%", // Ensure the sidebar itself takes the full height
  },
  profileContainer: {
    padding: "20px",
    textAlign: "center",
  },
  profilePicSmall: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  profilePicLarge: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  logoutMenu: {
    marginTop: "auto", // Push logout menu to the bottom
  },
  logoutContainer: {
    position: "absolute",
    bottom: 0, // Ensure the logout icon stays at the bottom
    width: "100%", // Ensure it spans the entire width of the sidebar
  },
  icon: {
    fontSize: "24px", // Increase the size of the icons
    color: "#000", // Slightly off-white for the icons
  },
  divider: {
    margin: "20px auto", // Center the divider with margin
    height: "1px", // Set the height for the divider
    backgroundColor: "#cccccc", // Light grey color for the divider
    width: "80%", // Divider width adjusts based on collapsed state
  },
};

export default AdminDashboard;
