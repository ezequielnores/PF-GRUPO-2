import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import dayjs from 'dayjs';
const MyAppointments = () => {
    const date = Date.now();
    const [value, setValue] = React.useState(dayjs(date));
    const [open, setOpen] = React.useState(false);
    const appointments = [
        {
            id: 1,
            doctor: "Dr. Juan Perez",
            date: "2023-02-24",
            hour: "10:00",
            type: "online",
            speciality:"Cardiologist",
            onSite:""
        },
        {
            id: 2,
            doctor: "Dr. Lopez",
            date: "2023-02-23",
            hour: "10:00",
            type: "on Site",
            speciality:"Oncology",
            onSite:"Av. Siempre Viva 742"
        },
    ];
    return (
        <div style={{display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",padding:"5rem"}}>
            <div>
                <h1>My Appointments</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Appointmen</TableCell>
                            <TableCell align="right">Doctor&nbsp;</TableCell>
                            <TableCell align="right">Date&nbsp;</TableCell>
                            <TableCell align="right">Hour&nbsp;</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {appointments.map((appointment) => (
                            <React.Fragment>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                {appointment.id}
                                </TableCell>
                                <TableCell align="right">{appointment.doctor}</TableCell>
                                <TableCell align="right">{appointment.date}</TableCell>
                                <TableCell align="right">{appointment.hour}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        More Information
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell><div style={{display:"flex",flexDirection:"row",gap:"0.2rem"}}>
                                                    <p style={{fontWeight:"bold"}}> Speciality:</p> 
                                                    <p>{appointment.speciality}</p>
                                                </div></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div style={{display:"flex",flexDirection:"row",gap:"0.2rem"}}>
                                                    <p style={{fontWeight:"bold"}}> Type:</p> 
                                                    <p>{appointment.type}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {appointment.type === "on Site" ? // cambiar por el tipo de turno de la bd
                                            <TableRow>
                                                <TableCell>
                                                    <div style={{display:"flex",flexDirection:"row",gap:"0.2rem"}}>
                                                        <p style={{fontWeight:"bold"}}> Address:</p>
                                                        <p>{appointment.onSite}</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        : null}
                                        </TableHead>
                                        <TableBody>
                                        </TableBody>
                                    </Table>
                                    </Box>
                                </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </div>
            <div>
                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30" // cambiar defaultValue por el dia y hora del proximo turno
                    sx={{ width: 250 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="year"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            
        </div>
    )
}
export default MyAppointments;