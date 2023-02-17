import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const divContainer = {
  height: "50.3rem",
  display: "flex",
  alignItems: "center",
  backgroundImage:
    "url('https://chiefofstaffkc.com/wp-content/uploads/2021/07/Culture.jpg') ",
  backgroundSize: "200rem",
};
const Work = () => {
  return (
    <>
      <div style={divContainer}>
        <Card
          style={{
            width: "25rem",
            height: "25rem",
            marginLeft: "2rem",
            opacity: "0.9",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Typography
            style={{
              color: "#307196",
              marginTop: "1.5rem",
              marginBottom: "3rem",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "2.5rem",
            }}
          >
            Work in iCare
          </Typography>
          <Typography
            align="justify"
            style={{
              marginBottom: "3rem",
              paddingLeft: "10px",
              paddingRight: "10px",
              fontWeight: "semibold",
              fontSize: "1rem",
            }}
          >
            Join our digital healthcare team and help improve people's health
            from the comfort of your own home. We offer virtual care services
            through video calls, specialty appointments and more - work with us
            to transform the way people access health care!
          </Typography>
          <Link to="/work/registerForm">
            <Button variant="contained">Join the team!</Button>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Work;
