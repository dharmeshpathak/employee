import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
function Navbar({ login, setLogin }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      <AppBar position="static" color={"transparent"}>
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  {login && (
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">Home</Typography>
                    </Link>
                  )}
                  {!login && (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">Login</Typography>
                    </Link>
                  )}
                </MenuItem>
                <MenuItem key="Add Note" onClick={handleCloseNavMenu}>
                  {login && (
                    <Link to="/addemployee" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">Add Employee</Typography>
                    </Link>
                  )}
                  {!login && (
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">SignUp</Typography>
                    </Link>
                  )}
                </MenuItem>
                <MenuItem key="Add Note4" onClick={handleCloseNavMenu}>
                  {login && (
                    <Link to="/search" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">Search</Typography>
                    </Link>
                  )}
                  
                </MenuItem>
                <MenuItem
                  key="Add Note2"
                  onClick={() => {
                    handleCloseNavMenu();
                    setLogin(false);
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  {login && (
                    <Link to="/addemployee" style={{ textDecoration: "none" }}>
                      <Typography textAlign="center">Logout</Typography>
                    </Link>
                  )}
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="Add Notes"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {" "}
                {login && (
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                )}
                {!login && (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                )}
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {login && (
                  <Link to="/addemployee" style={{ textDecoration: "none" }}>
                    Add Employee
                  </Link>
                )}
                {!login && (
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    Signup
                  </Link>
                )}
              </Button>
              {login && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                
                  <Link to="/search" style={{ textDecoration: "none" }}>
                    Search
                  </Link>
                
                
              </Button>)}
              {login && (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  setLogin(false);
                  localStorage.clear();
                  navigate("/login");
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                
                  <Link to="/addemployee" style={{ textDecoration: "none" }}>
                    Logout
                  </Link>
                
              </Button>)}
            </Box>
          </Toolbar>
          {/* <Toolbar>
            {login && (
              <Typography>
                Hi, {JSON.parse(localStorage.getItem("userItem")).username}
              </Typography>
            )}
          </Toolbar> */}
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
