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
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "45.5rem",
  },
  title: {
    fontWeight: "bold",
    color: "#307196",
    textAlign: "center",
  },
  cardContainer: {
    marginTop: "4%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
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
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    // padding: "15px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2px",
  },
  buyButton: {
    backgroundColor: "#307196",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#115293",
    },
  },
  planTitle: {
    marginBottom: "2px",
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    fontSize: "30px",
  },
  planPrice: {
    marginBottom: "2px",
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
    fontSize: "23px",
  },
  planDuration: {
    marginBottom: "2px",
    color: "#333333",
    textAlign: "center",
    fontSize: "20px",
  },
  planDescription: {
    marginBottom: "2px",
    color: "#333333",
    textAlign: "center",
    fontSize: "17px",
  },
  cardGold: {
    border: "1px solid #ffd700",
    backgroundColor: "#fffacd",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
    },
  },
  cardBlue: {
    border: "1px solid #1976d2",
    backgroundColor: "#f0f8ff",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
    },
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

  console.log(filteredPlans);

  const handleBuyPlan = (plan) => {
    axios
      .post("https://pf-grupo-2-production.up.railway.app/payments/producto", {
        title: plan.name,
        price: plan.price,
        description: plan.detail,
        patientIdLocal,
        planId: plan.id,
      })
      .then(
        (res) => (window.location.href = res.data.response.body.init_point)
      ); //ruta que me lleva al pago del producto
    // https://pf-grupo-2-production.up.railway.app/payments/producto
  };

  const renderPlanCard = (plan) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={plan.id}>
        <Card
          style={
            plan.name === "iCare Full"
              ? styles.cardGold
              : plan.name === "iCare Guard"
              ? {}
              : styles.cardBlue
          }
        >
          <CardContent style={styles.cardContent}>
            <Typography variant="h5" component="h2" style={styles.planTitle}>
              {plan.name}
            </Typography>
            <br />
            <Typography variant="h6" style={styles.planPrice}>
              ${plan.price}
            </Typography>
            <br />
            <Typography variant="body1" style={styles.planDuration}>
              Plan duration: {plan.durationMonths} months
            </Typography>
            <br />
            <Typography variant="body2" style={styles.planDescription}>
              {plan.detail}
            </Typography>
          </CardContent>
          <br />
          <CardActions style={styles.cardActions}>
            <Button
              variant="contained"
              size="large"
              style={styles.buyButton}
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
    <div style={styles.root}>
      <Typography
        variant="button"
        fontSize="2.5rem"
        color="#307196"
        fontWeight="bold"
        style={test}
      >
        Subscription plans
      </Typography>
      <div style={styles.cardContainer}>
        <Grid
          container
          spacing={3}
          // style={{
          //   display: "flex",
          //   justifyContent: "space-around",
          //   border: "2px solid red",
          // }}
        >
          {patientDetail.PatientPlan
            ? filteredPlans.map(renderPlanCard)
            : plans.map(renderPlanCard)}
        </Grid>
      </div>
      <div style={{ marginTop: "10%" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/HomeClient/Suscriptions/history"
          sx={{ backgroundColor: "#307196" }}
        >
          Current plan
        </Button>
      </div>
    </div>
  );
};

export default Subscriptions;
