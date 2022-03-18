import * as React from "react";

import { Link, useNavigate } from "react-router-dom";
import {Box,Drawer,CssBaseline,Toolbar,List,Typography,Divider,IconButton,ListItem,ListItemIcon,ListItemText} from '@mui/material'
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { styled, useTheme } from "@mui/material/styles";


import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {logoutUser} from '../../actions/userActions'
import "../../styles/drawer.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

export default function PersistentDrawerLeft({ login, setUpLogin ,children}) {
  const dispatch = useDispatch()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    setUpLogin();
  });
  // const wit = window.screen.availHeight
const [wit, setwit] = React.useState( window.innerWidth);


  useEffect(()=>{
    // console.log(wit)
    setwit(window.innerWidth)
  },[wit])


  

 


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
        variant={wit>600?"persistent":"temporary"}
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
                dispatch(logoutUser())

               
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
        <List></List>
      </Drawer>

      <Main open={open} className="navbar-area">
        <DrawerHeader />
        
        
        {children}

        
      </Main>
    </Box>
  );
}
