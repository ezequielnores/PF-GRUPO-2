import SideBar from "../SideBar/SideBar";

import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import logoICare from "../../../assets/logoiCare.png";
import { Navigate, useLocation } from "react-router-dom";
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
  History,
  ChatHome,
  TestCovid,
} from "../index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientGetDetail } from "../../../redux/reducers/patientReducer";

import Register from "../Register/Register.jsx";
import ErrorPage from "../../ErrorPage/ErrorPage";

const Home = ({ isLogged }) => {

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

  if(isLogged === null){
    return (
      <h1>Loading...</h1>
    )
  }
  if (isLogged === true) {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <img
          style={{
            width: "4.3vw",
            position: "absolute",
            top: "0.5rem",
            left: "4.3rem",
          }}
          src={logoICare}
          alt=""
        />
        <Stack
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            height: "5rem",
            width: "85vw",
            background: "#43B8C8",
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
              style={{
                margin: "0",
                fontWeight: "bolder",
                fontSize: "1.1rem",
              }}
            >
              {patient?.name + " " + patient?.surname}
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "1rem",
                fontWeight: "500",
                color: "#2d4059",
              }}
            >
              {patient?.PatientPlan?.name
                ? patient?.PatientPlan?.name
                : "Without plan"}
            </p>
          </div>

          <Avatar sx={{ bgcolor: deepOrange[500], width: 55, height: 55 }}>
            <img
              src={patient?.photo}
              alt={patient?.name?.charAt(0) + patient?.surname?.charAt(0)}
            />
          </Avatar>
        </Stack>

        <SideBar open={open} handleOpen={handleOpen} path={location.pathname} />

        <div
          style={{
            position: "absolute",
            top: "6rem",
            width: "85vw",
            right: "0",
          }}
        >
          {(location.pathname.endsWith("/HomeClient") && <HomeView />) ||
            (location.pathname.endsWith("/HomeClient/Profile") && (
              <Profile />
            )) ||
            (location.pathname.endsWith("/HomeClient/Profile/Edit") && (
              <ProfileUpdate />
            )) ||
            (location.pathname.endsWith("/HomeClient/MyAppointments") && (
              <MyAppointments />
            )) ||
            (location.pathname.endsWith("/HomeClient/Urgency") && (
              <Urgency />
            )) ||
            (location.pathname.endsWith("/HomeClient/MedicalAppointments") && (
              <MedicalAppointments />
            )) ||
            (location.pathname.endsWith("/HomeClient/MedicalHistory") && (
              <MedicalHistory />
            )) ||
            (location.pathname.endsWith("/HomeClient/Reviews") && (
              <Reviews />
            )) ||
            (location.pathname.endsWith("/HomeClient/Faq") && <Faq />) ||
            (location.pathname.endsWith("/HomeClient/Chat") && <ChatHome />) ||
            (location.pathname.endsWith("/HomeClient/Register") && (
              <Register />
            )) ||
            (location.pathname.endsWith("/HomeClient/Suscriptions") && (
              <Suscriptions />
            )) ||
            // (location.pathname.endsWith("/HomeClient/TestCovid") && (
            //   <TestCovid />
            // )) ||
            (location.pathname.endsWith("/HomeClient/Suscriptions/history") && (
              <History />
            )) || <ErrorPage />}
        </div>
      </div>
    );
  }
  if (isLogged === false) {
    return <Navigate to="/loginClient" />;
  }
};
export default Home;
