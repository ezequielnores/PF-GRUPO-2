import { confirmPasswordReset } from "firebase/auth";

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
/* import { swal } from "sweetalert"; */
import { auth } from "./../../authentication/firebase";
import logo from "../../assets/logoiCare.png";

function ResetPassword() {
  const div = {
    height: "100vh",
    alignItems: "center",
    backgroundColor: "rgba(128,233,233,0.43)",
    display: "flex",
  };
  const container = {
    height: "55vh",
    width: "45vw",
    backgroundColor: "white",
    borderRadius: "0.5vw",
    boxShadow: "0px 0px 13px 1px rgba(0,0,0,0.24)",
  };
  const title = {
    marginTop: "1vh",
    marginBottom: "7vh",
    width: "45vw",
    display: "flex",
  };
  const inputs = {
    marginTop: "4vh",
  };
  const button = {
    height: "4.5vh",
    marginTop: "13vh",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const oobCode = new URLSearchParams(location.search).get("oobCode");
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
    setErrors(validateInputs({ ...form, [name]: value }, name));
  };

  const validateInputs = (form) => {
    const currentErrors = {};
    if (form.password.length < 8)
      currentErrors.password = "Must have a minimum of 8 characters";
    else if (form.confirmPassword !== form.password)
      currentErrors.confirmPassword = "The passwords are different";
    return currentErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errors.password || errors.confirmPassword) {
      alert("It can not be sent! Correct the errors before sending.");
    } else {
      confirmPasswordReset(auth, oobCode, form.confirmPassword);
      navigate("/LoginClient");
    }
  };

  return (
    <div style={div}>
      <Container style={container}>
        <div style={title}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "2.8vw", height: "6.5vh", marginRight: "10vw" }}
          />
          <Typography variant="h3">Reset Password</Typography>
        </div>

        <FormGroup>
          <TextField
            style={inputs}
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
          />

          <TextField
            style={inputs}
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button
            style={button}
            variant="outlined"
            type="submit"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </FormGroup>
      </Container>
    </div>
  );
}

export default ResetPassword;
