import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { postPlans } from "../../../redux/reducers/plansReducer.js";
import swal from "sweetalert";
import { style } from "@mui/system";
//style
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "18rem",
  height: "20rem",
}));
const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
};

const gridContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "20rem",
};
//MODAL
const modalContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  backgroundColor: "#fff",
  borderRadius: "5px",
  maxWidth: "500px",
  width: "100%",
  padding: "2rem",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
};

const ManagePlans = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    detail: "",
    durationMonths: "",
  });
  const dispatch = useDispatch();
  //leo mi state
  const dataPlans = useSelector((state) => state.plans.listAll);
  console.log(dataPlans);
  //modifico detail
  const handlerDetail = (str) => {
    const detailParts = str.split("- ");
    const first = detailParts[0];
    const second = detailParts[1];
    return { first, second };
  };
  const activadorOpen = () => {
    setIsOpen(true);
  };
  //postear un plan
  const handleInput = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleAddPlan = (e) => {
    e.preventDefault();
    dispatch(postPlans(data));
    setIsOpen(false);
  };
  return (
    <div style={container}>
      <Typography
        variant="h4"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        ACTIVE PLANS
      </Typography>
      <Grid container style={gridContainer} gap={4}>
        {dataPlans.map((plan, index) => (
          <>
            <Grid key={plan.id}>
              <Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  fontWeight="bold"
                  variant="h6"
                  style={{ backgroundColor: "#43B8C8" }}
                >
                  {plan.name}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "start",
                    marginLeft: "2rem",
                  }}
                >
                  <Typography>{handlerDetail(plan.detail).first}</Typography>
                  <Typography>{handlerDetail(plan.detail).second}</Typography>
                </div>
                <Typography>${plan.price}</Typography>
                <Typography>Duration : {plan.durationMonths} months</Typography>
              </Item>
            </Grid>
          </>
        ))}
      </Grid>
      <Button
        variant="contained"
        style={{ marginTop: "2rem" }}
        onClick={activadorOpen}
      >
        ADD
      </Button>
      {/* MODAL MODAL MODAL */}
      {isOpen && (
        <div style={modalContainer}>
          <div style={modal}>
            <Typography variant="h5" style={{ marginBottom: "2rem" }}>
              Add a new plan
            </Typography>

            <form onSubmit={handleAddPlan}>
              <TextField
                label="Name"
                name="name"
                value={data.name}
                onChange={handleInput}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                label="Price"
                name="price"
                value={data.price}
                onChange={handleInput}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                label="Detail"
                name="detail"
                value={data.detail}
                onChange={handleInput}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                label="Duration (months)"
                name="durationMonths"
                value={data.durationMonths}
                onChange={handleInput}
                required
                fullWidth
                margin="normal"
              />

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="outlined"
                  style={{ marginRight: "1rem" }}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleAddPlan}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlans;
