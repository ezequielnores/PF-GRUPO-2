import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//reducer
import {
  urgencyGetAll,
  urgencyEdit,
} from "../../../redux/reducers/urgencyReducer";
//material
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
import Button from "@mui/material/Button";

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
  const [isUrgencyUpdated, setIsUrgencyUpdated] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.urgency.listAll);

  const sortedUrgencias = data.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });
  const handleRowClick = (index) => {
    setOpenRow(openRow === index ? null : index);
  };
  //HANDLER de ATENCION
  const handlerAttended = (id) => {
    const data = { attended: true };
    dispatch(urgencyEdit({ id, data }));
    setIsUrgencyUpdated(!isUrgencyUpdated);
  };
  //HANDLER de refresh
  const handlerRefresh = () => {
    dispatch(urgencyGetAll());
  };
  console.log(sortedUrgencias);
  const formatDate = (dateStr) => {
    //creo date
    const date = new Date(dateStr);
    const timeZone = "America/Argentina/Buenos_Aires";
    //mis parametros
    const options = {
      timeZone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    //modifico
    const formattedDate = date.toLocaleString("es-AR", options);
    //separo en 2 , date y horario
    const dateParts = formattedDate.split(", ");
    const fecha = dateParts[0];
    const hora = dateParts[1];
    return [fecha, hora];
  };
  //TEMINOOOO
  useEffect(() => {
    //se va hacer getall cada vez que cambie el isUrgencyUpdated , osea cada vez que acepte
    dispatch(urgencyGetAll());
  }, [isUrgencyUpdated, dispatch]);
  //otro

  return (
    <div style={container}>
      <div style={hijoContainer}>
        <Typography
          variant="h2"
          style={{
            color: "#307196",
            fontWeight: "bold",
            fontSize: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          Emergencies
        </Typography>
        <Button onClick={handlerRefresh}>Refresh</Button>
        <TableContainer component={Paper}>
          <Table aria-label="turnera" style={{ marginTop: "2rem" }}>
            <TableHead style={{ backgroundColor: "#307196" }}>
              <TableRow>
                <TableCell style={header}>Patient</TableCell>
                <TableCell style={header}>Date</TableCell>
                <TableCell style={header}>Hour</TableCell>
                <TableCell style={header}></TableCell>
                <TableCell style={header}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUrgencias?.map((urgencia, index) => (
                <>
                  {urgencia.attended === false ? (
                    <React.Fragment key={urgencia.id}>
                      <TableRow>
                        <TableCell style={{ fontSize: "17px" }}>
                          {urgencia.Patient
                            ? `${urgencia.Patient.name ?? ""} ${
                                urgencia.Patient.surname ?? ""
                              }`
                            : "cargando"}
                        </TableCell>
                        <TableCell style={{ fontSize: "17px" }}>
                          {formatDate(urgencia.createdAt)[0]}
                        </TableCell>
                        <TableCell style={{ fontSize: "17px" }}>
                          {formatDate(urgencia.createdAt)[1]}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(index)}>
                          <IconButton size="small">
                            {openRow === index ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell style={{ fontSize: "17px", width: "100px" }}>
                          <Button onClick={() => handlerAttended(urgencia.id)}>
                            Attend
                          </Button>
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
                                Details
                              </Typography>
                              <Table size="small">
                                <TableBody>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Symptomatology:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "14px" }}>
                                      {urgencia.symptomatology}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Allergies:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "14px" }}>
                                      {urgencia.Patient?.allergies}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      BMI:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {urgencia.Patient?.bmi}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Weight:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {urgencia.Patient?.weight}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Height:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {urgencia.Patient?.height}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      Choronic Diseases:
                                    </TableCell>
                                    <TableCell style={{ fontSize: "15px" }}>
                                      {urgencia.Patient?.chronicDiseases}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ) : null}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Agenda;
