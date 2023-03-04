import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { appointmentGetAllByPatientId } from "../../../redux/reducers/appointmentReducer";
import { useEffect } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Rows from "./Rows";
import dayjs from "dayjs";
import style from "./MyAppointments.module.css";
import { Typography } from "@mui/material";

const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const MyAppointments = () => {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appointmentGetAllByPatientId(id));
  }, []);

  const [deleteAppointment, setDeleteAppointment] = React.useState(false);
  const appointmentsRedux = useSelector((state) => state.appointment.list);

  const date = Date.now();

  useEffect(() => {
    dispatch(appointmentGetAllByPatientId(id));
  }, [deleteAppointment]);

  // var Doctors = Array.from(new Set (appointmentsRedux?.map(appointment => appointment.doctor)));
  // const Specialities = Array.from(new Set (appointmentsRedux?.map(appointment => appointment.speciality)));
  // const Types = Array.from(new Set (appointmentsRedux?.map(appointment => appointment.type)));

  var sortAppointments = (appointments) => {
    const appointment = [...appointments];
    let sortAppointment = appointment?.sort((a, b) => {
      //
      const dateA = new Date(a.date + "T" + a.hour);
      const dateB = new Date(b.date + "T" + b.hour);
      if (dateA < dateB) {
        return -1;
      }
      return 1;
    }); // ordenar por fecha y hora;
    console.log(sortAppointment);
    return appointments;
  };
  const [value, setValue] = React.useState(dayjs(date));
  const [page, setPage] = React.useState(0);
  // const [filtered , setFiltered] = React.useState(false);
  const [filteredDate, setFilteredDate] = React.useState(false);
  const [appointments, setAppointments] = React.useState([]);
  const [nextAppointmentDate, setNextAppointmentDate] = React.useState(" ");

  useEffect(() => {
    setAppointments(sortAppointments(appointmentsRedux));
  }, [appointmentsRedux]);

  const [filterType, setFilterType] = React.useState("");

  const handleChangeFilter = (event) => {
    setFilteredDate(false);
    setValue(dayjs(date));
    setAppointments(sortAppointments(appointmentsRedux));
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeDate = async (newValue) => {
    setValue(newValue);
    setFilteredDate(true);
    // const appointments = await axios.get(`http://localhost:3001/appointment/patient/${id}`);

    setAppointments(
      sortAppointments(
        appointmentsRedux.filter(
          (appointment) =>
            appointment.date === dayjs(newValue.$d).format("YYYY-MM-DD")
        )
      )
    );
  };

  const handleFilter = () => {};

  useEffect(() => {
    if (appointments.length === 0) setNextAppointmentDate("No appointments");
    else
      setNextAppointmentDate(appointments[0].date + " " + appointments[0].hour);
  }, [appointments]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          // padding: "0 2rem 0 5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Typography
            variant="button"
            fontSize="2.5rem"
            color="#307196"
            fontWeight="bold"
            style={test}
          >
            My Appointments
          </Typography>
          <TextField
            id="outlined-read-only-input"
            label="Next Appointment"
            value={nextAppointmentDate}
            sx={{ width: 250 }}
            InputProps={{
              readOnly: true,
            }}
          />
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                gap: "0.5rem",
              }}
            >
              {filteredDate ? (
                <button
                  className={style.buttonfilter}
                  onClick={handleChangeFilter}
                >
                  {dayjs(value.$d).format("YYYY-MM-DD")} x
                </button>
              ) : null}
            </div>
            <TableContainer component={Paper} sx={{ width: 1 / 1 }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: "info.main" }} />
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "Bold",
                        fontSize: 20,
                        bgcolor: "info.main",
                      }}
                    >
                      Doctor&nbsp;
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "Bold",
                        fontSize: 20,
                        bgcolor: "info.main",
                      }}
                    >
                      Date&nbsp;
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "Bold",
                        fontSize: 20,
                        bgcolor: "info.main",
                      }}
                    >
                      Hour&nbsp;
                    </TableCell>
                    <TableCell sx={{ bgcolor: "info.main" }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments[0] ? (
                    appointments
                      .slice(page * 4, page * 4 + 4)
                      .map((appointment) => (
                        <Rows
                          key={appointment.id}
                          appointment={appointment}
                          setDeleteAppointment={setDeleteAppointment}
                          deleteAppointment={deleteAppointment}
                        />
                      ))
                  ) : (
                    <TableRow>
                      <TableCell>No appointments</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={appointments.length}
                rowsPerPage={4}
                page={page}
                labelRowsPerPage={""}
                rowsPerPageOptions={[]}
                onPageChange={handleChangePage}
              />
            </TableContainer>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "flex-start",
            alignContent: "flex-start",
          }}
        >
          <div style={{ height: "300px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyAppointments;
