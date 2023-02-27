import React, { useState } from "react";
import "./Register.module.css";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch } from "react-redux";
import { patientRegister } from "../../../redux/reducers/patientReducer";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//Firebase
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../authentication/firebase";
//style
const cardDiv = {
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  height: "82rem",
  justifyContent: "space-around",
  padding: "2rem",
  boxShadow:
    "-10px 10px 0px #307196,-20px 20px 0px rgba(48, 113, 150, 0.7),-30px 30px 0px rgba(48, 113, 150, 0.4),-40px 40px 0px rgba(48, 113, 150, 0.1)",
};
const box = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  width: "40rem",
  height: "85rem",
  justifyContent: "space-evenly",
  marginBottom: "7rem",
  marginTop: "5rem",
};
const divPadre = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "140vh",
  backgroundColor: "#43B8C8",
};
const Register = () => {
  const dispatch = useDispatch();

  const [imageInputValue, setImageInputValue] = useState("");
  const [form, setForm] = React.useState({
    name: "",
    surname: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    birthday: "03/02/1999",
    dni: "",
    location: "",
    image: "",
    mail: "",
    password: "",
  });

  const [error, setError] = React.useState({
    name: "",
    surname: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    birthday: "",
    dni: "",
    location: "",
    image: "",
    mail: "",
    password: "",
  });

  const handleImage = (e) => {
    setImageInputValue(e.target.value);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });

      validateForm({ ...form, image: reader.result }, "image");
    };
  };

  const onChangeHandler = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const onChangeEmail = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const onChangePassword = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const handleFechaNacimientoChange = (date, name) => {
    setForm({ ...form, birthday: date });
    validateForm({ ...form, [name]: form }, name);
  };

  const validateForm = (form, name) => {
    if (name === "name" || name === "surname") {
      if (!/^[A-Za-z\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "location" || name === "allergies") {
      if (!/^[a-zA-Z,\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters and commas" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "weight" || name === "height") {
      if (!/^[0-9]{2,3}$/.test(form[name])) {
        setError({ ...error, [name]: "•Only numbers •Min 2 digits" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (name === "dni") {
      if (!/^\d{4,8}$/.test(form[name])) {
        setError({ ...error, [name]: "•Only numbers •Min 4 digits" });
      } else {
        setError({ ...error, [name]: "" });
      }
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
        setError({ ...error, [name]: "•Must be a valid email" });
      } else setError({ ...error, [name]: "" });
    }
  };

  const dispatchRegister = () => {
    console.log(form);
    dispatch(
      patientRegister({ ...form, phone: 12345, mail: auth.currentUser.email })
    )
      .then((res) => {
        if (res.type === "patient/register/fulfilled") {
          alert("Account Created");
        } else {
          console.log({ ...form, phone: 12345, mail: auth.currentUser.email });
          alert("Error creating account!");
          auth.currentUser.delete();
        }
        console.log(res.type);
      })
      .catch((err) => alert("error"));
  };

  const handleRegister = async () => {
    if (Object.values(error).every((item) => item === "")) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.mail,
          form.password
        );
        const user = userCredential.user;
        console.log("usuario creado: " + user.email);
        dispatchRegister();
      } catch (error) {
        console.log({ Error: error.message });
      }
    } else {
      alert("Please complete all fields");
    }
  };

  const handleRegisterwithGoogle = async () => {
    if (Object.values(error).every((item) => item === "")) {
      try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        console.log("usuario creado: " + user.email);
        dispatchRegister();
      } catch (error) {
        console.log({ Error: error.message });
      }
    } else {
      alert("Please complete all fields");
    }
  };
  console.log(form);
  return (
    <div style={divPadre}>
      <div style={box}>
        <Card style={cardDiv}>
          <Typography
            variant="h2"
            align="center"
            style={{
              color: "#307196",
              marginBottom: "1rem",
              fontWeight: "semibold",
              fontFamily: "monospace",
              fontSize: "3rem",
            }}
          >
            Patient Register
          </Typography>

          <MuiTelInput
            label="Phone"
            name="phone"
            value={form.phone}
            defaultCountry={"AR"}
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(value) => onChangeHandler("phone", value)}
            error={error.phone}
            helperText={error.phone}
          />

          <TextField
            error={error.name}
            label="Name*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="name"
            value={form.name}
            helperText={error.name}
          />

          <TextField
            error={error.surname}
            label="Surname*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="surname"
            value={form.surname}
            helperText={error.surname}
          />

          <TextField
            error={error.dni}
            helperText={error.dni}
            label="DNI*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="dni"
            value={form.dni}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthdate"
              value={form.birthday}
              name="birthday"
              maxDate={new Date()}
              error={error.birthday}
              helperText={error.birthday}
              inputVariant="outlined"
              onChange={(e) => handleFechaNacimientoChange(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "40vh", marginBottom: "0.9rem" }}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            error={error.weight}
            helperText={error.weight}
            label="Weight*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="weight"
            value={form.weight}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Height*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="height"
            value={form.height}
            helperText={error.height}
            error={error.height}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />

          <TextField
            error={error.allergies}
            helperText={error.allergies}
            label="Allergies"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="allergies"
            value={form.allergies}
          />

          <TextField
            error={error.location}
            helperText={error.location}
            label="Location*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="location"
            value={form.location}
          />

          <TextField
            error={error.image}
            label="Image"
            style={
              form.image
                ? { width: "40vh", marginBottom: "1vh" }
                : { width: "40vh", label: { paddingLeft: "5vw" } }
            }
            onChange={handleImage}
            name="image"
            value={imageInputValue ? imageInputValue : ""}
            type="file"
            InputProps={
              !form.image
                ? { inputProps: { style: { paddingLeft: "4vw" } } }
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        {form.image && (
                          <IconButton
                            onClick={() => {
                              setForm(
                                { ...form, image: null },
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
          <Typography
            variant="h6"
            style={{ marginTop: "3vh", alignSelf: "start" }}
          >
            User Account
          </Typography>
          <TextField
            error={error.mail}
            label="Email*"
            style={{ width: "40vh", marginBottom: "1vh", marginTop: "1vh" }}
            onChange={(e) => onChangeEmail(e.target.name, e.target.value)}
            name="mail"
            value={form.mail}
            helperText={error.mail}
          />
          <TextField
            error={error.password}
            label="Password*"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangePassword(e.target.name, e.target.value)}
            name="password"
            value={form.password}
            type="password"
            helperText={error.password}
          />

          <Button
            onClick={handleRegister}
            style={{
              border: "1px solid",
              marginTop: "0.5rem",
            }}
          >
            Register
          </Button>
          <Typography style={{ marginTop: "2vh" }}>or</Typography>
          <Button
            onClick={handleRegisterwithGoogle}
            style={{
              border: "1px solid",
              marginTop: "0.5rem",
            }}
          >
            Register with Google
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Register;
