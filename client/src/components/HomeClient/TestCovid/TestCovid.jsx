import React, { useEffect, useState } from "react";
//styles
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Alert, Card, Snackbar, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const cardsin = {
  maxWidth: "80%",
  minWidth: "80%",
  borderRadius: "1rem",
  padding: "2rem",
  marginTop: "2rem",
  backgroundColor: "#f5f5f5",
  boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
const checkboxLabel = {
  display: "flex",
  alignItems: "center",
  marginLeft: 0,
};
const hijoCard = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};
const containerCheckbox = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem",
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
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
};
const TestCovid = () => {
  const [isOpen, setIsOpen] = useState(false);

  //alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  //form
  const [form, setForm] = useState({
    breathingProblem: 0,
    fever: 0,
    dryCough: 0,
    sorethroat: 0,
    runningNose: 0,
    asthma: 0,
    chronicLungDisease: 0,
    headache: 0,
    heartDisease: 0,
    diabetes: 0,
    hyperTension: 0,
    fatigue: 0,
    gastrointestinal: 0,
    abroadTravel: 0,
    contactWithCOVIDPatient: 0,
    attendedLargeGathering: 0,
    visitedPublicExposedPlaces: 0,
    familyWorkinginPublicExposedPlaces: 0,
    wearingMasks: 0,
    sanitizationFromMarket: 0,
  });
  const handleCheckbox = (e) => {
    e.preventDefault();
    const { name } = e.target;
    //la propiedad de checked en cada checkbox
    const checkedValue = e.target.checked ? 1 : 0;
    //mi estado anterior y el name lo modifico con lo del checked, por el momento no deja desSeleccionar cuando se tiene 1 check marcado, mas si funciona el desSeleccionar, probar.
    setForm((prevState) => {
      return { ...prevState, [name]: checkedValue };
    });
  };
  //   const activadorOpen = () => {
  //     setIsOpen(true);
  //   };
  const submitForm = (e) => {
    e.preventDefault();
    const checksVacios = Object.values(form).every((value) => value === 0);
    if (checksVacios) {
      setAlertSeverity("error");
      setAlertMessage(
        "no se puede verificar su estado COVID si estan los campos vacios capo"
      );
      setShowAlert(true);
    } else {
      // dispatch(action)
      setIsOpen(true);
    }
  };
  console.log(form);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="button"
        fontSize="2.5rem"
        color="#307196"
        fontWeight="bold"
        style={test}
      >
        TestCovid
      </Typography>
      <Typography>
        If you have any of these symptoms, mark it and know the right care for
        you.
      </Typography>
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
      {isOpen && (
        <>
          <div style={overlay} onClick={() => setIsOpen(false)}></div>
          <div style={modalContainer}></div>
          <div style={modal}>
            <Typography variant="h5" style={{ marginBottom: "2rem" }}>
              100 % COVID-19
            </Typography>
            <Button
              type="button"
              variant="outlined"
              style={{ marginRight: "1rem" }}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
      <Card style={cardsin}>
        <form style={hijoCard}>
          <div style={containerCheckbox}>
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.breathingProblem}
                  name="breathingProblem"
                />
              }
              label="Breathing Problem"
            ></FormControlLabel>
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.fever}
                  name="fever"
                />
              }
              label="Fever"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.dryCough}
                  name="dryCough"
                />
              }
              label="Dry Cough"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.sorethroat}
                  name="sorethroat"
                />
              }
              label="Sore throat"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.runningNose}
                  name="runningNose"
                />
              }
              label="Running Nose"
            />

            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.familyWorkinginPublicExposedPlaces}
                  name="familyWorkinginPublicExposedPlaces"
                />
              }
              label="Family working in Public Exposed Places"
            />
          </div>
          <div style={containerCheckbox}>
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.chronicLungDisease}
                  name="chronicLungDisease"
                />
              }
              label="Chronic Lung Disease"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.heartDisease}
                  name="heartDisease"
                />
              }
              label="Heart Disease"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.hyperTension}
                  name="hyperTension"
                />
              }
              label="Hyper Tension"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.gastrointestinal}
                  name="gastrointestinal"
                />
              }
              label="Gastrointestinal"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.abroadTravel}
                  name="abroadTravel"
                />
              }
              label="Abroad travel"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.attendedLargeGathering}
                  name="attendedLargeGathering"
                />
              }
              label="Attended Large Gathering"
            />
          </div>
          <div style={containerCheckbox}>
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.contactWithCOVIDPatient}
                  name="contactWithCOVIDPatient"
                />
              }
              label="Contact with COVID Patient"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.fatigue}
                  name="fatigue"
                />
              }
              label="Fatigue"
            />

            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.visitedPublicExposedPlaces}
                  name="visitedPublicExposedPlaces"
                />
              }
              label="Visited Public Exposed Places"
            />

            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.wearingMasks}
                  name="wearingMasks"
                />
              }
              label="Wearing Masks"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.sanitizationFromMarket}
                  name="sanitizationFromMarket"
                />
              }
              label="Sanitization from Market"
            />
            <FormControlLabel
              style={checkboxLabel}
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={form.asthma}
                  name="asthma"
                />
              }
              label="Asthma"
            />
          </div>
        </form>
        <Button
          variant="contained"
          type="submit"
          onClick={submitForm}
          style={{ width: "2rem", alignSelf: "center" }}
        >
          Send
        </Button>
      </Card>
    </div>
  );
};

export default TestCovid;
