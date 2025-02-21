import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../Pictures/logo1.jpeg";
import logo1 from "../Pictures/logo2.jpeg";
import { useCart } from "../Components/CartContext";

const pages = [
  { name: "דף הבית", link: "/" },
  {
    name: "מוצרים",
    subItems: [
      { name: "פוסטרים", link: "/posters" },
      { name: "מסגרות", link: "/frames" },
      { name: "רכבים", link: "/diecast" },
    ],
  },
  { name: "SALE", link: "/discounts" },
];

function CustomNavbar() {
  const [anchorElProducts, setAnchorElProducts] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.length;

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#1b2e51", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/* Cart Icon on the Left */}
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={totalItems} color="error" showZero>
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </Badge>
        </IconButton>

        {/* Desktop Menu Centered */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {pages.map((page) =>
            page.subItems ? (
              <Box key={page.name} sx={{ position: "relative" }}>
                <Button
                  onClick={(e) => setAnchorElProducts(e.currentTarget)}
                  sx={{
                    color: "white",
                    mx: 2,
                    fontSize: "18px",
                    fontFamily: "Noto Sans Hebrew",
                  }}
                >
                  {page.name} <ArrowDropDownIcon />
                </Button>
                <Menu
                  anchorEl={anchorElProducts}
                  open={Boolean(anchorElProducts)}
                  onClose={() => setAnchorElProducts(null)}
                  sx={{ direction: "rtl" }}
                >
                  {page.subItems.map((sub) => (
                    <MenuItem
                      key={sub.name}
                      component={Link}
                      to={sub.link}
                      sx={{
                        textAlign: "right",
                        fontSize: "16px",
                        fontFamily: "Noto Sans Hebrew",
                      }}
                    >
                      {sub.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                sx={{
                  color: "white",
                  mx: 2,
                  fontSize: "18px",
                  fontFamily: "Noto Sans Hebrew",
                }}
              >
                {page.name}
              </Button>
            )
          )}
        </Box>

        {/* Logo on the Right */}
        <Link to="/">
          <img src={logo} alt="Logo" style={{ width: 100, height: "auto" }} />
        </Link>

        {/* Mobile Menu Button on the Right */}
        <IconButton sx={{ display: { md: "none" } }} onClick={toggleMobileMenu}>
          <MenuIcon sx={{ fontSize: 32, color: "white" }} />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobileMenu}
        sx={{ direction: "rtl" }}
      >
        <Box sx={{ width: 250, p: 2, direction: "rtl" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start", // Aligns to the left
              alignItems: "center",
              width: "100%",
              direction: "ltr !important",
            }}
          >
            <IconButton
              onClick={toggleMobileMenu}
              sx={{
                mb: 2,
                ml: 1, // Adds small spacing from the edge
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {pages.map((page) => (
              <>
                <ListItem
                  button
                  key={page.name}
                  component={Link}
                  to={page.link}
                  onClick={page.subItems ? toggleSubMenu : toggleMobileMenu}
                >
                  <ListItemText
                    primary={page.name}
                    sx={{
                      textAlign: "right",
                      fontSize: "18px",
                      fontFamily: "Noto Sans Hebrew !important",
                    }}
                  />
                  {page.subItems && (
                    <ArrowDropDownIcon
                      sx={{
                        transform: openSubMenu
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  )}
                </ListItem>
                {page.subItems && (
                  <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        direction: "rtl",
                        textAlign: "right",
                        fontFamily: "Noto Sans Hebrew !important",
                        fontSize: "16px",
                      }}
                    >
                      {page.subItems.map((sub) => (
                        <ListItem
                          key={sub.name}
                          button
                          component={Link}
                          to={sub.link}
                          sx={{
                            pl: 4,
                            textAlign: "right",
                            fontFamily: "Noto Sans Hebrew !important",
                            fontSize: "16px",
                          }}
                          onClick={toggleMobileMenu}
                        >
                          <ListItemText
                            primary={sub.name}
                            sx={{
                              textAlign: "right",
                              fontSize: "18px",
                              fontFamily: "Noto Sans Hebrew !important",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            ))}
          </List>
          {/* Bottom Section Inside Mobile Menu */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "90%",
              backgroundColor: "white",
              textAlign: "center",
              py: 2,
            }}
          >
            {/* Logo Above the Buttons */}
            <img
              src={logo1}
              alt="RepliCar Logo"
              style={{
                width: "150px", // Adjust logo size
                height: "auto",
                display: "block",
                margin: "0 auto",
                marginBottom: "12px", // Space between logo and buttons
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                component={Link}
                to="/about"
                sx={{
                  color: "black",
                  fontSize: "16px",
                  fontFamily: "Noto Sans Hebrew",
                }}
                onClick={toggleMobileMenu}
              >
                קצת עלינו
              </Button>
              <Button
                component={Link}
                to="/contact"
                sx={{
                  color: "black",
                  fontSize: "16px",
                  fontFamily: "Noto Sans Hebrew",
                }}
                onClick={toggleMobileMenu}
              >
                צרו קשר
              </Button>
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                mt: 1,
                fontFamily: "Noto Sans Hebrew",
                color: "black",
                direction: "rtl !important",
              }}
            >
              כל זכויות שמורות רפליקאר 2024 ©
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default CustomNavbar;
