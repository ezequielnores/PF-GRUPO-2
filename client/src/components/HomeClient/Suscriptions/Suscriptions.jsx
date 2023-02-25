import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { plansGetAll } from "../../../redux/reducers/plansReducer";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: "#f5f5f5",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  cardContainer: {
    marginTop: theme.spacing(4),
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
    margin: theme.spacing(1),
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  buyButton: {
    backgroundColor: "#1976d2",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#115293",
    },
  },
  planTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  planPrice: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
  },
  planDuration: {
    marginBottom: theme.spacing(2),
    color: "#333333",
    textAlign: "center",
  },
  planDescription: {
    marginBottom: theme.spacing(2),
    color: "#333333",
    textAlign: "center",
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
  cardSimple: {
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
    },
  },
}));

const Subscriptions = () => {
  const classes = useStyles();
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
  };

  const renderPlanCard = (plan) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={plan.id}>
        <Card
          className={`${classes.card} ${
            plan.name == "iCare full"
              ? classes.cardGold
              : plan.name == "iCare simple"
              ? ""
              : classes.cardBlue
          }`}>
          <CardContent className={classes.cardContent}>
            <Typography
              variant='h5'
              component='h2'
              className={classes.planTitle}>
              {plan.name}
            </Typography>
            <Typography variant='h6' className={classes.planPrice}>
              ${plan.price}
            </Typography>
            <Typography variant='body1' className={classes.planDuration}>
              Plan duration: {plan.durationMonths} months
            </Typography>
            <Typography variant='body2' className={classes.planDescription}>
              {plan.detail}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              variant='contained'
              size='large'
              className={classes.buyButton}
              onClick={() => handleBuyPlan(plan)}>
              Obtain
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant='h4' component='h1' className={classes.title}>
        Subscription plans
      </Typography>
      <div className={classes.cardContainer}>
        <Grid container spacing={3}>
          {patientDetail.PatientPlan
            ? filteredPlans.map(renderPlanCard)
            : plans.map(renderPlanCard)}
        </Grid>
      </div>
      <div className={classes.cardActions} style={{ marginTop: "10%" }}>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/HomeClient/Suscriptions/history'>
          Cuurent plan
        </Button>
      </div>
    </div>
  );
};

export default Subscriptions;
