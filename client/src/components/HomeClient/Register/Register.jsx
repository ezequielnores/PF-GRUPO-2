import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.module.css";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch, useSelector } from "react-redux";
import {
  patientGetAll,
  patientRegister,
} from "../../../redux/reducers/patientReducer";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//Firebase
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { auth, googleProvider, db } from "../../../authentication/firebase";
//style
const cardDiv = {
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  height: "82rem",
  justifyContent: "space-around",
  marginTop: "10vw",
  marginBottom: "10vw",
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
  height: "90rem",
  justifyContent: "space-evenly",
  marginBottom: "7rem",
  marginTop: "5rem",
};
const divPadre = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#43B8C8",
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patient.list);
  const [patient, setPatient] = useState(null);

  //alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [imageInputValue, setImageInputValue] = useState("");

  const [form, setForm] = React.useState({
    name: "",
    surname: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    chronicDiseases: "",
    birthday: "03/02/1999",
    dni: "",
    location: "",
    image: "",
    mail: "",
    password: "",
    bmi: "",
  });

  const disableButtonHandler = () => {
    if (
      form.name === "" ||
      form.surname === "" ||
      form.phone === "" ||
      form.weight === "" ||
      form.height === "" ||
      form.allergies === "" ||
      form.birthday === "" ||
      form.dni === "" ||
      form.location === "" ||
      form.image === "" ||
      form.image === null ||
      form.mail === "" ||
      form.password === ""
    ) {
      return true;
    }

    if (
      error.name !== "" ||
      error.surname !== "" ||
      error.phone !== "" ||
      error.weight !== "" ||
      error.height !== "" ||
      error.allergies !== "" ||
      error.birthday !== "" ||
      error.dni !== "" ||
      error.name !== "" ||
      error.location !== "" ||
      error.image !== "" ||
      error.mail !== "" ||
      error.location !== "" ||
      error.password !== ""
    ) {
      return true;
    }
    return false;
  };

  const [error, setError] = React.useState({
    name: "",
    surname: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    chronicDiseases: "",
    birthday: "",
    dni: "",
    location: "",
    image: "",
    mail: "",
    password: "",
  });

  const handleImage = (e) => {
    setImageInputValue(e.target.value);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });

      validateForm({ ...form, image: reader.result }, "image", file);
    };
  };

  const onChangeHandler = (name, value) => {
    setForm({ ...form, [name]: value });
    validateForm({ ...form, [name]: value }, name);
  };

  const onChangeEmail = (name, value) => {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });

    validateForm({ ...form, [name]: value }, name);
  };

  const onChangePassword = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const handleFechaNacimientoChange = (date, name) => {
    setForm({ ...form, birthday: date });
    validateForm({ ...form, [name]: form }, name);
  };

  const validateForm = async (form, name, file) => {
    if (name === "name" || name === "surname") {
      if (!/^[A-Za-z\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters" });
      } else setError({ ...error, [name]: "" });
    }
    if (
      name === "location" ||
      name === "allergies" ||
      name === "chronicDiseases"
    ) {
      if (!/^[a-zA-Z,\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters and commas" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "weight" || name === "height") {
      if (!/^[0-9]{2,3}$/.test(form[name])) {
        setError({ ...error, [name]: "•Only numbers •Min 2 digits" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (name === "dni") {
      if (!/^\d{4,8}$/.test(form[name])) {
        setError({ ...error, [name]: "•Only numbers •Min 4 digits" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }

    if (name === "password") {
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,}$/.test(
          form[name] || form[name] !== ""
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
      const isValid = await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/emailVerification?mail=${form.mail}`
        )
        .then((response) => response.data);

      if (isValid === true) {
        setError((prev) => {
          return { ...prev, [name]: "" };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [name]:
              "Invalid email, it is already in use, or it does not exist, enter another one please",
          };
        });
      }
    }

    if (name === "image") {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setError({ ...error, [name]: "The image must be a jpeg or png file" });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
  };

  const dispatchRegister = async (userCredential) => {
    await dispatch(
      patientRegister({
        ...form,
        phone: 12345,
        mail: auth.currentUser.email,
        uid: auth.currentUser.uid,
        bmi: Math.floor(form?.weight / Math.pow(form?.height / 100, 2)),
      })
    )
      .then(async (res) => {
        console.log(auth);
        if (res.type === "patient/register/fulfilled") {
          // alert("Account Created");
          setAlertSeverity("success");
          setAlertMessage("Account Created. Wait to be redirected");
          setShowAlert(true);
          //create user on firestore
          await setDoc(doc(db, "users", auth.currentUser.user.uid), {
            uid: auth.currentUser.user.uid,
            displayName: form.name + " " + form.surname,
            email: form.mail,
            photoURL: form.image
              ? form.image
              : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
          }).then(async (res) => {
            console.log(res);
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", auth.currentUser.user.uid), {});
          });
        } else {
          setAlertSeverity("error");
          setAlertMessage("Error creating account!");
          setShowAlert(true);
          auth.currentUser.delete();
        }
        console.log(res);
      })
      .catch((err) => alert(err));
  };

  const handleRegister = async () => {
    if (Object.values(error).every((item) => item === "")) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.mail,
          form.password
        );
        const user = userCredential.user;
        console.log("usuario creado: " + user.email);
        console.log(userCredential);
        const success = dispatchRegister(userCredential);
        if (success) {
          const authenticatedPatient = patients.find((patient) => {
            return patient.mail === auth.currentUser.email;
          });

          const id = authenticatedPatient.id;
          if (id) {
            localStorage.setItem("id", id);
            navigate("/HomeClient/Profile");
          } else {
            setAlertSeverity("error");
            setAlertMessage("Patient not found");
            setShowAlert(true);
          }
        } else {
          console.log("Error creating account");
          setAlertSeverity("error");
          setAlertMessage("Error creating account");
          setShowAlert(true);
        }
      } catch (error) {
        console.log({ Error: error.message });
      }
      // { state: { id } }
    } else {
      // alert("Please complete all fields");
      setAlertSeverity("error");
      setAlertMessage("Please complete all fields   ");
      setShowAlert(true);
    }
  };

  const handleRegisterwithGoogle = async () => {
    if (Object.values(error).every((item) => item === "")) {
      try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        console.log("usuario creado: " + user.email);
        dispatchRegister(userCredential);
      } catch (error) {
        console.log({ Error: error.message });
      }
    } else {
      // alert("Please complete all fields");
      setAlertSeverity("error");
      setAlertMessage("Please complete all fields    ");
      setShowAlert(true);
    }
  };

  const fillPatient = () => {
    const patientfound = patients.find((patient) => {
      return patient.mail === auth.currentUser.email;
    });
    if (patientfound) {
      localStorage.setItem("id", patientfound.id);
      setPatient(patientfound);
    } else {
      console.log("Patient not found");
    }
  };

  // const redirectToHome = () => {
  //   ;
  // };
  // { state: { id: patient.id } }
  useEffect(() => {
    fillPatient();
  }, [dispatch, patients]);

  if (patient) {
    // redirectToHome();
    navigate("/HomeClient/Profile");
  }

  return (
    <div style={divPadre}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          variant="filled"
          severity={alertSeverity}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
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
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(value) => onChangeHandler("phone", value)}
            error={error.phone}
            helperText={error.phone}
          />

          <TextField
            error={error.name}
            label="Name*"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="name"
            value={form.name}
            helperText={error.name}
          />

          <TextField
            error={error.surname}
            label="Surname*"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="surname"
            value={form.surname}
            helperText={error.surname}
          />

          <TextField
            error={error.dni}
            helperText={error.dni}
            label="DNI*"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="dni"
            value={form.dni}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthdate"
              value={form.birthday}
              name="birthday"
              maxDate={new Date()}
              error={error.birthday}
              helperText={error.birthday}
              inputVariant="outlined"
              onChange={(e) => handleFechaNacimientoChange(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width: "50vh", marginBottom: "0.9rem" }}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            error={error.weight}
            helperText={error.weight}
            label="Weight*"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="weight"
            value={form.weight}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />

          <TextField
            label="Height*"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="height"
            value={form.height}
            helperText={error.height}
            error={error.height}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />

          <TextField
            error={error.allergies}
            helperText={error.allergies}
            label="Allergies"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="allergies"
            value={form.allergies}
          />
          <TextField
            error={error.chronicDiseases}
            helperText={error.chronicDiseases}
            label="Chronic Diseases"
            style={{ width: "40vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="chronicDiseases"
            value={form.chronicDiseases}
          />
          <TextField
            error={error.location}
            helperText={error.location}
            label="Location*"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            name="location"
            value={form.location}
          />

          <TextField
            error={error.image}
            label="Image"
            style={
              form.image
                ? { width: "50vh", marginBottom: "1vh" }
                : { width: "50vh", label: { paddingLeft: "5vw" } }
            }
            onChange={handleImage}
            name="image"
            value={imageInputValue ? imageInputValue : ""}
            type="file"
            helperText={error.image}
            InputProps={
              !form.image
                ? { inputProps: { style: { paddingLeft: "5vw" } } }
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        {form.image && (
                          <IconButton
                            onClick={() => {
                              setForm(
                                { ...form, image: null },
                                setImageInputValue("")
                              );
                            }}
                          >
                            X
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }
            }
          />
          {/* <Typography
            variant="h6"
            style={{ marginTop: "3vh", alignSelf: "start" }}
          >
            User Account
          </Typography> */}
          <TextField
            error={error.mail}
            label="Email*"
            style={{ width: "50vh", marginBottom: "1vh", marginTop: "1vh" }}
            onChange={(e) => onChangeEmail(e.target.name, e.target.value)}
            name="mail"
            value={form.mail}
            helperText={error.mail}
          />
          <TextField
            error={error.password}
            label="Password*"
            style={{ width: "50vh", marginBottom: "1vh" }}
            onChange={(e) => onChangePassword(e.target.name, e.target.value)}
            name="password"
            value={form.password}
            type="password"
            helperText={error.password}
          />

          <Button
            disabled={disableButtonHandler()}
            onClick={handleRegister}
            style={{
              width: "50vh",
              border: "1px solid",
              marginTop: "0.5rem",
            }}
          >
            Register
          </Button>
          <Typography style={{ marginTop: "2vh" }}>OR</Typography>
          <Button
            onClick={handleRegisterwithGoogle}
            style={{
              width: "50vh",
              border: "1px solid",
              marginTop: "0.5rem",
            }}
          >
            Register with Google
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Register;
