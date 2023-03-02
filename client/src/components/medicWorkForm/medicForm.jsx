import React, { /* useRef, */ useState } from "react";
import { useNavigate } from "react-router-dom";

/* import emailjs from "@emailjs/browser"; */
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { MuiTelInput } from "mui-tel-input";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//validaciones
import { IconButton, InputAdornment, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { doctorAdd } from "../../redux/reducers/doctorReducer";
//Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../authentication/firebase";
import axios from "axios";
const { REACT_APP_BACKEND_URL } = process.env;

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
  width: "50rem",
  height: "50rem",
  justifyContent: "space-evenly",
};
const cardDiv = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  width: "55rem",
  height: "45rem",
  boxShadow:
    "-10px 10px 0px #307196,-20px 20px 0px rgba(48, 113, 150, 0.7),-30px 30px 0px rgba(48, 113, 150, 0.4),-40px 40px 0px rgba(48, 113, 150, 0.1)",
};
const divHijo = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "10px",
  margin: "10px",
  gap: "1.5rem",
};
const finalinput = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "10px",
  margin: "10px",
};

const MedicForm = () => {
  const doctors = useSelector((state) => state.doctor.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*   const {createUser} = new ManagementClient() */
  const [successForm, setSuccessForm] = useState(null);
  const [imageInputValue, setImageInputValue] = useState("");
  const [cvInputValue, setCvInputValue] = useState("");
  //alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  //validacion state
  const [error, setError] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
    clinicMail: "",
    phone: "",
    dni: "",
    license: "",
    cv: "",
    birthdate: "",
    image: "",
    speciality: "",
    location: "",
  });
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
    clinicMail: "",
    phone: "",
    dni: "",
    license: "",
    cv: "",
    birthdate: "02-03-1999",
    image: "",
    speciality: "",
    location: "",
  });

  const DisableButton = () => {
    if(error.mail !== "" || error.password !== "" || error.name !== "" || error.lastName !== "" 
    || error.dni !== "" || error.license){
      return true;
    }
    if(form.name === "" || form.lastName === "" || form.mail === "" || form.password === "" 
    || form.phone === "" || form.dni === "" || form.license === "" 
    || form.birthdate === "" || form.speciality === "" || form.location === "" || form.cv === "" 
    || form.cv === null || form.image === "" || form.image === null ){
      return true;
    }
    return false;
  }

  const handleImage = (e) => {
    const name = e.target.name;
    if (name === "image") setImageInputValue(e.target.value);
    if (name === "cv") setCvInputValue(e.target.value);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setForm({ ...form, [name]: reader.result });

      validateForm({ ...form, [name]: reader.result }, name);
    };
  };

  const onChangeHandler = (name, value) => {
    setForm({ ...form, [name]: value });
    validateForm({ ...form, [name]: value }, name);
  };

  const onChangeEmail = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const onChangePassword = (name, value) => {
    setForm({ ...form, [name]: value });

    validateForm({ ...form, [name]: value }, name);
  };

  const handleFechaNacimientoChange = (date, name) => {
    setForm({ ...form, birthdate: date });
    validateForm({ ...form, [name]: form }, name);
  };

  const validateForm = async (form, name) => {
    if (name === "name" || name === "lastName" || name === "speciality") {
      if (!/^[A-Za-z\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "location") {
      if (!/^[a-zA-Z,\s]+$/.test(form[name]) /* || /\W/.test(form[name]) */) {
        setError({ ...error, [name]: "•Only characters and commas" });
      } else setError({ ...error, [name]: "" });
    }
    if (name === "dni" || name === "license") {
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
    if (name === "mail" ) {
    const isValid = await axios.get(`${REACT_APP_BACKEND_URL}/emailVerification?mail=${form[name]}`).then(r => r.data)
    
    if(isValid){
      setError({...error, [name]:""})
    }else{
      setError({...error, [name]:"Must enter a valid email"})
    }}
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const error = validateFields();
    // console.log(errors);
    if (Object.values(error).every((item) => item === "")) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.mail,
          form.password
        );
        const user = userCredential.user;
        // console.log("medico creado: " + user.email);
        dispatch(doctorAdd({ ...form }))
          .then((res) => {
            if (res.type === "doctor/addById/fulfilled") {
              // alert("Account sent! Pending to activate..");
              setAlertSeverity("success");
              setAlertMessage(
                "Account sent! Pending to activate.. Wait to be redirected"
              );
              setShowAlert(true);
              const authenticatedDoctor = doctors.find((doctor) => {
                return doctor.mail === auth.currentUser.email;
              });
              localStorage.setItem("idMedic", authenticatedDoctor.id);
              navigate("/HomeMedic/Profile")
/*               setTimeout(() => {
                navigate("/loginMedic");
              }, 2500); */
            } else {
              auth.currentUser.delete();
              // alert("Error sending account!");
              setAlertSeverity("error");
              setAlertMessage("Error sending account!   ");
              setShowAlert(true);
            }
            console.log(res.type);
          })
          .catch((err) => alert("Error"));
      } catch (error) {
        console.log({ Error: error.message });
        setAlertSeverity("error");
        setAlertMessage("Error, missing data");
        setShowAlert(true);
      }
    } else {
      // alert("Please complete all fields");
      setAlertSeverity("error");
      setAlertMessage("Existing errors     ");
      setShowAlert(true);
    }
   
  };
  
  return (
    <div style={divPadre}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          variant='filled'
          severity={alertSeverity}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <form
        component='form'
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        style={box}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        {successForm === "success" && (
          <Alert severity='success'>Will be in contact soon !</Alert>
        )}
        {successForm === "error" && (
          <Alert severity='error'>Server error !</Alert>
        )}

        <Card style={cardDiv}>
          <div style={finalinput}>
            <Typography
              variant='h2'
              align='justify'
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "3rem",
                marginBottom: "2rem",
              }}
            >
              Join us !
            </Typography>
          </div>
          <div style={divHijo}>
            <TextField
              name='name'
              label=' First Name'
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              error={error.name}
              helperText={error.name}
            />
            <TextField
              name='lastName'
              label='Last Name'
              size='large'
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              error={error.lastName}
              helperText={error.lastName}
            />
            <TextField
              name='mail'
              label='Email'
              onChange={(e) => onChangeEmail(e.target.name, e.target.value)}
              error={error.mail}
              helperText={error.mail}
            />
            <TextField
              error={error.password}
              helperText={error.password}
              label='Password'
              onChange={(e) => onChangePassword(e.target.name, e.target.value)}
              name='password'
              type='text'
            />
          </div>
          <div style={divHijo}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='birthdate'
                label='Birthdate'
                value={form.birthdate}
                maxDate={new Date()}
                inputVariant='outlined'
                onChange={handleFechaNacimientoChange}
                helperText={error.birthdate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={error.birthdate}
                    error={Boolean(error.birthdate)}
                  />
                )}
              />
            </LocalizationProvider>

            <MuiTelInput
              label='Phone'
              name='phone'
              value={form.phone}
              defaultCountry={"AR"}
              style={{ width: "30vh" }}
              onChange={(value) => onChangeHandler("phone", value)}
              error={error.phone}
              helperText={error.phone}
            />
            <TextField
              name='location'
              label='Location'
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              error={error.location}
              helperText={error.location}
            />
          </div>
          <Divider />
          <div style={divHijo}>
            <TextField
              name='dni'
              label='D.N.I'
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              error={error.dni}
              helperText={error.dni}
            />
            <TextField
              name='license'
              label='License'
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              error={error.license}
              helperText={error.license}
            />
            <TextField
              type='email'
              name='clinicMail'
              label='Clinic mail'
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              error={error.clinicMail}
              helperText={error.clinicMail}
            />
          </div>
          <div style={finalinput}>
            <TextField
              error={error.image}
              label='Image'
              style={
                form.image
                  ? { width: "40vh", marginBottom: "1vh" }
                  : { width: "40vh", label: { paddingLeft: "5vw" } }
              }
              onChange={handleImage}
              name='image'
              value={imageInputValue ? imageInputValue : ""}
              type='file'
              InputProps={
                !form.image
                  ? { inputProps: { style: { paddingLeft: "4vw" } } }
                  : {
                      endAdornment: (
                        <InputAdornment position='end'>
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

            {/* <TextField
              name="speciality"
              label="Especialty"
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              error={Boolean(error.speciality)}
              helperText={error.speciality}
            /> */}
            <select
              name='speciality'
              onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
            >
              <option value=''>--Speciality--</option>
              <option value='Cardiology'>Cardiology</option>
              <option value='Gynecology'>Gynecology</option>
              <option value='Neurology'>Neurology</option>
              <option value='Oncology'>Oncology</option>
              <option value='Psychiatry'>Psychiatry</option>
              <option value='Dermatology'>Dermatology</option>
              <option value='Ophthalmology'>Ophthalmology</option>
              <option value='Urology'>Urology</option>
              <option value='Endocrinology'>Endocrinology</option>
              <option value='Gastroenterology'>Gastroenterology</option>
              <option value='General'>General</option>
              <option value='Deportologist'>Deportologist</option>
            </select>

            <TextField
              error={error.cv}
              label='CV'
              style={
                form.image
                  ? { width: "40vh", marginBottom: "1vh" }
                  : { width: "40vh", label: { paddingLeft: "5vw" } }
              }
              onChange={handleImage}
              name='cv'
              value={cvInputValue ? cvInputValue : ""}
              type='file'
              InputProps={
                !form.cv
                  ? { inputProps: { style: { paddingLeft: "4vw" } } }
                  : {
                      endAdornment: (
                        <InputAdornment position='end'>
                          {form.cv && (
                            <IconButton
                              onClick={() => {
                                setForm(
                                  { ...form, cv: null },
                                  setCvInputValue("")
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
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              type="submit"
              value="Send"
              disabled={DisableButton()}
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
