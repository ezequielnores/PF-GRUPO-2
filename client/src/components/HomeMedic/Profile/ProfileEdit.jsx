import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
//
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//redux
import {
  doctorUpdate,
  doctorGetDetail,
} from "../../../redux/reducers/doctorReducer";
import { useDispatch, useSelector } from "react-redux";

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
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "5px",
  marginBottom: "10px",
  width: "100%",
};

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataDoc = useSelector((state) => state.doctor.detail);

  const [infoNueva, setInfoNueva] = useState({
    name: dataDoc ? dataDoc.name : "",
    lastName: dataDoc ? dataDoc.lastName : "",
    mail: dataDoc ? dataDoc.mail : "",
    password: dataDoc ? dataDoc.password : "",
    clinicMail: dataDoc ? dataDoc.clinicMail : "",
    birthdate: dataDoc ? dataDoc.birthdate : new Date(),
    phone: dataDoc ? dataDoc.phone : "",
    image: dataDoc ? dataDoc.image : null,
  });

  const handleChange = (evento) => {
    evento.preventDefault();
    setInfoNueva({
      ...infoNueva,
      [evento.target.name]: evento.target.value,
    });
  };
  const handleFechaNacimientoChange = (date) => {
    setInfoNueva({ ...infoNueva, birthdate: date });
  };
  console.log(dataDoc.id);
  console.log(infoNueva);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataDoc.id);
    console.log(infoNueva);
    dispatch(doctorUpdate({ id: dataDoc.id, data: infoNueva }));
    alert("Information updated");
    navigate("/HomeMedic/Profile");
  };

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
        }}
      >
        Edit information
      </Typography>
      <Link to="/HomeMedic/Profile">
        <Button underline="hover" color="inherit">
          Back
        </Button>
      </Link>
      <Card style={carde}>
        <TextField
          name="name"
          label="Name"
          style={typoTitle}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="Last name"
          style={typoTitle}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          style={typoTitle}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthdate"
            value={infoNueva.birthdate}
            onChange={handleFechaNacimientoChange}
            format="dd/MM/yyyy"
            maxDate={new Date()}
            inputVariant="outlined"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          name="phone"
          label="Phone"
          style={typoTitle}
          onChange={handleChange}
        />
        <TextField
          name="clinicMail"
          label="Clinic email"
          style={typoTitle}
          onChange={handleChange}
        />
        <TextField
          name="mail"
          label="Email"
          style={typoTitle}
          onChange={handleChange}
        />
      </Card>
      <Button variant="contained" onClick={(e) => handleSubmit(e)}>
        Update information
      </Button>
    </div>
  );
};

export default ProfileEdit;
