import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentGetAllByDoctorId } from "../../../redux/reducers/appointmentReducer";
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
  console.log(dataTurnos);
  React.useEffect(() => {
    const doctorId = localStorage.getItem("idMedic");
    if (doctorId) {
      dispatch(appointmentGetAllByDoctorId(doctorId));
    }
  }, [dispatch]);

  const handleRowClick = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <div style={container}>
      <div style={hijoContainer}>
        <TextField
          label="Next shift"
          value={
            proximoTurno
              ? `${proximoTurno.Patient.name} ${proximoTurno.Patient.surname} - ${proximoTurno.date} - ${proximoTurno.hour}`
              : "No hay turnos próximos"
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
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Hour</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTurnos?.map((turno, index) => (
                <React.Fragment key={turno.id}>
                  <TableRow onClick={() => handleRowClick(index)}>
                    <TableCell>
                      {turno.Patient.name} {turno.Patient.surname}
                    </TableCell>
                    <TableCell>{turno.date}</TableCell>
                    <TableCell>{turno.hour}</TableCell>
                    <TableCell>{turno.type}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        {openRow === index ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
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
                          <Typography variant="h6" gutterBottom component="div">
                            Shift details
                          </Typography>
                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell>Allergies:</TableCell>
                                <TableCell>{turno.Patient.allergies}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>BMI:</TableCell>
                                <TableCell>{turno.Patient.bmi}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Weight:</TableCell>
                                <TableCell>{turno.Patient.weight}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Height:</TableCell>
                                <TableCell>{turno.Patient.height}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>chronicDiseases:</TableCell>
                                <TableCell>
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
  );
};

export default Agenda;
