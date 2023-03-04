import "./App.css";
import React from "react";
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
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  HomeClient,
  /* Chat,
  MedicalHistory,
  MedicalAppointments,
  MyShifts,
  Profile,
  Reviews,
  Urgency,
  HomeView, */
} from "./components/HomeClient/index";
import { HomeMedic } from "./components/HomeMedic/index";
import HomeAdmin from "./components/DashboardAdmin/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Review from "./components/ChatBot/Review";
import { auth } from "./authentication/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const location = useLocation();

  const[isLogged, setIsLogged] = React.useState(false);
    
  onAuthStateChanged(auth, (user) => {
    if(user){       
      if( isLogged === false ) setIsLogged(prev => true);
    }else{
      if(isLogged === true) setIsLogged(prev => false);
    }
  })

  return (
    <div className="App">
      {location.pathname.startsWith("/HomeClient") ? (
        <HomeClient  isLogged={isLogged}/>
      ) : location.pathname.startsWith("/HomeMedic") ? (
        <HomeMedic isLogged={isLogged}/>
      ) : location.pathname.startsWith("/HomeAdmin") ? (
        <HomeAdmin isLogged={isLogged}  />
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
            <Route path="/resetPassword" element={<ResetPassword/>}/>
            <Route path='*' element={<ErrorPage/>} />
            <Route path="/totalReviews" element={<Review/>} />


          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}
export default App;
