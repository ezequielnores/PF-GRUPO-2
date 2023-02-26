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
  paddingTop: "4px",
  paddingBottom: "4px",
  backgroundColor: "#f5f5f5",
};
const title = {
  marginBottom: "2px",
  fontWeight: "bold",
  color: "#333333",
  textAlign: "center",
};
const cardContainer = {
  marginTop: "4px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};
const card = {
  width: "400px", // Se establece un ancho fijo para la card
  height: 400,
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
  padding: "2px",
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
  fontSize: 30,
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
  fontSize: 20,
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
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
  },
};
const cardSimple = {
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
  },
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
        // className={`${classes.card} ${
        //   plan.name == "iCare full"
        //     ? classes.cardGold
        //     : plan.name == "iCare simple"
        //     ? ""
        //     : classes.cardBlue
        // }`}
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
            <Typography variant="h6" style={planPrice}>
              ${plan.price}
            </Typography>
            <Typography variant="body1" style={planDuration}>
              Plan duration: {plan.durationMonths} months
            </Typography>
            <Typography variant="body2" style={planDescription}>
              {plan.detail}
            </Typography>
          </CardContent>
        </Card>
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
        variant="h4"
        component="h1"
        style={title}
        sx={{ fontSize: 50 }}
      >
        Current plan
      </Typography>
      <div style={cardContainer}>
        <Grid container spacing={3}>
          {patientDetail.PatientPlan ? (
            filteredPlans.map(renderPlanCard)
          ) : (
            <div>
              <h3>
                You do not have a plan associated with your account, please go
                back and associate with one
              </h3>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/HomeClient/Suscriptions"
                sx={{ marginLeft: 60 }}
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
