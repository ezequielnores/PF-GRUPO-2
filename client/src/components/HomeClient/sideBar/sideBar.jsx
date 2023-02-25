import React from "react";
import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AddCardIcon from "@mui/icons-material/AddCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ForumIcon from "@mui/icons-material/Forum";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import swal from "sweetalert";
//Firebase
import { signOut } from "firebase/auth";
import { auth } from '../../../index';

const SideBar = ({ open, handleOpen, path }) => {
    const handleLogout = async () => {
      swal({
        title: "Are you sure you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          signOut(auth).then(()=>{
          localStorage.clear();
          window.location.href = "http://localhost:3000/";
          }).catch((error) => {
            console.log({Error: error.message});
          })
        }
      });
  };

  return (
    <div>
      <div style={{ position: "fixed", left: "0", top: "9rem" }}>
        <Stack spacing={6}>
          <Stack spacing={1} width={open ? 200 : 45}>
            <button onClick={handleOpen} className={style.menu}>
              <MenuIcon />
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <HomeIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <HomeIcon />
                      </div>
                    )}
                    Home
                  </div>
                ) : path.endsWith("/HomeClient") ? (
                  <HomeIcon />
                ) : (
                  <HomeIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Profile">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/Profile") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <AccountCircleIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <AccountCircleIcon />
                      </div>
                    )}
                    Profile
                  </div>
                ) : path.endsWith("/HomeClient/Profile") ? (
                  <AccountCircleIcon />
                ) : (
                  <AccountCircleIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/MyAppointments">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/MyAppointments") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <CalendarMonthIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <CalendarMonthIcon />
                      </div>
                    )}
                    My Appointments
                  </div>
                ) : path.endsWith("/HomeClient/MyAppointments") ? (
                  <CalendarMonthIcon />
                ) : (
                  <CalendarMonthIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Urgency">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/Urgency") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <MedicalServicesIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <MedicalServicesIcon />
                      </div>
                    )}
                    Urgency
                  </div>
                ) : path.endsWith("/HomeClient/Urgency") ? (
                  <MedicalServicesIcon />
                ) : (
                  <MedicalServicesIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/MedicalAppointments">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/MedicalAppointments") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <AddCardIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <AddCardIcon />
                      </div>
                    )}
                    Medical Appointments
                  </div>
                ) : path.endsWith("/HomeClient/MedicalAppointments") ? (
                  <AddCardIcon />
                ) : (
                  <AddCardIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/MedicalHistory">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/MedicalHistory") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <AssignmentIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <AssignmentIcon />
                      </div>
                    )}
                    Medical History
                  </div>
                ) : path.endsWith("/HomeClient/MedicalHistory") ? (
                  <AssignmentIcon />
                ) : (
                  <AssignmentIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Faq">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/Faq") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <ForumIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <ForumIcon />
                      </div>
                    )}
                    FAQ
                  </div>
                ) : path.endsWith("/HomeClient/Faq") ? (
                  <ForumIcon />
                ) : (
                  <ForumIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Reviews">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("HomeClient/Reviews") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <RateReviewIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <RateReviewIcon />
                      </div>
                    )}
                    Reviews
                  </div>
                ) : path.endsWith("HomeClient/Reviews") ? (
                  <RateReviewIcon />
                ) : (
                  <RateReviewIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Suscriptions">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("HomeClient/Suscriptions") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <RequestQuoteIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <RequestQuoteIcon />
                      </div>
                    )}
                    Suscriptions
                  </div>
                ) : path.endsWith("HomeClient/Suscriptions") ? (
                  <RequestQuoteIcon />
                ) : (
                  <RequestQuoteIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
          </Stack>
          <button
            type="button"
            className={style.buttonOut}
            style={{ width: open ? "9vw" : "2vw" }}
            onClick={handleLogout}
          >
            {/* <Link to="/" > */}
            {open ? (
              <div className={style.divbutton} style={{ color: "white" }}>
                <LogoutIcon />
                Logout
              </div>
            ) : (
              <LogoutIcon style={{ color: "white" }} />
            )}
            {/* </Link> */}
          </button>
        </Stack>
      </div>
    </div>
  );
};
export default SideBar;