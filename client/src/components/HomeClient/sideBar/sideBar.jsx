import { Link } from "react-router-dom";
import {useState} from "react";
import style from "./SideBar.module.css";
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddCardIcon from '@mui/icons-material/AddCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ForumIcon from '@mui/icons-material/Forum';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
const SideBar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <div>

            <div style={{position:"fixed", left:"0",top:"9rem"}}>
                <Stack spacing={6}>

                    <Stack spacing={1} width = {open? 200 : 45}>

                    <button onClick={handleOpen} style={{textAlign:"end"}}><MenuIcon/></button>
                        <button>
                            <Link to="/HomeClient">
                            {open? 
                                    <div className={style.divbutton}>
                                        <HomeIcon />
                                        Home
                                    </div>
                                    : <HomeIcon/> 
                                }
                            </Link>
                        </button>
                        <button >
                            <Link to="/HomeClient/Profile">
                                {open? 
                                    <div className={style.divbutton}>
                                        <AccountCircleIcon />
                                        Profile
                                    </div>
                                    : <AccountCircleIcon/> 
                                }
                                </Link>
                        </button>
                        <button>
                            <Link to="/HomeClient/MyShifts">
                            {open? 
                                    <div className={style.divbutton}>
                                        <CalendarMonthIcon />
                                        My Shifts
                                    </div>
                                    : <CalendarMonthIcon /> 
                                }
                            </Link>
                        </button>
                        <button>
                            <Link to="/HomeClient/Urgency">
                            {open? 
                                    <div className={style.divbutton}>
                                        <MedicalServicesIcon />
                                        Urgency
                                    </div>
                                    : <MedicalServicesIcon /> 
                                }
                            </Link>
                        </button>
                        <button>
                            <Link to="/HomeClient/MedicalAppointments">
                            {open? 
                                    <div className={style.divbutton}>
                                        <AddCardIcon/>
                                        Medical Appointments
                                    </div>
                                    : <AddCardIcon /> 
                                }
                            </Link>
                        </button>
                        <button>
                            <Link to="/HomeClient/MedicalHistory">
                            {open? 
                                    <div className={style.divbutton}>
                                        <AssignmentIcon/>
                                        Medical History
                                    </div>
                                    : <AssignmentIcon /> 
                                }
                            </Link>
                        </button>
                        <button>
                            <Link to="/HomeClient/Chat">
                            {open? 
                                    <div className={style.divbutton}>
                                        <ForumIcon/>
                                        Chat
                                    </div>
                                    : <ForumIcon /> 
                                }
                            </Link>
                        </button>
                        <button>
                            <Link to="/HomeClient/Reviews">
                            {open? 
                                    <div className={style.divbutton}>
                                        <RateReviewIcon/>
                                        Reviews
                                    </div>
                                    : <RateReviewIcon /> 
                                }
                            </Link>
                        </button>
                    </Stack>
                    <button style={{background:"#307196"}}>
                        <Link to="/">
                        {open? 
                                    <div className={style.divbutton} style={{color:"white"}}>
                                        <LogoutIcon />
                                        Logout
                                    </div>
                                    : <LogoutIcon style={{color:"white"}} /> 
                                }
                        </Link>
                    </button>
                </Stack>
                
            </div>
        </div>
    )
}
export default SideBar;

