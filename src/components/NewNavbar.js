import * as React from "react";
import AddEmp from "./AddEmp.js";
import Home from "./Home";
import EditEmp from "./EditEmp";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import LoginIn from "./LoginIn";
import SignUp from "./SignUp";
import Search from "./Search";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ login, setUpLogin }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //   const [login, setLogin] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  //   const setUpLogin = async () => {
  //     const user = await localStorage.getItem("userItem");
  //     if (user === null) {
  //       setLogin(false);
  //     } else {
  //       setLogin(true);
  //     }
  //   };
  React.useEffect(() => {
    setUpLogin();
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {login && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {!login && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  margin: " 0 5px",
                }}
                // onClick={() => setLogin(true)}
              >
                <Typography textAlign="center">LogIn</Typography>
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography textAlign="center">SignUp</Typography>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItem button key={"Home"}>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to="/addemployee" style={{ textDecoration: "none" }}>
            <ListItem button key={"Add Employee"}>
              <ListItemIcon>
                <PersonAddIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Add Emp"} />
            </ListItem>
          </Link>

          <Link to="/search" style={{ textDecoration: "none" }}>
            <ListItem button key={"Search"}>
              <ListItemIcon>
                <PersonSearchIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Search"} />
            </ListItem>
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <ListItem
              button
              key={"Logout"}
              onClick={() => {
                setOpen(false);

                localStorage.clear();
                navigate("/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </Link>
        </List>
        <List>
          {/* {["Inbox", "Drafts"].map((text, index) => (
            <Link to="/main">
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))} */}
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />

        <Routes>
          <Route
            path="/"
            element={<Home login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/addemployee"
            element={<AddEmp login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/search"
            element={<Search login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/update/:id"
            element={<EditEmp login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/login"
            element={<LoginIn login={login} setUpLogin={setUpLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUp login={login} setUpLogin={setUpLogin} />}
          />
        </Routes>
      </Main>
    </Box>
  );
}
