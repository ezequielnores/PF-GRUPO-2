import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {patientUpdate,patientGetDetail} from "../../../redux/reducers/patientReducer";
import { useDispatch, useSelector } from "react-redux";
import { isEmail, isNumeric, isStrongPassword, isAlpha, isInt } from "validator";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";




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
  const detailPatient = useSelector((state) => state.patient.detail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [infoNueva, setInfoNueva] = useState({
    name: detailPatient? detailPatient.name:"",
    surname: detailPatient? detailPatient.surname:"",
    mail: detailPatient? detailPatient.mail:"",
    password: detailPatient? detailPatient.password:"",
    birthday: detailPatient? detailPatient.birthday:new Date(),
    photo: detailPatient? detailPatient.photo:"",
    weight: detailPatient? detailPatient.weight:"",
    height: detailPatient? detailPatient.height:"",
    allergies: detailPatient? detailPatient.allergies:"",
    chronicDiseases: detailPatient? detailPatient.chronicDiseases:"",
    location: detailPatient? detailPatient.location:"",
    phone: detailPatient? detailPatient.phone:"",
  });

  const [hasChanged, setHasChanged] = useState(false);

  const [error, setError] = useState({
    photo: "",
    name: "",
    mail: "",
    phone: "",
    password: "",
    clinicMail: "",
    birthday: "",
    surname: "",
    weight:"",
    height:"",
    location:""
  });


  

  const handleChange = (name, value) => {
    setInfoNueva({
      ...infoNueva,
      [name]:value,
    });
    validateFields({ ...infoNueva, [name]: value }, name);
    setHasChanged(true);
  };

  const handleFechaNacimientoChange = (date) => {
    setInfoNueva({ ...infoNueva, birthday: date });
    setHasChanged(true);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInfoNueva({...infoNueva, photo: reader.result});
      setHasChanged(true);
    };
    validateFields();
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // const errors = validateFields();
    if (Object.values(error).every((item) => item === "")) {
      dispatch(patientUpdate({ id: detailPatient.id, data: infoNueva }));
      alert("Information updated");
      navigate("/HomeClient/Profile");
    } else {
      alert("Error")
    }
  };


  // const validateFields = () => {
  //   const errors = {};

  //   if (!isAlpha(infoNueva.name)) {
  //     errors.name = "Please enter valid name";
  //   }

  //   if (!isAlpha(infoNueva.surname)) {
  //     errors.surname = "Please enter valid last name";
  //   }

  //   if (!isEmail(infoNueva.mail)) {
  //     errors.mail = "Please enter a valid email address";
  //   }

  //   if (!isStrongPassword(infoNueva.password)) {
  //     errors.password = "Please enter a valid password";
  //   }

  //   if (new Date(infoNueva.birthday) > new Date()) {
  //     errors.birthday = "Please enter a valid birthdate";
  //   }

  //   if (!isNumeric(infoNueva.phone)) {
  //     errors.phone = "Please enter a valid phone number";
  //   }
  //   if (!isInt(infoNueva.weight)) {
  //     errors.weight = "Please enter a valid weight";
  //   }
  //   if (!isInt(infoNueva.height)) {
  //     errors.height = "Please enter a valid height";
  //   }

  //   return errors;
  // };

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
    if (name === "mail") {
      if (
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
          form[name] || form[name] !== ""
        )
      ) {
        setError({ ...error, [name]: "•Musst be a valid email" });
      } else setError({ ...error, [name]: "" });
    }
  };


  useEffect(() => {
    const patientId = localStorage.getItem("id");
    if (patientId) {
      dispatch(patientGetDetail(patientId));
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
      <Link to="/HomeClient/Profile">
        <Button underline="hover" color="inherit">
          Back
        </Button>
      </Link>
      <Card style={carde}>
        <TextField
          name="name"
          label="Name"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={Boolean(error.name)}
          helperText={error.name}
        />
        <TextField
          name="surname"
          label="Last name"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={Boolean(error.surname)}
          helperText={error.surname}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthdate"
            value={infoNueva.birthday}
            onChange={handleFechaNacimientoChange}
            error={Boolean(error.birthday)}
            helperText={error.birthday}
            format="dd/MM/yyyy"
            maxDate={new Date()}
            inputVariant="outlined"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          name="mail"
          label="Mail"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={Boolean(error.mail)}
          helperText={error.mail}
        />
        <TextField
          name="password"
          label="Password"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={Boolean(error.password)}
          helperText={error.password}
        />
        <TextField
          name="photo"
          label="Photo"
          style={typoTitle}
          type="file"
          gutterBottom
          onChange={handleImage}
        />
        <TextField
          name="weight"
          label="Weight"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={Boolean(error.weight)}
          helperText={error.weight}
        />
        <TextField
          name="height"
          label="Height"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={Boolean(error.height)}
          helperText={error.height}
        />
        <TextField
          name="allergies"
          label="Allergies"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <TextField
          name="chronicDiseases"
          label="Chronic diseases"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <TextField
          name="location"
          label="Location"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <TextField
          name="phone"
          label="Phone"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={Boolean(error.phone)}
          helperText={error.phone}
        />
        <TextField
          name="bmi"
          label="BMI"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Card>
      <Button variant="contained" onClick={(e) => handleSubmit(e)} disabled={!hasChanged}>
        Update information
      </Button>
      <br/><br/>
    </div>
  );
};

export default ProfileEdit;