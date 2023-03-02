import {confirmPasswordReset} from "firebase/auth"

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, FormGroup, TextField, Typography } from '@mui/material';
import { red } from "@mui/material/colors";
import { swal } from 'sweetalert';
import { auth } from './../../authentication/firebase';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const oobCode = new URLSearchParams(location.search).get("oobCode");
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const [errors , setErrors] = useState({password: "", confirmPassword: ""});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name==="password") {
      setPassword(value);
    } else {
      setConfirmPassword(value);
    };
    validateInputs();
  };

  const validateInputs = () => {
    const currentErrors = {};
    if (password.length < 8) currentErrors.password = "Must have a minimum of 8 characters";
    if (confirmPassword !== password) currentErrors.confirmPassword = "The passwords are different";
    setErrors(currentErrors);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!errors.password && !errors.confirmPassword) {
      swal("It can not be sent! Correct the errors before sending.")
    } else {
      confirmPasswordReset(auth, oobCode, confirmPassword);
      navigate("/LoginClient")
    }
  }

  return (
  <div>
    <Container>
      <Typography variant="h3"  >
        Reset Password
      </Typography>
      <FormGroup>
        <TextField label="Password" type="password" name="password" value={password}  onChange={handleChange}/>
        {errors.password && <Typography variant="body2" color={red}>{errors.password}</Typography>}
        <TextField label="Confirm password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange}/>
        {errors.confirmPassword && <Typography variant="body2" color={red}>{errors.confirmPassword}</Typography>}
        <Button variant="outlined" type="submit" onClick={handleSubmit}>Confirm</Button>
      </FormGroup>
    </Container>
  </div>
  )
}

export default ResetPassword;
