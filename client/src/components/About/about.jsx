import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

//Style
const divPadre = {
  backgroundColor: "#f7f7f7",
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
};
const containerCards = {
  marginTop: "2rem",
  // height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
};
const divContainer = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  backgroundImage:
    "url('https://themighty.com/wp-content/uploads/2017/07/ThinkstockPhotos-675458870-1280x640.jpg') ",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

//Component
const about = () => {
  return (
    <div style={divPadre}>
      <Box>
        <div style={divContainer}>
          <Card
            style={{
              width: "25rem",
              height: "25rem",
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
                fontFamily: "sans-serif",
                fontSize: "2.5rem",
              }}
            >
              Icare
            </Typography>
            <Typography
              align="justify"
              style={{
                color: "gray",
                marginBottom: "1.5rem",
                paddingLeft: "10px",
                paddingRight: "10px",
                fontWeight: "semibold",
                fontFamily: "sans-serif",
                fontSize: "1rem",
              }}
            >
              Lorem ipsum dolor si tenetur deserunt earum sed iusto voluptatibus
              sapiente.Lorem ipsum dolor si tenetur deserunt earum sed iusto
              voluptatibus sapiente.Lorem ipsum dolor si tenetur deserunt earum
              sed iusto voluptatibus sapiente.Lorem ipsum dolor si tenetur
              deserunt earum sed iusto voluptatibus sapiente
            </Typography>
          </Card>
        </div>
        <div style={containerCards}>
          <Card
            style={{
              width: "30rem",
              height: "10rem",
              backgroundColor: "#eeeeee",
            }}
          >
            <div style={{ width: "100%" }}>
              <Typography
                style={{
                  width: "100%",
                  color: "#307196",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  fontSize: "1.4rem",
                  marginTop: "10px",
                }}
              >
                New group with great ideas
              </Typography>
              <Typography
                component="p"
                align="justify"
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  color: "#454546",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, voluptatum illo! Natus debitis nemo totam officia,
                officiis accusamus quisquam neque, recusandae expedita enim
                velit dolorum omnis repellendus, est maxime aspernatur!
              </Typography>
            </div>
          </Card>
          <Card
            style={{
              width: "30rem",
              height: "10rem",
              backgroundColor: "#eeeeee",
            }}
          >
            <div style={{ width: "100%" }}>
              <Typography
                style={{
                  width: "100%",
                  color: "#307196",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  fontSize: "1.4rem",
                  marginTop: "10px",
                }}
              >
                With a clear objective, health
              </Typography>
              <Typography
                component="p"
                align="justify"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, voluptatum illo! Natus debitis nemo totam officia,
                officiis accusamus quisquam neque, recusandae expedita enim
                velit dolorum omnis repellendus, est maxime aspernatur!
              </Typography>
            </div>
          </Card>
          <Card
            style={{
              width: "30rem",
              height: "10rem",
              backgroundColor: "#eeeeee",
            }}
          >
            <div style={{ width: "100%" }}>
              <Typography
                style={{
                  width: "100%",
                  color: "#307196",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  fontSize: "1.4rem",
                  marginTop: "10px",
                }}
              >
                Technology that takes care of your health
              </Typography>
              <Typography
                component="p"
                align="justify"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, voluptatum illo! Natus debitis nemo totam officia,
                officiis accusamus quisquam neque, recusandae expedita enim
                velit dolorum omnis repellendus, est maxime aspernatur!
              </Typography>
            </div>
          </Card>
        </div>
        <Link to="/services">
          <Button variant="contained" style={{ marginTop: "1.5rem" }}>
            Know more
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default about;
