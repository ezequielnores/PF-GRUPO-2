import React, { useState } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Modal from 'react-modal';

function Reviews() {
    const dispatch=useDispatch();
    const [modalAbierto, setModalAbierto] = useState(false);
 
   const doctorBDD= [{
        "name":"Mario gonzalez",
        "lastName":"Buvet",
        "mail":"nicobovet@gmail.com",
        "password":"nionico",
        "birthdate":"3/11/1996",
        "image":"sdasdasdasd", 
        "location":"quilmes",
        "dni":"40009555",
        "phone":"1233123123", 
        "speciality":"Neuogy",
        "lisence":"asdasdad",
        "cv":"adad",
        "clinicMail":"nico@mail.com"
    },{
        "name":"Roberto Vella",
        "lastName":"Buvet",
        "mail":"nicobovet@gmail.com",
        "password":"nionico",
        "birthdate":"3/11/1996",
        "image":"sdasdasdasd", 
        "location":"quilmes",
        "dni":"40009555",
        "phone":"1233123123", 
        "speciality":"Neuogy",
        "lisence":"asdasdad",
        "cv":"adad",
        "clinicMail":"nico@mail.com"
    },{
        "name":"Juan Roll",
        "lastName":"Buvet",
        "mail":"nicobovet@gmail.com",
        "password":"nionico",
        "birthdate":"3/11/1996",
        "image":"sdasdasdasd", 
        "location":"quilmes",
        "dni":"40009555",
        "phone":"1233123123", 
        "speciality":"Neuogy",
        "lisence":"asdasdad",
        "cv":"adad",
        "clinicMail":"nico@mail.com"
    },{
        "name":"Ruben Bellozo",
        "lastName":"Buvet",
        "mail":"nicobovet@gmail.com",
        "password":"nionico",
        "birthdate":"3/11/1996",
        "image":"sdasdasdasd", 
        "location":"quilmes",
        "dni":"40009555",
        "phone":"1233123123", 
        "speciality":"Neuogy",
        "lisence":"asdasdad",
        "cv":"adad",
        "clinicMail":"nico@mail.com"
    }]



  const [fields, setFields]=useState({
    comment:"",
    doctors:"",
    titulo:"",
})
const changeHandler=(event)=>{
    const property=event.target.name;
    const value=event.target.value;
    
    setFields({...fields,[property]:value})}

    const handleSelectDoc=(e)=>{
        setFields({
            ...fields,
            doctors:e.target.value
        })
}

    // const submitHandler=(event)=>{
    //     event.preventDefault();
    //    dispatch(postComment(fields)).then(setModalAbierto(true))

        
    // }

    const closeModal = () => {
      setModalAbierto(false);
      setFields({
        comment:"",
        doctors:"",
        titulo:"",
    })
          .catch(err=>err)
     }

  return (
    <div>
    <form >
    
        <h2 style={{color:"#307196"}}>Please fill the fields and send us a review</h2>
        <div style={{border:"double", width:"fit-content",padding:50, display:"flex", flexDirection:"column",margin:"auto",paddingLeft:80,paddingRight:150}}>
        <InputLabel id="demo-simple-select-filled-label" sx={{marginRight:19}}>Select the doctor: </InputLabel>
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        onChange={handleSelectDoc}
        sx={{width:200}}
        variant="filled"
        >
            <MenuItem value={fields.doctors} name="date" label="Select">Date: </MenuItem>
                {doctorBDD.map((doc) => {
                    return (
            <MenuItem value={doc.name}>{doc.name}</MenuItem>)})}
        </Select>
        <br/>
      
        <div>
        <InputLabel id="demo-simple-select-filled-label" sx={{marginRight:32}}>Title: </InputLabel>
        <TextField id="filled-basic" label="Required" variant="filled" value={fields.title} name="title" sx={{marginRight:11}} />
            
        </div>
        <br /><br/>
        <div>
        <InputLabel id="demo-simple-select-filled-label" sx={{marginRight:28}}>Comment: </InputLabel>
        <TextField
          id="filled-multiline-static"
          label="Review"
          multiline
          rows={6}
          defaultValue="Default Value"
          variant="filled"
          value={fields.comment} onChange={changeHandler}
          name="comment"
          sx={{width:300}}
        /> 
        </div>
      <br/><br/>
        <Button variant="contained" endIcon={<SendIcon />} sx={{backgroundColor:"#307196"}} type="submit">Send</Button>
        </div>
    </form>

        <Modal isOpen={modalAbierto} onRequestClose={closeModal} >
        <div style={{border:"solid", justifyContent:"center", marginTop:"5%", borderRadius:10, paddingBottom:50}}>
        <h3 style={{display:"flex",flexDirection:"row", justifyContent:"center", color:"#D9D9D9",backgroundColor:"#307196"}}>Your comment has been sent, thanks for your review</h3>
        <h3 style={{marginLeft:5}}>Doctor: {fields.doctors}</h3>
        <h3 style={{marginLeft:5}}>Title: {fields.titulo}</h3>
        <h3 style={{marginLeft:5}}>Comment: {fields.comment}</h3>
        <Button variant="contained" onClick={closeModal} style={{marginLeft:"10%", marginTop:"5%",scale:"1.2"}}>Cerrar</Button>
        </div>
        </Modal>

</div>

  );
}

export default Reviews;

// onSubmit={submitHandler} 