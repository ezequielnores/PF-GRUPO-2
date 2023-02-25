import SideBar from "../SideBar/sideBar";

import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import logoICare from "../../../assets/logoiCare.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Faq,
  MedicalHistory,
  MedicalAppointments,
  MyAppointments,
  Profile,
  Reviews,
  Urgency,
  HomeView,
  ProfileUpdate,
  Suscriptions,
  History
} from "../index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientGetDetail } from "../../../redux/reducers/patientReducer";

import Register from "../Register/Register.jsx";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const patientId = localStorage.getItem("id");
    if (patientId) {
      dispatch(patientGetDetail(patientId));
    }
  }, []);
  const patient = useSelector((state) => state.patient.detail);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: "100vw",
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: open ? "15vw" : "10vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "4.3vw", marginTop: "0.3vw" }}
            src={logoICare}
            alt=""
          />
        </div>
        <Stack
          style={{
            height: "5rem",
            width: open ? "85vw" : "90vw",
            background: "rgba(64, 184,200)",
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem 2rem",
            boxSizing: "border-box",
          }}
          direction="row"
          spacing={2}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <p
              style={{ margin: "0", fontWeight: "bolder", fontSize: "1.1rem" }}
            >
              {patient?.name + " " + patient?.surname}
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "gray",
              }}
            >
              {patient?.PatientPlan?.name ? patient?.PatientPlan?.name : "Without plan"}
            </p>
          </div>

          <Avatar sx={{ bgcolor: deepOrange[500], width: 55, height: 55 }}>
            <img
              src={patient?.photo}
              alt={patient?.name?.charAt(0) + patient?.surname?.charAt(0)}
            />
          </Avatar>
        </Stack>
      </div>
      <SideBar open={open} handleOpen={handleOpen} path={location.pathname} />
      <div
        style={{
          position: "absolute",
          top: "6rem",
          width: open ? "85vw" : "95vw",
          right: "0",
        }}
      >
        {location.pathname.endsWith("/HomeClient") && <HomeView />}
        {location.pathname.endsWith("/HomeClient/Profile") && <Profile />}
        {location.pathname.endsWith("/HomeClient/Profile/Edit") && (
          <ProfileUpdate />
        )}
        {location.pathname.endsWith("/HomeClient/MyAppointments") && (
          <MyAppointments />
        )}
        {location.pathname.endsWith("/HomeClient/Urgency") && <Urgency />}
        {location.pathname.endsWith("/HomeClient/MedicalAppointments") && (
          <MedicalAppointments />
        )}
        {location.pathname.endsWith("/HomeClient/MedicalHistory") && (
          <MedicalHistory />
        )}
        {location.pathname.endsWith("/HomeClient/Reviews") && <Reviews />}
        {location.pathname.endsWith("/HomeClient/Faq") && <Faq />}
        {location.pathname.endsWith("/HomeClient/Register") && <Register />}
        {location.pathname.endsWith("/HomeClient/Suscriptions") && <Suscriptions />}
        {location.pathname.endsWith("/HomeClient/Suscriptions/history") && <History/>}
      </div>
    </div>
  );
};
export default Home;
