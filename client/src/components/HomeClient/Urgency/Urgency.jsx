import React from "react";
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
//redux
import { urgencyCreate } from "../../../redux/reducers/urgencyReducer";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const patientId = localStorage.getItem("id");
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
    if (observations) symptoms += "Observations: " + observations;
    setBody({
      ...body,
      symptomatology: `Symptoms: ${symptoms} `,
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
      alert("Your information has been sent");
      //   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/urgency`, body);
      //   alert("Your information has been sent");
    } catch (error) {
      alert(error.message);
    }
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
          <p>You have provided the following information</p>
          <p>{body.symptomatology}</p>
          <button className={style.sendButton} onClick={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Send
            </div>
          </button>
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
          <h2>Urgency</h2>
          <div
            style={{
              textAlign: "start",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <p>
              In this section, you can be attended by a doctor immediately 24
              hours a day.
            </p>
            <p>
              Please complete the following form to be added to the waiting
              list.
            </p>
          </div>
        </div>
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
      </div>
    </div>
  );
};
export default Urgency;
