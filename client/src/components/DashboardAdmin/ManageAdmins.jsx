import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, CardContent, TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { adminRegister, adminGetAll, deleteAdmin } from "../../redux/reducers/adminReducer.js";
//Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../authentication/firebase";
//style
const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};
//MODAL
const modalContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const modal = {
  backgroundColor: "#fff",
  borderRadius: "5px",
  maxWidth: "500px",
  width: "100%",
  padding: "2rem",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};
const gridContainer = {
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const divsitoButton = {
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  justifyContent: "center",
};

const ManageAdmins = () => {
const navigate = useNavigate();
//estado de alertas!!!!
const [showAlert, setShowAlert] = useState(false);
const [alertSeverity, setAlertSeverity] = useState("success");
const [alertMessage, setAlertMessage] = useState("");
//Estado de open modal
const [isOpen, setIsOpen] = useState(false);
//estado para postear
const [data, setData] = useState({
  name: "",
  surname: "",
  mail: "",
  password: "",
});
const [error, setError] = useState({
  name: "",
  surname: "",
  mail: "",
  password: "",
});
const dispatch = useDispatch();
//lista de admins
const dataAdmins = useSelector((state) => state.admin.listAll);
//detalle de admins
const adminDetail = useSelector((state) => state.admin.detail);
const [oldData, setOldData] = useState({
  name: "",
  surname: "",
  mail: "",
  password: "",
});
//controles modal
const activadorOpen = () => {
    setIsOpen(true);
};
const closeModal = () => {
  setIsOpen(false);
};
//postear un admin
const handleInput = (name, value) => {
  setData({ ...data, [name]: value });
  validateForm({ ...data, [name]: value}, name);
};
//eliminar un admin
const handleDeleteAdmin = async (id) => {
  await dispatch(deleteAdmin(id));
  dispatch(adminGetAll());
};
 //desactivar admin
 const handleDisableAdmin = async (id) => {
  // await dispatch(logicDeletePlan(id));
  // dispatch(plansGetAll());
};

//validation
const validateForm = (data, name) => {
  if (name === "name" || name === "surname") {
    if (!/^[A-Za-z\s]+$/.test(data[name])) {
      setError({ ...error, [name]: "•Only characters" });
    } else setError({ ...error, [name]: "" });
  }
  if (name === "password") {
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,}$/.test(
        data[name] || data[name] !== ""
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
        data[name] || data[name] !== ""
      )
    ) {
      setError({ ...error, [name]: "•Musst be a valid email" });
    } else setError({ ...error, [name]: "" });
  }
};

const dispatchRegister = () => {
  // console.log(data);
  dispatch(
    adminRegister({ ...data, mail: auth.currentUser.email })
  )
  .then((res) => {
    if (res.type === "admin/register/fulfilled") {
      setAlertSeverity("success");
      setAlertMessage("Account Created. Wait to be redirected");
      setShowAlert(true);
      closeModal();
   
    } else {
      // console.log({ ...data, mail: auth.currentUser.email });
      setAlertSeverity("error");
      setAlertMessage("Error creating account!");
      setShowAlert(true);
      auth.currentUser.delete();
    }
    // console.log(res.type);
  })
  .catch((err) => alert("error"));
};

const handleRegiterAdmin = async () => {
  if (Object.values(error).every((item) => item === "")) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.mail,
        data.password
      );
      const user = userCredential.user;
      console.log("administrador creado: " + user.email);
      dispatchRegister();
      const res = await dispatch(adminGetAll());
    } catch (error) {
      console.log({ Error: error.message });
    } 
  } else {
    setAlertSeverity("error");
    setAlertMessage("Please complete all fields   ");
    setShowAlert(true);
  }
};

// useEffect(() => {
//   if (adminDetail) {
//     setOldData({
//       name: adminDetail.name,
//       surname: adminDetail.surname,
//       mail: adminDetail.mail,
//       password: adminDetail.password,
//     });
//   }
// }, [adminDetail]);

return (
  <div style={container}>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={showAlert}
      autoHideDuration={6000}
      onClose={() => setShowAlert(false)}
    >
      <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
        {alertMessage}
      </Alert>
    </Snackbar>
    <Typography
      variant="h4"
      style={{
        marginTop: "2rem",
      }}
    >
    ADMINS
    </Typography>
    <Button
      style={{ left: "50rem" }}
      onClick={() => dispatch(adminGetAll())}
    >
      Refresh
    </Button>
    <Button
      variant="contained"
      size="large"
      style={{ 
        marginTop: "1rem", 
        marginBottom: "1rem", 
        marginLeft: "0.5rem",
      }}
      onClick={activadorOpen}
    >
    NEW ADMIN
    </Button>
    <Grid container spacing={3}>
      {dataAdmins.map((admin, index) =>(
        <Grid 
          key={admin.id} 
          item 
          xs={5} 
          sm={6} 
          md={4} 
          style={{gridContainer}}
        >
          <Card>
            <CardContent style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
              <div style={{flex: 1}}>
                <h3>{admin.name} {admin.surname}</h3>
              </div>
              <div style={divsitoButton}>
              <Button
                  variant="outlined"
                >
                  EDIT
                </Button>
              {admin.active === true ? (
                  <Button
                    variant="outlined"
                    onClick={() => handleDisableAdmin(admin.id)}
                  >
                    DISABLE
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    // onClick={() => handleActivatePlan(plan.id)}
                  >
                    ACTIVATE
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteAdmin(admin.id)}
                >
                  DELETE
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    {/* MODAL MODAL MODAL */}
    {isOpen && (
      <>
        <div style={overlay} onClick={() => setIsOpen(false)}></div>
        <div style={modalContainer}>
          <div style={modal}>
            <Typography variant="h5" style={{ marginBottom: "2rem" }}>
            Add a new Administrator
            </Typography>

            {/* <form> */}
            <TextField
              error={error.name}
              label="Name"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              name="name"
              value={data.name}
              type="name"
              helperText={error.name}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              error={error.surname}
              label="Lastname"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              name="surname"
              value={data.surname}
              type="surname"
              helperText={error.surname}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              error={error.mail}
              label="Mail*"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              name="mail"
              value={data.mail}
              type="mail"
              helperText={error.mail}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              error={error.password}
              label="Password*"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              name="password"
              value={data.password}
              type="password"
              helperText={error.password}
              required
              fullWidth
              margin="normal"
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="button"
                variant="outlined"
                style={{ marginRight: "1rem" }}
                onClick={() => setIsOpen(false)}
              >
              Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleRegiterAdmin}
              >
              Save
              </Button>
              </div>
            {/* </form> */}
          </div>
        </div>
      </>
    )}
  </div>  
  )
};

export default ManageAdmins;