import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
/* import Button from '@mui/material-next/Button'; */
import HomeIcon from "@mui/icons-material/Home";
import { ButtonGroup } from "@mui/material";
//router
import { Link } from "react-router-dom";
import logo from "./../../../assets/logoiCare.png"

//styles
const navbar = {
  backgroundColor: "#faf9f9",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  // position: "fixed",
  width: "100%",
}
const logoStyles = {
  height: "7vh",
  width: "3.3vw"
}
const buttons = {
  borderRadius: "1.2rem",
  border: "none",
  backgroundColor: "#D9D9D9",
  marginRight: "1vw"
}
const links = {
  color: "black",
  fontWeight: "500"
}
const butonLogin = {
  marginLeft: "3.5rem",
};
//component
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, height: 100 }}>
      <AppBar position="static" sx={{height: 100}}>
        <Toolbar style={navbar} sx={{height: 100}}>
          <Link to="/">
            <img src={logo} style={logoStyles} alt="logoiCare" />
            {/* <HomeIcon color="primary" fontSize="large" /> */}
          </Link>
          <ButtonGroup>
            <Button style={buttons}>
              <Link style={links} to="/work">Work with us</Link>
            </Button>
            <Button style={buttons}>
              <Link style={links} to="/about">About</Link>
            </Button>
            <Button style={buttons}>
              <Link style={links} to="/services">Services</Link>
            </Button>
            <Button style={buttons}>
              <Link style={links}to="/blog">Blog</Link>
            </Button>
            <ButtonGroup style={butonLogin}>
              <Button style={buttons}>
              <Link style={links} to="/loginClient">Client Login</Link>
              </Button>
              <Button style={buttons}>
                <Link style={links} to ="/loginMedic">Medic Login</Link>
                 </Button>
            </ButtonGroup>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
