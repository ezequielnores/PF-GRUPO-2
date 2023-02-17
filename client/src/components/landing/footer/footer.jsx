import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ButtonGroup, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
const footer = {
  backgroundColor: "#F0F8FF",
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

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={footer}>
          <Box style={divtext}>
            <CopyrightIcon style={{ color: "black" }} />
            <Typography
              variant="body1"
              color="text.secondary"
              align="justify"
              style={{ fontWeight: "semibold" }}
            >
              iCare is an online health care service that allows you to connect
              with highly qualified medical professionals and receive quality
              medical care from the comfort of your home.
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
};
export default Navbar;
