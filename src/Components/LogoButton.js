import React, { useState, useEffect } from "react";
import { Fab, Modal, Box, IconButton, Slide } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CloseIcon from "@mui/icons-material/Close";

const ModalBox = styled(Box)({
  position: "fixed",
  bottom: "90px", // Adjust to position above the floating button
  right: "17px",
  width: "60px",
  maxHeight: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "hidden",
});

const LogoItem = styled("img")({
  width: "60px", // Adjust the size of logos
  height: "90px",
  margin: "10px 0px 20px 0px", // Adjust margin for spacing
  cursor: "pointer",
});

const LogoButton = ({ logos, animate }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (animate) {
      const fabButton = document.getElementById("fab-button");
      if (fabButton) {
        fabButton.style.animation = "ring 1s ease-in-out";
      }
    }
  }, [animate]);

  const keyframes = `
    @keyframes ring {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <Fab
        id="fab-button"
        style={{
          backgroundColor: "black",
          color: "white",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        aria-label="logos"
        onClick={open ? handleClose : handleOpen}
      >
        {open ? <CloseIcon /> : <DirectionsCarIcon />}
      </Fab>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <ModalBox>
            <IconButton
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "white",
              }}
              onClick={handleClose}
            />
            {logos.map((logo, index) => (
              <LogoItem
                key={index}
                src={logo.src}
                alt={logo.alt}
                onClick={() => {
                  navigate(`/brand/${logo.alt.toLowerCase()}`);
                  handleClose();
                }}
              />
            ))}
          </ModalBox>
        </Slide>
      </Modal>
    </>
  );
};

export default LogoButton;
