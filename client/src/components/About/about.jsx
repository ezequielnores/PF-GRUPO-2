import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

//Style
const divPadre = {
  backgroundColor: "#43B8C8",
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
};
const containerCards = {
  marginTop: "2rem",
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
              height: "26.5rem",
              marginLeft: "2rem",
              opacity: ".9",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  color: "#43B8C8",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                }}
              >
                i
              </Typography>
              <Typography
                style={{
                  color: "#307196",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                }}
              >
                Care
              </Typography>
            </div>

            <Typography
              style={{ padding: "10px", fontWeight: "semibold" }}
              align="justify"
              variant="body1"
              color="text.secondary"
            >
              At our digital healthcare team, we are committed to improving
              people's health from the comfort of their home. Our virtual care
              service offers medical consultations through video calls and
              specialized appointments, allowing our patients to access
              high-quality medical care without having to leave home.{" "}
            </Typography>
            <Typography
              style={{ padding: "10px", fontWeight: "semibold" }}
              align="justify"
              variant="body1"
              color="text.secondary"
            >
              We believe that healthcare should be accessible and convenient for
              everyone, regardless of their location or personal situation. Our
              goal is to transform the way people access healthcare, making it
              easier and more convenient for everyone.
            </Typography>
          </Card>
        </div>
        <div style={containerCards}>
          <Card
            style={{
              width: "30rem",
              height: "11rem",
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
                style={{
                  padding: "10px",
                  fontWeight: "semibold",
                  paddingLeft: "10px",
                }}
                align="justify"
                variant="body1"
                color="text.secondary"
                variant-="body1"
              >
                We believe that innovation and creative ideas are key to
                creating a unique and effective experience for our users.We work
                tirelessly to deliver an experience that exceeds our users'
                expectations and offer innovative solutions that meet their
                needs.
              </Typography>
            </div>
          </Card>
          <Card
            style={{
              width: "30rem",
              height: "11rem",
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
                style={{
                  padding: "10px",
                  fontWeight: "semibold",
                  paddingLeft: "10px",
                }}
                align="justify"
                variant="body1"
                color="text.secondary"
                variant-="body1"
              >
                Our main goal is your health. We are proud to provide you with a
                service that focuses on your well-being and helping you improve
                your quality of life. Whether you need a primary care
                consultation, a specialist or just someone to talk to about your
                health concerns, we are here to support you.
              </Typography>
            </div>
          </Card>
          <Card
            style={{
              width: "30rem",
              height: "11rem",
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
                style={{
                  padding: "10px",
                  fontWeight: "semibold",
                  paddingLeft: "10px",
                }}
                align="justify"
                variant="body1"
                color="text.secondary"
                variant-="body1"
              >
                Our virtual health care services allow you to receive medical
                care from the comfort of your home, without having to worry
                about traveling or waiting in a waiting room. With our advanced
                technology, you can connect with high-quality medical
                professionals online and get personalized, affordable care.
              </Typography>
            </div>
          </Card>
        </div>
        <Link to="/services">
          <Button
            variant="contained"
            style={{
              marginTop: "3rem",
              backgroundColor: "#307196",
            }}
          >
            Know more
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default about;
