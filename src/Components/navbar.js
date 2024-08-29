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
import Badge from "@mui/material/Badge"; // Import Badge component
import logo from "../Pictures/logo.jpg";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext"; // Import useCart context

const pages = [
  { name: "מסגרות", link: "/frames" },
  { name: "רכבים", link: "/diecast" },
  { name: "קצת עלינו", link: "/about" },
  { name: "צרו קשר", link: "/contact" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { cart } = useCart(); // Get the cart from the context

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Calculate the total number of items in the cart
  const totalItems = cart.length;

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "black", direction: "rtl" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ py: "20px", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: 100, // Adjust the width of the logo
                    height: 60, // Adjust the height of the logo
                  }}
                />
              </Link>
            </Box>
            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={totalItems} color="error" showZero>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: 130, // Adjust the width of the logo
                  height: 80, // Adjust the height of the logo
                  marginRight: "auto",
                }}
              />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "22px",
                  mx: "10px", // Adjust the margin between the buttons
                  fontFamily: "Noto Sans Hebrew",
                  fontWeight: "300",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={totalItems} color="error" showZero>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              direction: "rtl",
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Link
                  to={page.link}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Typography
                    textAlign="center"
                    style={{ fontFamily: "Noto Sans Hebrew" }}
                  >
                    {page.name}
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
