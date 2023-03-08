import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import swal from 'sweetalert';

const Rows = ({ appointment,setDeleteAppointment,deleteAppointment }) => {
    const [open, setOpen] = React.useState(false);
    const handleDelete = () => {
        swal({
            title: "Are you sure ?",
            text: "Once deleted, you will not be able to recover this appointment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                
                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/turns/delete/${appointment.id}`)
                .then(res => {
 
                    swal("Appointment deleted!", {
                        icon: "success",
                    });
                    setDeleteAppointment(!deleteAppointment)
                })
                .catch(err => {
 
                })
            } 
            });
    }


    return(
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
                {/* <TableCell component="th" scope="row">
                {appointment.id}
                </TableCell> */}
                <TableCell align="right" sx={{fontSize:15}}>{appointment.doctor.name} {appointment.doctor.lastName}</TableCell>
                <TableCell align="right" sx={{fontSize:15}}>{appointment.date}</TableCell>
                <TableCell align="right" sx={{fontSize:15}}>{appointment.hour}</TableCell>
                <TableCell align="right" sx={{fontSize:15}}><DeleteForeverIcon onClick={handleDelete}/></TableCell>
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
                            <TableCell><div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                                    <div style={{display:"flex",gap:"0.2rem"}}>

                                        <p style={{fontWeight:"bold"}}> Speciality:</p> 
                                        <p>{appointment.doctorSpecialty}</p>
                                    </div>
                                    <div style={{display:"flex",gap:"0.2rem"}}>
                                        <p style={{fontWeight:"bold"}}>     Type:</p> 
                                        <p>{appointment.type}</p>
                                    </div>
                                    {appointment.type === "on Site"?
                                    <div style={{display:"flex",gap:"0.2rem"}}>
                                        <p style={{fontWeight:"bold"}}>Address:</p>
                                        <p>{appointment.onSite}</p>
                                        
                                    </div>
                                    :null}
                                </div>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default Rows;