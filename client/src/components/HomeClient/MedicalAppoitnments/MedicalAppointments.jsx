import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useDispatch, useSelector } from "react-redux";
import { docrtorGetAll } from "../../../redux/reducers/doctorReducer";
import {
  appointmentCreate,
  appointmentGetByDateTime,
} from "../../../redux/reducers/appointmentReducer";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import axios from "axios";
import moment from "moment";

const MedicalAppointments = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.list);
  const turnos = useSelector((state) => state.appointment.detail);
  const [date, setSelectedDate] = useState(new Date());
  const [minDate, setMinDate] = useState(new Date());
  const [hour, setSelectedTime] = useState("06:00:00");
  const [speciality, setDoctorSpecialty] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const patientIdLocal = localStorage.getItem("id");
  const [patientId, setDoctorId] = useState(patientIdLocal.toString());
  const [name, setDoctor] = useState({ doctorId: "", name: "", lastName: "" });
  const [type, setSelectedType] = useState("");
  const [ubication, setUbication] = useState("");
  const [modalReserved, setModalReserved] = useState(false);

  const availability = true;
  const attended = false;

  const dateModify = date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");

  useEffect(() => {
    dispatch(docrtorGetAll());
  }, []);
  console.log(turnos);

  const handleSelectType = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSelectDoctor = (e) => {
    setDoctorSpecialty(e.target.value);
  };

  const handleSelectUbication = (e) => {
    setUbication(e.target.value);
  };

  const handleSelectName = (event) => {
    const id = event.target.value;
    const doctor = doctors.find((e) => e.id === id);
    setDoctor({ doctorId: id, name: doctor.name, lastName: doctor.lastName });
  };

  const handleSelectDate = (e) => {
    setSelectedDate(e);
    setMinDate(e);
  };

  const handleSelectHour = (time) => {
    // setSelectedTime(time.format("HH:mm"));
    setSelectedTime(time.format("HH:mm"));
  };

  const timeConstraints = {
    hours: {
      min: 6,
      max: 18,
    },
    minutes: { step: 60 },
    seconds: { step: 60 },
  };

  const defaultValue = moment().set({ hour: 6, minute: 0, second: 0 });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/turns/turnByDateAndHourAndDoctor`,
      {
        date: dateModify,
        hour: hour,
        doctorId: name.doctorId,
      }
    );

    if (response.data === true) {
      dispatch(
        appointmentCreate({
          date: dateModify,
          hour: hour,
          doctorSpecialty: speciality,
          doctorId: name.doctorId,
          type: type,
          ubication,
          availability,
          patientId: patientId,
          attended,
        })
      );
      setModalAbierto(true);
    } else {
      setModalReserved(true);
      // alert("Sorry, the appointment is already reserved");
    }
  };

  const closeModalReserved = () => {
    setModalReserved(false);
  };
  const closeModal = () => {
    setModalAbierto(false);
  };

  const filterClinicMail =
    type === "Face-to-face"
      ? doctors.filter((doctor) => doctor.clinicMail === "")
      : doctors.filter((doctor) => doctor.clinicMail !== "");

  const filterSpeciality = filterClinicMail
    .map((doctor) => doctor.speciality)
    .filter((speciality, index, self) => self.indexOf(speciality) === index);

  const filteredDoctors =
    type && speciality
      ? filterClinicMail.filter((doctor) => doctor.speciality === speciality)
      : doctors;

  const filterNameDoctor =
    type && speciality && ubication
      ? filteredDoctors.filter((doctor) => doctor.location === ubication)
      : doctors;

  // const filteredDoctors = speciality
  //   ? doctors.filter((doctor) => doctor.speciality === speciality)
  //   : doctors;

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant='h4' sx={{ mb: 3, color: "#307196" }}>
            Select your appointment
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputLabel id='demo-simple-select-required'>Date </InputLabel>
            <DatePicker
              selected={date}
              onChange={handleSelectDate}
              value={date}
              name='selectedDate'
              minDate={new Date()}
            />

            <br />
            <div>
              <br />
              <label style={{ marginRight: 10 }}>
                <input
                  type='radio'
                  name='option'
                  value='Face-to-face'
                  onChange={handleSelectType}
                />
                Face to face
              </label>
              <label>
                <input
                  type='radio'
                  name='option'
                  value='Virtual'
                  onChange={handleSelectType}
                />
                Virtual
              </label>
            </div>

            {/* <Box sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-required">Tipo</InputLabel>
            <Select
             labelId="demo-simple-select-required"
             id="demo-simple-select-required"
             onChange={handleSelectType}
             fullWidth
           >
              <MenuItem value="">None</MenuItem>
             <MenuItem value="Virtual">Virtual</MenuItem>
              <MenuItem value="Face-to-face">Face-to-face</MenuItem>
            
            </Select>
            </Box>  */}

            <Box sx={{ mt: 2 }}>
              <InputLabel id='demo-simple-select-required'>
                Doctor Specialty
              </InputLabel>
              <Select
                labelId='demo-simple-select-required'
                id='demo-simple-select-required'
                onChange={handleSelectDoctor}
                fullWidth
              >
                <MenuItem value={speciality} name='speciality'>
                  None
                </MenuItem>

                {filterSpeciality.map((speciality, index) => (
                  <MenuItem key={index} value={speciality}>
                    {speciality}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ mt: 2 }}>
              <InputLabel id='demo-simple-select-required'>Location</InputLabel>
              <Select
                labelId='demo-simple-select-required'
                id='demo-simple-select-required'
                value={ubication}
                onChange={handleSelectUbication}
                fullWidth
                disabled={!speciality}
              >
                {filteredDoctors.map((doctor) => (
                  <MenuItem value={doctor.location} name='location'>
                    {doctor.location}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ mt: 2 }}>
              <InputLabel id='demo-simple-select-required'>
                Doctor Name
              </InputLabel>
              <Select
                labelId='demo-simple-select-required'
                id='demo-simple-select-required'
                value={name.doctorId}
                onChange={handleSelectName}
                fullWidth
                disabled={!speciality}
              >
                {filterNameDoctor.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id} name='name'>
                    {doctor.name} {doctor.lastName}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ mt: 2 }}>
              <InputLabel id='demo-simple-select-required'>Hour</InputLabel>
              <Datetime
                dateFormat={false}
                // timeConstraints={{ minutes: { step: 60 }, seconds: { step: 60 } }}
                timeConstraints={timeConstraints}
                onChange={handleSelectHour}
                name='hour'
                timeFormat='HH:mm:ss'
                defaultValue={defaultValue}
              />
            </Box>

            {/* <Box sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-required">Hour</InputLabel>
              <Datetime
                dateFormat={false}
                //value={hour}
                onChange={handleSelectHour}
                name="hour"
              />
            </Box> */}
            <br />
            <Stack
              sx={{ mt: 2 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              {!date || !hour || !speciality ? (
                <Button variant='contained' disabled>
                  Reserve
                </Button>
              ) : (
                <Button
                  sx={{ backgroundColor: "#307196", color: "#D9D9D9" }}
                  variant='contained'
                  type='submit'
                  endIcon={<SendIcon />}
                >
                  Reserve
                </Button>
              )}
            </Stack>
          </Box>

          <Modal isOpen={modalAbierto} ariaHideApp={false}>
            <Box sx={{ p: 2 }}>
              <Typography variant='h5' sx={{ mb: 2, color: "#307196" }}>
                Appointment created successfully
              </Typography>
              <br />
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    Date:
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>
                    {dateModify}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    Time:
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>
                    {hour}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    Speciality:
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>
                    {speciality}
                  </Typography>

                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    Location:
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>
                    {ubication}
                  </Typography>

                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    Doctor's name:
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 2 }}>
                    {name.name} {name.lastName}
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <br />
              <Stack sx={{ mt: 2 }} direction='row' spacing={2}>
                <Button
                  variant='outlined'
                  onClick={closeModal}
                  color='error'
                  size='medium'
                >
                  Close
                </Button>
              </Stack>
            </Box>
          </Modal>

          <Modal isOpen={modalReserved} ariaHideApp={false}>
            <Box sx={{ p: 2 }}>
              <Typography variant='h5' sx={{ mb: 2, color: "#307196" }}>
                Sorry, the appointment is already reserved
              </Typography>
              <br />
              <br />
              <Stack sx={{ mt: 2 }} direction='row' spacing={2}>
                <Button
                  variant='outlined'
                  onClick={closeModalReserved}
                  color='error'
                  size='medium'
                >
                  Close
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Paper>
      </Box>
    </Container>
  );
};

export default MedicalAppointments;
