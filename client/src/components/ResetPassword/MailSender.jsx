import React from "react";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
} from "@mui/material";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../../authentication/firebase";

function MailSender({ open, setOpen }) {
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3001/loginClient",
      });
      alert("Mail enviado!");
    } catch (error) {
      alert(error.message); //Esto es temporal!
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
      transitionDuration={500}
    >
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Insert the email with which you are registered on the page. We will
          send you a link to reset your password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Send mail</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MailSender;
