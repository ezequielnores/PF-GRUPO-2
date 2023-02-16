import React from "react";
import { useState } from "react";
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';



     const MedicalAppointments= ()=>{
    
        const dataTurnos=[{
            id:1,
            date:"12/03/2023",                     
            hour:"09:00",                               
            ubication:"Av cordoba 2323",                    
            doctorSpecialty:"Cardiologia",
            availability:"true"},
            {
            id:2,
            date:"17/03/2023",                     
            hour:"14:00",                               
            ubication:"Av cordoba 2323",                    
            doctorSpecialty:"Oncologia",
            availability:"false"
            }, {
            id:3,
            date:"03/03/2023",                     
            hour:"17:00",                               
            ubication:"Av cordoba 2323",                    
            doctorSpecialty:"reumatologia",
            availability:"true",
            },
            {
            id:3,
            date:"05/03/2023",                     
            hour:"17:00",                               
            ubication:"Av cordoba 2323",                    
            doctorSpecialty:"Oftamologia",
            availability:"true",
            },
            {
            id:3,
            date:"03/03/2023",                     
            hour:"07:00",                               
            ubication:"Av cordoba 2323",                    
            doctorSpecialty:"Pediatria",
            availability:"false",
            }]


        const [info,setInfo]=useState({ 
            date:"",                     
            hour:"",                                                
            doctorSpecialty:"",
        })

        const [modalAbierto, setModalAbierto] = useState(false);
    
 
        //  const changeHandler=(event)=>{
        //      const property=event.target.name;
        //     const value=event.target.value;
    
        //      setInfo({...info,[property]:value})
            
        //  }

         const handleSelectDoctor=(e)=>{
            setInfo({...info,
                doctorSpecialty:e.target.value})
        }
         const handleSelectDate=(e)=>{
                setInfo({
                    ...info,
                    date:e.target.value
                })
        }
         const handleSelectHour=(e)=>{
                setInfo({
                    ...info,
                    hour:e.target.value
                })
        }
    
        const handleSubmit = (event) => {
            event.preventDefault();
            setModalAbierto(true);
          }

          const closeModal = () => {
            setModalAbierto(false);
            setInfo({
                date:"",                     
                hour:"",                                                
                doctorSpecialty:"",
            });
            
          }
    
            return(
            <div style={{width:"fit-content", marginLeft:"25%"}}>
                <form onSubmit={handleSubmit} style={{marginTop:15, border:"solid",width:"fit-content",padding:35, borderRadius:10, }}>

                    <h2 style={{marginBottom:40,display:"flex",justifyContent:"center", color:"#307196", backgroundColor:"#D9D9D9", padding:5, borderRadius:10}}>Select your appoinment </h2>
                    <div style={{display:"flex", flexDirection:"column" }}>
                    <InputLabel id="demo-simple-select-required">Date </InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"

                            onChange={handleSelectDate}
                            sx={{ minWidth: 150,borderRadius: 2, marginRight:3, marginBottom:1 }}
                            >
                            <MenuItem value={info.date} name="date">Date: </MenuItem>
                                {dataTurnos.filter((turno) => turno.availability === "true").map((turno) => {
                                    return (
                            <MenuItem value={turno.date}>{turno.date}</MenuItem>)})}
                        </Select>
                        <InputLabel id="demo-simple-select-required">Time </InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            onChange={handleSelectHour}
                            sx={{ minWidth: 150, borderRadius: 2, marginRight:3,marginBottom:1 }}
                            >
                            <MenuItem value={info.hour} name="hour">Time: </MenuItem>
                                {dataTurnos.filter((turno) => turno.availability === "true").map((turno) => {
                                    return (
                            <MenuItem value={turno.hour}>{turno.hour}</MenuItem>)})}
                        </Select>

                        <InputLabel id="demo-simple-select-required">Speciality: </InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            onChange={handleSelectDoctor}
                            sx={{ minWidth: 150, borderRadius: 2 ,marginRight:3}}
                            >
                            <MenuItem value={info.doctorSpecialty} name="doctorSpecialty">Speciality: </MenuItem>
                                {dataTurnos.filter((turno) => turno.availability === "true").map((turno) => {
                                    return (
                            <MenuItem value={turno.doctorSpecialty}>{turno.doctorSpecialty}</MenuItem>)})}
                        </Select>
                        </div><br/>


                    <Stack direction="flex" spacing={2} >
                        {(!info.date || !info.hour || !info.doctorSpecialty) ? 
                        <Button variant="contained" disabled>RESERVE</Button>
                        :
                        <Button variant="contained" type="submit"  endIcon={<SendIcon />}>RESERVE</Button>}
                    </Stack>

                </form>

                    <Modal isOpen={modalAbierto} onRequestClose={closeModal} >
                        <div style={{border:"solid", justifyContent:"center", marginTop:"5%", borderRadius:10, paddingBottom:50}}>
                            <h2 style={{display:"flex",flexDirection:"row", justifyContent:"center", color:"#D9D9D9",backgroundColor:"#307196"}}>Info about your appoinment </h2>
                            <h3 style={{marginLeft:5}}>Date: {info.date}</h3>
                            <h3 style={{marginLeft:5}}>Time: {info.hour}</h3>
                            <h3 style={{marginLeft:5}}>Speciality: {info.doctorSpecialty}</h3>
                            <Button variant="contained" onClick={closeModal} style={{marginLeft:"10%", marginTop:"5%",scale:"1.2"}}>Cerrar</Button>
                        </div>
                    </Modal>

            </div>
        )
    }
    
     export default MedicalAppointments;