import React, { createContext, useContext, useState } from "react";
import { Drawer, Slide, IconButton } from "@mui/material";
import ProductOverview from "./ProductOverview"; // Adjust the import as necessary
import CloseIcon from "@mui/icons-material/Close";

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState(null);

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
          },
        }}
      >
        <div className="drawer-container">
          <IconButton onClick={closeDrawer} className="drawer-close-icon">
            <CloseIcon
              style={{
                position: "absolute",
                top: "10px",
                left: "400px",
                color: "black",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "5px",
                cursor: "pointer",
                zIndex: 10,
                display: window.innerWidth > 768 ? "none" : "block",
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
