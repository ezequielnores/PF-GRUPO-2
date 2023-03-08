import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, CardContent, TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import swal from "sweetalert";
import {
  adminRegister,
  adminGetAll,
  deleteAdmin,
  disableAdmin,
  adminEdit,
  adminGetDetail,
  adminGetDetailForEdit,
} from "../../redux/reducers/adminReducer.js";
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
  backgroundColor: "white",
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
  justifyContent: "center",
  flexDirection: "column",
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
  const [isOpenForEdit, setIsOpenForEdit] = useState(false);
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
  const adminDetail = useSelector((state) => state.admin.loggedIn);
  const adminLogeado = useSelector((state) => state.admin.loggedIn);
  const [oldData, setOldData] = useState({
    name: adminDetail ? adminDetail.name : "",
    surname: adminDetail ? adminDetail.surname : "",
    mail: adminDetail ? adminDetail.mail : "",
    password: adminDetail ? adminDetail.password : "",
  });
  //controles modal
  const activadorOpen = (name) => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  //postear un admin
  const handleInput = (name, value) => {
    setData({ ...data, [name]: value });
    validateForm({ ...data, [name]: value }, name);
  };
  // editar admins
  const activadorOpenEdit = async (id) => {
    //abre el modal
    setIsOpenForEdit(true);
    //le hago click y dispatcho ese plan a detail
    await dispatch(adminGetDetailForEdit(id));
  };
  const handleEditAdmin = async (e) => {
    e.preventDefault();
    await dispatch(adminEdit({ id: adminDetail.id, data: oldData }));
    await swal("Information updated", {
      icon: "success",
    });
    dispatch(adminGetAll());
    setIsOpenForEdit(false);
  };
  const handleChange = (name, value) => {
    setOldData({
      ...oldData,
      [name]: value,
    });
    validateForm({ ...oldData, [name]: value }, name);
  };
  //eliminar un admin
  const handleDeleteAdmin = async (id) => {
    await dispatch(deleteAdmin(id));
    dispatch(adminGetAll());
    // auth.currentUser.delete();
  };
  //desactivar admin
  const handleDisableAdmin = async (id) => {
    await dispatch(disableAdmin(id));
    dispatch(adminGetAll());
  };

  //validation reguster form
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
        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6}$/.test(
          data[name] || data[name] !== ""
        )
      ) {
        setError({
          ...error,
          [name]: "•6 characters •One upper case letter •One number",
        });
      } else setError({ ...error, [name]: "" });
    }
  };

  const dispatchRegister = async (data) => {
    // console.log(data);
    await dispatch(adminRegister({ ...data }))
      .then(async (res) => {
        if (res.type === "admins/register/fulfilled") {
          setAlertSeverity("success");
          setAlertMessage("Account Created. Wait to be redirected");
          setShowAlert(true);
          closeModal();
          await dispatch(adminGetAll());
          await setData({
            name: "",
            surname: "",
            mail: "",
            password: "",
          });
        } else {
          setAlertSeverity("error");
          setAlertMessage("Error creating account!");
          setShowAlert(true);
        }
      })
      .catch((err) => alert(err));
  };

  const handleRegiterAdmin = async () => {
    if (Object.values(error).every((item) => item === "")) {
      try {
        await dispatchRegister(data);
        // if(res){
        //   await dataAdmins.find((admin) => {
        //     return admin.id === data.id;
        //   })
      } catch (error) {
        console.log({ Error: error.message });
        setAlertSeverity("error");
        setAlertMessage("Please complete all fields");
        setShowAlert(true);
      }
    } else {
      setAlertSeverity("error");
      setAlertMessage("Registration failed");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (adminDetail) {
      setOldData({
        name: adminDetail.name,
        surname: adminDetail.surname,
        mail: adminDetail.mail,
        password: adminDetail.password,
      });
    }
  }, [adminDetail]);

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
      <Button style={{ left: "50rem" }} onClick={() => dispatch(adminGetAll())}>
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
        onClick={() => activadorOpen()}
      >
        NEW ADMIN
      </Button>
      <Grid container spacing={3}>
        {dataAdmins.map((admin, index) => (
          <Grid
            key={admin.id}
            item
            style={{ gridContainer }}
            xs={5}
            sm={6}
            md={4}
          >
            <Card style={{ margin: "2rem" }}>
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3>
                    {admin.name} {admin.surname}
                  </h3>
                </div>
                <div style={divsitoButton}>
                  {admin.id == adminLogeado.id ? (
                    <Button
                      variant="outlined"
                      onClick={() => activadorOpenEdit(admin.id)}
                    >
                      EDIT
                    </Button>
                  ) : null}
                  {admin.id == adminLogeado.id ? null : (
                    <div>
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
                          onClick={() => handleDisableAdmin(admin.id)}
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
                  )}
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
                label="User"
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
                label="Password"
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
                  onClick={() => handleRegiterAdmin()}
                >
                  Save
                </Button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </>
      )}
      {isOpenForEdit && (
        <>
          <div style={overlay}>
            <div style={modalContainer}>
              <div style={modal}>
                <Typography variant="h5" style={{ marginBottom: "2rem" }}>
                  Edit administrator
                </Typography>
                {/* <form onSubmit={handleEditAdmin}> */}
                <TextField
                  label="Name"
                  defaultValue="Default Value"
                  name="name"
                  value={adminDetail ? oldData.name : ""}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Lastname"
                  name="surname"
                  defaultValue="Default Value"
                  value={adminDetail ? oldData.surname : ""}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  name="password"
                  defaultValue="Default Value"
                  value={adminDetail ? oldData.password : ""}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="button"
                    variant="outlined"
                    style={{ marginRight: "1rem" }}
                    onClick={() => setIsOpenForEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleEditAdmin}
                  >
                    Save
                  </Button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageAdmins;
