import SideBar from "../SideBar/SideBar";
import Avatar from '@mui/material/Avatar';
import { deepOrange} from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import logoICare from "../../../assets/logoiCare.png";
import { useLocation } from "react-router-dom";
import {
    Chat,
    MedicalHistory,
    MedicalAppointments,
    MyShifts,
    Profile,
    Reviews,
    Urgency,
    HomeView,
} from "../index";
const Home = () => {
    const location = useLocation();
    return (
        <div style={{position:"relative"}}>
            <img style={{width:"4rem",position:"absolute",top:"0.5rem",left:"4.3rem"}} src={logoICare}/>
            <Stack style={{position:"absolute", top:"0", right:"0",height:"5rem",width:"85vw",background:"rgba(64, 184,200,0.5)",display:"flex",justifyContent:"flex-end",padding:"1rem 2rem",boxSizing:"border-box"}} direction="row" spacing={2}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                    <p style={{margin:"0",fontWeight:"bolder",fontSize:"1.1rem"}}>Nombre de usuario</p>
                    <p style={{margin:"0",fontSize:"0.9rem",fontWeight:"500",color:"gray"}}>Plan del usuario</p>
                </div>
                
                <Avatar sx={{ bgcolor: deepOrange[500], width:55, height:55}} >
                    N 
                    {/* cambiar cuando tenga la imagen del usuario */}
                </Avatar>
            </Stack> 
            <SideBar />
            <div style={{position:"absolute",top:"6rem",width:"85vw",right:"0"}}>
                {location.pathname.endsWith("/HomeClient") && <HomeView />}
                {location.pathname.endsWith("/HomeClient/Profile") && <Profile />}
                {location.pathname.endsWith("/HomeClient/MyShifts") && <MyShifts />}
                {location.pathname.endsWith("/HomeClient/Urgency") && <Urgency />}
                {location.pathname.endsWith("/HomeClient/MedicalAppointments") && <MedicalAppointments />}
                {location.pathname.endsWith("/HomeClient/MedicalHistory") && <MedicalHistory />}
                {location.pathname.endsWith("/HomeClient/Reviews") && <Reviews />}
                {location.pathname.endsWith("/HomeClient/Chat") && <Chat />}
            </div>
            
        </div>
    )
}
export default Home;