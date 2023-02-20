import React from "react";
import "./Register.module.css";
import { TextField, Button } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch, useSelector } from "react-redux";
import { patientRegister } from "../../../redux/reducers/patientReducer";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

//style
const cardDiv = {
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  height: "49rem",
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
  height: "55rem",
  justifyContent: "space-evenly",
  marginBottom: "7rem",
};
const divPadre = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#43B8C8",
};
const Register = () => {
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    name: "",
    surname: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    birthday: "",
    dni: "",
    location: "",
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
    mail: "",
    password: "",
  });

  const onChangeHandler = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const validateForm = (form, name) => {
    if (name === "name" || name === "surname") {
      if (/\d/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "Input allows only characters" });
      } else setError({ ...error, [name]: "" });
    }

    /**
        if (name === "phone") {
          if (/\D/.test(form[name])) {
            setError({ ...error, [name]: "Invalid Phone" });
          } else {
            setError({ ...error, [name]: "" });
          }
        }
    */

    if (name === "mail") {
      if (
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
          form[name] || form[name] !== ""
        )
      ) {
        setError({ ...error, [name]: "Must be a valid email" });
      } else setError({ ...error, [name]: "" });
    }
  };

  const handleSubmit = () => {
    if (Object.values(error).every((item) => item === "")) {
      try {
        dispatch(patientRegister({ ...form, phone: 12345 }))
          .then((res) => {
            if (res.type === "patient/register/fulfilled") {
              alert("Account Created");
            } else {
              alert("Error creating account!");
            }
            console.log(res.type);
          })
          .catch((err) => alert("error"));
      } catch (error) {
        console.log(error);
        alert("error");
      }
    } else {
      alert("Please complete all fields");
    }
  };

  return (
    <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   width: "100%",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   gap: "10px",
      //   marginBottom: "15px",
      // }}
      style={divPadre}
    >
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
            style={{ width: "40vh" }}
            onChange={(value) => onChangeHandler("phone", value)}
          />

          <TextField
            error={error.name}
            label="Name*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="name"
            value={form.name}
          />

          <TextField
            error={error.surname}
            label="Surname*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="surname"
            value={form.surname}
          />

          <TextField
            error={error.mail}
            label="Email*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="mail"
            value={form.mail}
          />

          <TextField
            error={error.password}
            label="Password*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="password"
            value={form.password}
            type="password"
          />

          <TextField
            error={error.dni}
            label="DNI*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="dni"
            value={form.dni}
          />

          <TextField
            error={error.birthday}
            label="Birthday"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="birthday"
            value={form.birthday}
          />

          <TextField
            error={error.weight}
            label="Weight*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="weight"
            value={form.weight}
          />

          <TextField
            label="Height*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="height"
            value={form.height}
          />

          <TextField
            error={error.allergies}
            label="Allergies"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="allergies"
            value={form.allergies}
          />

          <TextField
            error={error.location}
            label="Location*"
            style={{ width: "40vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="location"
            value={form.location}
          />

          <Button
            onClick={handleSubmit}
            style={{
              border: "1px solid",
              marginTop: "1.2rem",
            }}
          >
            Save
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Register;
