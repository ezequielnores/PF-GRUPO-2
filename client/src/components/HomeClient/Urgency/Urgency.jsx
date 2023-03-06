import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import style from "./Urgency.module.css";
import axios from "axios";
import swal from "sweetalert";
//redux
import {
  urgencyCreate,
  urgencyGetAllNotAttended,
} from "../../../redux/reducers/urgencyReducer";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";

//styles
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const cardEspera = {
  width: "50%",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  border: " 2px solid #1a3b5c",
  boxShadow: "0px 0px 10px rgba(26, 59, 92, 0.5)",
};

const handleTempError = (temp) => {
  if (String(parseInt(temp)) === "NaN" && temp !== "") return true;
  else if (temp === "") return false;
  else if (temp < 37 || temp > 44) {
    return true;
  } else {
    return false;
  }
};

const Urgency = () => {
  const patientId = localStorage.getItem("id");
  const idNumerico = parseInt(patientId, 10);
  const dispatch = useDispatch();
  const noAtendidos = useSelector((state) => state.urgency.list);
  const pacientes = noAtendidos.map((urgencia) => urgencia.Patient);
  const misTurnosActivos = pacientes.filter(
    (paciente) => paciente.id === idNumerico
  );
  console.log(misTurnosActivos.length);
  const [openModal, setOpenModal] = React.useState(false);
  const [body, setBody] = React.useState({
    patient: patientId,
    symptomatology: " ",
    attended: false,
  });
  const [addSymptom, setAddSymptom] = React.useState({
    Cough: false,
    Fiver: false,
    Nausea: false,
    Headache: false,
    MusclePain: false,
    Fatigue: false,
    ShortnessBreath: false,
    Chills: false,
    NasalCongestion: false,
    Temperature: "",
  });
  const [observations, setObservations] = React.useState(" ");
  const [errorTemp, setErrorTemp] = React.useState(false);

  const handleOpenModal = () => {
    let symptoms = " ";
    for (let symptom in addSymptom) {
      if (symptom === "MusclePain" && addSymptom[symptom] === true)
        symptoms += "Muscle Pain, ";
      else if (symptom === "ShortnessBreath" && addSymptom[symptom] === true)
        symptoms += "Shortness of Breath, ";
      else if (symptom === "NasalCongestion" && addSymptom[symptom] === true)
        symptoms += "Nasal Congestion, ";
      else if (symptom === "Temperature" && addSymptom[symptom] !== "")
        symptoms += "Temperature :" + addSymptom[symptom] + ", ";
      else if (addSymptom[symptom] === true) symptoms += symptom + ", ";
    }
    if (symptoms === " ") symptoms = "No symptoms reported";
    if (observations) symptoms += "Other symptoms: " + observations;
    setBody({
      ...body,
      symptomatology: `Symptoms: ${symptoms} `,
      patientId: patientId,
    });
    setOpenModal(!openModal);
  };
  const handleChange = (event) => {
    setAddSymptom({
      ...addSymptom,
      [event.target.name]: event.target.checked,
    });
    if (event.target.name === "Fiver" && event.target.checked === false) {
      setAddSymptom({
        ...addSymptom,
        [event.target.name]: event.target.checked,
        Temperature: "",
      });
    }
  };
  const handleObservations = (even) => {
    setObservations(even.target.value);
  };
  const handleTemp = (even) => {
    setAddSymptom({
      ...addSymptom,
      Temperature: even.target.value,
    });
    setErrorTemp(handleTempError(even.target.value));
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setAddSymptom({
        Cough: false,
        Fiver: false,
        Nausea: false,
        Headache: false,
        MusclePain: false,
        Fatigue: false,
        ShortnessBreath: false,
        Chills: false,
        NasalCongestion: false,
        Temperature: "",
      });
      setObservations(" ");
      setErrorTemp(false);
      setBody({
        patient: " ",
        symptomatology: " ",
        attended: false,
      });
      setOpenModal(false);
      dispatch(urgencyCreate(body));
      await swal("The urgency has been sent.", {
        icon: "success",
      });
      // alert("Your information has been sent");
      //   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/urgency`, body);
      //   alert("Your information has been sent");
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    dispatch(urgencyGetAllNotAttended());
  }, []);
  const handleGmailClick = () => {
    window.open("https://www.gmail.com", "_blank");
  };

  const handleOutlookClick = () => {
    window.open("https://www.outlook.com", "_blank");
  };
  return (
    <div className={style.generalDiv}>
      <div
        onClick={handleOpenModal}
        className={style.generalModalDiv}
        style={{ display: openModal ? "flex" : "none" }}
      >
        <div
          style={{ display: openModal ? "flex" : "none" }}
          className={style.modalDiv}
        >
          <Typography>You have provided the following information</Typography>
          <Typography>{body.symptomatology}</Typography>
          <Button
            className={style.sendButton}
            onClick={handleSubmit}
            variant="contained"
            style={{ marginTop: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Send
            </div>
          </Button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div className={style.titleDiv}>
          <Typography
            variant="button"
            fontSize="2.5rem"
            color="#307196"
            fontWeight="bold"
            style={test}
          >
            Urgency
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "start",
            }}
          >
            <Typography variant="subtitle1">
              In this section, you can be attended by a doctor immediately 24
              hours a day.
            </Typography>
            <Typography variant="subtitle1">
              Please complete the following form to be added to the waiting
              list.
            </Typography>
          </div>
        </div>
        {misTurnosActivos.length === 0 ? (
          <>
            <div style={{ width: "100%" }}>
              <FormControl
                sx={{ width: 1 / 1 }}
                component="fieldset"
                variant="standard"
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <div className={style.symptomsAndUpload}>
                    <FormGroup sx={{ width: 1 / 1 }}>
                      <div className={style.labelAndSymtoms}>
                        <FormLabel component="legend" sx={{ color: "#307196" }}>
                          Symptomatology
                        </FormLabel>
                        <div className={style.symtoms}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.Cough}
                                  onChange={handleChange}
                                  name="Cough"
                                />
                              }
                              label="Cough"
                            />

                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.Nausea}
                                  onChange={handleChange}
                                  name="Nausea"
                                />
                              }
                              label="Nausea"
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={addSymptom.Fiver}
                                    onChange={handleChange}
                                    name="Fiver"
                                  />
                                }
                                label="Fiver"
                              />
                              {addSymptom.Fiver ? (
                                errorTemp ? (
                                  <TextField
                                    error
                                    id="Temp"
                                    label="Temperature"
                                    value={addSymptom.Temperature}
                                    onChange={handleTemp}
                                    helperText="Must be between 37 and 44 degrees"
                                    sx={{ width: 100 }}
                                  />
                                ) : (
                                  <TextField
                                    id="Temp"
                                    label="Temperature"
                                    value={addSymptom.Temperature}
                                    onChange={handleTemp}
                                    sx={{ width: 100 }}
                                  />
                                )
                              ) : null}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.Headache}
                                  onChange={handleChange}
                                  name="Headache"
                                />
                              }
                              label="Headache"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.MusclePain}
                                  onChange={handleChange}
                                  name="MusclePain"
                                />
                              }
                              label="Muscle pain"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.Fatigue}
                                  onChange={handleChange}
                                  name="Fatigue"
                                />
                              }
                              label="Fatigue"
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.ShortnessBreath}
                                  onChange={handleChange}
                                  name="ShortnessBreath"
                                />
                              }
                              label="Shortness of breath"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.Chills}
                                  onChange={handleChange}
                                  name="Chills"
                                />
                              }
                              label="Chills"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={addSymptom.NasalCongestion}
                                  onChange={handleChange}
                                  name="NasalCongestion"
                                />
                              }
                              label="Nasal congestion."
                            />
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                    {/* decomentar las siguientes lineas cuando en la bd se pueda subir archivos */}
                    {/* <button className={style.sendButton}>
                                  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                      Upload file
                                      <DriveFolderUploadIcon/>
                                  </div>
                          </button> */}
                  </div>
                  <div
                    style={{
                      border: "1px solid  rgba(131, 130, 130, 0.7)",
                      borderRadius: "15px",
                      height: "38vh",
                      width: "40vw",
                    }}
                  >
                    <div className={style.divTextArea}>
                      <label className={style.labelText}>Other symptoms</label>
                      <textarea
                        value={observations}
                        onChange={handleObservations}
                        className={style.textArea}
                      />
                    </div>
                  </div>
                </div>
              </FormControl>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {errorTemp ? (
                  <Button
                    variant="contained"
                    disabled
                    sx={{ width: 1 / 9, borderRadius: 9999 }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleOpenModal}
                    sx={{ width: 1 / 9, borderRadius: 9999 }}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <Card style={cardEspera}>
              <CardMedia
                sx={{ height: "200px" }}
                image="https://web.zenttre.mx/wp-content/uploads/2017/09/mensajeria-servicios-cdmx.jpg"
              />
              <CardContent>
                <Typography variant="h6">
                  Our professionals are aware of your urgency, please check your
                  email inbox.
                </Typography>
                <Typography variant="h6" style={{ marginTop: "2rem" }}>
                  Average waiting time 10 - 20 minutes.
                </Typography>
                <CardActions
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <a
                    href="https://www.gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="medium" color="primary" variant="outlined">
                      My Gmail
                    </Button>
                  </a>
                  <a
                    href="https://www.outlook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="medium" color="primary" variant="outlined">
                      My Outlook
                    </Button>
                  </a>
                </CardActions>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};
export default Urgency;
