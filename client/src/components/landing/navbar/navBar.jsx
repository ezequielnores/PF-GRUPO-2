import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { ButtonGroup } from "@mui/material";
//router
import { Link } from "react-router-dom";

//styles
const navbar = {
  backgroundColor: "#F0F8FF",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  // position: "fixed",
  width: "100%",
};
const butonLogin = {
  marginLeft: "2rem",
};
//component
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={navbar}>
          <Link to="/">
            <HomeIcon color="primary" fontSize="large" />
          </Link>
          <ButtonGroup>
            <Button color="primary">
              <Link to="/work">Work with us</Link>
            </Button>
            <Button color="primary">
              <Link to="/about">About</Link>
            </Button>
            <Button color="primary">
              <Link to="/services">Services</Link>
            </Button>
            <Button color="primary">
              <Link to="/blog">Blog</Link>
            </Button>
            <ButtonGroup style={butonLogin}>
              <Button color="primary">Client Login</Button>
              <Button color="primary">Medic Login </Button>
            </ButtonGroup>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
