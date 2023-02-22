import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentGetAllByDoctorId } from "../../../redux/reducers/appointmentReducer";
import dayjs from "dayjs";

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
  width: "80%",
};
const header = {
  fontSize: "23px",
  fontWeight: "bold",
  color: "white",
};
//COMPONENTE
const Agenda = () => {
  const [openRow, setOpenRow] = useState(null);
  const dispatch = useDispatch();
  const dataTurnos = useSelector((state) => state.appointment.list);
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
  // console.log(dataTurnos);
  React.useEffect(() => {
    const doctorId = localStorage.getItem("idMedic");
    if (doctorId) {
      dispatch(appointmentGetAllByDoctorId(doctorId));
    }
  }, [dispatch]);

  const handleRowClick = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const [date , setDate] = useState(new Date(Date.now()))
  // const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date(Date.now()))
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [attend, setAttend] = useState(false)
  const [idTurn, setIdTurn] = useState("")

  const handleAttend = (e) => {
    setIdTurn(e.target.value)
    setAttend(true) 
  }
  return (
    <div>
      {!attend ? 
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTurnos?.map((turno, index) => (
                    <React.Fragment key={turno.id}>
                      <TableRow onClick={() => handleRowClick(index)}>
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
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        {dayjs(date).format("DD/MM/YYYY HH:mm:ss")>=dayjs(""+turno.date+turno.hour).format("DD/MM/YYYY HH:mm:ss")?
                        <TableCell>
                            <button value={turno.id} onClick={handleAttend}>
                                  attend
                            </button>
                        </TableCell>:
                        null
                        }
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
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
        :
        
      <SeePatients 
        idTurn={idTurn} 
      />
      }
      
    </div>

  );
};

export default Agenda;
