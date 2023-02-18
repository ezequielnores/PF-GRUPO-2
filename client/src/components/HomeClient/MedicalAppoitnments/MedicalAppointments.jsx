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

const MedicalAppointments= ()=>{
    const dispatch=useDispatch();
    const doctors = useSelector(state => state.doctor.list);

    const [date, setSelectedDate] = useState(new Date());
    const [hour, setSelectedTime] = useState(""); 
    const [speciality,setDoctorSpecialty]=useState("")
    const [modalAbierto, setModalAbierto] = useState(false);
    const patientIdLocal = localStorage.getItem("id");
    const [patientId, setDoctorId] = useState(patientIdLocal.toString()); 
    const [name,setDoctor]=useState({ doctorId: '', name: '' })

    const ubication="avellaneda"
    const availability=true
    const type="sadad"  

    const dateModify=date.toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-')



    useEffect(() => {
              dispatch(docrtorGetAll());
          }, [])



         const handleSelectDoctor=(e)=>{
            setDoctorSpecialty(e.target.value)
        }

        const handleSelectName = (event) => {
            const id = event.target.value;
            const doctor = doctors.find((e) => e.id === id);
            setDoctor({ doctorId:id, name: doctor.name });
          };


         const handleSelectDate=(e)=>{

            setSelectedDate(e)
        }

        const handleSelectHour = (time) => {
            setSelectedTime(time.format("HH:mm"))};

            


    
        const handleSubmit = (event) => {
            event.preventDefault();
        
             dispatch(appointmentCreate({date:dateModify,hour:hour,doctorSpecialty:speciality,doctorId:name.doctorId,type,ubication,availability,patientId:patientId}))
            setModalAbierto(true);
        }






          const closeModal = () => {
            setModalAbierto(false); 
          }

          

        const filteredDoctors = speciality
            ? doctors.filter((doctor) => doctor.speciality === speciality)
            : doctors;


            
            return(
            <div style={{width:"fit-content", marginLeft:"25%"}}>
                <form onSubmit={handleSubmit} style={{marginTop:15, border:"solid",width:"fit-content",padding:35, borderRadius:10, }}>

                    <h2 style={{marginBottom:40,display:"flex",justifyContent:"center", color:"#307196", backgroundColor:"#D9D9D9", padding:5, borderRadius:10}}>Select your appoinment </h2>
                    <div style={{display:"flex", flexDirection:"column" }}>
                    <InputLabel id="demo-simple-select-required">Date </InputLabel>

                        <DatePicker selected={date} onChange={handleSelectDate} value={date} name="selectedDate"  />

                        <br></br>
                        <InputLabel id="demo-simple-select-required">Time </InputLabel>

                        <Datetime
                        dateFormat={false}
                        input={false} onChange={handleSelectHour}
                         name="hour"
                            />


                        <InputLabel id="demo-simple-select-required">Speciality: </InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            onChange={handleSelectDoctor}
                            sx={{ minWidth: 150, borderRadius: 2 ,marginRight:3}}
                            >
                            <MenuItem value={speciality} name="speciality">Speciality: </MenuItem>
                                {doctors.map((e) => {
                                    return (
                            <MenuItem value={e.speciality}>{e.speciality}</MenuItem>)})}
                        </Select>
                        <br/>
                        <InputLabel id="demo-simple-select-required">Doctor´s name:  </InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            onChange={handleSelectName}
                            sx={{ minWidth: 150, borderRadius: 2 ,marginRight:3}}
                            >
                            <MenuItem value="" name="name">Doctors name: </MenuItem>
                                {filteredDoctors?.map((e) => {
                                    return (
                            <MenuItem value={e.id}>{e.name}</MenuItem>)})}
                        </Select>


                        </div><br/>


                    <Stack direction="flex" spacing={2} >
                        {(!date || !hour || !speciality) ? 
                        <Button variant="contained" disabled>RESERVE</Button>
                        :
                        <Button variant="contained" type="submit"  endIcon={<SendIcon />}>RESERVE</Button>}
                    </Stack>

                </form>

                    <Modal isOpen={modalAbierto} onRequestClose={closeModal} >
                        <div style={{border:"solid", justifyContent:"center", marginTop:"5%", borderRadius:10, paddingBottom:50}}>
                            <h2 style={{display:"flex",flexDirection:"row", justifyContent:"center", color:"#D9D9D9",backgroundColor:"#307196"}}>Info about your appoinment </h2>
                            <h3 style={{marginLeft:5}}>Date: {dateModify}</h3>
                            <h3 style={{marginLeft:5}}>Time: {hour}</h3>
                            <h3 style={{marginLeft:5}}>Speciality: {speciality}</h3>
                            <h3 style={{marginLeft:5}}>Doctor´s name: {name.name}</h3>
                            <Button variant="contained" onClick={closeModal} style={{marginLeft:"10%", marginTop:"5%",scale:"1.2"}}>Cerrar</Button>
                        </div>
                    </Modal>

            </div>
        )
    }
    
     export default MedicalAppointments;

 