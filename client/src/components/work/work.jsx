import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const divContainer = {
  height: "55rem",
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
            height: "30rem",
            marginLeft: "2rem",
            opacity: ".8",
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
              marginBottom: "1.5rem",
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
              color: "gray",
              marginBottom: "1.5rem",
              paddingLeft: "10px",
              paddingRight: "10px",
              fontWeight: "semibold",
              fontFamily: "monospace",
              fontSize: "1rem",
            }}
          >
            Lorem ipsum dolor si tenetur deserunt earum sed iusto voluptatibus
            sapiente.Lorem ipsum dolor si tenetur deserunt earum sed iusto
            voluptatibus sapiente.Lorem ipsum dolor si tenetur deserunt earum
            sed iusto voluptatibus sapiente.Lorem ipsum dolor si tenetur
            deserunt earum sed iusto voluptatibus sapiente.Lorem ipsum dolor si
            tenetur deserunt earum sed iusto voluptatibus sapiente.
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
