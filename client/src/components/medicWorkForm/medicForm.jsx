import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//validaciones
import { isEmail, isNumeric, isAlpha } from "validator";
import { IconButton, InputAdornment } from "@mui/material";

//style
const divPadre = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#43B8C8",
};
const box = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  width: "50rem",
  height: "50rem",
  justifyContent: "space-evenly",
};
const cardDiv = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  width: "48rem",
  height: "45rem",
  boxShadow:
    "-10px 10px 0px #307196,-20px 20px 0px rgba(48, 113, 150, 0.7),-30px 30px 0px rgba(48, 113, 150, 0.4),-40px 40px 0px rgba(48, 113, 150, 0.1)",
};
const divHijo = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "10px",
  margin: "10px",
  gap: "1.5rem",
};
const finalinput = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "10px",
  margin: "10px",
};

const MedicForm = () => {
  const [successForm, setSuccessForm] = useState(null);
  const [imageInputValue, setImageInputValue] = useState("");
  //validacion state
  const [errors, setErrors] = useState({
    user_name: "",
    user_lastName: "",
    user_mail: "",
    user_clinicMail: "",
    user_phone: "",
    user_dni: "",
    user_license: "",
    user_birthdate: "",
    user_image: "",
    user_speciality: "",
    user_location: "",
  });
  const [value, setValue] = useState({
    name: "",
    lastName: "",
    mail: "",
    clinicMail: "",
    phone: "",
    dni: "",
    license: "",
    birthdate: "02-03-1999",
    image: "",
    speciality: "",
    location: "",
  });
  //validacion submit button
  const [hasChanged, setHasChanged] = useState(false);
  //handler de inputs
  const handleChange = (evento) => {
    evento.preventDefault();
    const fieldName = evento.target.name;
    //Lo que tomo son :
    setValue({
      ...value,
      [evento.target.name]: evento.target.value,
    });
    // Validar solo el campo que está cambiando
    const errorsForField = validateFields(fieldName);
    // Actualizar el estado de errores solo para el campo que está cambiando
    setErrors({
      ...errors,
      [fieldName]: errorsForField[fieldName],
    });
    //Para el submiteo
    setHasChanged(true);
  };

  const handleImage = (e) => {
    setImageInputValue(e.target.value)
    const file = e.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValue({ ...value, image: reader.result });
    
      validateFields({ ...value, image: reader.result }, "image");
    }
  }

  const handleFechaNacimientoChange = (date) => {
    const errorsForField = validateFields();

    setValue({ ...value, birthdate: date });
    setHasChanged(true);
    setErrors({
      ...errors,
      [value]: errorsForField,
    });
  };
  const validateFields = () => {
    const errors = {};

    if (!isAlpha(value.name)) {
      errors.name = "Please enter valid name";
    }

    if (!isAlpha(value.lastName)) {
      errors.lastName = "Please enter valid last name";
    }
    if (!isAlpha(value.location)) {
      errors.location = "Please enter a valid location";
    }
    if (!isAlpha(value.speciality)) {
      errors.speciality = "Please enter a valid speciality";
    }
    if (!isEmail(value.mail)) {
      errors.mail = "Please enter valid email";
    }

    if (!isEmail(value.clinicMail)) {
      errors.clinicMail = "Please enter valid email";
    }

    if (new Date(value.birthdate) > new Date() || value.birthdate === null) {
      errors.birthdate = "Please enter a valid birthdate";
    }

    if (!isNumeric(value.phone)) {
      errors.phone = "Please enter valid phone number";
    }

    if (!isNumeric(value.license)) {
      errors.license = "Please enter valid license";
    }
    if (!isNumeric(value.dni)) {
      errors.dni = "Please enter valid d.n.i";
    }
    return errors;
  };
  console.log(value);
  //Logic form
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const errors = validateFields();
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      emailjs
        .sendForm(
          "service_smqws2i",
          "template_br2o0og",
          form.current,
          "Lx1ljNbkdCzYTpZTP"
        )
        .then(
          (result) => {
            setSuccessForm("success");
          },
          (error) => {
            setSuccessForm("error");
          }
        );
    } else {
      setErrors(errors);
    }
  };
  return (
    <div style={divPadre}>
      <form
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        style={box}
        noValidate
        autoComplete="off"
        ref={form}
        onSubmit={sendEmail}
      >
        {successForm === "success" && (
          <Alert severity="success">Will be in contact soon !</Alert>
        )}
        {successForm === "error" && (
          <Alert severity="error">Server error !</Alert>
        )}

        <Card style={cardDiv}>
          <div style={finalinput}>
            <Typography
              variant="h2"
              align="justify"
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "3rem",
                marginBottom: "2rem",
              }}
            >
              Join us !
            </Typography>
          </div>
          <div style={divHijo}>
            <TextField
              name="name"
              label=" First Name"
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              name="lastName"
              label="Last Name"
              size="large"
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
            <TextField
              name="mail"
              label="Email"
              onChange={handleChange}
              error={Boolean(errors.mail)}
              helperText={errors.mail}
            />
          </div>
          <div style={divHijo}>
            {/* <TextField
              name="birthdate"
              label="Birthdate"
              onChange={handleChange}
              error={Boolean(errors.birthdate)}
              helperText={errors.birthdate}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="birthdate"
                label="Birthdate"
                value={value.birthdate}
                format="dd/MM/yyyy"
                maxDate={new Date()}
                inputVariant="outlined"
                onChange={handleFechaNacimientoChange}
                helperText={errors.birthdate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={errors.birthdate}
                    error={Boolean(errors.birthdate)}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              name="phone"
              label="Phone"
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
              name="location"
              label="Location"
              onChange={handleChange}
              error={Boolean(errors.location)}
              helperText={errors.location}
            />
          </div>
          <Divider />
          <div style={divHijo}>
            <TextField
              name="dni"
              label="D.N.I"
              onChange={handleChange}
              error={Boolean(errors.dni)}
              helperText={errors.dni}
            />
            <TextField
              name="license"
              label="License"
              onChange={handleChange}
              error={Boolean(errors.license)}
              helperText={errors.license}
            />
            <TextField
              type="email"
              name="clinicMail"
              label="Clinic mail"
              onChange={handleChange}
              error={Boolean(errors.clinicMail)}
              helperText={errors.clinicMail}
            />
          </div>
          <div style={finalinput}>
          <TextField
            error={errors.image}
            label="Image"
            style={value.image ? {width: "40vh", marginBottom: "1vh"} : { width: "40vh", "label": {paddingLeft: "5vw"} }}
            onChange={handleImage}
            name="image"
            value={imageInputValue ? imageInputValue : ""}
            type="file"
            InputProps={
              !value.image ? {inputProps: {style: {paddingLeft: "4vw"}}} :
              {
              endAdornment: (
                <InputAdornment position="end">
                  {value.image && (
                    <IconButton onClick={() => {setValue({ ...value, image: null }, setImageInputValue(""));}}>
                      X
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
            <TextField
              name="speciality"
              label="Especialty"
              onChange={handleChange}
              error={Boolean(errors.speciality)}
              helperText={errors.speciality}
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              type="submit"
              value="Send"
              disabled={!hasChanged}
              style={{
                backgroundColor: "#307196",
                width: "50%",
                borderRadius: "12px",
              }}
            >
              Submit
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default MedicForm;
