import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

//style
const divPadre = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#f7f7f7",
};
const container = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
};
const buttonContainer = {
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  marginTop: "1rem",
};
const cardsContainer = {
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
  marginTop: "8rem",
};
const blog = () => {
  return (
    <div style={divPadre}>
      <Box>
        <div style={container}>
          <Typography
            style={{
              color: "#307196",
              fontWeight: "bold",
              fontSize: "2.2rem",
              marginTop: "3rem",
            }}
          >
            Take care of your health with these tips
          </Typography>
          {/* <div style={buttonContainer}>
            <Button>Health</Button>
            <Button>Nutrition</Button>
            <Button>Tech</Button>
          </div> */}
          <div style={cardsContainer}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://www.nebraskamed.com/sites/default/files/images/primary%20care/heatexhaustion_opengraph.jpg"
                title="summer"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#307196" }}
                >
                  Hydration in summer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experts recommend drinking water before feeling thirsty to
                  prevent dehydration during the summer, it is important to pay
                  attention to body hydration
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link to="/blog/noteOne">
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://cdn.shopify.com/s/files/1/0257/1046/0991/articles/woman-suffering-from-heatstroke.jpg?v=1670585662"
                title="heat"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#307196" }}
                >
                  Heat stroke
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Heat stroke is a dangerous condition that can occur when the
                  body overheats and is unable to regulate its temperature.
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link to="/blog/noteTwo">
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://static.timesofisrael.com/www/uploads/2022/01/iStock-1300745916.jpg"
                title="tech"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#307196" }}
                >
                  Health technology
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In recent years, technology has transformed many aspects of
                  healthcare, including the way patients receive medical care.
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link to="/blog/noteThree">
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default blog;
