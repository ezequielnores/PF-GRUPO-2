import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
//
import { isEmail, isNumeric, isStrongPassword, isAlpha } from "validator";
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
  //estado para controlar los inputs
  const [infoNueva, setInfoNueva] = useState({
    name: dataDoc ? dataDoc.name : "",
    lastName: dataDoc ? dataDoc.lastName : "",
    mail: dataDoc ? dataDoc.mail : "",
    password: dataDoc ? dataDoc.password : "",
    clinicMail: dataDoc ? dataDoc.clinicMail : "",
    birthdate: dataDoc ? dataDoc.birthdate : new Date(),
    phone: dataDoc ? dataDoc.phone : "",
  });
  //estado para validar el button
  const [hasChanged, setHasChanged] = useState(false);
  //estado de errores validaciones
  const [errors, setErrors] = useState({
    name: "",
    mail: "",
    phone: "",
    password: "",
    clinicMail: "",
    birthdate: "",
    lastName: "",
  });
  const handleChange = (evento) => {
    evento.preventDefault();
    setInfoNueva({
      ...infoNueva,
      [evento.target.name]: evento.target.value,
    });
    setHasChanged(true);
  };
  const handleFechaNacimientoChange = (date) => {
    setInfoNueva({ ...infoNueva, birthdate: date });
  };
  console.log(dataDoc.id);
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFields();
    if (Object.keys(errors).length === 0) {
      dispatch(doctorUpdate({ id: dataDoc.id, data: infoNueva }));
      alert("Information updated");
      navigate("/HomeMedic/Profile");
    } else {
      setErrors(errors);
    }
  };
  //validaciones mediante libereria validator js
  const validateFields = () => {
    const errors = {};

    if (!isAlpha(infoNueva.name)) {
      errors.name = "Please enter valid name";
    }

    if (!isAlpha(infoNueva.lastName)) {
      errors.lastName = "Please enter valid last name";
    }

    if (!isEmail(infoNueva.mail)) {
      errors.mail = "Please enter a valid email address";
    }

    if (!isStrongPassword(infoNueva.password)) {
      errors.password = "Please enter a valid password";
    }

    if (!isEmail(infoNueva.clinicMail)) {
      errors.clinicMail = "Please enter a valid email address";
    }

    if (new Date(infoNueva.birthdate) > new Date()) {
      errors.birthdate = "Please enter a valid birthdate";
    }

    if (!isNumeric(infoNueva.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    return errors;
  };
  //cambie el id del localstorage, genera errores por el id del cliente con el mismo nombre (id)
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
        gutterBottom
        style={{
          color: "#307196",
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
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          name="lastName"
          label="Last name"
          style={typoTitle}
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
        <TextField
          name="password"
          label="Password"
          style={typoTitle}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthdate"
            value={infoNueva.birthdate}
            onChange={handleFechaNacimientoChange}
            error={Boolean(errors.birthdate)}
            helperText={errors.birthdate}
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
          error={Boolean(errors.phone)}
          helperText={errors.phone}
        />
        <TextField
          name="clinicMail"
          label="Clinic email"
          style={typoTitle}
          onChange={handleChange}
          error={Boolean(errors.clinicMail)}
          helperText={errors.clinicMail}
        />
        <TextField
          name="mail"
          label="Email"
          style={typoTitle}
          onChange={handleChange}
          error={Boolean(errors.mail)}
          helperText={errors.mail}
        />
      </Card>
      <Button
        variant="contained"
        onClick={(e) => handleSubmit(e)}
        disabled={!hasChanged}
      >
        Update information
      </Button>
    </div>
  );
};

export default ProfileEdit;
