import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Rows from './Rows';
import dayjs from 'dayjs';
import style from './MyAppointments.module.css';

const MyAppointments = () => {
    const date = Date.now();
    const appointmentsRedux =
        [
            {
                id: 1,
                doctor: "Dr. Juan Perez",
                date: "2023-02-24",
                hour: "09:15",
                type: "online",
                speciality:"Cardiologist",
                onSite:""
            },
            {
                id: 2,
                doctor: "Dr. Lopez",
                date: "2023-02-24",
                hour: "09:00",
                type: "on Site",
                speciality:"Oncology",
                onSite:"Av. Siempre Viva 742"
            },
            {
                id: 3,
                doctor: "Dr. josé Rodriguez",
                date: "2023-02-24",
                hour: "08:00",
                type: "on Site",
                speciality:"Oncology",
                onSite:"Av. Siempre Viva 742"
            },
            {
                id: 4,
                doctor: "Dr. Juan Perez",
                date: "2023-04-24",
                hour: "09:15",
                type: "online",
                speciality:"Cardiologist",
                onSite:""
            },
            {
                id: 5,
                doctor: "Dr. Lopez",
                date: "2023-06-24",
                hour: "09:00",
                type: "on Site",
                speciality:"Oncology",
                onSite:"Av. Siempre Viva 742"
            },
            {
                id: 6,
                doctor: "Dr. josé Rodriguez",
                date: "2023-05-24",
                hour: "08:00",
                type: "on Site",
                speciality:"Oncology",
                onSite:"Av. Siempre Viva 742"
            },
        ];
    var Doctors = Array.from(new Set (appointmentsRedux.map(appointment => appointment.doctor)));
    const Specialities = Array.from(new Set (appointmentsRedux.map(appointment => appointment.speciality)));
    const Types = Array.from(new Set (appointmentsRedux.map(appointment => appointment.type)));

    var sortAppointments = (appointments) => {
            appointments = appointments?.sort((a,b) => {
                const dateA = new Date(a.date+"T"+a.hour+":00");
                const dateB = new Date(b.date+"T"+b.hour+":00");
                if (dateA < dateB) {
                    return -1;
                }
                return 1;
            }); // ordenar por fecha y hora;
            return appointments;
    }
    const [value, setValue] = React.useState(dayjs(date));
    const [page, setPage] = React.useState(0);
    const [filtered , setFiltered] = React.useState(false);
    const [filteredDate, setFilteredDate] = React.useState(false);
    const [appointments, setAppointments] = React.useState(sortAppointments(appointmentsRedux));

    const [filterType, setFilterType] = React.useState("");

    const handleChangeFilter = (event) => {
        setFilteredDate(false)
        setValue(dayjs(date));
        setAppointments(sortAppointments(appointmentsRedux));
    }; 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const handleChangeDate = (newValue) => {
        setValue(newValue);
        setFilteredDate(true);
        setAppointments(sortAppointments(appointmentsRedux.filter(appointment => appointment.date === (dayjs(newValue.$d).format('YYYY-MM-DD')))));
    };
    
    const handleFilter = () => {
    
    }
        
    let nextAppointmentDate 
    if(appointments.length === 0) nextAppointmentDate = "No appointments";
    else nextAppointmentDate = appointments[0].date+"  "+appointments[0].hour;

    return (
        <div>
            
            <div style={{display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between",padding:"0 2rem 0 5rem"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"space-around",gap:"1rem",width:"100%"}}>
                <h2>My Appointments</h2>
                <TextField
                        id="outlined-read-only-input"
                        label="Next Appointment"
                        defaultValue = {nextAppointmentDate}
                        sx={{ width: 250 }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                <div style={{width:"100%",display:"flex", flexDirection:"column"}}>
                    <div style={{width:"100%",display:"flex",justifyContent:"flex-start",gap:"0.5rem"}}>
                        {filteredDate?<button 
                            className={style.buttonfilter}
                            onClick={handleChangeFilter}>{(dayjs(value.$d).format('YYYY-MM-DD'))} x</button>:null}
                    </div>
                    <TableContainer component={Paper} sx={{width:1/1}} >
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow  >
                                <TableCell sx={{bgcolor: 'info.main'}}/>
                                <TableCell  align="right" sx={{fontWeight:"Bold",fontSize:20,bgcolor: 'info.main'}}>Doctor&nbsp;</TableCell>
                                <TableCell  align="right" sx={{fontWeight:"Bold",fontSize:20,bgcolor: 'info.main'}}>Date&nbsp;</TableCell>
                                <TableCell  align="right" sx={{fontWeight:"Bold",fontSize:20,bgcolor: 'info.main'}}>Hour&nbsp;</TableCell>
                                <TableCell sx={{bgcolor: 'info.main'}}/>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {appointments[0]?
                                
                                appointments.slice(page*4,(page*4)+4).map((appointment) => (
                                <Rows key={appointment.id} appointment={appointment}/>
                                ))
                                :
                                <TableRow>
                                    <TableCell>No appointments</TableCell>
                                </TableRow>

                            }
                            </TableBody>
                        </Table>
                        <TablePagination
                                component="div"
                                count={appointments.length}
                                rowsPerPage= {4}
                                page={page}
                                labelRowsPerPage = {""}
                                rowsPerPageOptions = {""}
                                onPageChange={handleChangePage}
                        />
                    </TableContainer>
                </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",justifyItems:"flex-start",alignContent:"flex-start"}}>
                    <div  style={{height:"300px"}}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                openTo="day"
                                value={value}
                                onChange={handleChangeDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default MyAppointments;