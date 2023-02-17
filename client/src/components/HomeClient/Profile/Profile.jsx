import React from 'react';
import{patientGetAll,patientGetDetail} from "../../../redux/reducers/patientReducer";
import {useSelector, useDispatch} from "react-redux";
// import {useParams} from "react-router-dom";
import { useEffect } from 'react';
import style from "./Profile.module.css";
import GraficIMC from './GraficIMC';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const Profile = () => {
    const patientDetail = useSelector(state => state.patient.detail);

     const dispatch=useDispatch();


      useEffect(()=>{
          dispatch(patientGetDetail(1))
      },[])

    return (
        <div className={style.container}>
            <div className={style.container1}>
            <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }} src="data:image/jpeg;base64,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" />

                <br/>
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    spacing={2}
                    >
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Item sx={{backgroundColor:"#D9D9D9", color:"#307196"}}>Surname:</Item>
                            <Item sx={{marginLeft:3}}>{patientDetail.data?.surname} </Item>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Item sx={{backgroundColor:"#D9D9D9", color:"#307196"}}>DNI:</Item>
                            <Item sx={{marginLeft:3}}>{patientDetail.data?.dni} </Item>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Item sx={{backgroundColor:"#D9D9D9", color:"#307196"}}>Mail:</Item>
                            <Item sx={{marginLeft:3}}>{patientDetail.data?.mail} </Item>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Item sx={{backgroundColor:"#D9D9D9", color:"#307196"}}>Date:</Item>
                            <Item sx={{marginLeft:3}}>{patientDetail.data?.birthday} </Item>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Item sx={{backgroundColor:"#D9D9D9", color:"#307196"}}>Weigth:</Item>
                            <Item sx={{marginLeft:3}}>{patientDetail.data?.weight} </Item>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Item sx={{backgroundColor:"#D9D9D9", color:"#307196"}}>Heigth:</Item>
                            <Item sx={{marginLeft:3}}>{patientDetail.data?.heigth} </Item>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Item sx={{backgroundColor:"#D9D9D9", color:"#307196"}}>Plan:</Item>
                            <Item sx={{marginLeft:3}}>{patientDetail.data?.plan} </Item>
                        </div>
                </Stack>
            </div>
            <div>
            <div className={style.nombre}>
                <h2>{patientDetail.data?.name}</h2>
            </div>

            <div className={style.grafica}>
                <GraficIMC />
            </div>
            </div>

        </div>
    )
}
export default Profile;



const infoPaciente=[{
    id:1,
    name:"Nicolas",
    surname:"Bouvet",
    mail:"asd@gmail.com",
    password:"abcd",
    birthday:"03/11/1996",
    weight:"70",
    height:"170",
    bmi:"23",
    alergies:"no",
    chronicDiseases:"no",
    photo:"sadas",
    location:"quilmes",
    dni:"4123123",
    phone:"123123213",
    socialSecurity:"asdad",
    plan:"premium",
    active:true,
    historyPayment: ""},
    {
    name:"Ramon",
    id:2,
    surname:"Bouasdvet",
    mail:"aasdsd@gmail.com",
    password:"abcd",
    birthday:"03/11/1996",
    weight:"70",
    height:"170",
    bmi:"23",
    alergies:"no",
    chronicDiseases:"no",
    photo:"sadas",
    location:"quilmes",
    dni:"4123123",
    phone:"123123213",
    socialSecurity:"asdad",
    plan:"premium",
    active:true,
    historyPayment: ""}
]