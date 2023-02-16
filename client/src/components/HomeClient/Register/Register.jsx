import React from "react";
import { TextField, Button } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'

const Register = () => {
    const [form, setForm] = React.useState({
        name: "",
        surname:"",
        phone:"",
        weight:"",
        height:"",
        allergies:"",
        birthday:"",
        documentID:"",
        location:""

    });

    const [error, setError] = React.useState({
        name: "",
        surname:"",
        phone:"",
        weight:"",
        height:"",
        allergies:"",
        birthday:"",
        documentID:"",
        location:""
    })

    const onChangeHandler = (name, value) => {
        setForm({ ...form, [name]: value });

        validateForm({ ...form, [name]: value }, name)
    };

    const validateForm = (form, name) => {

        if(name === 'name' || name === 'surname'){
            if(/\d/.test(form[name]) /* || /\W/.test(form[name]) */){
                setError({ ...error, [name]: 'Input allows only characters' });
            } else setError({...error, [name]:""});
        };

        if(name === 'phone'){
            if(/\D/.test(form[name])){
                setError({ ...error, [name]: 'Invalid Phone' });
            }else{
                setError({ ...error, [name]: '' });
            }
        }
    };

    return (
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"85vh", justifyContent:"space-between", alignItems:"center" }} >

            <h2>Pacient Register</h2>


            <TextField error={error.name} label="Name" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}  name='name' value={form.name}  />
            
            <TextField error={error.surname} label="Surname" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='surname' value={form.surname} />

            <TextField error={error.documentID} label="Document ID"  style={{width:"40vh"}}  onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='documentID' value={form.documentID}  />

            <TextField error={error.birthday} label="Birthday" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='birthday' value={form.birthday}  />

            <TextField error={error.weight} label="Weight" style={{width:"40vh"}}  onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='weight' value={form.weight}  />
            
            <TextField error={error.height} label="Height" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='height' value={form.phone}  />

            <TextField error={error.allergies} label="Allergies" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='allergies' value={form.allergies}  />
            
            <TextField error={error.location} label="Location" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='location' value={form.location}  />
            
            {/* <MuiTelInput label="Phone" fullWidth value={value} onChange={(e) => onChangeHandler(e.target.name, e.target.value)} /> */}

            <MuiTelInput error={error.phone} label="Phone" style={{width:"40vh"}}  onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='phone' value={form.phone}  />
           
            <Button style={{border:"1px solid",}}> Save </Button>

        </div>
    );
};

export default Register;