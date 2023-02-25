import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { plansGetAll } from "../../../redux/reducers/plansReducer";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
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
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 8,
  overflow: "hidden",
  backgroundColor: "#ffffff",
  margin: "1px",
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
  marginBottom: "2px",
  fontWeight: "bold",
  color: "#333333",
  textAlign: "center",
};
const planPrice = {
  marginBottom: "2px",
  fontWeight: "bold",
  color: "#1976d2",
  textAlign: "center",
};
const planDuration = {
  marginBottom: "2px",
  color: "#333333",
  textAlign: "center",
};
const planDescription = {
  marginBottom: "2px",
  color: "#333333",
  textAlign: "center",
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

const Subscriptions = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans.listAll);
  const patientDetail = useSelector((state) => state.patient.detail);
  const patientIdLocal = localStorage.getItem("id");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(plansGetAll());
  }, []);

  const filteredPlans = plans.filter(
    (plan) => plan.name !== patientDetail.PatientPlan?.name
  );

  const handleBuyPlan = (plan) => {
    axios
      .post("http://localhost:3001/payments/producto", {
        title: plan.name,
        price: plan.price,
        description: plan.detail,
        patientIdLocal,
        planId: plan.id,
      })
      .then(
        (res) => (window.location.href = res.data.response.body.init_point)
      ); //ruta que me lleva al pago del producto
  };

  const renderPlanCard = (plan) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={plan.id}>
        <Card
        // className={`${card} ${
        //   plan.name == "iCare full"
        //     ? cardGold
        //     : plan.name == "iCare simple"
        //     ? ""
        //     : cardBlue
        // }`}
        >
          <CardContent style={cardContent}>
            <Typography variant="h5" component="h2" style={planTitle}>
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
          <CardActions style={cardActions}>
            <Button
              variant="contained"
              size="large"
              style={buyButton}
              onClick={() => handleBuyPlan(plan)}
            >
              Obtain
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <div style={root}>
      <Typography variant="h4" component="h1" style={title}>
        Subscription plans
      </Typography>
      <div style={cardContainer}>
        <Grid container spacing={3}>
          {patientDetail.PatientPlan
            ? filteredPlans.map(renderPlanCard)
            : plans.map(renderPlanCard)}
        </Grid>
      </div>
      <div style={cardActions}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/HomeClient/Suscriptions/history"
        >
          Current plan
        </Button>
      </div>
    </div>
  );
};

export default Subscriptions;
