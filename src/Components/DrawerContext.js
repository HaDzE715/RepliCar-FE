import React, { createContext, useContext, useState, useEffect } from "react";
import { Drawer, Slide, IconButton } from "@mui/material";
import ProductOverview from "./ProductOverview"; // Adjust the import as necessary
import CloseIcon from "@mui/icons-material/Close";

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openDrawer = (id) => {
    setProductId(id);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setProductId(null);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={closeDrawer}
        transitionDuration={{ enter: 300, exit: 200 }}
        PaperProps={{
          style: {
            height: "70vh",
            borderRadius: "20px 20px 0px 0px",
            overflowX: "hidden", // Prevent horizontal scrolling
            overflowY: "auto", // Allow vertical scrolling if needed
          },
        }}
      >
        <div
          className="drawer-container"
          style={{ position: "relative", overflowX: "hidden" }} // Ensure no overflow
        >
          <IconButton
            onClick={closeDrawer}
            className="drawer-close-icon"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px", // Move to the right
              color: "black",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "10px",
              cursor: "pointer",
              zIndex: 10,
              display: isMobile ? "block" : "none", // Hide on desktop mode
              fontSize: "12px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon
              style={{
                fontSize: "14px", // Adjust the size of the X icon
                color: "black",
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
              }}
            />
          </IconButton>
          <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
            <div className="drawer-body">
              {productId && <ProductOverview productId={productId} />}
            </div>
          </Slide>
        </div>
      </Drawer>
    </DrawerContext.Provider>
  );
};
