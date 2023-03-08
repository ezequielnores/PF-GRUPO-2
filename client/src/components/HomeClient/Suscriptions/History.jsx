import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { plansGetAll } from "../../../redux/reducers/plansReducer";
import { Link } from "react-router-dom";

import { Card, CardContent, Button, Typography, Grid } from "@mui/material";
//styles
const root = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "45.5rem",
};
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const cardContainer = {
  marginTop: "1rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: 10,
  width: 1000,
  height: 1500,
};
const card = {
  width: "500px", // Se establece un ancho fijo para la card
  height: "400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 8,
  overflow: "hidden",
  backgroundColor: "#ffffff",
  margin: "2px",
};
const cardContent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  padding: "15px",
};
const cardActions = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "2px",
};
const buyButton = {
  backgroundColor: "#1976d2",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#115293",
  },
};
const planTitle = {
  marginBottom: "7px",
  fontWeight: "bold",
  color: "#333333",
  textAlign: "center",
  fontSize: 35,
};
const planPrice = {
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#1976d2",
  textAlign: "center",
  fontSize: 27,
};
const planDuration = {
  marginBottom: "2px",
  color: "#333333",
  textAlign: "center",
  fontSize: 20,
};
const planDescription = {
  marginBottom: "5px",
  color: "#333333",
  textAlign: "center",
  fontSize: 18,
};
const cardGold = {
  border: "1px solid #ffd700",
  backgroundColor: "#fffacd",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
  },
};
const cardBlue = {
  border: "1px solid #1976d2",
  backgroundColor: "#f0f8ff",
  height: 378,
};
const cardSimple = {
  border: "1px solid black",
  height: 378,
};

const History = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans.listAll);
  const patientDetail = useSelector((state) => state.patient.detail);
  const patientIdLocal = localStorage.getItem("id");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(plansGetAll());
  }, []);

  const filteredPlans = plans.filter(
    (plan) => plan.name === patientDetail.PatientPlan?.name
  );

  const renderPlanCard = (plan) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={plan.id}>
        <Card
          style={
            plan.name === "iCare Full"
              ? cardGold
              : plan.name === "iCare Guard"
              ? cardBlue
              : cardSimple
          }
        >
          <CardContent style={cardContent}>
            <Typography
              variant="h5"
              component="h1"
              style={planTitle}
              sx={{ fontSize: 67 }}
            >
              {plan.name}
            </Typography>
            <br />
            <Typography variant="h6" style={planPrice}>
              ${plan.price}
            </Typography>
            <br />
            <Typography variant="body1" style={planDuration}>
              Plan duration: {plan.durationMonths} months
            </Typography>
            <br />
            <br />
            <Typography variant="body2" style={planDescription}>
              {plan.detail}
            </Typography>
          </CardContent>
        </Card>
        <br />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/HomeClient/Suscriptions"
          sx={{ marginLeft: 60 }}
        >
          Back
        </Button>
      </Grid>
    );
  };

  return (
    <div style={root}>
      <Typography
        variant="button"
        fontSize="2.5rem"
        color="#307196"
        fontWeight="bold"
        style={test}
      >
        Current plan
      </Typography>
      <div style={cardContainer}>
        <Grid
          container
          spacing={3}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {patientDetail.PatientPlan ? (
            filteredPlans.map(renderPlanCard)
          ) : (
            <div>
              <Typography variant="h6">
                You do not have a plan associated with your account, please go
                back and associate with one
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/HomeClient/Suscriptions"
                sx={{ backgroundColor: "#307196", marginTop: "1rem" }}
              >
                Back
              </Button>
            </div>
          )}
        </Grid>
      </div>
      <div style={cardActions}></div>
    </div>
  );
};

export default History;
