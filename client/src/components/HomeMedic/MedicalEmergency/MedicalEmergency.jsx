import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SeePatients from "../SeePatients/SeePatients";
import { historyGetAllbyPatient } from "../../../redux/reducers/historyReducer";
import axios from "axios";
//reducer
import {
  urgencyGetAll,
  urgencyEdit,
  urgencyGetDetail,
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
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const container = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const hijoContainer = {
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
  const [isUrgencyUpdated, setIsUrgencyUpdated] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.urgency.listAll);
  const doctor = useSelector((state) => state.doctor.detail);
  const dataHistoria = useSelector((state) => state.history.list);
  const [idTurn, setIdTurn] = useState("");
  const [appointment, setAppointment] = useState({});
  const [urgenciaWithouAttended, setUrgenciaWithouAttended] = useState([]);

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
  const handlerAttended = async (id) => {
    const data = { attended: true };
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/urgency/${id}`
    );
    const dateParts = response.data.createdAt.split("T");
    const dataAppointmen = {
      idTurn: id,
      date: dateParts[0],
      hour: dateParts[1].split(".")[0],
      Patient: {
        id: response.data.Patient.id,
        name: response.data.Patient.name,
        surname: response.data.Patient.surname,
        mail: response.data.Patient.mail,
      },
      doctor: {
        id: doctor.id,
        name: doctor.name,
        lastName: doctor.lastName,
        mail: doctor.mail,
      },
    };
    setAppointment(dataAppointmen);
    setIdTurn(id);
 
    dispatch(urgencyEdit({ id, data }));
    setIsUrgencyUpdated(true);
  };
  //ver historia
  const handleViewHistory = (id) => {
    dispatch(historyGetAllbyPatient(id));
    setOpenModal(true);
  };
  //HANDLER de refresh
  const handlerRefresh = () => {
    dispatch(urgencyGetAll());
  };
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

  useEffect(() => {
    setUrgenciaWithouAttended(sortedUrgencias.filter((urgencia) => !urgencia.attended));
  }, [sortedUrgencias]);

  //otro

  return (
    <div>
      {!isUrgencyUpdated ? (
        <div style={container}>
          <div style={hijoContainer}>
            <Typography
              variant="button"
              fontSize="2.5rem"
              color="#307196"
              fontWeight="bold"
              style={test}
            >
              URGENCY
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
                    <TableCell style={header}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urgenciaWithouAttended[0]?
                  
                  urgenciaWithouAttended?.map((urgencia, index) => (
                    <>
                      {urgencia.attended === false ? (
                        <React.Fragment key={urgencia.id}>
                          <TableRow>
                            <TableCell style={{ fontSize: "17px" }}>
                              {urgencia.Patient
                                ? `${urgencia.Patient.name ?? ""} ${urgencia
                                    .Patient.surname ?? ""}`
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
                            <TableCell
                              style={{ fontSize: "17px", width: "100px" }}
                            >
                              <Button
                                onClick={() => handlerAttended(urgencia.id)}
                              >
                                Attend
                              </Button>
                            </TableCell>
                            <TableCell style={{ width: "10rem" }}>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  handleViewHistory(urgencia.Patient.id)
                                }
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
                                            style={{
                                              backgroundColor: "#307196",
                                            }}
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
                                            
                                            {dataHistoria[0]?
                                              dataHistoria.map((historia) => (
                                                <TableRow key={historia.id}>
                                                  <TableCell>
                                                    {historia.register[0].date}
                                                  </TableCell>
                                                  <TableCell>
                                                    {
                                                      historia.register[0]
                                                        .diagnosis
                                                    }
                                                  </TableCell>
                                                  <TableCell>
                                                    {historia.register[0].reason}
                                                  </TableCell>
                                                  <TableCell>
                                                    {
                                                      historia.register[0]
                                                        .prescription
                                                    }
                                                    
                                                  </TableCell>
                                                </TableRow>
                                              ))
                                              :<TableRow>
                                                <TableCell>
                                                  <h4 style={{fontWeight:"400"}}>Not history</h4>
                                                </TableCell>
                                              </TableRow>
                                            }
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
                      ) :null}
                    </>
                  ))
                : <TableRow>
                <TableCell>
                  
                  Don´t have urgencies
                </TableCell>
              </TableRow>}
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
