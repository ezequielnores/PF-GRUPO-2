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


function Reviews() {
    const dispatch=useDispatch();
    const [modalAbierto, setModalAbierto] = useState(false);
    const doctors = useSelector(state => state.doctor.list);
    const [name,setDoctor]=useState({ doctorId: '', name: '' })

    useEffect(() => {
      dispatch(docrtorGetAll());
  }, [])


  const handleSelectDoc = (event) => {
    const id = event.target.value;
    const doctor = doctors.find((e) => e.id === id);
    setDoctor({ doctorId:id, name: doctor.name });
    setFields({
      ...fields,
      doctors:event.target.value
  })
  };

  const [fields, setFields]=useState({
    comment:"",
    doctors:"",
    titulo:"",
})
const changeHandler=(event)=>{
    const property=event.target.name;
    const value=event.target.value;
    
    setFields({...fields,[property]:value})}


    const submitHandler=(event)=>{
        event.preventDefault();
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
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        onChange={handleSelectDoc}
        sx={{width:200}}
        variant="filled"
        >
            <MenuItem value={fields.doctors} name="date" label="Select">Date: </MenuItem>
                {doctors?.map((doc) => {
                    return (
            <MenuItem value={doc.id}>{doc.name}</MenuItem>)})}
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
        <h3 style={{marginLeft:5}}>Doctor: {name.name}</h3>
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