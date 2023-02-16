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
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "3px",
  marginBottom: "2px",
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
  const dataDoc = useSelector((state) => state.doctor.detail.data);
  console.log(dataDoc);
  //Estado para ocultar o mostrar la pass
  const [showPassword, setShowPassword] = useState(false);
  //handler de setear estado
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  //cambiar por bdd
  const inputPassword = showPassword ? dataDoc.password : "****";
  //Aca hago dispatch con el id que tengo en localstorage
  useEffect(() => {
    const doctorId = localStorage.getItem("id");
    if (doctorId) {
      dispatch(doctorGetDetail(doctorId));
    }
  }, []);
  return (
    <div style={padreDiv}>
      <Typography
        variant="h2"
        gutterBottom
        style={{
          color: "#147bf4",
          fontWeight: "bold",
          fontSize: "2.5rem",
          marginBottom: "2rem",
        }}
      >
        Personal information
      </Typography>
      {/* PREGUNTO SI EXISTE ALGO EN DATADOC , OSEAS SI REALMENTE TENGO UN DOCTOR ! SI NO NADA ! */}
      {dataDoc ? (
        <Card style={carde}>
          <Typography style={typoTitle} gutterBottom>
            Name :
          </Typography>
          <Typography variant="body1">{dataDoc.name}</Typography>
          <Divider />

          <Typography style={typoTitle} gutterBottom>
            Last name :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />

          <Typography style={typoTitle} gutterBottom>
            Personal Email :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
          <div style={passwordStyle}>
            <Typography style={typoTitle} gutterBottom>
              Password :
            </Typography>
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <Typography variant="body1">{inputPassword}</Typography>
          <Divider />

          <Typography style={typoTitle} gutterBottom>
            Date of birth :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
          <Typography style={typoTitle} gutterBottom>
            Location:
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
          <Typography style={typoTitle} gutterBottom>
            Document :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
          <Typography style={typoTitle} gutterBottom>
            Phone :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
          <Typography style={typoTitle} gutterBottom>
            Specialty :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
          <Typography style={typoTitle} gutterBottom>
            License :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
          <Typography style={typoTitle} gutterBottom>
            Clinic email :
          </Typography>
          <Typography variant="body1"></Typography>
          <Divider />
        </Card>
      ) : null}
      <Link to="/HomeMedic/Profile/Edit">
        <Button variant="contained">Edit personal information</Button>
      </Link>
    </div>
  );
};
export default Profile;
