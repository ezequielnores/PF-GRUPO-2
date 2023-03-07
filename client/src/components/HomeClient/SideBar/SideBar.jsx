import React from "react";
import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AddCardIcon from "@mui/icons-material/AddCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ForumIcon from "@mui/icons-material/Forum";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import swal from "sweetalert";
//Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../../authentication/firebase";
import { Button } from "@mui/material";

const SideBar = ({ open, handleOpen, path }) => {
  const handleLogout = async () => {
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        signOut(auth)
          .then(() => {
            localStorage.clear();
            window.location.href = "https://pf-grupo-2.vercel.app/";
          })
          .catch((error) => {
            console.log({ Error: error.message });
          });
      }
    });
  };

  return (
    <div>
      <div style={{ position: "fixed", left: "0", top: "9rem" }}>
        <Stack spacing={2}>
          <Button
            onClick={handleOpen}
            className={style.menu}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              alignSelf: "start",
            }}
          >
            <MenuIcon />
          </Button>
          <Stack
            spacing={1}
            width={open ? 200 : 45}
            style={{
              display: "flex",
              paddingLeft: "11px",
              flexDirection: "column",
              alignItems: "start",
              textAlign: "center",
            }}
          >
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
                  <ChatIcon />
                ) : (
                  <HomeIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Chat">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/Chat") ? (
                      <div
                        className={style.icon}
                        style={{ background: "#307196" }}
                      >
                        <ChatIcon style={{ color: "white" }} />
                      </div>
                    ) : (
                      <div
                        className={style.icon}
                        style={{ background: "#c2c1c1" }}
                      >
                        <ChatIcon />
                      </div>
                    )}
                    Chat
                  </div>
                ) : path.endsWith("/HomeClient/Chat") ? (
                  <ChatIcon />
                ) : (
                  <ChatIcon style={{ color: "grey" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Profile">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/Profile") ? (
                      <AccountCircleIcon />
                    ) : (
                      <AccountCircleIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>Profile</p>
                  </div>
                ) : path.endsWith("/HomeClient/Profile") ? (
                  <AccountCircleIcon />
                ) : (
                  <AccountCircleIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/MyAppointments">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/MyAppointments") ? (
                      <CalendarMonthIcon />
                    ) : (
                      <CalendarMonthIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p> My Appointments</p>
                  </div>
                ) : path.endsWith("/HomeClient/MyAppointments") ? (
                  <CalendarMonthIcon />
                ) : (
                  <CalendarMonthIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Urgency">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/Urgency") ? (
                      <MedicalServicesIcon />
                    ) : (
                      <MedicalServicesIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>Urgency</p>
                  </div>
                ) : path.endsWith("/HomeClient/Urgency") ? (
                  <MedicalServicesIcon />
                ) : (
                  <MedicalServicesIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/MedicalAppointments">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/MedicalAppointments") ? (
                      <AddCardIcon />
                    ) : (
                      <AddCardIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>Medical Appointments</p>
                  </div>
                ) : path.endsWith("/HomeClient/MedicalAppointments") ? (
                  <AddCardIcon />
                ) : (
                  <AddCardIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/MedicalHistory">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/MedicalHistory") ? (
                      <AssignmentIcon />
                    ) : (
                      <AssignmentIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>Medical History</p>
                  </div>
                ) : path.endsWith("/HomeClient/MedicalHistory") ? (
                  <AssignmentIcon />
                ) : (
                  <AssignmentIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Faq">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/Faq") ? (
                      <ForumIcon />
                    ) : (
                      <ForumIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>FAQ</p>
                  </div>
                ) : path.endsWith("/HomeClient/Faq") ? (
                  <ForumIcon />
                ) : (
                  <ForumIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Reviews">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("HomeClient/Reviews") ? (
                      <RateReviewIcon />
                    ) : (
                      <RateReviewIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>Reviews</p>
                  </div>
                ) : path.endsWith("HomeClient/Reviews") ? (
                  <RateReviewIcon />
                ) : (
                  <RateReviewIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/Suscriptions">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("HomeClient/Suscriptions") ? (
                      <RequestQuoteIcon />
                    ) : (
                      <RequestQuoteIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>Subscriptions</p>
                  </div>
                ) : path.endsWith("HomeClient/Suscriptions") ? (
                  <RequestQuoteIcon />
                ) : (
                  <RequestQuoteIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button className={style.buttonBar}>
              <Link to="/HomeClient/TestCovid">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeClient/TestCovid") ? (
                      <CoronavirusIcon />
                    ) : (
                      <CoronavirusIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>AutoTest Covid-19</p>
                  </div>
                ) : path.endsWith("/HomeClient/TestCovid") ? (
                  <CoronavirusIcon />
                ) : (
                  <CoronavirusIcon style={{ color: "#c2c1c1" }} />
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
