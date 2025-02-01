import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import logo from "../Pictures/logo1.jpeg";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import arrow icon

const pages = [
  {
    name: "מוצרים",
    link: "#",
    subItems: [
      { name: "פוסטרים", link: "/posters" },
      { name: "מסגרות", link: "/frames" },
      { name: "רכבים", link: "/diecast" },
    ],
  },
  { name: "VALENTINE", link: "/discounts" },
  { name: "קצת עלינו", link: "/about" },
  { name: "צרו קשר", link: "/contact" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElProducts, setAnchorElProducts] = React.useState(null);
  const [anchorElDesktopProducts, setAnchorElDesktopProducts] =
    React.useState(null); // State for desktop dropdown
  const { cart } = useCart(); // Get the cart from the context

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenProductsMenu = (event) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleCloseProductsMenu = () => {
    setAnchorElProducts(null);
  };

  const handleOpenDesktopProductsMenu = (event) => {
    setAnchorElDesktopProducts(event.currentTarget);
  };

  const handleCloseDesktopProductsMenu = () => {
    setAnchorElDesktopProducts(null);
  };

  // Calculate the total number of items in the cart
  const totalItems = cart.length;

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1b2e51",
        direction: "rtl",
        boxShadow: "none",
        borderBottom: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ py: "15px", justifyContent: "space-between" }}
        >
          {/* Mobile View */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              width: "100%", // Ensures full width
              justifyContent: "space-between", // Proper alignment
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* 🔵 Logo (Centered) */}
            <Box
              sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}
            >
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: 90, // Responsive logo size
                    height: "auto",
                  }}
                />
              </Link>
            </Box>

            {/* 🛒 Cart Icon (Left) */}
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={totalItems} color="error" showZero>
                <ShoppingCartIcon sx={{ fontSize: 28 }} />
              </Badge>
            </IconButton>
          </Box>

          {/* Desktop View */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: 120, // Adjusted for better placement
                  height: "auto",
                  marginRight: "20px",
                }}
              />
            </Link>
          </Box>

          {/* Menu Items for Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) =>
              page.name === "מוצרים" ? (
                <Box key={page.name} sx={{ position: "relative" }}>
                  <Button
                    onClick={handleOpenDesktopProductsMenu}
                    sx={{
                      my: 1,
                      color: "white",
                      display: "block",
                      fontSize: "18px",
                      mx: "12px",
                      fontFamily: "Noto Sans Hebrew",
                      fontWeight: "400",
                      textTransform: "none",
                      position: "relative",
                      "&:hover": {
                        color: "#ffd700",
                        "&::after": {
                          content: '""',
                          width: "100%",
                          height: "2px",
                          backgroundColor: "#ffd700",
                          position: "absolute",
                          bottom: "-5px",
                          left: "0",
                        },
                      },
                    }}
                  >
                    {page.name}
                    <ArrowDropDownIcon sx={{ fontSize: 16, ml: 1 }} />{" "}
                    {/* Arrow icon */}
                  </Button>
                  {/* Dropdown for מוצרים */}
                  <Menu
                    anchorEl={anchorElDesktopProducts}
                    open={Boolean(anchorElDesktopProducts)}
                    onClose={handleCloseDesktopProductsMenu}
                    sx={{
                      direction: "rtl",
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {page.subItems.map((subItem) => (
                      <MenuItem
                        key={subItem.name}
                        onClick={handleCloseDesktopProductsMenu}
                      >
                        <Link
                          to={subItem.link}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                        >
                          <Typography
                            textAlign="center"
                            sx={{ fontFamily: "Noto Sans Hebrew" }}
                          >
                            {subItem.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    fontSize: "18px",
                    mx: "12px",
                    fontFamily: "Noto Sans Hebrew",
                    fontWeight: "400",
                    textTransform: "none",
                    position: "relative",
                    "&:hover": {
                      color: "#ffd700",
                      "&::after": {
                        content: '""',
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#ffd700",
                        position: "absolute",
                        bottom: "-5px",
                        left: "0",
                      },
                    },
                  }}
                >
                  {page.name}
                </Button>
              )
            )}
          </Box>

          {/* Cart Icon for Desktop */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={totalItems} color="error" showZero>
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              direction: "rtl",
              top: "40px",
            }}
          >
            {/* Add "דף הבית" as the first item */}
            <MenuItem onClick={handleCloseNavMenu}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{ fontFamily: "Noto Sans Hebrew" }}
                >
                  דף הבית
                </Typography>
              </Link>
            </MenuItem>

            {/* Render "מוצרים" with an arrow */}
            <MenuItem key="מוצרים" onClick={handleOpenProductsMenu}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{ fontFamily: "Noto Sans Hebrew" }}
                >
                  מוצרים
                </Typography>
                <ArrowDropDownIcon /> {/* Arrow icon */}
              </Box>
            </MenuItem>

            {/* Render other menu items */}
            {pages.slice(1).map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Link
                  to={page.link}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{ fontFamily: "Noto Sans Hebrew" }}
                  >
                    {page.name}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>

          {/* Products Submenu for Mobile */}
          <Menu
            id="products-menu"
            anchorEl={anchorElProducts}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElProducts)}
            onClose={handleCloseProductsMenu}
            sx={{
              display: { xs: "block", md: "none" },
              direction: "rtl",
            }}
          >
            {pages
              .find((page) => page.name === "מוצרים")
              .subItems.map((subItem) => (
                <MenuItem key={subItem.name} onClick={handleCloseProductsMenu}>
                  <Link
                    to={subItem.link}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ fontFamily: "Noto Sans Hebrew" }}
                    >
                      {subItem.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
