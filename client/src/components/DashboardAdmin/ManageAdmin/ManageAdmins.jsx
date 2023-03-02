import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
    adminGetDetail,
    adminLogin,
    adminRegister,
    adminGetAll,
    adminUpdate,
    adminSlice
} from "../../../redux/reducers/adminReducer.js";
//Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../authentication/firebase";
//style
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "18rem",
    height: "20rem",
  }));
//   const container = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width: "100%",
//     height: "100vh",
//   };
//   const gridContainer = {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     width: "100%",
//     height: "auto",
//   };
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
//   const divsitos = {
//     paddingLeft: "0.2rem",
  
//     display: "flex",
//     flexDirection: "row",
//     gap: "5px",
//     justifyContent: "start",
//   };
//   const divsitoButton = {
//     display: "flex",
//     flexDirection: "row",
//     gap: "5px",
//     justifyContent: "center",
//   };
//   const divsitoCaract = {
//     paddingLeft: "0.2rem",
//     display: "flex",
//     flexDirection: "column",
//     textAlign: "start",
//   };

const ManageAdmins = () => {
    //estado de alertas!!!!
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    //Estado de open modal
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenForEdit, setIsOpenForEdit] = useState(false);
    //estado para postear
    const [data, setData] = useState({
        name: "",
        surname: "",
        mail: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //leo mi state DETAIL(modificar)
    const adminsDetail = useSelector((state) => state.admin.detail);

    const activadorOpen = () => {
        setIsOpen(true);
    };
    // const activadorOpenEdit = async (id) => {
    //     //abre el modal
    //     setIsOpenForEdit(true);
    //     //le hago click y dispatcho ese plan a detail
    //     await dispatch(plansGetById(id));
    // };

    //postear un plan
    const handleInput = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const dispatchRegister = () => {
        console.log(data);
        dispatch(
          adminRegister({ ...data, mail: auth.currentUser.email })
        )
          .then((res) => {
            if (res.type === "admin/register/fulfilled") {
              setAlertSeverity("success");
              setAlertMessage("Account Created. Wait to be redirected");
              setShowAlert(true);
              setTimeout(() => {
                navigate("/HomeAdmin");
              }, 2500);
            } else {
              console.log({ ...data, mail: auth.currentUser.email });
              setAlertSeverity("error");
              setAlertMessage("Error creating account!");
              setShowAlert(true);
              auth.currentUser.delete();
            }
            console.log(res.type);
          })
          .catch((err) => alert("error"));
    }

    const handleRegiterAdmin = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.mail,
            data.password
            );
            const user = userCredential.user;
             console.log("administrador creado: " + user.email);
            dispatchRegister();
        } catch (error) {
            console.log({ Error: error.message });
        }
    };

    return (
      <div>
        <Typography
            variant="h4"
            style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            marginLeft: "5rem",
            }}
        >
        ADMINS
        </Typography>
        <Button
            variant="contained"
            size="large"
            style={{ marginTop: "2rem" }}
            onClick={activadorOpen}
        >
        NEW ADMIN
        </Button>
              {/* MODAL MODAL MODAL */}
      {isOpen && (
        <>
          <div style={overlay} onClick={() => setIsOpen(false)}></div>
          <div style={modalContainer}>
            <div style={modal}>
              <Typography variant="h5" style={{ marginBottom: "2rem" }}>
                Add a new Administrator
              </Typography>

              <form onSubmit={handleRegiterAdmin}>
                <TextField
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleInput}
                  required
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Lastname"
                  name="lastname"
                  value={data.price}
                  onChange={handleInput}
                  required
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Mail"
                  name="mail"
                  value={data.detail}
                  onChange={handleInput}
                  required
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Password"
                  name="password"
                  value={data.durationMonths}
                  onChange={handleInput}
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
              </form>
            </div>
          </div>
        </>
      )}
      </div>  

    )


};

export default ManageAdmins;