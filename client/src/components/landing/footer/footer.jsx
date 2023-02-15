import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ButtonGroup, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
const footer = {
  backgroundColor: "#F0F8FF",
  position: "fixed",
  bottom: 0,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "8rem",
  alignItems: "center",
  textAlign: "center",


};
const divtext = {
  width: "30em",
  height: "50%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textAlign: "center",
  gap: "10px",
};
const butonGroup = {
  marginRight: "5rem",
  display: "flex",
  flexDirection: "column",
};





const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar style={footer}>
        <Box style={divtext}>
          <CopyrightIcon style={{ color: "black" }} />
          <Typography variant="subtitle2" color="black" align="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            deserunt cumque similique quos sapiente optio placeat sequi,
            blanditiis corporis sit ipsam illum molestiae quasi unde quibusdam
            consequatur, aspernatur consectetur suscipit.
          </Typography>
        </Box>
        <Box style={butonGroup}>
          <Typography variant="subtitle2" color="black" align="center">
            Find us in
          </Typography>
          <ButtonGroup>
            <IconButton>
              <FacebookRoundedIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
            <IconButton>
              <YouTubeIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
