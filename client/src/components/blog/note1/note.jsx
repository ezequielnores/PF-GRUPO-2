import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

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
  height: "85rem",
  padding: "1rem",
  marginBottom: "3rem",
};
const miniNav = {
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};
const noteOne = () => {
  return (
    <div style={divPadre}>
      <Box>
        <div style={container}>
          <div style={miniNav}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Landing
              </Link>
              <Link underline="hover" color="inherit" href="/blog">
                Blog
              </Link>
              <Typography color="text.primary">Hydration in summer</Typography>
            </Breadcrumbs>
            <Link href="/blog">
              <Button>Back</Button>
            </Link>
          </div>

          <Card style={carde}>
            <div style={{ marginLeft: "5px", marginRight: "5px" }}>
              <Typography
                style={{
                  color: "#307196",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                Hydration in summer
              </Typography>
              <CardMedia
                sx={{ height: 400, marginBottom: "1rem" }}
                image="https://www.nebraskamed.com/sites/default/files/images/primary%20care/heatexhaustion_opengraph.jpg"
                title="green iguana"
              />
              <Typography variant="h6">
                Experts recommend drinking water before feeling thirsty to
                prevent dehydration during the summer With the arrival of summer
                and rising temperatures, it is important to pay attention to
                body hydration. Health experts recommend drinking water
                regularly, even before feeling thirsty, to prevent dehydration.
                Dehydration can have serious health consequences, especially for
                children, the elderly and those with pre-existing health
                problems.
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color: "#307196",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  marginTop: "0.8rem",
                }}
              >
                Symptoms
              </Typography>
              <Typography style={{ fontSize: "17.5px" }}>
                <li>Thirst</li>
                <li>Dry mouth</li>
                <li>Fatigue</li>
                <li>Dizziness</li>
                <li>Headache</li>
                <li>Muscle cramps</li>
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color: "#307196",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  marginTop: "0.8rem",
                }}
              >
                To stay hydrated during the summer, experts recommend:
              </Typography>
              <Typography style={{ fontSize: "17.5px" }}>
                <li>Drink water regularly, even before you feel thirsty.</li>
                <li>
                  Avoid drinks with caffeine or alcohol, as they can contribute
                  to dehydration.
                </li>
                <li>Eat foods rich in water, such as fruits and vegetables.</li>
                <li>
                  Wear clothing and hats that protect from the sun and heat.
                </li>
                <li>
                  Avoid strenuous activities during the hottest hours of the
                  day.
                </li>
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color: "#307196",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  marginTop: "0.8rem",
                }}
              >
                Remember
              </Typography>
              <Typography variant="h6">
                That hydration is essential to maintain good health during the
                summer. Drink enough water and follow these tips to prevent
                dehydration and enjoy the summer season in a safe and healthy
                way.
              </Typography>
            </div>
          </Card>
        </div>
      </Box>
    </div>
  );
};

export default noteOne;
