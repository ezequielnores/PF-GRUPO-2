import SideBar from "../SideBar/SideBar";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import logoICare from "../../../assets/logoiCare.png";
import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { doctorGetDetail } from "../../../redux/reducers/doctorReducer";
import React, { useEffect } from "react";

import {
  ProfileMedic,
  ReviewsMedic,
  MedicalEmergency,
  ProfileEdit,
  Agenda,
  SeePatients,
  ChatHome,
} from "../index";
import { useSelector, useDispatch } from "react-redux";
import ErrorPage from "../../ErrorPage/ErrorPage";

const Home = ({ isLogged }) => {
  const dispatch = useDispatch();
  //logic para mostrar render el doc actual logeado
  const dataDoc = useSelector((state) => state.doctor.detail);
  // console.log(dataDoc);

  const location = useLocation();
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const doctorId = localStorage.getItem("idMedic");
    if (doctorId) {
      dispatch(doctorGetDetail(doctorId));
    }
  }, []);
  if(isLogged === null){
    return (
      <h1>Loading...</h1>
    )
  }

  if (isLogged === true) {
    return (
      <div style={{ position: "relative" }}>
        <img
          style={{
            width: "4.3vw",
            position: "absolute",
            top: "0.5rem",
            left: "4.3rem",
          }}
          src={logoICare}
          alt="docImg"
        />
        {dataDoc ? (
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
                {dataDoc.name} {dataDoc.lastName}
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#63696f",
                }}
              >
                {dataDoc.speciality}
              </p>
            </div>
            <Avatar
              sx={{ bgcolor: deepOrange[500], width: 55, height: 55 }}
              src={
                dataDoc.image
                  ? dataDoc.image
                  : "https://uploads-ssl.webflow.com/5968aae9098b3406e8f8ce64/5a2a8ba1ddae7e00015bcee4_male.png"
              }
            />
          </Stack>
        ) : null}

        <SideBar open={open} handleOpen={handleOpen} path={location.pathname} />
        <div
          style={{
            position: "absolute",
            top: "6rem",
            width: "85vw",
            right: "0",
          }}
        >
          {(location.pathname.endsWith("/HomeMedic/Profile") && (
            <ProfileMedic />
          )) ||
            (location.pathname.endsWith("/HomeMedic/Profile/Edit") && (
              <ProfileEdit />
            )) ||
            (location.pathname.includes("/HomeMedic/Chat") && <ChatHome />) ||
            (location.pathname.endsWith("/HomeMedic/Agenda") && <Agenda />) ||
            (location.pathname.endsWith("/HomeMedic/MedicalEmergency") && (
              <MedicalEmergency />
            )) ||
            (location.pathname.endsWith("/HomeMedic/Reviews") && (
              <ReviewsMedic />
            )) ||
            (location.pathname.endsWith(`/HomeMedic/SeePatients`) && (
              <SeePatients />
            )) || <ErrorPage />}
        </div>
      </div>
    );
  }
  if (isLogged === false) {
    return <Navigate to="/loginMedic" />;
  }
};
export default Home;
