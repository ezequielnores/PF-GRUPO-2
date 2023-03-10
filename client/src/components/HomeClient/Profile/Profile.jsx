import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  patientGetAll,
  patientGetDetail,
} from "../../../redux/reducers/patientReducer";
import { useSelector, useDispatch } from "react-redux";
// import {useParams} from "react-router-dom";
import { useEffect } from "react";
import style from "./Profile.module.css";
import GraficIMC from "./GraficIMC";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Profile = () => {
  const dispatch = useDispatch();
  const patientDetail = useSelector((state) => state.patient.detail);
  useEffect(() => {
    const patientId = localStorage.getItem("id");
 
    if (patientId) {
      dispatch(patientGetDetail(patientId));
    }
 
  }, []);

  return (
   
    <Grid
    container
    spacing={2}
    style={{
      marginLeft: "4px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    }}
  >
    <Typography
      variant="button"
      fontSize="2.5rem"
      color="#307196"
      fontWeight="bold"
      style={test}
    >
      Personal information
    </Typography>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        width: "100%",
      }}
    >
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <Divider />
          <br></br>
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
            sx={{ marginLeft: "20%" }}
          >
            {patientDetail !== null ? (
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 100, height: 100 }}
                src={patientDetail?.photo}
              />
            ) : (
              <Avatar src="/broken-image.jpg" />
            )}
            <Divider />

            <div style={{ display: "flex", flexDirection: "row",alignItems: "center" }}>
              <Typography
                sx={{
                 
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                Name:
              </Typography>

              <Typography sx={{ marginLeft: 5.1, color: "black" }}>
                {patientDetail?.name}{" "}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop:20,alignItems: "center" }}>
              <Typography
                sx={{
                  
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                Surname:
              </Typography>
              <Typography sx={{ marginLeft: 2.5, color: "black" }}>
                {patientDetail?.surname}{" "}
              </Typography>
            </div>

            <div style={{ display: "flex", flexDirection: "row",marginTop:20 }}>
              <Typography
                sx={{
                  
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                DNI:
              </Typography>
              <Typography sx={{ marginLeft: 7.3, color: "black" }}>
                {patientDetail?.dni}{" "}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row",marginTop:20 }}>
              <Typography
                sx={{
                  
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                Mail:
              </Typography>
              <Typography sx={{ marginLeft: 6.5, color: "black" }}>
                {patientDetail.mail}{" "}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row",marginTop:20 }}>
              <Typography
                sx={{
                  
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                Date:
              </Typography>
              <Typography sx={{ marginLeft: 6.3, color: "black" }}>
                {patientDetail?.birthday}{" "}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row",marginTop:20 }}>
              <Typography
                sx={{
                  
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                Weigth:
              </Typography>
              <Typography sx={{ marginLeft: 4.4, color: "black" }}>
                {patientDetail?.weight}{" "}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row",marginTop:20 }}>
              <Typography
                sx={{
                 
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                Heigth:
              </Typography>
              <Typography sx={{ marginLeft: 4.6, color: "black" }}>
                {patientDetail?.height}{" "}
              </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row",marginTop:20 }}>
              <Typography
                sx={{
                  
                  color: "#307196",
                  fontWeight: "bold",
                }}
              >
                Plan:
              </Typography>
              <Typography
                sx={{ marginLeft: 6.6, color: "black", fontWeight: "bold" }}
              >
                {patientDetail?.PatientPlan?.name}{" "} 
              </Typography>
            </div>
            <br />
          </Stack>
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          width: "100%",
          marginRight: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <GraficIMC/>
        </Paper>
      </Grid >
    </div>
  
      <Link to="/HomeClient/Profile/Edit">
        <Button
          variant="contained"
          style={{
            marginTop: "1rem",
            backgroundColor: "#307196",
            marginBottom: "1rem",
          }}
        >
          Edit personal information
        </Button>
      </Link>
    </Grid>
  );
};

export default Profile;
