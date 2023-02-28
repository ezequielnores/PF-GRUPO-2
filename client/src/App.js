import "./App.css";
//components
import Navbar from "./components/landing/navbar/navBar";
import Footer from "./components/landing/footer/footer";
import Landing from "./components/landing/landing";
import About from "./components/About/about";
import Blog from "./components/blog/blog";
import NoteOne from "./components/blog/note1/note";
import NoteTwo from "./components/blog/note2/note";
import NoteThree from "./components/blog/note 3/note";
import Services from "./components/serv/services";
import Work from "./components/work/work";
import LoginClient from "./components/LoginClient/LoginClient";
import MedicForm from "./components/medicWorkForm/medicForm";
import Register from "./components/HomeClient/Register/Register";
import LoginMedic from "./components/LoginMedic/LoginMedic";
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Chat,
  HomeClient,
  MedicalHistory,
  MedicalAppointments,
  MyShifts,
  Profile,
  Reviews,
  Urgency,
  HomeView,
} from "./components/HomeClient/index";
import { HomeMedic } from "./components/HomeMedic/index";
import HomeAdmin from "./components/DashboardAdmin/Home";
import Contenido from "./components/Contenido/Contenido"

function App() {
const location = useLocation(); 

  return (
    <div className="App">
      {location.pathname.startsWith("/HomeClient") ? (
        <HomeClient />
      ) : location.pathname.startsWith("/HomeMedic") ? (
        <HomeMedic />
      ) : location.pathname.startsWith("/HomeAdmin") ? (
        <HomeAdmin />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/noteOne" element={<NoteOne />} />
            <Route path="/blog/noteTwo" element={<NoteTwo />} />
            <Route path="/blog/noteThree" element={<NoteThree />} />
            <Route path="/work" element={<Work />} />
            <Route path="/loginClient" element={<LoginClient />} />
            <Route path="/loginClient" element={<LoginClient />} />
            <Route path="/work/registerForm" element={<MedicForm />} />
            <Route path="/loginMedic" element={<LoginMedic />} />

            <Route path="/register" element={<Register />}/>
            <Route path="/loginAdmin" element={<LoginAdmin />}/>


          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}
export default App;
