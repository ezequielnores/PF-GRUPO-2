import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

//STYLE
const divPadre = {
  width: "100%",
  height: "100%",
  backgroundColor: "#f7f7f7",
};
const container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "start",
  alignItems: "center",
};
const carde = {
  width: "60rem",
  height: "90rem",
  padding: "1rem",
};
const miniNav = {
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};
const noteTwo = () => {
  return (
    <div style={divPadre}>
      <div style={container}>
        <div style={miniNav}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Landing
            </Link>
            <Link underline="hover" color="inherit" href="/blog">
              Blog
            </Link>
            <Typography color="text.primary"> Heat stroke</Typography>
          </Breadcrumbs>
          <Link href="/blog">
            <Button>Back</Button>
          </Link>
        </div>

        <Card style={carde}>
          <div style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Typography
              style={{
                color: "#147bf4",
                fontWeight: "bold",
                fontSize: "2.5rem",
                marginBottom: "0.5rem",
              }}
            >
              Heat stroke
            </Typography>
            <CardMedia
              sx={{ height: 400, marginBottom: "1rem" }}
              image="https://palmharborpharmacy.com/wp-content/uploads/2021/07/theguidetoheatillnessandsunburn.jpeg"
              title="heat stroke"
            />
            <Typography variant="h6">
              Heat stroke is a dangerous condition that can occur when the body
              overheats and is unable to regulate its temperature.
            </Typography>
            <Typography
              variant="h5"
              style={{
                color: "#147bf4",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                marginTop: "0.8rem",
              }}
            >
              Symptoms
            </Typography>
            <Typography style={{ fontSize: "17.5px" }}>
              <li>Dizziness</li>
              <li>Excessive sweating</li>
              <li>Nausea</li>
              <li>Confusion</li>
              <li>Loss of consciousness</li>
            </Typography>
            <Typography variant="h6">
              To prevent heat stroke, it is important to take steps to stay cool
              and avoid excessive exposure to the sun and heat.
            </Typography>
            <Typography
              variant="h5"
              style={{
                color: "#147bf4",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                marginTop: "0.8rem",
              }}
            >
              Tips
            </Typography>
            <Typography style={{ fontSize: "17.5px" }}>
              <li>
                Keep your body cool: wear light clothing, keep your head covered
                and use sunscreen to avoid sunburn.
              </li>
              <li>
                Hydration: Drink enough water regularly, even if you do not feel
                thirsty, and avoid alcoholic or caffeinated beverages, which can
                dehydrate you.
              </li>
              <li>
                Rest in cool, shady places: try to limit your time in hot areas
                and avoid strenuous activities in the sun.
              </li>
              <li>
                Pay attention to high-risk groups: The elderly, young children
                and those with pre-existing health problems may be more
                vulnerable to heat stress.
              </li>
              <li>Headache</li>
              <li>
                Pay attention to symptoms: If you experience any of the symptoms
                of heat stroke, seek medical help immediately.
              </li>
            </Typography>
            <Typography variant="h6">
              Taking preventive measures to avoid heat stroke is essential,
              especially during the hottest days of summer. Remember to hydrate,
              keep cool and avoid excessive sun exposure to maintain good health
              during the summer season.
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default noteTwo;
