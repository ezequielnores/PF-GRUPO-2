import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentGetAllByDoctorId } from "../../../redux/reducers/appointmentReducer";
import { attendedPatientTurns } from "../../../redux/reducers/attendReducer";
import { historyGetAllbyPatient } from "../../../redux/reducers/historyReducer";
import dayjs from "dayjs";
import axios from "axios";

import SeePatients from "../SeePatients/SeePatients";
//material
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";

//style
const container = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const hijoContainer = {
  marginTop: "3rem",
  width: "95%",
};
const header = {
  fontSize: "23px",
  fontWeight: "bold",
  color: "white",
};
const modalContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const modal = {
  backgroundColor: "#fff",
  borderRadius: "5px",
  maxWidth: "100rem",
  width: "100%",
  padding: "2rem",
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  maxHeight: "400px",
  overflow: "auto",
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
};
//COMPONENTE
const Agenda = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const dispatch = useDispatch();
  const dataTurnos = useSelector((state) => state.appointment.list);
  const dataHistoria = useSelector((state) => state.history.list);
 

  ///// ORDENAMIENTO POR MAS PROXIMO, NO PUEDO USAR EL OTRO DATATURNOS, NO DEJA MODIFICAR!! ! ! !
  const dataTurnosd = useSelector((state) =>
    state.appointment.list.slice().sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      if (a.hour < b.hour) return -1;
      if (a.hour > b.hour) return 1;
      return 0;
    })
  );
  const sortedTurnos = dataTurnosd.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const proximoTurno = sortedTurnos.length > 0 ? sortedTurnos[0] : null;
  //TEMINOOOO
  React.useEffect(() => {
    const doctorId = localStorage.getItem("idMedic");
    if (doctorId) {
      dispatch(appointmentGetAllByDoctorId(doctorId));
    }
  }, [dispatch]);

  const handleRowClick = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const [date, setDate] = useState(new Date(Date.now()));
  // const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date(Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  //view history
  const handleViewHistory = (id) => {
    dispatch(historyGetAllbyPatient(id));
    setOpenModal(true);
  };
  const [attend, setAttend] = useState(false);
  const [idTurn, setIdTurn] = useState("");
  const [appointment, setAppointment] = useState({});

  const handleAttend = async (e) => {
    setIdTurn(e.target.value);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/${e.target.value}`
    );
 
    const data = {
      idTurn: e.target.value,
      date: response.data.date,
      hour: response.data.hour,
      Patient: {
        id: response.data.Patient.id,
        name: response.data.Patient.name,
        surname: response.data.Patient.surname,
        mail: response.data.Patient.mail,
        uid: response.data.Patient.uid,
      },
      doctor: {
        id: response.data.doctor.id,
        name: response.data.doctor.name,
        lastName: response.data.doctor.lastName,
        mail: response.data.doctor.mail,
        uid: response.data.doctor.uid,
      },
    };
    setAppointment(data);
    dispatch(attendedPatientTurns(e.target.value));
    setAttend(true);

  };
  useEffect(() => {
    dispatch(appointmentGetAllByDoctorId(localStorage.getItem("idMedic")));
  }, [attend]);
  return (
    <div>
      <Typography
        variant="button"
        fontSize="2.5rem"
        color="#307196"
        fontWeight="bold"
        style={test}
      >
        My Appointments
      </Typography>
      {!attend ? (
        <div style={container}>
          <div style={hijoContainer}>
            <TextField
              label="Next shift"
              value={
                proximoTurno
                  ? `${proximoTurno.Patient.name} ${proximoTurno.Patient.surname} - ${proximoTurno.date} - ${proximoTurno.hour}`
                  : "No upcoming shifts"
              }
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              style={{ marginBottom: "3rem", width: "26%", borderColor: "red" }}
              variant="outlined"
            />

            <TableContainer component={Paper}>
              <Table aria-label="turnera">
                <TableHead style={{ backgroundColor: "#307196" }}>
                  <TableRow>
                    <TableCell style={header}>Patient</TableCell>
                    <TableCell style={header}>Date</TableCell>
                    <TableCell style={header}>Hour</TableCell>
                    <TableCell style={header}>Type</TableCell>
                    <TableCell style={header}></TableCell>
                    <TableCell style={header}></TableCell>
                    <TableCell style={header}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTurnos?.map((turno, index) => (
                    <React.Fragment key={turno.id}>
                      <TableRow>
                        <TableCell style={{ fontSize: "17px" }}>
                          {turno.Patient.name} {turno.Patient.surname}
                        </TableCell>
                        <TableCell style={{ fontSize: "17px" }}>
                          {turno.date}
                        </TableCell>
                        <TableCell style={{ fontSize: "17px" }}>
                          {turno.hour}
                        </TableCell>
                        <TableCell style={{ fontSize: "17px" }}>
                          {turno.type}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            {openRow === index ? (
                              <KeyboardArrowUpIcon
                                onClick={() => handleRowClick(index)}
                              />
                            ) : (
                              <KeyboardArrowDownIcon
                                onClick={() => handleRowClick(index)}
                              />
                            )}
                          </IconButton>
                        </TableCell>
                        {dayjs(date).format("DD/MM/YYYY HH:mm:ss") >=
                        dayjs("" + turno.date + turno.hour).format(
                          "DD/MM/YYYY HH:mm:ss"
                        ) ? (
                          <TableCell>
                            <Button
                              variant="outlined"
                              value={turno.id}
                              onClick={handleAttend}
                            >
                              Attend
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Button
                              variant="outlined"
                              value={turno.id}
                              onClick={handleAttend}
                            >
                              Attend
                            </Button>
                          </TableCell>
                        )}
                        <TableCell style={{ width: "10rem" }}>
                          <Button
                            variant="outlined"
                            onClick={() => handleViewHistory(turno.Patient.id)}
                          >
                            VIEW HISTORY
                          </Button>
                        </TableCell>
                      </TableRow>
                      {openModal && (
                        <>
                          {dataHistoria && (
                            <>
                              <div
                                style={overlay}
                                onClick={() => setOpenModal(false)}
                              >
                                <div style={modalContainer}>
                                  <TableContainer style={modal}>
                                    <Table>
                                      <TableHead
                                        style={{ backgroundColor: "#307196" }}
                                      >
                                        <TableRow>
                                          <TableCell
                                            style={header}
                                            sx={{ width: "10rem" }}
                                          >
                                            Fecha
                                          </TableCell>
                                          <TableCell
                                            style={header}
                                            sx={{ width: "20rem" }}
                                          >
                                            Diagnostico
                                          </TableCell>
                                          <TableCell
                                            style={header}
                                            sx={{ width: "20rem" }}
                                          >
                                            Reason
                                          </TableCell>
                                          <TableCell
                                            style={header}
                                            sx={{ width: "20rem" }}
                                          >
                                            Prescription
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {dataHistoria.map((historia) => (
                                          <TableRow key={historia.id}>
                                            <TableCell>
                                              {historia.register[0].date}
                                            </TableCell>
                                            <TableCell>
                                              {historia.register[0].diagnosis}
                                            </TableCell>
                                            <TableCell>
                                              {historia.register[0].reason}H
                                            </TableCell>
                                            <TableCell>
                                              {
                                                historia.register[0]
                                                  .prescription
                                              }
                                              H
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={7}
                        >
                          <Collapse
                            in={openRow === index}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                component="div"
                                style={{
                                  backgroundColor: "#307196",
                                  color: "white",
                                  fontSize: "19px",
                                  fontWeight: "bold",
                                  borderRadius: "4px",
                                  paddingLeft: "4px",
                                }}
                              >
                                Shift details
                              </Typography>
                              <Table size="small">
                                <TableBody>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Allergies:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "14px" }}>
                                      {turno.Patient.allergies}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      BMI:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {turno.Patient.bmi}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Weight:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {turno.Patient.weight}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Height:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {turno.Patient.height}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Choronic Diseases:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {turno.Patient.chronicDiseases}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        <SeePatients idTurn={idTurn} appointment={appointment} />
      )}
    </div>
  );
};

export default Agenda;
