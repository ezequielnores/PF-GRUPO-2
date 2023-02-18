import SideBar from "../SideBar/SideBar";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import logoICare from "../../../assets/logoiCare.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { doctorGetDetail } from "../../../redux/reducers/doctorReducer";
import React, { useEffect } from "react";

import {
  ProfileMedic,
  ReviewsMedic,
  MedicalEmergency,
  ProfileEdit,
  Agenda,
} from "../index";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  //logic para mostrar render el doc actual logeado
  const dataDoc = useSelector((state) => state.doctor.detail);
  console.log(dataDoc);

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const doctorId = localStorage.getItem("idMedic");
    if (doctorId) {
      dispatch(doctorGetDetail(doctorId));
    }
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <img
        style={{
          width: "4rem",
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
            background: "rgba(64, 184,200,0.5)",
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
              {dataDoc.name} {dataDoc.lastName}
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "gray",
              }}
            >
              {dataDoc.speciality}
            </p>
          </div>
          <Avatar
            sx={{ bgcolor: deepOrange[500], width: 55, height: 55 }}
            src="https://uploads-ssl.webflow.com/5968aae9098b3406e8f8ce64/5a2a8ba1ddae7e00015bcee4_male.png"
          />
        </Stack>
      ) : null}

      <SideBar open={open} handleOpen={handleOpen} />
      <div
        style={{
          position: "absolute",
          top: "6rem",
          width: open ? "85vw" : "95vw",
          right: "0",
        }}
      >
        {location.pathname.endsWith("/HomeMedic/Profile") && <ProfileMedic />}
        {location.pathname.endsWith("/HomeMedic/Profile/Edit") && (
          <ProfileEdit />
        )}
        {location.pathname.endsWith("/HomeMedic/Agenda") && <Agenda />}
        {location.pathname.endsWith("/HomeMedic/MedicalEmergency") && (
          <MedicalEmergency />
        )}
        {location.pathname.endsWith("/HomeMedic/Reviews") && <ReviewsMedic />}
      </div>
    </div>
  );
};
export default Home;
