import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Modal from 'react-modal';
import {docrtorGetAll} from "../../../redux/reducers/doctorReducer";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {postComments} from "../../../redux/reducers/commentsReducer"


function Reviews() {
    const dispatch=useDispatch();
    const [modalAbierto, setModalAbierto] = useState(false);
    const doctors = useSelector(state => state.doctor.list);
    const [name,setDoctor]=useState({ doctorId: '', name: '' , lastName:''})
    const [value, setValue] = React.useState(0);
    const patientIdLocal = localStorage.getItem("id");

    useEffect(() => {
      dispatch(docrtorGetAll());
  }, [])


  const handleSelectDoc = (event) => {
    const id = event.target.value;
    const doctor = doctors.find((e) => e.id === id);
    setDoctor({ doctorId:id, name: doctor.name, lastName:doctor.lastName });
  };

  const [fields, setFields]=useState({
    message:"",
    title:"",
})

const changeHandler=(event)=>{
    const property=event.target.name;
    const value=event.target.value;
    
    setFields({...fields,[property]:value})
  }

    const submitHandler=(event)=>{
        event.preventDefault();
        dispatch(postComments({message:fields.message,
          title:fields.title,
          doctorId:name.doctorId,
          PatientId:patientIdLocal,
          doctorName:name.name,
          doctorLastName:name.lastName,
          rating:value}))
          
       setModalAbierto(true)
   
    }

    const closeModal = () => {
      setModalAbierto(false);

     }



  return (
    <div>
    <form onSubmit={submitHandler}>
    
        <h2 style={{color:"#307196"}}>Please fill the fields and send us a review</h2>
        <div style={{border:"double", width:"fit-content",padding:50, display:"flex", flexDirection:"column",margin:"auto",paddingLeft:80,paddingRight:150}}>
        <InputLabel id="demo-simple-select-filled-label" sx={{marginRight:19}}>Select the doctor: </InputLabel>
        <div>
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        onChange={handleSelectDoc}
        sx={{width:200, marginLeft:12}}
        variant="filled"
        >
            <MenuItem value={name} name="date" label="Select"></MenuItem>
                {doctors?.map((doc) => {
                    return (
            <MenuItem value={doc.id}>{doc.name}  {doc.lastName}</MenuItem>)})}
        </Select>
          <Rating
        name="simple-controlled"
        value={value}
        sx={{marginLeft:5}}
        size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </div>
        <br/>
      
        <div>
        <InputLabel id="demo-simple-select-filled-label" sx={{marginRight:32}}>Title: </InputLabel>
        <TextField id="filled-basic" variant="filled" value={fields.title} name="title" sx={{marginRight:11,width:"fit-content"}}onChange={changeHandler}  />
            
        </div>
        <br /><br/>
        <div>
        <InputLabel id="demo-simple-select-filled-label" sx={{marginRight:28}}>Comment: </InputLabel>
        <TextField
          id="filled-multiline-static"
          multiline
          rows={6}
          defaultValue="Default Value"
          variant="filled"
          value={fields.message} onChange={changeHandler}
          name="message"
          sx={{width:300}}
        /> 
        </div>
      <br/><br/>
      {(!name.name || !name.lastName || !doctors.length || !value || !fields.title || !fields.message)?
      (<Button variant="contained" disabled>Send</Button>) : 
        <Button variant="contained" endIcon={<SendIcon />} sx={{backgroundColor:"#307196",marginLeft:9}} type="submit">Send</Button>}
        </div>
    </form>

        <Modal isOpen={modalAbierto} onRequestClose={closeModal} >
        <div style={{border:"solid", justifyContent:"center", marginTop:"5%", borderRadius:10, paddingBottom:50}}>
        <h2 style={{display:"flex",flexDirection:"row", justifyContent:"center", color:"#D9D9D9",backgroundColor:"#307196"}}>Your comment has been sent, thanks for your review</h2>
        <h3 style={{marginLeft:5}}>Doctor: {name.name} {name.lastName}</h3>
        <h3 style={{marginLeft:5}}>Rating: {value} stars</h3>
        <h3 style={{marginLeft:5}}>Title: {fields.title}</h3>
        <h3 style={{marginLeft:5}}>Comment: {fields.message}</h3>


        
        <Button variant="contained" onClick={closeModal} style={{marginLeft:"10%", marginTop:"5%",scale:"1.2"}}>Cerrar</Button>
        </div>
        </Modal>

</div>

  );
}

export default Reviews;


