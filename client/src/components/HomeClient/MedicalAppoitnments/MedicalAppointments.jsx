import React, { useEffect } from "react";
import { useState } from "react";
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useDispatch, useSelector } from "react-redux";
import {docrtorGetAll} from "../../../redux/reducers/doctorReducer";
import {appointmentCreate} from "../../../redux/reducers/appointmentReducer"
import { Box, Container, Paper, Typography } from '@mui/material';
import { Grid } from '@mui/material';


const MedicalAppointments = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(state => state.doctor.list);

  const [date, setSelectedDate] = useState(new Date());
  const [hour, setSelectedTime] = useState("");
  const [speciality, setDoctorSpecialty] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const patientIdLocal = localStorage.getItem("id");
  const [patientId, setDoctorId] = useState(patientIdLocal.toString());
  const [name, setDoctor] = useState({ doctorId: '', name: '' });

  const ubication = "avellaneda";
  const availability = true;
  const type = "sadad";

  const dateModify = date.toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-');

  useEffect(() => {
    dispatch(docrtorGetAll());
  }, []);

  const handleSelectDoctor = (e) => {
    setDoctorSpecialty(e.target.value);
  }

  const handleSelectName = (event) => {
    const id = event.target.value;
    const doctor = doctors.find((e) => e.id === id);
    setDoctor({ doctorId: id, name: doctor.name });
  };

  const handleSelectDate = (e) => {
    setSelectedDate(e)
  }

  const handleSelectHour = (time) => {
    setSelectedTime(time.format("HH:mm"))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(appointmentCreate({
      date: dateModify,
      hour: hour,
      doctorSpecialty: speciality,
      doctorId: name.doctorId,
      type,
      ubication,
      availability,
      patientId: patientId
    }))
      // setSelectedTime("")
      // setDoctorSpecialty("");
      // setDoctor({ doctorId: '', name: '' })
    
    setModalAbierto(true)
    
  }

  const closeModal = () => {
    setModalAbierto(false)
        setSelectedTime("")
       setDoctorSpecialty("")
       setDoctor({ doctorId: '', name: '' })
       window.location.reload()

  }

  const filteredDoctors = speciality ? doctors.filter((doctor) => doctor.speciality === speciality) : doctors;
  const filterSpeciality=doctors.map(doctor => doctor.speciality)
  .filter((speciality, index, self) => self.indexOf(speciality) === index);
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3,color:"#307196" }}>
            Select your appointment
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <InputLabel id="demo-simple-select-required">Date </InputLabel>
            <DatePicker selected={date} onChange={handleSelectDate} value={date} name="selectedDate" />

            <br />

            <Box sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-required">Doctor Specialty</InputLabel>
            <Select
             labelId="demo-simple-select-required"
             id="demo-simple-select-required"
 
             onChange={handleSelectDoctor}
             fullWidth
           >
            <MenuItem value={speciality} name="speciality">None</MenuItem>

            {filterSpeciality.map((speciality, index) => (
                    <MenuItem key={index} value={speciality}>
                        {speciality}
                    </MenuItem>
            ))}
            
            </Select>
            </Box>        <Box sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-required">Doctor Name</InputLabel>
          <Select
            labelId="demo-simple-select-required"
            id="demo-simple-select-required"
            value={name.doctorId}
            onChange={handleSelectName}
            fullWidth
            disabled={!speciality}
          >
            {filteredDoctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id} name="name">
                {doctor.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-required">Hour</InputLabel>
          <Datetime
            dateFormat={false}
            //value={hour}
            onChange={handleSelectHour}
            name="hour"
          />

        </Box>
                <br/>
        <Stack sx={{ mt: 2 }} direction="row" spacing={2} justifyContent="center">
            {(!date || !hour || !speciality) ? 
            <Button variant="contained" disabled>Reserve</Button>
            :
            
          <Button sx={{backgroundColor:"#307196", color:"#D9D9D9"}} variant="contained" type="submit" endIcon={<SendIcon />} >
            Reserve
          </Button>}
        </Stack>
      </Box>
      
      <Modal isOpen={modalAbierto} ariaHideApp={false}>
  <Box sx={{ p: 2 }}>
    <Typography variant="h5" sx={{ mb: 2 ,color:"#307196"}}>
      Appointment created successfully
    </Typography><br/><br/>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight:"bold" }}>
          Date:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {dateModify}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 ,fontWeight:"bold"}}>
          Time:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {hour}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" sx={{ mb: 1 ,fontWeight:"bold"}}>
          Speciality:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {speciality}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 ,fontWeight:"bold"}}>
          Doctor's name:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {name.name}
        </Typography>
      </Grid>
    </Grid><br/><br/>
    <Stack sx={{ mt: 2 }} direction="row" spacing={2} >
      <Button variant="outlined" onClick={closeModal} color="error" size="medium">
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