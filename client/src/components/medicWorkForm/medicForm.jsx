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
  width: "100%",
  height: "100vh",
  backgroundColor: "#43B8C8",
};
const box = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  width: "40rem",
  height: "47rem",
  justifyContent: "space-evenly",
};
const cardDiv = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  width: "35rem",
  height: "35rem",
  boxShadow: "1px -1px 0px -1px rgba(255,255,255,0.75)",
};
const divHijo = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "3rem",
  padding: "10px",
  margin: "10px",
};
const finalinput = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "3rem",
  padding: "10px",
  margin: "18px",
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

        <Card style={cardDiv}>
          <div style={finalinput}>
            <Typography
              variant="h2"
              align="justify"
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
            >
              Join us !
            </Typography>
          </div>
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
              type="text"
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
          <div style={finalinput}>
            <Input name="message" placeholder="Especialty" />
            <Input name="message" placeholder="Location" />
          </div>
          <div style={{ marginTop: "3rem" }}>
            <Button
              variant="contained"
              type="submit"
              value="Send"
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
