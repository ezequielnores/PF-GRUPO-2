import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const handleTempError = (temp) =>{
    if(temp === "") return false
    else if(temp < 37 || temp > 44){
        return true
    }else{
        return false
    }
}

const Urgency= () => {
    
    const [addSymptom, setAddSymptom] = React.useState({
        cough:false,
        fiver: false,
        nausea: false,
        headache: false,
        musclePain:false,
        fatigue:false,
        shortnessBreath:false,
        chills:false,
        nasalCongestion:false
    });
    const [symptoms, setSymptoms] = React.useState(" ")
    const[observations, setObservations] = React.useState(" ")
    const [temp, SetTemp] = React.useState(" ")
    const [errorTemp, SetErrorTemp] = React.useState(false)

    const handleChange = (event) => {
        setAddSymptom({
            ...addSymptom,
            [event.target.name]: event.target.checked,
        });
        if(event.target.checked === true){
            if(event.target.name !== "fiver") setSymptoms(symptoms + event.target.name + ", ")
            //  {
            //     console.log(temp)
            //     if (temp>=37 || temp<=44)  setSymptoms(symptoms + event.target.name + ":"+ temp + "°C, "+", ")
            //     else setSymptoms(symptoms + event.target.name + ":"+ "not specified, "+", ")
            // }
            // else setSymptoms(symptoms + event.target.name + ", ")
        }
        else{
            if(event.target.name !== "fiver") setSymptoms(symptoms.replace(event.target.name + ", ",""))
            // {
            //     if (temp === "") setSymptoms(symptoms.replace(event.target.name + ":"+ "not specified, "+", ",""))
            //     else setSymptoms(symptoms.replace(event.target.name + ":"+ temp + "°C, "+", ",""))
            // }
            // else setSymptoms(symptoms.replace(event.target.name + ", ",""))
        }
    };
    const handleObservations = (even) => {
        setObservations(even.target.value)
    }
    const handleTemp = (even) =>{
        SetTemp(even.target.value)
        SetErrorTemp(handleTempError(even.target.value))
    }
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(addSymptom)
        if (addSymptom.fiver && temp === "") setSymptoms(symptoms + "fiver: not specified")
        else if (addSymptom.fiver && temp !== "") setSymptoms(symptoms + "fiver:" + temp + "°C")
        const body = {
            patient: "Nombre del paciente", 
            symptoms: `:${symptoms}
                        Observations: ${observations}
            `
        }
        setAddSymptom({
            cough:false,
            fiver: false,
            nausea: false,
            headache: false,
            musclePain:false,
            fatigue:false,
            shortnessBreath:false,
            chills:false,
            nasalCongestion:false
        })
        setSymptoms(" ")
        setObservations(" ")
        SetTemp(" ")
        SetErrorTemp(false)
        console.log(body)
    }

    return (
        <div>
            <h2>Urgency</h2>
            <p>In this section, you can be attended by a doctor immediately 24 hours a day.</p>
            <p>Please complete the following form to be added to the waiting list.</p>
            <Stack>
                {/* <TextField
                    id="patient"
                    label="Patient"
                    defaultValue="Nombre del paciente"
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ width: 1/6 }}
                /> */}
                <Box sx={{ display: 'flex'}}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    
                    <div style={{display:"flex",width:"70vw",justifyContent:"center",alignItems:"center"}}>
                        <div style={{width:"60%"}}>
                            <FormGroup>
                            <FormLabel component="legend">Symptomatology</FormLabel>
                            <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.cough} onChange={handleChange} name="cough" />
                                        }
                                        label="Cough"
                                    />
                                    <div style={{display:"flex",justifyContent:"flex-start"}}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={addSymptom.fiver} onChange={handleChange} name="fiver" />
                                            }
                                            label="Fiver"
                                        />
                                        {addSymptom.fiver? 
                                        errorTemp?
                                            <TextField
                                                error
                                                id="Temp"
                                                label="Temperature"
                                                value={temp}
                                                onChange={handleTemp}
                                                helperText="Must be between 37 and 44 degrees"
                                                sx={{ width: 100}}
                                        />
                                            :<TextField
                                                id="Temp"
                                                label="Temperature"
                                                value={temp}
                                                onChange={handleTemp}
                                                sx={{ width: 100}}
                                                
                                        />
                                        :
                                        null
                                        }
                                    </div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.nausea} onChange={handleChange} name="nausea" />
                                        }
                                        label="Nausea"
                                    />
                                </div>
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.headache} onChange={handleChange} name="headache" />
                                        }
                                        label="Headache"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.musclePain} onChange={handleChange} name="musclePain" />
                                        }
                                        label="Muscle pain"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.fatigue} onChange={handleChange} name="fatigue" />
                                        }
                                        label="Fatigue"
                                    />
                                </div>
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.shortnessBreath} onChange={handleChange} name="shortnessBreath" />
                                        }
                                        label="Shortness of breath"
                                    /><FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.chills} onChange={handleChange} name="chills" />
                                        }
                                        label="Chills"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={addSymptom.nasalCongestion} onChange={handleChange} name="nasalCongestion" />
                                        }
                                        label="Nasal congestion."
                                    />
                                </div>
                            </div>
                            </FormGroup>
                        </div>
                        <TextField
                                id="comment"
                                label="Observations"
                                value={observations}
                                onChange={handleObservations}
                                multiline
                                sx={{ width: 1/2, height: 1/2 }}
                            />
                    </div>
                    </FormControl>
                </Box>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                {errorTemp?
                    <Button variant="contained" disabled sx={{width:1/9}}>Submit</Button>:
                    <Button variant="contained" onClick={handleSubmit} sx={{width:1/9}}>Submit</Button>
                }

                    
                </div>
            </Stack>
        </div>
    )
}
export default Urgency;