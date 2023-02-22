import { useState,useEffect } from "react"
import { TextField,Stack  } from "@mui/material"
import style from "./SeePatients.module.css"
import swal from "sweetalert"
// patientId, doctorId, date, diagnosis
const validate = (input) => {
    let errors = {};
    if (!input.diagnosis) {
        errors.diagnosis = "Diagnosis is required";
    }
    else if (!input.reason) {
        errors.reason = "Reason is required";
    }
    else if (!input.prescription) {
        errors.prescription = "Prescription is required";
    }
    return errors;
};
const SeePatients = () => {
    const appointment ={
        id:1,
        availability:true,
        date:"2023-02-21",
        hour:"17:00:00",
        type:"sadad",
        ubication:"avellaneda",
        doctorSpecialty:"Cardiology",
        Patient:{
            id:1,
            name:"Juan",
            lastName:"Perez"
        },
        Doctor:{
            id:"b41fa1ef-1939-4281-93cb-914a180e5fe2",
            name:"Roberto",
            lastName:"Martinez",
        }
    } 

    const [newHistorial, setNewHistorial] = useState({
        patientId: appointment.Patient.id,
        doctorId: appointment.Doctor.id,
        date: appointment.date,
        diagnosis: "",
        reason: "",
        prescription: "",
    })
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState({
        diagnosis: "",
        reason: "",
        prescription: "",
    })
    
    const handleChanges = (e) => {
        setNewHistorial({ ...newHistorial, [e.target.name]: e.target.value })
        setError(validate({
            ...newHistorial,
            [e.target.name]: e.target.value
        }))
    }
    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }
    const handleSubmit = async() => {
        await swal("The medical record has been saved!", {
            icon: "success",
          });
        setNewHistorial({
            patientId: appointment.Patient.id,
            doctorId: appointment.Doctor.id,
            date: appointment.date,
            diagnosis: "",
            reason: "",
            prescription: "",
        });
        window.location.href = "http://localhost:3000/HomeMedic/Agenda";
    }
    

        
    return (
        <div style={{width:"95vw",display:"flex",justifyContent:"center",height:"100vh"}} >
            <div onClick={handleOpenModal} className={style.generalModalDiv} style={{display:openModal? "flex":"none"}}>
                <div style={{display:openModal? "flex":"none"}} className={style.modalDiv}>
                    <h3>You have provided the following information</h3>
                    <div className={style.info}>
                        <div style={{display:"flex",gap:"0.5vw"}}>
                            <p style={{fontWeight:"bold"}}>Patient: </p>
                            <p>{appointment.Patient.name} {appointment.Patient.lastName} </p> 
                        </div>
                        <div style={{display:"flex",gap:"0.5vw"}}>
                            <p style={{fontWeight:"bold"}}>Doctor:</p>
                            <p>{appointment.Doctor.name} {appointment.Doctor.lastName}</p>
                        </div>
                        <div style={{display:"flex",gap:"0.5vw"}}>
                            <p style={{fontWeight:"bold"}}>Date:</p>
                            <p>{appointment.date}</p>
                        </div>
                        <div style={{display:"flex",gap:"0.5vw"}}>
                            <p style={{fontWeight:"bold"}}>Hour:</p>
                            <p>{appointment.hour}</p>
                        </div>
                        <div style={{display:"flex",gap:"0.5vw"}}>
                            <p style={{fontWeight:"bold"}}>Diagnosis: </p>
                            <p>{newHistorial.diagnosis}</p>
                        </div>
                        <div style={{display:"flex",gap:"0.5vw"}}>
                            <p style={{fontWeight:"bold"}}>Reason: </p>
                            <p>{newHistorial.reason}</p>
                        </div>
                        <div style={{display:"flex",gap:"0.5vw"}}>
                            <p style={{fontWeight:"bold"}}>Prescription: </p>
                            <p>{newHistorial.prescription}</p>
                        </div>
                    </div>
                    <button className={style.saveButton} onClick={handleSubmit}>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        Send
                        </div>
                                        
                    </button>
                </div>
            </div>
            <div style={{width:"80%",display:"flex",flexDirection:"column",justifyContent:"flex-start",gap:"2vh",height:"95%"}}>
                <div style={{width:"90%",display:"flex",flexDirection:"column",justifyContent:"flex-start",gap:"2vh",border:" solid 3px #307196",borderRadius:"20px",padding:"0 1vw 2vh"}}>
                    <h2 style={{textAlign:"start"}}>You are attending to: {appointment.Patient.name} {appointment.Patient.lastName}</h2>
                    <h4 style={{textAlign:"start"}}>Appoinment Details</h4>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField

                                id="outlined-multiline-static"
                                label="Date"
                                defaultValue={appointment.date}
                                InputProps={{
                                    readOnly: true,
                                    }}
                                    sx={{width:"25%"}}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Hour"
                                defaultValue={appointment.hour}
                                InputProps={{
                                    readOnly: true,
                                    }}
                                sx={{width:"25%"}}
                            />
                        </Stack>
                    {error.diagnosis?
                        <TextField
                            error
                            id="outlined-multiline-static"
                            label="Diagnosis"
                            name="diagnosis"
                            multiline
                            rows={2}
                            value={newHistorial.diagnosis}
                            variant="outlined"
                            onChange={handleChanges}
                            sx={{width:"90%"}}
                            helperText={error.diagnosis}
                    />:
                        <TextField
                            id="outlined-multiline-static"
                            label="Diagnosis"
                            name="diagnosis"
                            multiline
                            rows={2}
                            value={newHistorial.diagnosis}
                            variant="outlined"
                            onChange={handleChanges}
                            sx={{width:"90%"}}
                        />
                    }
                    {error.reason?
                        <TextField
                            error
                            id="outlined-multiline-static"
                            label="Reason"
                            name="reason"
                            multiline
                            rows={2}
                            value={newHistorial.reason}
                            variant="outlined"
                            onChange={handleChanges}
                            sx={{width:"90%"}}
                            helperText={error.reason}
                        />
                    :
                        <TextField
                            id="outlined-multiline-static"
                            label="Reason"
                            name="reason"
                            multiline
                            rows={2}
                            value={newHistorial.reason}
                            variant="outlined"
                            onChange={handleChanges}
                            sx={{width:"90%"}}
                        />
                    }
                    {error.prescription?
                        <TextField
                            error
                            id="outlined-multiline-static"
                            label="Prescription"
                            name="prescription"
                            multiline
                            rows={2}
                            value={newHistorial.prescription}
                            variant="outlined"
                            onChange={handleChanges}
                            sx={{width:"90%"}}
                            helperText={error.prescription}
                        />:
                        <TextField
                            id="outlined-multiline-static"
                            label="Prescription"
                            name="prescription"
                            multiline
                            rows={2}
                            value={newHistorial.prescription}
                            variant="outlined"
                            onChange={handleChanges}
                            sx={{width:"90%"}}
                        />
                    }
                    </Stack>
                    <button 
                        onClick={handleOpenModal}
                        className={style.saveButton}
                        disabled={error.diagnosis || error.reason || error.prescription || !newHistorial.diagnosis || !newHistorial.reason || !newHistorial.prescription
                        }
                    >
                        Save
                    </button>
                </div>
                
            </div>
        </div>
    )

    
}
export default SeePatients