import "./App.css";
//components
import Landing from "./components/landing/landing";
import About from "./components/About/about";
import Blog from "./components/blog/blog";
import Services from "./components/serv/services";
import Work from "./components/work/work";
import LoginClient from "./components/LoginClient/LoginClient";
import LoginMedic from "./components/LoginMedic/LoginMedic";
import { Route, Routes } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {
   Chat, HomeClient, MedicalHistory, MedicalAppointments, MyShifts, Profile, Reviews, Urgency 
} from "./components/HomeClient/index";
import {Agenda, HomeMedic,MedicalEmergency,ProfileMedic,ReviewsMedic } from "./components/HomeMedic/index";


function App() {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <div className="App">
        {location.pathname.startsWith("/HomeClient") && <HomeClient/> }
        {location.pathname.startsWith("/HomeMedic") && <HomeMedic/> }
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/work" element={<Work />} />
        <Route path="/loginClient" element={<LoginClient />} />
        <Route path="/loginMedic" element={<LoginMedic />} />
        
      
        <Route path="/HomeClient/Profile" element = {<Profile />}/> 
        <Route path="/HomeClient/MyShifts" element = {<MyShifts />}/> 
        <Route path="/HomeClient/Chat" element = {<Chat />}/> 
        <Route path="/HomeClient/MedicalHistory" element = {<MedicalHistory />}/>
        <Route path="/HomeClient/MedicalAppointments" element = {<MedicalAppointments/>}/> 
        <Route path="/HomeClient/Reviews" element = {<Reviews />}/>
        <Route path="/HomeClient/Urgency" element = {<Urgency />}/>








        <Route path="/HomeMedic/Profile" element = {<ProfileMedic />}/> 
        <Route path="/HomeMedic/Agenda" element = {<Agenda />}/> 
        <Route path="/HomeMedic/MedicalEmergency" element = {<MedicalEmergency />}/> 
        <Route path="/HomeMedic/Reviews" element = {<ReviewsMedic />}/>

      </Routes>
    </div>
  );
}
export default App;
