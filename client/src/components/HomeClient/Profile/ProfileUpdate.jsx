import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  patientUpdate,
  patientGetDetail,
} from "../../../redux/reducers/patientReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmail,
  isNumeric,
  isStrongPassword,
  isAlpha,
  isInt,
} from "validator";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import swal from "sweetalert";
import { IconButton, InputAdornment } from "@mui/material";

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
  const patientDetail = useSelector((state) => state.patient.detail);
  const [imageInputValue, setImageInputValue] = useState("");

  const [infoNueva, setInfoNueva] = useState({
    name: detailPatient ? detailPatient.name : "",
    surname: detailPatient ? detailPatient.surname : "",
    mail: detailPatient ? detailPatient.mail : "",
    password: detailPatient ? detailPatient.password : "",
    birthday: detailPatient ? detailPatient.birthday : new Date(),
    photo: detailPatient ? detailPatient.photo : "",
    weight: detailPatient ? detailPatient.weight : "",
    height: detailPatient ? detailPatient.height : "",
    allergies: detailPatient ? detailPatient.allergies : "",
    chronicDiseases: detailPatient ? detailPatient.chronicDiseases : "",
    location: detailPatient ? detailPatient.location : "",
    phone: detailPatient ? detailPatient.phone : "",
    bmi: detailPatient ? detailPatient.bmi : "",
  });

  const [hasChanged, setHasChanged] = useState(false);

  const [error, setError] = useState({
    photo: "",
    name: "",
    mail: "",
    phone: "",
    password: "",
    birthday: "",
    surname: "",
    weight: "",
    height: "",
    location: "",
    chronicDiseases: "",
    allergies: "",
  });

  useEffect(() => {
    const patientId = localStorage.getItem("id");
    if (patientId) {
      dispatch(patientGetDetail(patientId));
    }
  }, []);

  const handleChange = (name, value) => {
    setInfoNueva({
      ...infoNueva,
      [name]: value,
    });
    validateFields({ ...infoNueva, [name]: value }, name);
    setHasChanged(true);
  };

  const handleFechaNacimientoChange = (date) => {
    setInfoNueva({ ...infoNueva, birthday: date });
    setHasChanged(true);
  };

  const handleImage = (e) => {
    const name = e.target.name;
    setImageInputValue(e.target.value);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInfoNueva({ ...infoNueva, [name]: reader.result });
      setHasChanged(true);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const errors = validateFields();
    if (Object.values(error).every((item) => item === "")) {
      dispatch(patientUpdate({ id: patientDetail.id, data: infoNueva }));
      await swal("Information updated", {
        icon: "success",
      });
      // alert("Information updated");
      await navigate("/HomeClient/Profile");
    } else {
      alert("Error");
    }
  };

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
          value={infoNueva.name}
          name="name"
          label="Name"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.name}
          helperText={error.name}
        />
        <TextField
          value={infoNueva.surname}
          name="surname"
          label="Last name"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.surname}
          helperText={error.surname}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="birthday"
            label="Birthdate"
            value={infoNueva.birthday}
            onChange={handleFechaNacimientoChange}
            error={error.birthday}
            helperText={error.birthday}
            format="dd/MM/yyyy"
            maxDate={new Date()}
            inputVariant="outlined"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          value={infoNueva.mail}
          name="mail"
          label="Mail"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.mail}
          helperText={error.mail}
        />
        <TextField
          name="password"
          label="Password"
          value={infoNueva.password}
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.password}
          helperText={error.password}
        />

        <TextField
          label="Photo"
          InputLabelProps={{
            shrink: true,
          }}
          style={
            infoNueva.photo
              ? { width: "49.8vh", marginBottom: "1vh" }
              : { width: "49.8vh", label: { paddingLeft: "5vh" } }
          }
          onChange={handleImage}
          name="photo"
          value={imageInputValue ? imageInputValue : ""}
          type="file"
          InputProps={
            !infoNueva.photo
              ? { inputProps: { style: { paddingLeft: "5vw" } } }
              : {
                  endAdornment: (
                    <InputAdornment position="end">
                      {infoNueva.photo && (
                        <IconButton
                          onClick={() => {
                            setInfoNueva(
                              { ...infoNueva, photo: null },
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

        <TextField
          value={infoNueva.weight}
          name="weight"
          label="Weight"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.weight}
          helperText={error.weight}
        />
        <TextField
          value={infoNueva.height}
          name="height"
          label="Height"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.height}
          helperText={error.height}
        />
        <TextField
          value={infoNueva.allergies}
          name="allergies"
          label="Allergies"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <TextField
          value={infoNueva.chronicDiseases}
          name="chronicDiseases"
          label="Chronic diseases"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.chronicDiseases}
          helperText={error.chronicDiseases}
        />
        <TextField
          value={infoNueva.location}
          name="location"
          label="Location"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.location}
          helperText={error.location}
        />
        <TextField
          name="phone"
          label="Phone"
          value={infoNueva.phone}
          defaultCountry={"AR"}
          style={{ width: "49.9vh", marginBottom: "1rem" }}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={error.phone}
          helperText={error.phone}
        />
        {/* <TextField
          value={infoNueva.bmi}
          name="bmi"
          label="BMI"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        /> */}
      </Card>
      <Button
        variant="contained"
        onClick={(e) => handleSubmit(e)}
        disabled={!hasChanged}
      >
        Update information
      </Button>
      <br />
      <br />
    </div>
  );
};

export default ProfileEdit;
