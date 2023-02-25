import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import LinkM from "@mui/material/Link";

// import { LoginClientButton }  from './LoginClientButton'
// import { LogoutButton } from "../../HomeClient/sideBar/LogoutButton";

//router
import { Link } from "react-router-dom";
import Logo from "../../../assets/logoiCare.png";
//styles
const navbar = {
  backgroundColor: "#F0F8FF",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  height: "6.5rem",
  paddingLeft: "5rem",
};
const link = {
  marginLeft: "1.5vw",
  marginRight: "1.5vw",
  marginTop: "0.5vh",
};
const butonLogin = {
  marginLeft: "3rem",
};

//component
const Navbar = () => {  
const { isAuthenticated } = useAuth0()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={navbar}>
          <Link to="/">
            <CardMedia component="img" height="90" image={Logo} alt="logo" />
          </Link>
          <ButtonGroup>
            <Link style={link} to="/">
              Home
            </Link>
            <Link style={link} to="/work">
              Work with us
            </Link>
            <Link style={link} to="/about">
              About
            </Link>
            <Link style={link} to="/services">
              Services
            </Link>
            <Link style={link} to="/blog">
              Blog
            </Link>
            <ButtonGroup style={butonLogin}>
              {/* { isAuthenticated ? <LogoutButton/> : <LoginClientButton/>} */}
              <Button color="primary">
                <Link to="/loginClient">Client Login</Link>
              </Button>
              <Button color="primary">
                <Link to="/loginMedic">Medic Login</Link>
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
