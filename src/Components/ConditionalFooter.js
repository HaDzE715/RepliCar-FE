import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/cart"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return !shouldHideFooter ? <Footer /> : null;
};

export default ConditionalFooter;
