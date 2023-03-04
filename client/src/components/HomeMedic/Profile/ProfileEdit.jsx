import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";

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
import { IconButton, InputAdornment } from "@mui/material";
import swal from "sweetalert"

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
  //image state
  const [imageInputValue, setImageInputValue] = useState("");
  //estado para controlar los inputs
  const [infoNueva, setInfoNueva] = useState({
    name: dataDoc ? dataDoc.name : "",
    lastName: dataDoc ? dataDoc.lastName : "",
    mail: dataDoc ? dataDoc.mail : "",
    password: dataDoc ? dataDoc.password : "",
    clinicMail: dataDoc ? dataDoc.clinicMail : "",
    birthdate: dataDoc ? dataDoc.birthdate : new Date(),
    phone: dataDoc ? dataDoc.phone : "",
    image: dataDoc ? dataDoc.image : "",
    location: dataDoc ? dataDoc.location : "",
  });
  console.log(infoNueva);
  //estado para validar el button
  const [hasChanged, setHasChanged] = useState(false);
  //estado de errores validaciones
  const [error, setError] = useState({
    name: "",
    mail: "",
    phone: "",
    password: "",
    clinicMail: "",
    birthdate: "",
    lastName: "",
    location: "",
  });
  // const onChangeHandler = (name, value) => {
  //   setInfoNueva({ ...form, [name]: value });

  //   validateForm({ ...form, [name]: value }, name);
  // };

  const handleChange = (name, value) => {
    setInfoNueva({
      ...infoNueva,
      [name]: value,
    });
    validateFields({ ...infoNueva, [name]: value }, name);

    setHasChanged(true);
  };
  const handleFechaNacimientoChange = (date) => {
    setInfoNueva({ ...infoNueva, birthdate: date });
    setHasChanged(true);
  };
  console.log(dataDoc.id);
  const validateFields = (form, name) => {
    if (name === "name" || name === "lastName") {
      if (!/^[A-Za-z\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "location") {
      if (!/^[a-zA-Z,\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters and commas" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "password") {
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,}$/.test(
          form[name] || form[name] !== ""
        )
      ) {
        setError({
          ...error,
          [name]:
            "•Minimum 8 characters •One upper case letter •One loweer case letter •One number •One special character",
        });
      } else {
        setError({
          ...error,
          [name]: "",
        });
      }
    }
    if (name === "mail" || name === "clinicMail") {
      if (
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
          form[name] || form[name] !== ""
        )
      ) {
        setError({ ...error, [name]: "•Musst be a valid email" });
      } else setError({ ...error, [name]: "" });
    }
  };
  const handleImage = (e) => {
    const name = e.target.name;
    setImageInputValue(e.target.value);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInfoNueva({ ...infoNueva, [name]: reader.result });
    };
    setHasChanged(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const errors = validateFields();
    if (Object.values(error).every((item) => item === "")) {
      dispatch(doctorUpdate({ id: dataDoc.id, data: infoNueva }));
      await swal("Information updated", {
        icon: "success",
      });
      // alert("Information updated");
      // navigate("/HomeMedic/Profile");
    } else {
      alert("ERROR");
    }
  };
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
          value={infoNueva.name}
          name="name"
          label="Name"
          style={typoTitle}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.name}
          helperText={error.name}
        />
        <TextField
          value={infoNueva.lastName}
          name="lastName"
          label="Last name"
          style={typoTitle}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.lastName}
          helperText={error.lastName}
        />
        <TextField
          value={infoNueva.password}
          name="password"
          label="Password"
          style={typoTitle}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.password}
          helperText={error.password}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthdate"
            value={infoNueva.birthdate}
            onChange={handleFechaNacimientoChange}
            error={error.birthdate}
            helperText={error.birthdate}
            format="dd/MM/yyyy"
            maxDate={new Date()}
            inputVariant="outlined"
            renderInput={(params) => (
              <TextField {...params} style={{ marginBottom: "0.8rem" }} />
            )}
          />
        </LocalizationProvider>
        <TextField
          value={infoNueva.clinicMail}
          name="clinicMail"
          label="Clinic email"
          style={typoTitle}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.clinicMail}
          helperText={error.clinicMail}
        />
        <TextField
          value={infoNueva.mail}
          name="mail"
          label="Email"
          style={typoTitle}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.mail}
          helperText={error.mail}
        />
        <TextField
          value={infoNueva.location}
          name="location"
          label="Location"
          style={typoTitle}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.location}
          helperText={error.location}
        />
        <MuiTelInput
          value={infoNueva.phone}
          name="phone"
          label="Phone"
          defaultCountry={"AR"}
          style={{ width: "49.9vh", marginBottom: "1rem" }}
          error={error.phone}
          helperText={error.phone}
          onChange={(value) => handleChange("phone", value)}
        />
        <TextField
          label="Image"
          InputLabelProps={{
            shrink: true,
          }}
          style={
            infoNueva.image
              ? { width: "49.8vh", marginBottom: "1vh" }
              : { width: "49.8vh", label: { paddingLeft: "5vh" } }
          }
          onChange={handleImage}
          name="image"
          value={imageInputValue ? imageInputValue : ""}
          type="file"
          InputProps={
            !infoNueva.image
              ? { inputProps: { style: { paddingLeft: "5vw" } } }
              : {
                  endAdornment: (
                    <InputAdornment position="end">
                      {infoNueva.image && (
                        <IconButton
                          onClick={() => {
                            setInfoNueva(
                              { ...infoNueva, image: null },
                              setImageInputValue("")
                            );
                          }}
                        >
                          X
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }
          }
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
