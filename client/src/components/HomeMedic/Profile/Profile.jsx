import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doctorGetDetail } from "../../../redux/reducers/doctorReducer";

//styles
const padreDiv = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: " center",
  alignItems: "center",
};
const carde = {
  width: "30rem",
  padding: "1rem",
  textAlign: "start",
  marginBottom: "2rem",
};
const typoTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "4px",
  marginBottom: "4px",
};
const passwordStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  textAlign: "center",
  alignItems: "center",
};
const Profile = () => {
  const dispatch = useDispatch();
  //ME TRAGIO EL DETAIL CON LA INFO DEL DOC!
  const dataDoc = useSelector((state) => state.doctor.detail);
  console.log(dataDoc);
  //Estado para ocultar o mostrar la pass
  const [showPassword, setShowPassword] = useState(false);
  //handler de setear estado
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  //cambiar por bdd
  const inputPassword = showPassword ? dataDoc.password : "****";
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
        variant="h2"
        style={{
          color: "#307196",
          fontWeight: "bold",
          fontSize: "2.5rem",
          marginBottom: "2rem",
        }}
      >
        Personal information
      </Typography>
      {/* PREGUNTO SI EXISTE ALGO EN DATADOC , OSEAS SI REALMENTE TENGO UN DOCTOR ! SI NO NADA ! */}
      {Object.keys(dataDoc).length > 0 ? (
        <Card style={carde}>
          <Typography style={typoTitle}>Name :</Typography>
          <Typography variant="body1">{dataDoc.name}</Typography>
          <Divider />

          <Typography style={typoTitle}>Last name :</Typography>
          <Typography variant="body1">{dataDoc.lastName}</Typography>
          <Divider />

          <Typography style={typoTitle}>Personal Email :</Typography>
          <Typography variant="body1">{dataDoc.mail}</Typography>
          <Divider />
          <div style={passwordStyle}>
            <Typography style={typoTitle}>Password :</Typography>
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <Typography variant="body1">{inputPassword}</Typography>
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
          <Typography variant="body1">{dataDoc.lisence}</Typography>
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
