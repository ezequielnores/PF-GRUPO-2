import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

//style
const divPadre = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "calc(100vh - 150px)",
};
const box = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  width: "40rem",
  height: "45rem",
  justifyContent: "space-evenly",
};
const cardDiv = {
  display: "flex",
  flexDirection: "column",
  width: "40rem",
  height: "22rem",
};
const divHijo = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "3rem",
  padding: "10px",
  margin: "10px",
};
const MedicForm = () => {
  const [successForm, setSuccessForm] = useState(null);
  //logic form
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
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
          <Alert severity="error">
            This is an error alert — check it out !
          </Alert>
        )}
        <Typography
          variant="h2"
          align="justify"
          style={{
            color: "gray",
            marginTop: "1.5rem",
            paddingLeft: "10px",
            paddingRight: "10px",
            fontWeight: "semibold",
            fontFamily: "monospace",
            fontSize: "2rem",
          }}
        >
          Join us !
        </Typography>
        <Card style={cardDiv}>
          <div style={divHijo}>
            <Input
              type="text"
              name="user_firstName"
              placeholder=" First Name"
              size="large"
            />
            <Input
              type="text"
              name="user_lastName"
              placeholder="Last Name"
              size="large"
            />
            <Input
              type="email"
              name="user_email"
              placeholder="Email"
              size="large"
            />
          </div>
          <div style={divHijo}>
            <Input
              type="text"
              name="user_birthday"
              placeholder="Birthday"
              size="large"
            />
            <Input
              type="number"
              name="user_phone"
              placeholder="Phone"
              size="large"
            />
            <Input
              type="text"
              name="user_address"
              placeholder="Address"
              size="large"
            />
          </div>
          <Divider />
          <div style={divHijo}>
            <Input name="user_dni" placeholder="D.N.I" size="large" />
            <Input name="user_license" placeholder="License" size="large" />
            <Input
              type="email"
              name="user_emailClinic"
              placeholder="Clinic mail"
              size="large"
            />
          </div>
          <div>
            <TextField name="message" label="Especialty" variant="outlined" />
          </div>
        </Card>
        <Button variant="contained" type="submit" value="Send">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default MedicForm;
