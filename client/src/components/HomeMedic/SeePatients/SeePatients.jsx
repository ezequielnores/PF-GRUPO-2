import { useState, useEffect } from "react";
import { TextField, Stack, Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  attendPatientTurns,
  attendedPatientTurns,
  createMedicalHistory,
} from "../../../redux/reducers/attendReducer";
import { appointmentGetAllByDoctorId } from "../../../redux/reducers/appointmentReducer";
import style from "./SeePatients.module.css";
import swal from "sweetalert";
import axios from "axios";

// patientId, doctorId, date, diagnosis
const validate = (input, linkSent) => {
  let errors = {};
  if (!linkSent) {
    errors.link = "Please send the meet link";
  }
  if (!input.diagnosis) {
    errors.diagnosis = "Diagnosis is required";
  } else if (!input.reason) {
    errors.reason = "Reason is required";
  } else if (!input.prescription) {
    errors.prescription = "Prescription is required";
  }
  return errors;
};

const SeePatients = ({ idTurn, appointment }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(attendPatientTurns(idTurn))

  // }, [])
  // const appointment = useSelector((state) => state.attend.details);
  const [meetLink, setMeetLink] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [newHistorial, setNewHistorial] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    hour: "",
    diagnosis: "",
    reason: "",
    prescription: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({
    link: "",
    diagnosis: "",
    reason: "",
    prescription: "",
  });

  useEffect(() => {
    setNewHistorial({
      patientId: appointment?.Patient?.id,
      doctorId: appointment?.doctor?.id,
      date: appointment?.date,
      hour: appointment?.hour,
      diagnosis: "",
      reason: "",
      prescription: "",
    });
  }, [appointment]);

  const handleChanges = (e) => {
    setNewHistorial({ ...newHistorial, [e.target.name]: e.target.value });
    setError(
      validate(
        {
          ...newHistorial,
          [e.target.name]: e.target.value,
        },
        linkSent
      )
    );
  };
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleSubmit = async () => {
    try {
      dispatch(createMedicalHistory(newHistorial));
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error);
      setShowAlert(true);
    }
    await swal("The medical record has been saved!", {
      icon: "success",
    });
    // dispatch(attendedPatientTurns(idTurn))
    // dispatch(appointmentGetAllByDoctorId(appointment.doctor.id))
    setNewHistorial({
      patientId: appointment.Patient.id,
      doctorId: appointment.doctor.id,
      date: appointment.date,
      hour: appointment.hour,
      diagnosis: "",
      reason: "",
      prescription: "",
    });

    window.location.reload();
  };

  // const handleChat = (e) => {
  //   e.preventDefault();
  //   const queryString = `?d=${appointment.doctor.uid}&p=${appointment.Patient.uid}`;
  //   // const encodedQueryString = encodeURIComponent(queryString);
  //   window.open(`/HomeMedic/Chat${queryString}`, "_blank");
  // };

  const handleSendLink = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: `You will send the meet link: ${meetLink} to the patient`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willSend) => {
      if (willSend) {
        swal(`The meet link has been sent to ${appointment.Patient.mail}`, {
          icon: "success",
        });
        setLinkSent(true);
        error.link = "";
        // aca va el dispatch para enviar el link
        axios
          .post("https://pf-grupo-2-production.up.railway.app/sendLink", {
            mail: appointment.Patient.mail,
            link: meetLink,
          })
          .then((response) => {});
      }
    });
  };
  return (
    <div
      style={{
        width: "95vw",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
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
      <div
        onClick={handleOpenModal}
        className={style.generalModalDiv}
        style={{ display: openModal ? "flex" : "none" }}
      >
        <div
          style={{ display: openModal ? "flex" : "none" }}
          className={style.modalDiv}
        >
          <h3>You have provided the following information</h3>
          <div className={style.info}>
            <div style={{ display: "flex", gap: "0.5vw" }}>
              <p style={{ fontWeight: "bold" }}>Patient: </p>
              <p>
                {appointment?.Patient?.name} {appointment?.Patient?.surname}{" "}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5vw" }}>
              <p style={{ fontWeight: "bold" }}>Doctor:</p>
              <p>
                {appointment?.doctor?.name} {appointment?.doctor?.lastName}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5vw" }}>
              <p style={{ fontWeight: "bold" }}>Date:</p>
              <p>{newHistorial.date}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5vw" }}>
              <p style={{ fontWeight: "bold" }}>Hour:</p>
              <p>{newHistorial.hour}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5vw" }}>
              <p style={{ fontWeight: "bold" }}>Diagnosis: </p>
              <p>{newHistorial.diagnosis}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5vw" }}>
              <p style={{ fontWeight: "bold" }}>Reason: </p>
              <p>{newHistorial.reason}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5vw" }}>
              <p style={{ fontWeight: "bold" }}>Prescription: </p>
              <p>{newHistorial.prescription}</p>
            </div>
          </div>
          <button className={style.saveButton} onClick={handleSubmit}>
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
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "2vh",
          height: "95%",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "2vh",
            border: " solid 3px #307196",
            borderRadius: "20px",
            padding: "0 1vw 2vh",
          }}
        >
          <h2 style={{ textAlign: "start" }}>
            You are attending to: {appointment?.Patient?.name}{" "}
            {appointment?.Patient?.surname}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "2vw",
            }}
          >
            {!error.link ? (
              <TextField
                id="send-meet-link"
                label="Meet Link"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                placeholder="Paste de meet link here"
                sx={{ width: "40%" }}
                InputProps={{
                  readOnly: linkSent,
                }}
              ></TextField>
            ) : (
              <TextField
                error
                id="send-meet-link"
                label="Meet Link"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                placeholder="Paste de meet link here"
                variant="outlined"
                helperText={error.link}
                sx={{ width: "40%" }}
                InputProps={{
                  readOnly: linkSent,
                }}
              ></TextField>
            )}

            <button
              className={style.saveButton}
              onClick={handleSendLink}
              disabled={linkSent}
            >
              Send Link
            </button>
            {/* <button className={style.saveButton} onClick={handleChat}>
              Chat
            </button> */}
          </div>
          <h4 style={{ textAlign: "start" }}>Appoinment Details</h4>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-multiline-static"
                label="Date"
                value={appointment?.date}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "25%" }}
              />
              <TextField
                id="outlined-multiline-static"
                label="Hour"
                value={appointment?.hour}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "25%" }}
              />
            </Stack>
            {error.diagnosis ? (
              <TextField
                error
                id="outlined-multiline-static"
                label="Diagnosis"
                name="diagnosis"
                multiline
                rows={2}
                value={newHistorial.diagnosis}
                variant="outlined"
                onChange={handleChanges}
                sx={{ width: "90%" }}
                helperText={error.diagnosis}
              />
            ) : (
              <TextField
                id="outlined-multiline-static"
                label="Diagnosis"
                name="diagnosis"
                multiline
                rows={2}
                value={newHistorial.diagnosis}
                variant="outlined"
                onChange={handleChanges}
                sx={{ width: "90%" }}
              />
            )}
            {error.reason ? (
              <TextField
                error
                id="outlined-multiline-static"
                label="Reason"
                name="reason"
                multiline
                rows={2}
                value={newHistorial.reason}
                variant="outlined"
                onChange={handleChanges}
                sx={{ width: "90%" }}
                helperText={error.reason}
              />
            ) : (
              <TextField
                id="outlined-multiline-static"
                label="Reason"
                name="reason"
                multiline
                rows={2}
                value={newHistorial.reason}
                variant="outlined"
                onChange={handleChanges}
                sx={{ width: "90%" }}
              />
            )}
            {error.prescription ? (
              <TextField
                error
                id="outlined-multiline-static"
                label="Prescription"
                name="prescription"
                multiline
                rows={2}
                value={newHistorial.prescription}
                variant="outlined"
                onChange={handleChanges}
                sx={{ width: "90%" }}
                helperText={error.prescription}
              />
            ) : (
              <TextField
                id="outlined-multiline-static"
                label="Prescription"
                name="prescription"
                multiline
                rows={2}
                value={newHistorial.prescription}
                variant="outlined"
                onChange={handleChanges}
                sx={{ width: "90%" }}
              />
            )}
          </Stack>
          <button
            onClick={handleOpenModal}
            className={style.saveButton}
            disabled={
              error.diagnosis ||
              error.reason ||
              error.prescription ||
              !newHistorial.diagnosis ||
              !newHistorial.reason ||
              !newHistorial.prescription ||
              !linkSent
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default SeePatients;
