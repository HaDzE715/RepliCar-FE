import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Container,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../Pictures/logo1.jpeg";
import { useCart } from "../Components/CartContext";
import BusinessIcon from "@mui/icons-material/Business"; // Building icon for about us
import { Phone } from "@mui/icons-material";

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
  { name: "מבצעי פסח!", link: "/discounts" },
];

function CustomNavbar() {
  const [anchorElProducts, setAnchorElProducts] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.length;
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to create transition effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  // Close submenu when drawer closes
  const handleDrawerClose = () => {
    setMobileOpen(false);
    setOpenSubMenu(false);
  };

  const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);

  // Check if a page is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Check if any subitem is active
  const hasActiveSubItem = (subItems) => {
    return subItems && subItems.some((item) => isActive(item.link));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? "rgba(27, 46, 81, 0.95)" : "#1b2e51",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "none",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: scrolled ? 0.5 : 1.5,
            transition: "padding 0.3s ease",
          }}
        >
          {/* Cart Icon on the Left with animated badge */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {" "}
            {/* Increased gap from 1 to 3 */}
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                color: "#c0c0c0",
                background:
                  totalItems > 0 ? "rgba(255,255,255,0.1)" : "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                  transform: "scale(1.05)",
                },
              }}
            >
              <Badge
                badgeContent={totalItems}
                color="error"
                showZero
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    minWidth: "18px",
                    height: "18px",
                    padding: "0 4px",
                    fontWeight: "bold",
                    animation: totalItems > 0 ? "pulse 1.5s infinite" : "none",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.2)" },
                      "100%": { transform: "scale(1)" },
                    },
                  },
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 28 }} />
              </Badge>
            </IconButton>
            <Button
              component={Link}
              to="/contact"
              sx={{
                color: "white",
                fontFamily: "Noto Sans Hebrew",
                fontSize: "0.9rem",
                fontWeight: "medium",
                opacity: 0.85,
                display: { xs: "none", sm: "block" },
                "&:hover": {
                  opacity: 1,
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Phone fontSize="small" />
              צרו קשר
            </Button>
          </Box>

          {/* Desktop Menu Centered */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              direction: "rtl", // Ensuring RTL layout for desktop mode
            }}
          >
            {pages.map((page) =>
              page.subItems ? (
                <Box key={page.name} sx={{ position: "relative" }}>
                  <Button
                    onClick={(e) => setAnchorElProducts(e.currentTarget)}
                    sx={{
                      color: hasActiveSubItem(page.subItems)
                        ? "#ffd700"
                        : "#c0c0c0",
                      mx: 1,
                      px: 2,
                      fontSize: "1rem",
                      fontFamily: "Noto Sans Hebrew",
                      fontWeight: "bold",
                      borderBottom: hasActiveSubItem(page.subItems)
                        ? "2px solid #ffd700"
                        : "2px solid transparent",
                      borderRadius: "0",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderBottom: "2px solid #ffd700",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    {page.name}{" "}
                    <KeyboardArrowDownIcon
                      fontSize="small"
                      sx={{
                        ml: 0.5,
                        transition: "transform 0.3s ease",
                        transform: Boolean(anchorElProducts)
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      }}
                    />
                  </Button>
                  <Menu
                    anchorEl={anchorElProducts}
                    open={Boolean(anchorElProducts)}
                    onClose={() => setAnchorElProducts(null)}
                    sx={{
                      mt: 1.5,
                      direction: "rtl",
                      "& .MuiPaper-root": {
                        backgroundImage:
                          "linear-gradient(to bottom, #1b2e51, #162544)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                        borderRadius: "4px",
                        border: "1px solid rgba(255,255,255,0.1)",
                      },
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    keepMounted
                  >
                    {page.subItems.map((sub) => (
                      <MenuItem
                        key={sub.name}
                        component={Link}
                        to={sub.link}
                        onClick={() => setAnchorElProducts(null)}
                        sx={{
                          textAlign: "right",
                          fontSize: "0.95rem",
                          fontFamily: "Noto Sans Hebrew",
                          color: "#c0c0c0",
                          padding: "10px 16px",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          "&:last-child": {
                            borderBottom: "none",
                          },
                          backgroundColor: isActive(sub.link)
                            ? "rgba(255, 215, 0, 0.1)"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(255, 215, 0, 0.15)",
                          },
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
                    color: isActive(page.link) ? "#ffd700" : "#c0c0c0",
                    mx: 1,
                    px: 2,
                    fontSize: "1rem",
                    fontFamily: "Noto Sans Hebrew",
                    fontWeight: "bold",
                    borderBottom: isActive(page.link)
                      ? "2px solid #ffd700"
                      : "2px solid transparent",
                    borderRadius: "0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderBottom: "2px solid #ffd700",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                    ...(page.name === "מבצעי פסח!" && {
                      color: "#ff3d3d",
                      fontWeight: "bold",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "-3px",
                        right: "0",
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#ff3d3d",
                        animation: "pulsate 2s infinite",
                      },
                      "@keyframes pulsate": {
                        "0%": { opacity: 0.6 },
                        "50%": { opacity: 1 },
                        "100%": { opacity: 0.6 },
                      },
                    }),
                  }}
                >
                  {page.name}
                </Button>
              )
            )}
          </Box>

          {/* Logo on the Right with slight zoom on hover */}
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logo}
              alt="RepliCar Logo"
              sx={{
                width: { xs: 85, md: 110 },
                height: "auto",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Link>

          {/* Mobile Menu Button on the Right */}
          <IconButton
            onClick={toggleMobileMenu}
            sx={{
              display: { md: "none" },
              color: "white",
              p: 1,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer with enhanced styling */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: "300px",
            backgroundImage:
              "linear-gradient(to bottom, #1b2e51 30%, #162544 100%)",
            color: "#c0c0c0",
            direction: "rtl",
            boxShadow: "-5px 0 15px rgba(0,0,0,0.3)",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header with close button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2.5 /* Increased padding from 2 to 2.5 to accommodate larger logo */,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={logo}
              alt="RepliCar Logo"
              style={{
                height: "60px",
                width: "auto",
              }} /* Increased from 40px to 60px */
            />
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Links */}
          <List sx={{ pt: 1, flexGrow: 1 }}>
            {pages.map((page, index) => (
              <React.Fragment key={page.name}>
                <ListItem
                  button
                  component={page.subItems ? "div" : Link}
                  to={page.subItems ? undefined : page.link}
                  onClick={page.subItems ? toggleSubMenu : handleDrawerClose}
                  sx={{
                    py: 1.5,
                    backgroundColor:
                      isActive(page.link) || hasActiveSubItem(page.subItems)
                        ? "rgba(255, 215, 0, 0.1)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.05)",
                    },
                    ...(page.name === "מבצעי פסח!" && {
                      color: "#ff3d3d",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#ff3d3d",
                        opacity: 0.6,
                      },
                    }),
                  }}
                >
                  <ListItemText
                    primary={page.name}
                    sx={{
                      textAlign: "right",
                      "& .MuiTypography-root": {
                        fontSize: "1.1rem",
                        fontFamily: "Noto Sans Hebrew",
                        fontWeight: "medium",
                        color: page.name === "מבצעי פסח!" ? "#ff3d3d" : "#c0c0c0",
                      },
                    }}
                  />
                  {page.subItems && (
                    <KeyboardArrowDownIcon
                      sx={{
                        transition: "transform 0.3s ease",
                        transform: openSubMenu
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  )}
                </ListItem>

                {page.subItems && (
                  <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {page.subItems.map((sub) => (
                        <ListItem
                          key={sub.name}
                          button
                          component={Link}
                          to={sub.link}
                          onClick={handleDrawerClose}
                          sx={{
                            pl: 4,
                            py: 1.2,
                            backgroundColor: isActive(sub.link)
                              ? "rgba(255, 215, 0, 0.1)"
                              : "rgba(0,0,0,0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.05)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={sub.name}
                            sx={{
                              textAlign: "right",
                              "& .MuiTypography-root": {
                                fontSize: "1rem",
                                fontFamily: "Noto Sans Hebrew",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}

                {index < pages.length - 1 && (
                  <Divider sx={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
                )}
              </React.Fragment>
            ))}
          </List>

          {/* Bottom Section Inside Mobile Menu */}
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              p: 2,
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}
            >
              <Button
                component={Link}
                to="/about"
                onClick={handleDrawerClose}
                sx={{
                  color: "#c0c0c0",
                  fontSize: "0.9rem",
                  fontFamily: "Noto Sans Hebrew",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                קצת עלינו &nbsp;
                <BusinessIcon fontSize="small" />
              </Button>
              <Button
                component={Link}
                to="/contact"
                onClick={handleDrawerClose}
                sx={{
                  color: "white",
                  fontSize: "0.9rem",
                  fontFamily: "Noto Sans Hebrew",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                צרו קשר &nbsp;
                <Phone fontSize="small" direction="rtl" />
              </Button>
            </Box>
            <Typography
              sx={{
                fontSize: "0.8rem",
                textAlign: "center",
                fontFamily: "Noto Sans Hebrew",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              כל הזכויות שמורות רפליקאר 2024 ©
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default CustomNavbar;
