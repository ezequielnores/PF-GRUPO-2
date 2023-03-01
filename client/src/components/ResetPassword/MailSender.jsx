import React from 'react'
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide } from '@mui/material';


function MailSender({open, setOpen}) {
  console.log(open);
    const handleClose = () => {
        setOpen(false);
    }


  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Slide} transitionDuration={500}>
    <DialogTitle>Reset Password</DialogTitle>
    <DialogContent>
      <DialogContentText>
      Insert the email with which you are registered on the page. We will send you a link to reset your password.
      </DialogContentText>
      <TextField 
      autoFocus
      margin="dense"
      id="email"
      label="Email Address"
      type="email"
      fullWidth
      variant="standard" 
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button >Send mail</Button>
    </DialogActions>
    </Dialog>
  )
}

export default MailSender