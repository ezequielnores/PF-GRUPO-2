import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doctorGetDetail } from "../../../redux/reducers/doctorReducer";

//styles
const padreDiv = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: " center",
  alignItems: "center",
};
const carde = {
  paddingLeft: "1rem",
  paddingBottom: "1rem",
  width: "30rem",
  textAlign: "start",
};
const typoTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "4px",
  marginBottom: "4px",
};
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  display: "block",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const Profile = () => {
  const dispatch = useDispatch();
  //ME TRAGIO EL DETAIL CON LA INFO DEL DOC!
  const dataDoc = useSelector((state) => state.doctor.detail);
  //Aca hago dispatch con el id que tengo en localstorage
  useEffect(() => {
    const doctorId = localStorage.getItem("idMedic");
    if (doctorId) {
      dispatch(doctorGetDetail(doctorId));
    }
  }, []);
  return (
    <div style={padreDiv}>
      <Typography
        variant="button"
        fontSize="2.5rem"
        color="#307196"
        fontWeight="bold"
        style={test}
      >
        Personal information
      </Typography>
      {/* PREGUNTO SI EXISTE ALGO EN DATADOC , OSEAS SI REALMENTE TENGO UN DOCTOR ! SI NO NADA ! */}
      {Object.keys(dataDoc).length > 0 ? (
        <Card style={carde}>
          <Avatar
            sx={{
              width: 110,
              height: 100,
              marginLeft: "40%",
            }}
            alt="DocImg "
            src={dataDoc.image}
          />
          <Typography style={typoTitle}>Name :</Typography>
          <Typography variant="body1">{dataDoc.name}</Typography>
          <Divider />

          <Typography style={typoTitle}>Last name :</Typography>
          <Typography variant="body1">{dataDoc.lastName}</Typography>
          <Divider />

          <Typography style={typoTitle}>Personal Email :</Typography>
          <Typography variant="body1">{dataDoc.mail}</Typography>
          <Divider />

          <Typography style={typoTitle}>Date of birth :</Typography>
          <Typography variant="body1">{dataDoc.birthdate}</Typography>
          <Divider />
          <Typography style={typoTitle}>Location:</Typography>
          <Typography variant="body1">{dataDoc.location}</Typography>
          <Divider />
          <Typography style={typoTitle}>Document :</Typography>
          <Typography variant="body1">{dataDoc.dni}</Typography>
          <Divider />
          <Typography style={typoTitle}>Phone :</Typography>
          <Typography variant="body1">{dataDoc.phone}</Typography>
          <Divider />
          <Typography style={typoTitle}>Specialty :</Typography>
          <Typography variant="body1">{dataDoc.speciality}</Typography>
          <Divider />
          <Typography style={typoTitle}>License :</Typography>
          <Typography variant="body1">{dataDoc.license}</Typography>
          <Divider />
          <Typography style={typoTitle}>Clinic email :</Typography>
          <Typography variant="body1">{dataDoc.clinicMail}</Typography>
          <Divider />
          <Link to="/HomeMedic/Profile/Edit">
            <Button
              variant="contained"
              style={{ marginTop: "2rem", backgroundColor: "#307196" }}
            >
              Edit personal information
            </Button>
          </Link>
        </Card>
      ) : null}
    </div>
  );
};
export default Profile;
