import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import swal from "sweetalert";

const SideBar = ({ open, handleOpen, path }) => {
  //delete id de localstorage, deslogeo
  const handleLogOut = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("idMedic");
        window.location.href = "http://localhost:3000/";
      }
    });
  };
  return (
    <div>
      <div style={{ position: "fixed", left: "0", top: "9rem" }}>
        <Stack spacing={6}>
          <Stack spacing={1} width={open ? 200 : 45}>
            <button
              onClick={handleOpen}
              style={{
                textAlign: "end",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <MenuIcon />
            </button>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeMedic/Profile">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeMedic/Profile") ? (
                      <AccountCircleIcon />
                    ) : (
                      <AccountCircleIcon style={{ color: "#c2c1c1" }} />
                    )}
                    Profile
                  </div>
                ) : path.endsWith("/HomeMedic/Profile") ? (
                  <AccountCircleIcon />
                ) : (
                  <AccountCircleIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeMedic/Agenda">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeMedic/Agenda") ? (
                      <CalendarMonthIcon />
                    ) : (
                      <CalendarMonthIcon style={{ color: "#c2c1c1" }} />
                    )}
                    My Appointments
                  </div>
                ) : path.endsWith("/HomeMedic/Agenda") ? (
                  <CalendarMonthIcon />
                ) : (
                  <CalendarMonthIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeMedic/MedicalEmergency">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeMedic/MedicalEmergency") ? (
                      <MedicalServicesIcon />
                    ) : (
                      <MedicalServicesIcon style={{ color: "#c2c1c1" }} />
                    )}
                    Urgency
                  </div>
                ) : path.endsWith("/HomeMedic/MedicalEmergency") ? (
                  <MedicalServicesIcon />
                ) : (
                  <MedicalServicesIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeMedic/Reviews">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeMedic/Reviews") ? (
                      <RateReviewIcon />
                    ) : (
                      <RateReviewIcon style={{ color: "#c2c1c1" }} />
                    )}
                    Reviews
                  </div>
                ) : path.endsWith("/HomeMedic/Reviews") ? (
                  <RateReviewIcon />
                ) : (
                  <RateReviewIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
          </Stack>
          <button
            style={{
              border: "none",
              borderRadius: "0  1rem 1rem 0",
              backgroundColor: "#307196",
            }}
            onClick={(e) => handleLogOut(e)}
          >
            <Link>
              {open ? (
                <div className={style.divbutton} style={{ color: "white" }}>
                  <LogoutIcon />
                  Logout
                </div>
              ) : (
                <LogoutIcon style={{ color: "white" }} />
              )}
            </Link>
          </button>
        </Stack>
      </div>
    </div>
  );
};
export default SideBar;
