import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar2";
import ConditionalFooter from "./ConditionalFooter";

const Layout = () => {
  const location = useLocation();

  // Define routes where the Navbar and Footer should not appear
  const noNavbarFooterRoutes = ["/admin"];

  return (
    <div>
      {/* Conditionally render Navbar and Footer based on the route */}
      {!noNavbarFooterRoutes.includes(location.pathname) && <Navbar />}
      <main>
        {/* Render the current route's component */}
        <Outlet />
      </main>
      {!noNavbarFooterRoutes.includes(location.pathname) && (
        <ConditionalFooter />
      )}
    </div>
  );
};

export default Layout;
