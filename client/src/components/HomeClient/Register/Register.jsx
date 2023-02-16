import React from "react";
import { TextField, Button } from '@mui/material';

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
            if(/\d/.test(form[name]) || /\W/.test(form[name])){
                setError({ ...error, [name]: 'Invalid Name' });
            } else setError({...error, [name]:""});
        };

        if(name === 'phone'){
            if(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(form[name])){
                setError({ ...error, [name]: 'Invalid Phone' });
            };
        }
    };

    return (
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"85vh", justifyContent:"space-between", alignItems:"center" }} >

            <h2>Pacient Register</h2>

            <TextField error={error.name} label="Name" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}  name='name' value={form.name}  />
            
            <TextField error={error.surname} label="Surname" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='surname' value={form.surname} />

            <TextField error={error.phone} label="Phone" style={{width:"40vh"}}  onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='phone' value={form.phone}  />

            <TextField error={error.documentID} label="Document ID"  style={{width:"40vh"}}  onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='documentID' value={form.documentID}  />

            <TextField error={error.birthday} label="Birthday" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='birthday' value={form.birthday}  />

            <TextField error={error.weight} label="Weight" style={{width:"40vh"}}  onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='weight' value={form.weight}  />
            
            <TextField error={error.height} label="Height" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='height' value={form.phone}  />

            <TextField error={error.allergies} label="Allergies" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='allergies' value={form.allergies}  />
            
            <TextField error={error.location} label="Location" style={{width:"40vh"}} onChange={(e) => onChangeHandler(e.target.name, e.target.value)}   name='location' value={form.location}  />
           
            <Button style={{border:"1px solid",}}> Save </Button>

        </div>
    );
};/* 
      name,
      surname,
      mail,
      password,
      birthday,
      weight,
      height,
      bmi,
      allergies,
      chronicDiseases,
      photo,
      location,
      dni,
      phone,

      socialSecurity,
      plan,
      active,
      historyPayment */

export default Register;