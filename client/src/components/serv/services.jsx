import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//styles
const imgContainer = {
  width: "50%",
  height: "40vh",
};
const divContainer = {
  height: "45vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
};
const container = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#f7f7f7",
};
const divText = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  marginLeft: "10px",
  paddingLeft: "20rem",
  paddingRight: "20rem",
};
const finaldivText = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  width: "50rem",
  marginLeft: "3rem",
  marginRight: "3rem",
};
//component
const services = () => {
  return (
    <div style={container}>
      <Box>
        <div style={divContainer}>
          <Box
            component="img"
            style={imgContainer}
            alt="The house from the offer."
            src="https://www.beauty-forum.com/typo3temp/pics/heilpraktike_c179cae73e.jpg"
          />
          <div style={divText}>
            <Typography
              align="justify"
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "2.2rem",
              }}
            >
              Online emergency
            </Typography>
            <Typography align="justify">
              Access to the best health professionals. Make on-call video calls,
              with no time restrictions, 7 days a week, 365 days a year.
            </Typography>
          </div>
        </div>
        <div style={divContainer}>
          <div style={finaldivText}>
            <Typography
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "2.2rem",
              }}
            >
              Online and on-site specialist
            </Typography>
            <Typography align="justify">
              The best specialists of our service are just a click away. Access
              the available agendas of the professionals, both face-to-face and
              virtual, select a date according to your needs and that's it!
            </Typography>
          </div>
          <Box
            component="img"
            style={imgContainer}
            alt="The house from the offer."
            src="https://www.pngkit.com/png/detail/428-4285944_-.png"
          />
          <div style={finaldivText}>
            <Typography
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "2.2rem",
              }}
            >
              Autotest Covid
            </Typography>
            <Typography align="justify">
              Aimed to help you take appropriate action if you have symptoms of
              coronavirus.
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default services;
